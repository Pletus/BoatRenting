import React from "react";

function Booking({ boats }) {
  console.log(boats)
  return (
    <div>
      <h1>Selected Boats</h1>
      {boats.length > 0 ? (
        <ul>
          {boats.map((boat, index) => (
            <li key={index}>{boat.type}</li>
          ))}
        </ul>
      ) : (
        <p>No boats selected yet.</p>
      )}
    </div>
  );
}

export default Booking;
