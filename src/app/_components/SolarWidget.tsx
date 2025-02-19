import { differenceInMinutes, format } from "date-fns";
import Image from "next/image";
import { api } from "~/trpc/server";

export const SolarWidget = async () => {
  await api.solarMetrics.loginToSolarCloud();
  const metrics = await api.solarMetrics.getCurrentSolarMetrics();

  const minutesAgo = differenceInMinutes(
    new Date(),
    new Date(metrics?.curr_power_update_time),
  );

  return (
    <div className="group absolute right-0 top-0 h-[150px] w-[150px] transform overflow-hidden rounded-bl-full bg-purple-600 transition-all duration-500 ease-in-out hover:h-[600px] hover:w-[600px] hover:bg-purple-700">
      <div className="absolute right-[15px] top-[25px]">
        <Image
          alt="solar_panel_icon"
          src="/img/solar_icon.png"
          width={100}
          height={75}
        />
      </div>
      <div className="text-xl text-white opacity-0 transition-opacity delay-200 duration-300 ease-in-out group-hover:opacity-100">
        <p className="absolute right-[125px] top-[35px] text-2xl">
          I'm Passionate About Climate Action!
        </p>
        <p className="absolute right-[60px] top-[150px] w-[450px] text-justify">
          My {metrics?.total_capcity?.value} {metrics?.total_capcity?.unit} home
          solar installation has reduced our household CO2 emissions by{" "}
          {Math.round(metrics?.co2_reduce_total?.value)}{" "}
          {metrics?.co2_reduce_total?.unit} since it was installed on{" "}
          {format(new Date(metrics?.install_date), "MMM dd, yyyy")}
        </p>
        <p className="absolute right-[75px] top-[300px] w-[350px] text-center">
          As of {minutesAgo} minute{minutesAgo !== 1 && "s"} ago, it's currently
          generating {metrics?.curr_power?.value} {metrics?.curr_power?.unit} of
          electricity.
        </p>
      </div>
    </div>
  );
};
