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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img src={boat[0].imagen} className="max-w-sm rounded-lg shadow-2xl" />
        <p className="text-5xl font-bold">{selectedLocation}</p>
        <p className="text-5xl font-bold">from {dateRange.start} till {dateRange.end}</p>
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">{boat[0].description}</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default OneBoat;
