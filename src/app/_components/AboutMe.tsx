export const AboutMe = () => {
  return (
    <section className="relative w-full items-center justify-center bg-gradient-to-r from-[#81D4FA] to-[#E0F7FA] px-6 pb-20 pt-12 text-black">
      <h2 className="mb-12 border-b border-white/50 pb-4 text-center text-4xl font-bold">
        A Brief Introduction
      </h2>
      <div className="flex">
        <div className="flex w-1/3 justify-center pl-36 pr-28">
          <img
            src="/img/headshot.jpg"
            alt="Professional Headshot"
            className="max-w-full rounded-full border-8"
          />
        </div>
        <div className="w-2/3 gap-12 pr-8">
          <p className="pb-6 text-2xl">
            I'm a software engineer by trade, and I've written code every work
            day for the better part of a decade now, but much of my passion and
            experience concerns all of the non-technical work it takes to create
            and grow a software product.
          </p>
          <p className="pb-6 text-2xl">
            In recent years I've acted as the direct support contact for over 30
            customers, lead sales calls with high-value prospective clients,
            managed our team's development and delivery workflows, and engaged
            with our employees to guage and improve morale and retention.
          </p>
          <p className="text-2xl">
            I love days where I can leverage a variety of skills, such as by
            leading a client call, using their feedback to design a new feature,
            and then implementing and delivering the changes myself.
          </p>
        </div>
      </div>
    </section>
  );
};
