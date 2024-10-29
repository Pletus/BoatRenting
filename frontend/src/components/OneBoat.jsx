import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import user from "../assets/user-solid.svg";
import mail from "../assets/envelope.svg";
import phone from "../assets/phone.svg";
import paragraph from "../assets/paragraph.svg";
import Form from "./Form";

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
          text: "Message submitted successfully!",
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
    <div className="hero bg-base-200 min-h-screen flex flex-col p-4">
      <div className="hero-content md:gap-24 flex-col lg:flex-row">
        <img
          src={boat[0].imagen}
          className="md:max-w-lg input-borders complex-shadow"
        />
        <div className="p-12">
          <h1 className="text-5xl font-bold mt-2 ml-2">{boat[0].type}</h1>
          <p className="py-6">{boat[0].description}</p>
          <p className="text-2xl font-bold mt-2">{selectedLocation}</p>
          <p className="text-xl font-bold mt-2">
            from {dateRange.start} till {dateRange.end}
          </p>
          <button
            className="btn btn-primary ml-2 mt-4 complex-shadow"
            onClick={() => setShowForm(true)}
          >
            Rent this boat
          </button>
        </div>
      </div>
      {showForm && (
        <form onSubmit={onSubmit} className="mx-6">
          <h2 className="pb-2 text-blue-500 font-bold drop-shadow-xl">
            Contact Form
          </h2>
          <div className="input-box">
            <label htmlFor="name">Full Name *</label>
            <div className="input-group">
              <input
                type="text"
                name="name"
                className="field"
                placeholder=""
                required
              />
              <img src={user} alt="" className="w-8 h-8 pt-4" />
            </div>
          </div>
          <div className="input-box flex flex-cols-2 gap-4">
            <div className="w-2/3 ">
              <label className="flex" htmlFor="email">
                Email Address *
              </label>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  className="field flex"
                  placeholder=""
                  required
                />
                <img src={mail} alt="" className="w-8 h-8 pt-4" />
              </div>
            </div>
            <div className="w-1/3">
              <label htmlFor="phone">Phone</label>
              <div className="input-group">
                <input
                  type="tel"
                  name=""
                  className="field "
                  placeholder=""
                  required
                />
                <img src={phone} alt="" className="w-8 h-8 pt-4" />
              </div>
            </div>
          </div>
          <h1 className=" flex justify-start mt-6 font-f p-0 text-blue-700">
            Contact preference
          </h1>
          <div className="flex gap-10">
            <div>
              <input
                className="custom-checkbox"
                name="democheckbox"
                type="checkbox"
                value="email"
              />
              <span className="font-f check-text"> Reply by email </span>
            </div>
            <div>
              <input
                className="custom-checkbox"
                name="democheckbox"
                type="checkbox"
                value="Phone"
              />
              <span className=" font-f check-text"> Reply by phone </span>
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="message">Your Message *</label>
            <div className="input-group">
              <textarea
                name="message"
                className="field message font-f"
                placeholder=""
                required
              ></textarea>
              <img src={paragraph} alt="" className="w-8 h-8 pt-4" />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default OneBoat;
