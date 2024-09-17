import React from "react";

function Booking({ boats }) {
  console.log(boats);
  return (
    <div className="min-h-lvh py-3 px-3">
      {boats.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {boats.map((boat, index) => (
            <li key={index} className="flex">
              <div className="card bg-base-100 shadow-xl w-full max-w-sm mx-auto">
                <figure className="relative w-full h-48 overflow-hidden">
                  <img
                    src={boat.imagen}
                    alt="Boat image"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg font-semibold">
                    {boat.type}
                    <p className="flex justify-end text-sm">{boat.plazas}</p>
                  </h2>
                  <p className="text-sm">{boat.description}</p>
                  <div className="card-actions justify-end mt-4">
                    <div className="badge badge-outline">{boat.potencia} HP</div>
                    <div className="badge badge-outline">{boat.size} M</div>
                    <div className="badge badge-outline">
                      {boat.price} €/Day
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No boats selected yet.</p>
      )}
    </div>
  );
}

export default Booking;
