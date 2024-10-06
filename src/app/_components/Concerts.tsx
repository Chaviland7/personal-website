const concerts = [
  {
    band: "Aerosmith",
    date: "September 10, 2010",
    venue: "Ucansville CT, US",
  },
  {
    band: "Styx & Def Leppard",
    date: "July 5, 2015",
    venue: "Ucansville CT, US",
  },
  {
    band: "Van Halen",
    date: "August 11, 2015",
    venue: "Hartford CT, US",
  },
  {
    band: "Bruce Springsteen",
    date: "February 4, 2016",
    venue: "Boston MA, US",
  },
  {
    band: "The Who",
    date: "March 7, 2016",
    venue: "Boston MA, US",
  },
  {
    band: "Santana",
    date: "April 15, 2016",
    venue: "Ucansville CT, US",
  },
  {
    band: "U2",
    date: "June 25, 2016",
    venue: "Foxborough MA, US",
  },
  {
    band: "Greta Van Fleet",
    date: "May 18, 2019",
    venue: "Asbury Park NJ, US",
  },
  {
    band: "Joe Bonamassa",
    date: "July 26, 2019",
    venue: "Boston MA, US",
  },
  {
    band: "Sek Loso",
    date: "March 26, 2021",
    venue: "Chiang Mai, TH",
  },
  {
    band: "Greta Van Fleet",
    date: "August 28, 2021",
    venue: "Bridgeport CT, US",
  },
  {
    band: "Taylor Swift",
    date: "March 8, 2024",
    venue: "Singapore, SG",
  },
  {
    band: "Bruce Springsteen",
    date: "September 7, 2024",
    venue: "Washington DC, US",
  },
  {
    band: "Jacob Collier",
    date: "November 03, 2024",
    venue: "Madrid, ES",
  },
];

const ConcertTimeline = () => {
  return (
    <div>
      <div className="relative mb-20 mt-6 flex h-2 w-full justify-between bg-gray-300">
        {/* Timeline */}
        {concerts.map((concert, index) => (
          <div
            key={index}
            className="group -my-4 w-32 transition-all duration-200 ease-in-out hover:w-64"
          >
            <div className="mx-auto h-10 w-10 rounded-full bg-[#111827] transition-all duration-500 ease-in-out group-hover:-mt-1 group-hover:mb-0 group-hover:h-12 group-hover:w-12"></div>
            <div className="mt-2 text-center text-xs">
              <p className="font-bold">{concert.band}</p>
              <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                <p>{concert.date}</p>
                <p>{concert.venue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertTimeline;
