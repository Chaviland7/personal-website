interface IProject {
  title: string;
  githubLink?: string;
  deploymentLink?: string;
  thumbnailName: string;
  description: string[];
}

export const Portfolio = () => {
  const projects: IProject[] = [
    {
      title: "KYC-Chain",
      thumbnailName: "kycc.png",
      deploymentLink: "https://kyc-chain.com",
      description: [
        "For the past 5+ years my primary work has been for KYC-Chain, a ReactJS app with a Node/ExpressJS back-end and MongoDB",
        "The app is closed-source, but I'm happy to show code snippets or product demos upon request.",
        "The company landing page is linked here below",
      ],
    },
    {
      title: "Chiang Mai Tennis",
      deploymentLink: "https://chiang-mai-tennis.vercel.app/",
      thumbnailName: "cmtennis.png",
      description: [
        "It's still in the early stages of development, but a friend and I are building a web app for the local tennis community here in Chiang Mai.",
        "We're working on functoinality that will let players do new things like book courts online, find and book a coach, and discover new people to play with.",
        "It's being built as a NextJS-based PWA, with a PostgreSQL database and NextJS API.",
      ],
    },
    {
      title: "This Website!",
      githubLink: "https://github.com/Chaviland7/personal-website",
      thumbnailName: "website.png",
      description: [
        "It's a simple website, but it's deliberately over-engineered to showcase my experience with different technologies.",
        "It uses the T3 stack, with NextJS for client & server rendering, Tailwind CSS, and an integration with my solar provider's API.",
      ],
    },
    {
      title: "The Dog Project",
      githubLink: "https://github.com/dog-project/DogProject",
      deploymentLink: "https://the-dog-project.firebaseapp.com/dogproject/",
      thumbnailName: "dogProject.png",
      description: [
        "In my last semester at NEU I helped lead a philosophy research project on social choice theory, using the example of ranking cute dogs.",
        "In addition to the philosophical work, I helped build a web app that allowed community members to vote on our dog contestants.",
        "Voting is no longer open, but many pages from the site are still there",
      ],
    },
  ];

  return (
    <section className="bg-[#3e633f] pb-24 pt-12 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="mb-6 border-b border-white/50 pb-4 text-center text-4xl font-bold">
          Projects / Portfolio
        </h2>

        <div className="flex w-full flex-wrap">
          {projects.map((project, i) => (
            <div
              className="group m-3 w-[calc(50%-24px)] rounded-md bg-cover bg-center"
              style={{
                backgroundImage: `url(/img/thumbnails/${project.thumbnailName})`,
              }}
              key={i}
            >
              <div
                style={{ transitionProperty: "background-color" }}
                className="relative h-full w-full rounded-md bg-black bg-opacity-0 duration-300 ease-in-out hover:bg-opacity-75"
              >
                <div className="opacity-0 duration-500 ease-in-out group-hover:opacity-100">
                  <div className="px-12 pb-16 pt-8">
                    <h3 className="pb-2 text-center text-2xl">
                      {project.title}
                    </h3>
                    <ul className="ml-6 mt-2 list-disc space-y-4">
                      {project.description.map((d, j) => (
                        <li key={`${i}-${j}`}>{d}</li>
                      ))}
                    </ul>
                  </div>{" "}
                  <div className="absolute bottom-0 flex w-full flex-row border-t-2 border-white border-opacity-50 text-center">
                    {project.deploymentLink && (
                      <a
                        href={project.deploymentLink}
                        target="_blank"
                        className={`w-${project.githubLink ? "1/2" : "full"} ${project.githubLink ? "border-r-2" : ""} border-white border-opacity-50`}
                      >
                        <div
                          style={{ transitionProperty: "background-color" }}
                          className="bg-white bg-opacity-0 py-4 duration-300 ease-in-out hover:bg-opacity-25"
                        >
                          Visit Site
                        </div>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className={`w-${project.deploymentLink ? "1/2" : "full"}`}
                        target="_blank"
                      >
                        <div
                          style={{ transitionProperty: "background-color" }}
                          className="bg-white bg-opacity-0 py-4 duration-300 ease-in-out hover:bg-opacity-25"
                        >
                          View Repo
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
