import React from "react";
import hero from "../assets/hero.jpg";

function Main() {
  return (
    <section
      className="h-screen w-full bg-cover"
      style={{ backgroundImage: `url(${hero})` }}
    ></section>
  );
}

export default Main;
