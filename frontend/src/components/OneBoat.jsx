import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OneBoat({ dateRange, selectedLocation }) {
  const { id } = useParams();
  const [boat, setBoat] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: ''
  });

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
      name: '',
      lastName: '',
      email: '',
      phone: ''
    });

    setShowForm(false);

    alert(`¡Thanks!, ${formData.name}! We sent you an email ${formData.email}.`);
  };

  return (
    <div className="hero bg-base-200 min-h-screen p-4">
      <div className="hero-content md:gap-24 flex-col lg:flex-row">
        <img src={boat[0].imagen} className="md:max-w-lg input-borders complex-shadow" />
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

          {showForm && (
            <form onSubmit={handleFormSubmit} className="mt-8 bg-blue-700 bg-opacity-40 p-6">
              <h2 className="text-2xl font-bold mb-4">Rellena tus datos para alquilar:</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="phone">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneBoat;
