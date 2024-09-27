import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Booking from "./components/Booking";
import "./App.css";

function App() {
  const [boats, setBoats] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            setBoats={setBoats}
            boats={boats}
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        }
      >
        <Route index element={<Main />} />
        <Route path="/booking" element={<Booking boats={boats} />} />
      </Route>
    </Routes>
  );
}

export default App;
