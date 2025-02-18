import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const USER_PASSWORD = process.env.ISOLARCLOUD_USER_PASSWORD ?? "";
const APP_KEY = process.env.ISOLARCLOUD_APP_KEY ?? "";
const ACCESS_KEY = process.env.ISOLARCLOUD_ACCESS_KEY ?? "";

interface ISolarMetrics {
  curr_power_update_time: string;
  total_capcity: { unit: string; value: number };
  co2_reduce_total: { unit: string; value: number };
  install_date: string;
  curr_power: { value: number; unit: string };
  total_energy: { value: number; unit: string };
}

const makeAPIRequest = async (url: string, body: any): Promise<any> => {
  const headers = new Headers();
  headers.append("x-access-key", ACCESS_KEY);
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...body, lang: "_en_US" }),
  };

  const response = await fetch(url, requestOptions);
  return await response.json();
};

export const solarMetricsRouter = createTRPCRouter({
  loginToSolarCloud: publicProcedure.mutation(async ({ ctx }) => {
    // login
    const loginResponse: { result_data: { user_id: string; token: string } } =
      await makeAPIRequest("https://gateway.isolarcloud.com.hk/openapi/login", {
        appkey: APP_KEY,
        user_account: "charliehaviland@gmail.com",
        user_password: USER_PASSWORD,
      });

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
      const powerStationResponse: {
        result_data: { pageList: ISolarMetrics[] };
      } = await makeAPIRequest(
        "https://gateway.isolarcloud.com.hk/openapi/getPowerStationList",
        {
          appkey: APP_KEY,
          token: ctx.userToken,
          curPage: 1,
          size: 1,
        },
      );

      if (!powerStationResponse.result_data.pageList?.length) {
        throw new Error("No power station data found");
      }

      const powerStation = powerStationResponse.result_data.pageList[0]!;

      // only return the desired properties
      const {
        curr_power_update_time,
        total_capcity,
        co2_reduce_total,
        install_date,
        curr_power,
        total_energy,
      } = powerStation;

      return {
        curr_power_update_time,
        total_capcity,
        co2_reduce_total,
        install_date,
        curr_power,
        total_energy,
      };
    },
  ),
});
