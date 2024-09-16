import React from "react";

function Booking({ boats }) {
  console.log(boats);
  return (
    <div className="min-h-lvh flex justify-end items-center pt-4">
      {boats.length > 0 ? (
        <ul className=" grid grid-cols-3 gap-4 px-4">
          {boats.map((boat, index) => (
            <li key={index}>
              <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                  <img
                    src={boat.imagen}
                    alt="Boat image"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {boat.type}
                  </h2>
                  <p>{boat.description}</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">{boat.size} m</div>
                    <div className="badge badge-outline">{boat.price} €/day</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No boats selected yet.</p>
      )}
    </div>
  );
}

export default Booking;
