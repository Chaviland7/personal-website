import {
  compareDesc,
  Duration,
  format,
  intervalToDuration,
  getYear,
} from "date-fns";

interface IRole {
  title: string;
  description: string[];
  // only add dates for roles if I worked multiple roles
  startDate?: Date;
  endDate?: Date;
}
interface IWorkExperience {
  companyName: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  roles: IRole[];
}

const jobs: IWorkExperience[] = [
  {
    companyName: "KYC-Chain",
    location: "Chiang Mai, TH",
    startDate: new Date("2019-03-01"),
    roles: [
      {
        title: "Software Engineer",
        startDate: new Date("2019-03-01"),
        endDate: new Date("2020-05-01"),
        description: ["Did a thing", "Did another thing"],
      },
      {
        title: "Software Engineer & Customer Support Lead",
        startDate: new Date("2020-05-01"),
        endDate: new Date("2021-07-01"),
        description: ["Did more stuff", "honestly, too much stuff"],
      },
      {
        title: "Technical Team Lead & Product Manager",
        startDate: new Date("2021-07-01"),
        description: ["Even more stuff", "Quite a few tasks"],
      },
    ],
  },
  {
    companyName: "Liberty Mutual",
    location: "Boston MA, US",
    startDate: new Date("2018-01-01"),
    endDate: new Date("2018-06-31"),
    roles: [
      {
        title: "Software Engineer Co-Op",
        description: [
          "Developed an internal tool for tracking user activity through the online policy application process.",
          "Worked closely with team leaders to fully understand the complex eventing architecture in place and how best to utilize it.",
          "Succesfully designed a full-stack application that visualizes tens of thousands of events on-demand using ReactJS, SpringBoot, and SQL.",
          "Presented the tool, which is now in use, to senior leaders at the end of my co-op.",
        ],
      },
    ],
  },
  {
    companyName: "KYC-Chain",
    location: "Chiang Mai, TH",
    startDate: new Date("2017-01-01"),
    endDate: new Date("2017-12-15"),
    roles: [
      {
        title: "Software Developer Co-Op",
        description: [
          "Established a lead role on a small and fully remote dev team stationed around the world.",
          "Made critical decisions in designing and building the UI for much of the KYC-Chain application, now used by over 50 institutions worldwide.",
          "Worked closely with the founder and lead developer to help guide the development team towards creating the product our clients sought.",
        ],
      },
    ],
  },
  {
    companyName: "Amazing Charts | Primed",
    location: "Boston MA, US",
    startDate: new Date("2016-01-01"),
    endDate: new Date("2016-06-01"),
    roles: [
      {
        title: "Test Automation Engineer Co-Op",
        description: [
          "Individually developed over 150 automated API test scripts using C# and the .NET/RestSharp frameworks.",
          "Collaborated with QA and Development team members to determine which areas of the product most needed testing.",
          "Participated in, and often ran the team-wide scrum meetings.",
          "Performed manual regression testing on the product when necessary, shortening the regression cycle.",
        ],
      },
    ],
  },
  {
    companyName: "Pixels & Digits Solutions",
    location: "Bridgeport CT, US",
    startDate: new Date("2014-05-01"),
    endDate: new Date("2017-08-01"),
    roles: [
      {
        title: "Web Development Contractor",
        description: [
          "Developed custom responsive WordPress themes for clients using CSS, Bootstrap, HTML, PHP, JavaScript, and SQL.",
          "Upgraded previous projects to include new Bootstrap features, SEO, and Social Media Optimization.",
        ],
      },
    ],
  },
];

export const getDurationString = (duration: Duration): string => {
  const yearsString = `${duration.years} Year${duration.years !== 1 ? "s" : ""}, `;
  const monthsString = `${duration.months} Month${duration.months !== 1 ? "s" : ""}`;
  return `${duration.years ? yearsString : ""}${monthsString}`;
};

export const WorkExperience = () => {
  return (
    <section className="bg-[#111827] py-12 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="mb-12 border-b border-white/50 pb-4 text-center text-4xl font-bold">
          Work Experience
        </h2>
        {jobs
          .sort((a, b) => compareDesc(a.startDate, b.startDate))
          .map((job) => {
            const jobDuration = intervalToDuration({
              start: new Date(job.startDate),
              end: job.endDate ? new Date(job.endDate) : new Date(),
            });
            return (
              <div className="mb-8 flex flex-col md:flex-row">
                <div className="text-center md:w-1/3">
                  <h3 className="text-2xl">{job.companyName}</h3>
                  <p className="text-sm text-gray-400">{`${format(job.startDate, "MMM yyyy")} - ${job.endDate ? format(job.endDate, "MMM yyyy") : "Present"}`}</p>
                  <p className="text-sm text-gray-400">
                    {getDurationString(jobDuration)}
                  </p>
                  <p className="text-sm text-gray-400">{job.location}</p>
                </div>
                <div className="border-l border-white/30 pb-2 pl-12 md:w-2/3">
                  {job.roles
                    .sort((a, b) =>
                      compareDesc(a.startDate as Date, b.startDate as Date),
                    )
                    .map((role) => {
                      return (
                        <div className="pb-6">
                          <h4 className="text-lg italic">
                            {role.title}{" "}
                            {role.startDate && (
                              <span className="pl-2 text-sm">
                                ({getYear(role.startDate)} -{" "}
                                {role.endDate
                                  ? getYear(role.endDate)
                                  : "Present"}
                                )
                              </span>
                            )}
                          </h4>
                          <ul className="ml-6 mt-2 list-disc space-y-2 text-sm">
                            {role.description.map((desc) => (
                              <li>{desc}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
