import React, { useState } from "react";
import { Link } from "react-router-dom";

function Booking({ boats }) {
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [motorPower, setMotorPower] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [hasSail, setHasSail] = useState(false);

  const filterBoats = () => {
    return boats.filter((boat) => {
      const isPriceInRange = price === "" || boat.price <= price;

      const isCapacityInRange = capacity === "" || boat.plazas <= capacity;

      const isMotorPowerInRange =
        motorPower === "" || boat.potencia <= motorPower;

      const isSizeInRange =
        (minSize === "" || boat.size >= minSize) &&
        (maxSize === "" || boat.size <= maxSize);

      const isSailMatch = !hasSail || boat.vela === hasSail;

      return (
        isPriceInRange &&
        isCapacityInRange &&
        isMotorPowerInRange &&
        isSizeInRange &&
        isSailMatch
      );
    });
  };
  const filteredBoats = filterBoats();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4 gap-4 py-3 px-2 md:px-6">
      <aside className="md:col-span-1 rounded-lg shadow p-1 md:p-4">
        <div className="bg-white flex md:flex-col md:p-8 justify-center items-center gap-4 md:gap-2 p-5 md:p-3 input-borders complex-shadow">
          <div className="">
            <h2 className="text-xl text-center md:pt-2 font-semibold mb-4">
              Filter Boats
            </h2>
            <div>
              <h3>Filter by Max Price:</h3>
              <input
                type="range"
                min="0"
                max="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full"
              />
              <span>{price} €</span>
            </div>
            <div>
              <h3>Filter by Max Capacity:</h3>
              <input
                type="range"
                min="1"
                max="30"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full"
              />
              <span>{capacity} Person(s)</span>{" "}
            </div>
          </div>
          <div>
            <div>
              <h3>Filter by Max Motor Power (HP):</h3>
              <input
                type="range"
                min="0" 
                max="1000" 
                value={motorPower}
                onChange={(e) => setMotorPower(Number(e.target.value))}
                className="w-full"
              />
              <span>{motorPower} HP</span>
            </div>
            <div>
              <h3>Filter by Max Size (meters):</h3>
              <input
                type="range"
                min="0"
                max="30"
                value={maxSize}
                onChange={(e) => setMaxSize(Number(e.target.value))}
                className="w-full"
              />
              <span>{maxSize} meters</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasSail}
                onChange={() => setHasSail(!hasSail)}
                className="form-checkbox h-5 w-5 text-sky-600"
              />
              <span className="text-lg font-medium">Has Sail</span>
            </label>
          </div>
        </div>
      </aside>
      <main className="md:col-span-3 md:p-3">
        {filteredBoats.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBoats.map((boat, index) => (
              <li key={index} className="flex flex-col">
                <div className="input-borders complex-shadow bg-base-100 w-full max-w-sm mx-auto flex flex-col h-full">
                  <Link to={`/boats/${boat.id}`}>
                    <figure className="w-full h-72 overflow-hidden">
                      <img
                        src={boat.imagen}
                        alt="Boat image"
                        className="inset-0 w-full h-full object-cover object-bottom"
                      />
                    </figure>
                  </Link>
                  <div className="card-body flex flex-col flex-grow">
                    <h2 className="pl-2 card-title text-lg font-semibold">
                      {boat.type}
                      <p className="pr-2 flex justify-end text-sm">
                        {boat.plazas} People
                      </p>
                    </h2>
                    <div className="card-actions gap-2 justify-end mt-4">
                      <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">
                        {boat.potencia || 50 } HP
                      </div>
                      <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">
                        {boat.size} M
                      </div>
                      <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">
                        {boat.price} €/Day
                      </div>
                      {boat.hasSail && (
                        <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">
                          Has Sail
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-2xl text-gray-500">
            No boats match the selected filters.
          </p>
        )}
      </main>
    </div>
  );
}

export default Booking;
