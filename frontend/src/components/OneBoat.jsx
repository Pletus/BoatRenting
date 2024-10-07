import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OneBoat({ dateRange, selectedLocation }) {
  const { id } = useParams();
  const [boat, setBoat] = useState(null);
  const [error, setError] = useState(null);
  console.log(boat);
  console.log(dateRange);
  console.log(selectedLocation);

  useEffect(() => {
    const getBoat = async () => {
      try {
        const response = await fetch(`http://localhost:5432/boats/${id}`);

        if (!response.ok) {
          throw new Error("Boat not found");
        }

        const data = await response.json();
        setBoat(data);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }
    };

    getBoat();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!boat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero bg-base-200 min-h-screen p-4">
      <div className="hero-content md:gap-24 flex-col lg:flex-row">
        <img src={boat[0].imagen} className="md:max-w-xl 2xl:max-w-5xl input-borders complex-shadow" />
        <div className="p-12">
          <h1 className="text-5xl font-bold mt-2 ml-2">{boat[0].type}</h1>
          <p className="py-6">{boat[0].description}</p>
          <p className="text-2xl font-bold mt-2">{selectedLocation}</p>
          <p className="text-xl font-bold mt-2">
            from {dateRange.start} till {dateRange.end}
          </p>
          <button className="btn btn-primary ml-2 mt-4 complex-shadow">Rent this boat</button>
        </div>
      </div>
    </div>
  );
}

export default OneBoat;
