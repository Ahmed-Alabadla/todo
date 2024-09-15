import React from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.gif";
import { Carousel } from "flowbite-react";

const CarouselAds = () => {
  const images = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
    { id: 4, url: "https://placehold.co/1440x300/orange/white" },
    {
      id: 4,
      url: "https://placehold.co/1440x300?text=Hello+World",
    },
  ];
  return (
    <div className="h-64 md:my-10 max-h-[300px] container overflow-hidden">
      <Carousel slideInterval={5000}>
        {images.map((image) => (
          <div key={image.id} className="rounded-xl max-h-[300px]">
            <img
              src={image.url}
              alt={image.id}
              className="w-auto h-auto max-h-full mx-auto rounded-xl  object-cover"
            />
          </div>
        ))}
        {/* {images.map((image) => (
          <img
            className="h-full"
            key={image.id}
            src={image.url}
            alt={image.id}
          />
        ))} */}
        {/* <img
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        /> */}
      </Carousel>
    </div>
  );
};

export default CarouselAds;
