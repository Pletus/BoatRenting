import React from "react";

function Booking({ boats }) {
  return (
    <div className="min-h-lvh py-3 px-3">
      {boats.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {boats.map((boat, index) => (
            <li key={index} className="flex flex-col">
              <div className="input-borders complex-shadow card bg-base-100 w-full max-w-sm mx-auto flex flex-col h-full">
                <figure className="w-full h-72 overflow-hidden">
                  <img
                    src={boat.imagen}
                    alt="Boat image"
                    className="inset-0 w-full h-full object-cover object-bottom"
                  />
                </figure>
                <div className="card-body flex flex-col flex-grow">
                  <h2 className="pl-2 card-title text-lg font-semibold">
                    {boat.type}
                    <p className="pr-2 flex justify-end text-sm">{boat.plazas}</p>
                  </h2>
                  <p className="text-sm flex-grow">{boat.description}</p>
                  <div className="card-actions gap-2 justify-end mt-4">
                    <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">{boat.potencia} HP</div>
                    <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">{boat.size} M</div>
                    <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">
                      {boat.price} €/Day
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-2xl text-gray-500">No boats selected yet.</p>
      )}
    </div>
  );
}

export default Booking;
