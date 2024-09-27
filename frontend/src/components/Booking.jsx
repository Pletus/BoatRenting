import React, { useState } from "react";

function Booking({ boats }) {
  // States for filtering boats
  const [price, setPrice] = useState(""); // Max price
  const [capacity, setCapacity] = useState(""); // Max capacity
  const [minCapacity, setMinCapacity] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [motorPower, setMotorPower] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [hasSail, setHasSail] = useState(false);

  // Function to filter boats based on input values
  const filterBoats = () => {
    return boats.filter((boat) => {
      // Price filter using single 'price' state as max price
      const isPriceInRange = price === "" || boat.price <= price;

      // Capacity filter using the new 'capacity' state
      const isCapacityInRange = capacity === "" || boat.plazas <= capacity;

      // Other filters remain the same
      const isMotorPowerMatch =
        motorPower === "" || boat.potencia === motorPower;

      const isSizeInRange =
        (minSize === "" || boat.size >= minSize) &&
        (maxSize === "" || boat.size <= maxSize);

      const isSailMatch = !hasSail || boat.hasSail === hasSail;

      // Return true if the boat matches all conditions
      return (
        isPriceInRange &&
        isCapacityInRange &&
        isMotorPowerMatch &&
        isSizeInRange &&
        isSailMatch
      );
    });
  };

  const filteredBoats = filterBoats();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4 gap-6 py-3 px-3">
      {/* Left column for filters */}
      <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filter Boats</h2>

        {/* Price Filter */}
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

        {/* Capacity Filter */}
        <div>
          <h3>Filter by Max Capacity:</h3>
          <input
            type="range"
            min="1" // Minimum number of people
            max="20" // Set a reasonable maximum, adjust as needed
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full"
          />
          <span>{capacity} Person(s)</span>{" "}
          {/* Display the selected capacity */}
        </div>

        {/* Motor Power Filter */}
        <div className="mb-4">
          <h3 className="text-lg font-medium">Motor Power (HP)</h3>
          <select
            value={motorPower}
            onChange={(e) => setMotorPower(e.target.value)}
            className="w-full mt-2 p-2 border rounded focus:outline-none focus:ring"
          >
            <option value="">Any</option>
            <option value="50">50 HP</option>
            <option value="100">100 HP</option>
            <option value="150">150 HP</option>
            <option value="200">200 HP</option>
          </select>
        </div>

        {/* Boat Size Filter */}
        <div className="mb-4">
          <h3 className="text-lg font-medium">Boat Size (Meters)</h3>
          <div className="flex space-x-2 mt-2">
            <input
              type="number"
              placeholder="Min"
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring"
            />
          </div>
        </div>

        {/* Sail Filter */}
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
      </aside>

      {/* Right column for boat cards */}
      <main className="md:col-span-3">
        {filteredBoats.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoats.map((boat, index) => (
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
                      <p className="pr-2 flex justify-end text-sm">
                        {boat.plazas} People
                      </p>
                    </h2>
                    <p className="text-sm flex-grow">{boat.description}</p>
                    <div className="card-actions gap-2 justify-end mt-4">
                      <div className="hover:bg-sky-700 hover:ring-sky-700 hover:text-white input-borders p-1 px-2">
                        {boat.potencia} HP
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
