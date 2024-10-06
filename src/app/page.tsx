import { AboutMe } from "./_components/AboutMe";
import ContactMe from "./_components/Contact";
import { WavyDivider } from "./_components/Dividers";
import { Education } from "./_components/Education";
import Interests from "./_components/Interests";
import { Portfolio } from "./_components/Projects";
import { BackgroundSlideshow } from "./_components/Slideshow";
import { SolarWidget } from "./_components/SolarWidget";
import { WorkExperience } from "./_components/WorkExperience";

export default async () => {
  return (
    <main className="relative flex min-h-screen flex-col text-white">
      <BackgroundSlideshow />
      <SolarWidget />

      {/* Foreground content that scrolls over the background */}
      <div className="text-shadow relative -z-30 flex min-h-screen flex-col items-center justify-center">
        <h1 className="pb-12 text-5xl font-bold tracking-tight sm:text-[5rem]">
          Hey, I'm Charlie!
        </h1>
        <p className="pb-4 text-2xl font-bold">
          These are some pictures that I've taken over the years.
        </p>
        <p className="text-2xl font-bold">
          Enjoy them for as long as you'd like, and then scroll on down!
        </p>
      </div>

      <AboutMe />
      <WavyDivider fill="#111827" />
      <WorkExperience />
      <WavyDivider fill="#3e633f" />
      <Portfolio />
      <WavyDivider fill="#111827" />
      <Education />
      <WavyDivider fill="#3e633f" />
      <Interests />
      <ContactMe />
    </main>
  );
};
