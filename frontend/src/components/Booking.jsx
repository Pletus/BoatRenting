import React from "react";

function Booking({ boats }) {
  console.log(boats);
  return (
    <div className="min-h-lvh flex justify-center items-center">
      {boats.length > 0 ? (
        <ul>
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
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
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
