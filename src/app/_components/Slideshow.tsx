"use client";

import { useState, useEffect } from "react";

interface ISlide {
  url: string;
  caption: string;
}

const slides: ISlide[] = [
  {
    url: "pizRien.png",
    caption: "Hiking | Piz Rien, CH | 2016",
  },
  {
    url: "japan.jpeg",
    caption: "Skiing | Nagano Prefecture, JP | 2023",
  },
  {
    url: "taiwan.jpeg",
    caption: "Hiking | 九份 (Joiufen), TW | 2023",
  },
  {
    url: "porto.png",
    caption: "Sunset | Porto, PT | 2019",
  },
  {
    url: "sydney.jpeg",
    caption: "Swimming | Bondi Beach, AU | 2023",
  },
  {
    url: "pbangMapah.png",
    caption: "Sunset | Mae Hong Son, TH | 2017",
  },
];

// Add preload function
const preloadImages = () => {
  slides.forEach((slide) => {
    const img = new Image();
    img.src = `/img/slideshow/${slide.url}`;
  });
};

export const BackgroundSlideshow = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload all images
    preloadImages();
    setImagesLoaded(true);

    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed left-0 top-0 -z-50 h-full w-full">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlideIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(/img/slideshow/${slide.url})`,
            backgroundColor: "#000000",
          }}
        >
          {/* Add a low-quality placeholder while loading */}
          {!imagesLoaded && (
            <div
              className="absolute inset-0 bg-cover bg-center blur-lg"
              style={{
                backgroundImage: `url(/img/slideshow/thumbnails/${slide.url})`,
              }}
            />
          )}
          {index === currentSlideIndex && (
            <p className="text-shadow absolute bottom-[10px] left-[10px] text-2xl font-[450] text-white">
              {slide.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
