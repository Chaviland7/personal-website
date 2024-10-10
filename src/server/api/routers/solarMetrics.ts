import * as CryptoJS from "crypto-js";
import NodeRSA from "node-rsa";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PUBLIC_KEY = process.env.ISOLARCLOUD_PUBLIC_KEY ?? "";
const APP_KEY = process.env.ISOLARCLOUD_APP_KEY ?? "";
const ACCESS_KEY = process.env.ISOLARCLOUD_ACCESS_KEY ?? "";

interface ISolarMetrics {
  data_last_update_time: string;
  design_capacity: { unit: string; value: number };
  co2_reduce_total: { unit: string; value: number };
  install_date: string;
  curr_power: { value: number; unit: string };
  total_energy: { value: number; unit: string };
}

export function encryptRSA(value: string, publicKey: string): string {
  const key = new NodeRSA();
  key.setOptions({ encryptionScheme: "pkcs1" });
  key.importKey(publicKey, "pkcs8-public-pem");
  return key.encrypt(value, "base64");
}
export function encryptAES<T>(data: T, key: string): string {
  const d = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const k = CryptoJS.enc.Utf8.parse(key);
  return CryptoJS.AES.encrypt(d, k, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
    .ciphertext.toString()
    .toUpperCase();
}
export function decryptAES<T>(data: string, key: string): T {
  const d = CryptoJS.format.Hex.parse(data);
  const k = CryptoJS.enc.Utf8.parse(key);
  const dec = CryptoJS.AES.decrypt(d, k, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return JSON.parse(CryptoJS.enc.Utf8.stringify(dec)) as T;
}
const generateRandomWord = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const makeAPIRequest = async (
  url: string,
  body: any,
  userid: string,
): Promise<any> => {
  const randomKey = "web" + generateRandomWord(13);

  const headers = new Headers();
  headers.append("content-type", "application/json;charset=UTF-8");
  headers.append("sys_code", "200");
  headers.append("x-access-key", ACCESS_KEY);
  headers.append("x-random-secret-key", encryptRSA(randomKey, PUBLIC_KEY));
  headers.append("x-limit-obj", encryptRSA(userid, PUBLIC_KEY));

  const encryptedBody = encryptAES(body, randomKey);

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: encryptedBody,
  };

  const response = await fetch(url, requestOptions);

  if (response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }

    return decryptAES(result, randomKey);
  }
};

export const solarMetricsRouter = createTRPCRouter({
  loginToSolarCloud: publicProcedure.mutation(async ({ ctx }) => {
    // login
    const loginResponse: { result_data: { user_id: string; token: string } } =
      await makeAPIRequest(
        "https://gateway.isolarcloud.com.hk/v1/userService/login",
        {
          appkey: APP_KEY,
          api_key_param: {
            timestamp: Date.now(),
            nonce: generateRandomWord(32),
          },
          user_account: "charliehaviland@gmail.com",
          user_password: "iSSdph!9Ssz4B9V",
        },
        "",
      );

    ctx.userId = loginResponse?.result_data?.user_id;
    ctx.userToken = loginResponse?.result_data?.token;

    return { success: true };
  }),
  getCurrentSolarMetrics: publicProcedure.query(
    async ({ ctx }): Promise<ISolarMetrics> => {
      if (!ctx.userToken || !ctx.userId) {
        throw new Error("User is not authenticated.");
      }
      if (!ctx.installationId) {
        throw new Error("Installation ID not yet saved to context");
      }

      // get power station details
      const powerStationResponse: { result_data: ISolarMetrics } =
        await makeAPIRequest(
          "https://gateway.isolarcloud.com.hk/v1/powerStationService/getPsDetail",
          {
            appkey: APP_KEY,
            api_key_param: {
              timestamp: Date.now(),
              nonce: generateRandomWord(32),
            },
            ps_id: ctx.installationId,
            valid_flag: "1,3",
            lang: "_en_US",
            token: ctx.userToken,
          },
          ctx.userId,
        );

      // only return the desired properties
      const {
        data_last_update_time,
        design_capacity,
        co2_reduce_total,
        install_date,
        curr_power,
        total_energy,
      } = powerStationResponse?.result_data;

      return {
        data_last_update_time,
        design_capacity,
        co2_reduce_total,
        install_date,
        curr_power,
        total_energy,
      };
    },
  ),
});
