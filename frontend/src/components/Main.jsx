import hero from "../assets/hero.jpg";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../App.css";

function Main({ reload }) {
  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <section
      className="h-screen w-full bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="container mx-auto flex items-center justify-center md:pr-36">
        <div className="md:w-2/4 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="heading md:pr-24" data-aos="zoom-in">
            Chart Your Course,
          </h1>
          <h1
            className="heading md:pr-12"
            data-aos="zoom-out"
            data-aos-offset="60"
            data-aos-easing="ease-in-sine"
          >
            Sail Your Dream,
          </h1>
          <p
            className="heading-1 pl-12"
            data-aos="zoom-in"
            data-aos-offset="60"
            data-aos-easing="ease-in-sine"
          >
            Create Lasting Memories
          </p>
        </div>
      </div>
    </section>
  );
}

export default Main;
