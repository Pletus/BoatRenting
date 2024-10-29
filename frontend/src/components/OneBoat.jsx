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

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    formData.append("access_key", "35e8db4e-05e1-4283-8202-21162477206f");

    const object = Object.fromEntries(formData);
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
          title: "Sucess!",
          text: "I have received an email with all your travel information. We will get back to you soon with the confirmation! Thank you!",
          icon: "success",
        });
        form.reset();
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
      <div className="hero-content md:gap-24 flex flex-col lg:flex-row items-start py-12">
        <img
          src={boat[0].imagen}
          className="md:max-w-lg input-borders complex-shadow"
        />
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
          <p className="mb-6 pl-2 text-lg text-gray-700">
            {boat[0].description}
          </p>
          <div className="bg-white rounded-lg p-6 shadow-md mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Boat Details
            </h3>
            <div className="flex flex-col">
              <p className="text-gray-800">
                <strong>Horsepower:</strong> {boat[0].potencia}
              </p>
              <p className="text-gray-800">
                <strong>Meters of Length:</strong> {boat[0].size}
              </p>
              <p className="text-gray-800">
                <strong>Maximum Number of Passengers:</strong> {boat[0].plazas}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Location Details
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              Location:{" "}
              <span className="text-blue-600">{selectedLocation}</span>
            </p>
            <p className="text-xl font-bold text-gray-800">
              From: <span className="text-blue-600">{dateRange.start}</span>{" "}
              till <span className="text-blue-600">{dateRange.end}</span>
            </p>
          </div>
          <button
            className="btn btn-primary mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors shadow-md"
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
          <h2 className="text-2xl w-full text-center text-blue-500 font-bold drop-shadow-xl mb-4">
            Payment
          </h2>
          <p className="text-xl w-full text-center text-blue-500 font-semibold drop-shadow-xl mb-4">
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
