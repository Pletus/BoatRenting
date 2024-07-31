import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function Layout() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest("#bookingForm") ||
        event.target.closest("#bookingButton")
      ) {
        return;
      }
      setIsFormVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Types:", selectedTypes);
    console.log("Selected Location:", selectedLocation);

    try {
      const response = await searchBoats(selectedTypes, selectedLocation);
      setBoats(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching boats:", error);
    }
  };

  const searchBoats = async (type, locations) => {
    const response = await fetch("http://localhost:5432/boats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        locations: locations, // Asegúrate de que `locations` sea un array
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="text-white w-screen text-xl relative">
        <img src="https://via.placeholder.com/40" alt="Logo" />
        <ul className="flex space-x-4">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <button
              id="bookingButton"
              className="focus:outline-none"
              onClick={toggleFormVisibility}
            >
              Booking
            </button>
          </li>
        </ul>

        {isFormVisible && (
          <div
            id="bookingForm"
            className="absolute p-12 left-0 bg-blue-700 text-white p-4 w-80 border border-gray-600 rounded-lg shadow-lg"
          >
            <button
              className="absolute top-2 right-2"
              onClick={toggleFormVisibility}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <form className="flex gap-12" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <input
                  type="checkbox"
                  id="Boat"
                  value="boat"
                  onChange={handleTypeChange}
                />
                <label htmlFor="Boat">Boat</label>
                <input
                  type="checkbox"
                  id="Catamaran"
                  value="catamaran"
                  onChange={handleTypeChange}
                />
                <label htmlFor="Catamaran">Catamaran</label>
                <input
                  type="checkbox"
                  id="Fragata"
                  value="fragata"
                  onChange={handleTypeChange}
                />
                <label htmlFor="Fragata">Fragata</label>
                <input
                  type="checkbox"
                  id="Sailing Vessel"
                  value="velero"
                  onChange={handleTypeChange}
                />
                <label htmlFor="Sailing Vessel">Sailing Vessel</label>
                <input
                  type="checkbox"
                  id="Yacht"
                  value="yate"
                  onChange={handleTypeChange}
                />
                <label htmlFor="Yacht">Yacht</label>
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <select id="location" onChange={handleLocationChange}>
                  <option className="text-black" value="">
                    Select a location
                  </option>
                  <option className="text-black" value="Cannes">
                    Cannes
                  </option>
                  <option className="text-black" value="Port Vell">
                    Port Vell
                  </option>
                  <option className="text-black" value="Marina Ibiza">
                    Marina Ibiza
                  </option>
                  <option className="text-black" value="Port Adriano">
                    Port Adriano
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="start">Start Date</label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  value={dateRange.start}
                  onChange={handleDateChange}
                />
                <label htmlFor="end">End Date</label>
                <input
                  type="date"
                  id="end"
                  name="end"
                  value={dateRange.end}
                  onChange={handleDateChange}
                />
              </div>
              <button type="submit">Search</button>
            </form>
          </div>
        )}
      </nav>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;
