import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import user from "../assets/user-solid.svg";
import mail from "../assets/envelope.svg";
import phone from "../assets/phone.svg";
import paragraph from "../assets/paragraph.svg";

function OneBoat({ dateRange, selectedLocation }) {
  const { id } = useParams();
  const [boat, setBoat] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  console.log(dateRange);
  console.log(getDaysInRange(dateRange));

  function getDaysInRange(dateRange) {
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    const diffInMs = endDate - startDate;

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    // const plusPrice = diffInDays * boat[0].price;

    return diffInDays;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formDataInstance = new FormData(formElement);

    formDataInstance.append(
      "access_key",
      "35e8db4e-05e1-4283-8202-21162477206f"
    );

    const object = Object.fromEntries(formDataInstance);

    object.selectedLocation = selectedLocation;
    object.dateRangeStart = dateRange.start;
    object.dateRangeEnd = dateRange.end;
    object.finalPrice = boat[0].price * getDaysInRange(dateRange);
    object.boatType = boat[0].type;

    const json = JSON.stringify(object);

    console.log("Submitting the following data:", object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "I have received an email with all your travel information. We will get back to you soon with the confirmation! Thank you!",
          icon: "success",
        });
        formElement.reset();
      } else {
        console.error("Error", result);
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("Data:", formData);

    setFormData({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });

    setShowForm(false);

    alert(
      `¡Thanks!, ${formData.name}! We sent you an email ${formData.email}.`
    );
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex flex-col">
      <div className="p-4 md:px-24 gap-4 md:gap-12 flex flex-col lg:flex-row items-start md:py-12 py-6">
        <img
          src={boat[0].imagen}
          className="md:max-w-lg input-borders complex-shadow"
        />
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
          <p className="mb-6 mt-4 pl-2 text-lg text-gray-700">
            {boat[0].description}
          </p>
          <div className="bg-white rounded-lg p-4 shadow-md mb-4 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Boat Details
            </h3>
            <div className="flex flex-col">
              <p className="text-gray-800">
                <strong>Horsepower:</strong> {boat[0].potencia || 50}
              </p>
              <p className="text-gray-800">
                <strong>Meters of Length:</strong> {boat[0].size}
              </p>
              <p className="text-gray-800">
                <strong>Maximum Number of Passengers:</strong> {boat[0].plazas}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md mb-4 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Booking Details
            </h3>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <p className="text-gray-800">
                <strong>Location: </strong>
                <span className="text-gray-700 text-lg">{selectedLocation}</span>
              </p>
              <p className="text-gray-800 flex flex-row gap-1">
                <strong>from: </strong>{" "}
                <span className="text-gray-700 text-lg">{dateRange.start}</span>{" "}
                <br />
                <br />{" "}
                <strong>till </strong>{" "}
                <span className="text-gray-700 text-lg">{dateRange.end}</span>
              </p>
              <p className="text-gray-800">
                <strong>Final Price:</strong>{" "}
                <span className="text-gray-700 text-lg">{boat[0].price * getDaysInRange(dateRange)} €</span>
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary mt-2 bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors shadow-md"
            onClick={() => setShowForm(true)}
          >
            Rent this Boat
          </button>
        </div>
      </div>
      {showForm && (
        <form
          onSubmit={onSubmit}
          className="p-6 flex flex-wrap items-center justify-center gap-6  bg-gray-100 shadow-lg rounded-md"
        >
          <h2 className="text-2xl w-full text-center font-bold text-blue-700 drop-shadow-xl mb-4">
            Payment
          </h2>
          <p className="text-xl w-full text-center font-semibold text-blue-700 mb-4">
            Enter your data and we will send you an email with the confirmation
            of your trip.
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="name" className="font-medium whitespace-nowrap">
              Full Name *
            </label>
            <div className="input-group flex items-center gap-2">
              <input
                type="text"
                name="name"
                className="field p-2 border rounded w-40"
                placeholder="Your Full Name"
                required
              />
              <img src={user} alt="user icon" className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="email" className="font-medium whitespace-nowrap">
              Email Address *
            </label>
            <div className="input-group flex items-center gap-2">
              <input
                type="email"
                name="email"
                className="field p-2 border rounded w-40"
                placeholder="you@example.com"
                required
              />
              <img src={mail} alt="mail icon" className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="card-number"
              className="font-medium whitespace-nowrap"
            >
              Card Number *
            </label>
            <div className="input-group flex items-center gap-2">
              <input
                type="tel"
                name="card-number"
                className="field p-2 border rounded w-40"
                placeholder="1234 5678 9012 3456"
                required
              />
              <img src={phone} alt="phone icon" className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold text-blue-700 whitespace-nowrap">
              Contact Preference
            </h3>
            <label className="flex items-center gap-2">
              <input
                className="custom-checkbox"
                name="democheckbox"
                type="checkbox"
                value="email"
              />
              <span>Reply by email</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                className="custom-checkbox"
                name="democheckbox"
                type="checkbox"
                value="phone"
              />
              <span>Reply by phone</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="message" className="font-medium whitespace-nowrap">
              Message
            </label>
            <div className="input-group flex items-center gap-2">
              <textarea
                name="message"
                className="field p-2 border rounded w-60"
                placeholder="optional"
                required
              ></textarea>
              <img src={paragraph} alt="paragraph icon" className="w-6 h-6" />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default OneBoat;
