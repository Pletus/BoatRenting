import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoMailOpenOutline,
} from "react-icons/io5";
import "../App.css";
import logo from "../assets/sailCompassLogo.png";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import youtube from "../assets/youtube.svg";

function Layout({
  setBoats,
  boats,
  dateRange,
  setDateRange,
  selectedLocation,
  setSelectedLocation,
}) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    event.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

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

    try {
      const response = await searchBoats(selectedTypes, selectedLocation);
      setBoats(response);
      navigate("/booking");
      setIsFormVisible(false);
      setIsMenuOpen(false);
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
        locations: locations,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <nav className="nav py-11 top-0 flex lg:grid lg:grid-cols-3 h-20 complex-shadow justify-between items-center lg:justify-items-center lg:content-center px-2 md:px-8 text-white w-full text-xl relative">
        <button onClick={handleMenuToggle} className="lg:hidden text-3xl ml-2">
          {isMenuOpen ? (
            <IoCloseOutline size={24} />
          ) : (
            <IoMenuOutline size={24} />
          )}
        </button>
        <div className="flex justify-self-start place-items-center">
          <ul
            className={`flex flex-col md:flex-row lg:flex-row text-white lg:items-center transition-transform transform bg-opacity-90 md:gap-14 ${
              isMenuOpen
                ? "max-h-auto p-4 nav2 w-full absolute top-20 left-0 nav opacity-100 gap-2 md:gap-4 md:items-center md:pl-16"
                : "max-h-0 opacity-0"
            } overflow-hidden lg:overflow-visible lg:opacity-100 lg:max-h-full lg:bg-transparent w-full lg:w-auto`}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-500" : "text-white"
                  } transform transition-transform duration-200 flex md:hover:scale-125`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <a href="#vessels">Vessels</a>
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
            <li>
              <a href="#services">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex-grow justify-center items-center">
          <img className="inline-block w-40 h-40 mt-2" src={logo} alt="Logo" />
        </div>
        <div className="flex gap-1 md:gap-8 justify-self-end">
          <a href="https://www.linkedin.com/in/yagopb/">
            <img
              src={instagram}
              className="w-12 h-12 transform transition-transform duration-200 md:hover:scale-125"
              alt="instragram"
            />
          </a>
          <a href="https://github.com/pletus">
            <img
              src={facebook}
              className="w-12 h-12 transform transition-transform duration-200 md:hover:scale-125"
              alt="facebook"
            />
          </a>
          <a href="https://www.youtube.com/watch?v=ObagRWhqBj0&ab_channel=ScenicMusic">
            <img
              src={youtube}
              className="w-12 h-12 transform transition-transform duration-200 md:hover:scale-125"
              alt="youtube"
            />
          </a>
        </div>
        {isFormVisible && (
          <div
            id="bookingForm"
            className="absolute top-20 md:left-24 mt-6 pt-12 px-10 bg-white text-black p-4 input-borders complex-shadow"
            style={{ zIndex: 100 }}
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
            <h4 className="tc font-semibold max-w-96 pl-3 mb-6 text-base leading-loose">
              Choose a port, select your dates, pick the perfect boat model, and
              embark on your unforgettable adventure. Enjoy a seamless booking
              experience and set sail with ease!
            </h4>
            <form
              className="flex flex-col justify-center items-center gap-10"
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
                  type="button"
                >
                  Choose the type of vessel
                </button>
                {isOpen && (
                  <div className="dropdown-content flex flex-col md:flex-row">
                    <div>
                      <label className="tc font-semibold" htmlFor="Boat">
                        Boat
                      </label>
                      <input
                        type="checkbox"
                        id="Boat"
                        value="Boat"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("Boat")}
                      />
                    </div>
                    <div>
                      <label className="tc font-semibold" htmlFor="Catamaran">
                        Catamaran
                      </label>
                      <input
                        type="checkbox"
                        id="Catamaran"
                        value="Catamaran"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("Catamaran")}
                      />
                    </div>
                    <div>
                      <label className="tc font-semibold" htmlFor="Frigate">
                        Frigate
                      </label>
                      <input
                        type="checkbox"
                        id="Frigate"
                        value="Frigate"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("Frigate")}
                      />
                    </div>
                    <div>
                      <label
                        className="tc font-semibold"
                        htmlFor="Sailing Vessel"
                      >
                        Vessel
                      </label>
                      <input
                        type="checkbox"
                        id="Sailing vessel"
                        value="Sailing vessel"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("Sailing vessel")}
                      />
                    </div>
                    <div>
                      <label className="tc font-semibold" htmlFor="Yacht">
                        Yacht
                      </label>
                      <input
                        type="checkbox"
                        id="Yacht"
                        value="Yacht"
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes("Yacht")}
                      />
                    </div>
                  </div>
                )}
                <div className="flex mt-4 text-center flex-wrap gap-4 selected-types">
                  {selectedTypes.map((type, index) => (
                    <div className="relative input-borders border-green-400">
                      <h2
                        key={index}
                        className="type-item p-1"
                        onClick={() => handleRemoveType(type)}
                      >
                        {type}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="px-8 btn-accent btn-bgc py-1 mb-4 input-borders btn text-black flex self-end"
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
      <main className="min-h-lvh">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;
