import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Booking from "./components/Booking";
import "./App.css";

function App() {
  const [boats, setBoats] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Layout setBoats={setBoats} boats={boats} />}>
        <Route index element={<Main />} />
        <Route path="/booking" element={<Booking boats={boats} />} />
      </Route>
    </Routes>
  );
}

export default App;
