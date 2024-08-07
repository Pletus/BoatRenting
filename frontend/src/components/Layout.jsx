import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

function Layout() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [boats, setBoats] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveType = (typeToRemove) => {
    setSelectedTypes((prevState) =>
      prevState.filter((type) => type !== typeToRemove)
    );
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes((prevState) => [...prevState, value]);
    } else {
      setSelectedTypes((prevState) =>
        prevState.filter((type) => type !== value)
      );
    }
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
      <nav className="nav text-white w-screen text-xl relative">
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
            className="absolute md:left-24 mt-8 pt-20 px-10 bg-white text-black p-4 input-borders complex-shadow"
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
            <h4 className="tc font-semibold max-w-96 pl-3 mb-10 text-base leading-loose">
              Choose a port, select your dates, pick the perfect boat model, and
              embark on your unforgettable adventure. Enjoy a seamless booking
              experience and set sail with ease!
            </h4>
            <form
              className="flex flex-col justify-center items-center gap-12"
              onSubmit={handleSubmit}
            >
              <div className="input-borders p-1">
                <select
                  className="tc font-semibold"
                  id="location"
                  onChange={handleLocationChange}
                >
                  <option value="">Select a location</option>
                  <option className="tc font-semibold" value="Antibes">
                    Antibes
                  </option>
                  <option className="tc font-semibold" value="Barcelona">
                    Barcelona
                  </option>
                  <option className="tc font-semibold" value="Campania">
                    Campania
                  </option>
                  <option className="tc font-semibold" value="Cannes">
                    Cannes
                  </option>
                  <option className="tc font-semibold" value="Capri">
                    Capri
                  </option>
                  <option className="tc font-semibold" value="Cerdeña">
                    Cerdeña
                  </option>
                  <option className="tc font-semibold" value="Ibiza">
                    Ibiza
                  </option>
                  <option className="tc font-semibold" value="Liguria">
                    Liguria
                  </option>
                  <option className="tc font-semibold" value="Mallorca">
                    Mallorca
                  </option>
                  <option className="tc font-semibold" value="Marbella">
                    Marbella
                  </option>
                  <option className="tc font-semibold" value="Niza">
                    Niza
                  </option>
                  <option className="tc font-semibold" value="Saint-Tropez">
                    Saint-Tropez
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col">
                  <label className="tc font-semibold" htmlFor="start">
                    Start Date
                  </label>
                  <input
                    className="tc input-borders p-1"
                    type="date"
                    id="start"
                    name="start"
                    value={dateRange.start}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="tc font-semibold" htmlFor="end">
                    End Date
                  </label>
                  <input
                    className="tc input-borders p-1"
                    type="date"
                    id="end"
                    name="end"
                    value={dateRange.end}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <div className="dropdown">
                <button
                  onClick={handleToggle}
                  className="tc font-semibold input-borders p-2"
                >
                  Select Vessel Type
                </button>
                {isOpen && (
                  <div className="dropdown-content">
                    <div>
                      <label className="tc font-semibold" htmlFor="Boat">
                        Boat
                      </label>
                      <input
                        type="checkbox"
                        id="Boat"
                        value="boat"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("boat")}
                      />
                    </div>
                    <div>
                      <label className="tc font-semibold" htmlFor="Catamaran">
                        Catamaran
                      </label>
                      <input
                        type="checkbox"
                        id="Catamaran"
                        value="catamaran"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("catamaran")}
                      />
                    </div>
                    <div>
                      <label className="tc font-semibold" htmlFor="Fragata">
                        Fragata
                      </label>
                      <input
                        type="checkbox"
                        id="Fragata"
                        value="fragata"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("fragata")}
                      />
                    </div>
                    <div>
                      <label
                        className="tc font-semibold"
                        htmlFor="Sailing Vessel"
                      >
                        Sailing Vessel
                      </label>
                      <input
                        type="checkbox"
                        id="Sailing Vessel"
                        value="velero"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("velero")}
                      />
                    </div>
                    <div>
                      <label className="tc font-semibold" htmlFor="Yacht">
                        Yacht
                      </label>
                      <input
                        type="checkbox"
                        id="Yacht"
                        value="yate"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("yate")}
                      />
                    </div>
                  </div>
                )}
                <div className="flex mt-4 text-center flex-col gap-4 selected-types">
                  {selectedTypes.map((type, index) => (
                    <div className="relative input-borders border-green-400">
                      <h2
                        key={index}
                        className="type-item"
                        onClick={() => handleRemoveType(type)}
                      >
                        {type}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="px-8 py-1 mb-4 input-borders btn-active bg-blue-800 bg-opacity-70 text-black flex self-end"
                type="submit"
              >
                Search
              </button>
              <style jsx>{`
                .type-item {
                  cursor: pointer;
                  transition: color 0.3s ease;
                }
                .type-item:hover {
                  color: red;
                }
              `}</style>
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
