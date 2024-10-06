import { compareDesc, format, intervalToDuration } from "date-fns";
import { getDurationString } from "./WorkExperience";

interface IEducation {
  institution: string;
  award: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string[];
}

const educationSections: {
  sectionTitle: string;
  studies: IEducation[];
}[] = [
  {
    sectionTitle: "Formal Education",
    studies: [
      {
        institution: "Northeastern University",
        location: "Boston MA, USA",
        startDate: new Date("2014-09-01"),
        endDate: new Date("2019-05-01"),
        award:
          "Bachelor of Science in Computer Science and Finance; Minor in Ethics",
        description: [
          "Elected President of NU Swim Club - responsible for managing a team of over 70 swimmers.",
          "Selected as CCIS Fellow - helping integrate Com-Sci freshmen into university life.",
          "Invited to join AI ethics research group.",
        ],
      },
      {
        institution: "Fairfield Ludlowe High School",
        location: "Fairfield CT, USA",
        startDate: new Date("2010-09-01"),
        endDate: new Date("2014-06-01"),
        award: "High School Diploma",
        description: [
          "Elected captain of Varsity Swim Team.",
          "Completed six AP classes, including AP Computer Science.",
        ],
      },
    ],
  },
  {
    sectionTitle: "Continuing Education",
    studies: [
      {
        institution: "Coursera Courses",
        location: "Online",
        startDate: new Date("2023-11-01"),
        award: "Educational Certificates",
        description: [
          "The University of Edinburgh: Data Ethics, AI and Responsible Innovation",
          "Northeastern University: Data Privacy Fundamentals",
          "Yale University: The Moral Foundations Of Politics",
        ],
      },
      {
        institution: "The Job Hackers",
        location: "Online",
        startDate: new Date("2024-10-01"),
        endDate: new Date("2024-11-15"),
        award: "Agile MBA Course",
        description: [
          "I'm very happy to be taking the Agile MBA course to help me improve my understanding of Agile, Scrum, and the different ways to organize software development teams",
        ],
      },
    ],
  },
];

export const Education = () => {
  return (
    <section className="bg-[#111827] py-8 text-white">
      <div className="container mx-auto px-6 md:px-12">
        {educationSections.map((section) => (
          <>
            <h2 className="mb-12 border-b border-white/50 pb-4 text-center text-4xl font-bold">
              {section.sectionTitle}
            </h2>
            {section.studies
              .sort((a, b) => compareDesc(a.startDate, b.startDate))
              .map((study, i) => {
                const studyDuration = intervalToDuration({
                  start: new Date(study.startDate),
                  end: study.endDate ? new Date(study.endDate) : new Date(),
                });
                return (
                  <div className="mb-8 flex flex-col md:flex-row" key={i}>
                    <div className="text-center md:w-1/3">
                      <h3 className="text-2xl">{study.institution}</h3>
                      <p className="text-sm text-gray-400">{`${format(study.startDate, "MMM yyyy")} - ${study.endDate ? format(study.endDate, "MMM yyyy") : "Present"}`}</p>
                      <p className="text-sm text-gray-400">
                        {getDurationString(studyDuration)}
                      </p>
                      <p className="text-sm text-gray-400">{study.location}</p>
                    </div>
                    <div className="border-l border-white/30 pb-2 pl-12 md:w-2/3">
                      <div className="pb-6">
                        <h4 className="text-lg italic">{study.award}</h4>
                        <ul className="ml-6 mt-2 list-disc space-y-2 text-sm">
                          {study.description.map((desc, j) => (
                            <li key={`${i}-${j}`}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        ))}
      </div>
    </section>
  );
};
