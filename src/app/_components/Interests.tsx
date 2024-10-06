import React from "react";
import ConcertTimeline from "./Concerts";

interface IInterest {
  title: string;
  descriptions: string[];
  specialComponent?: React.ReactNode;
}

const interests: IInterest[] = [
  {
    title: "Politics / History / Anthropology",
    descriptions: [
      "I didn't read much for pleasure during my school years, but ever since I discovered a few books that fascinated me in 2019 I've enjoyed reading all sorts of things.",
      "I also try to stay up-to-date on world news by listening to political podcasts, like Jon Stewart's Weekly Show, The Ezra Klein Show, and shows from Crooked Media",
      "You can check out what I've read - and what I'm reading now - on my GoodReads profile linked at the bottom of this site.",
    ],
  },
  {
    title: "Music",
    descriptions: [
      "For as long as I can remember music has played a big role in my life, from listening to classical music as a baby, to learning to play the guitar as a teenager, now playing many instruments whenever I have time.",
      "Here's a timeline of all the concerts I've been lucky enough to go to throughout my life (hover for details).",
    ],
    specialComponent: <ConcertTimeline />,
  },
  {
    title: "Woodworking",
    descriptions: [
      "For as long as I can remember music has played a big role in my life, from listening to classical music as a baby, to learning to play the guitar as a teenager, now playing many instruments whenever I have time.",
      "Here's a timeline of all the concerts I've been lucky enough to go to throughout my life (hover for details).",
    ],
  },
  {
    title: "Athletics / Exercise",
    descriptions: [
      "Like most people, I've always enjoyed being active when I'm able to! In school this manifested itself as competitive swimming, but these days my wife and I do a variety of activities together.",
      "During a typical week we'll do Muay Thai, Tennis, Badminton, Swimming, and sometimes Aerial Yoga",
    ],
  },
];

const Interests = () => {
  return (
    <section className="bg-[#3e633f] py-12 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="mb-12 border-b border-white/50 pb-4 text-center text-4xl font-bold">
          Personal Interests
        </h2>
        {interests.map((interest) => {
          return (
            <div className="flex w-full flex-row">
              <div className="w-1/6 px-4">
                <h4 className="text-center text-2xl font-bold">
                  {interest.title}
                </h4>
              </div>
              <div className="mb-12 w-5/6 border-l border-white/50 pl-4">
                {interest.descriptions.map((paragraph) => (
                  <p className="pb-2">{paragraph}</p>
                ))}
                {interest.specialComponent ?? null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Interests;
