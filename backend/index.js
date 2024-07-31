const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { getPgVersion, pool } = require("./connect.js");

const PORT = process.env.PGPORT || 8000;

const {
  getAllBoats,
  getOneBoat,
  searchBoats,
} = require("./controllers/boats.js");

async function testDbConnection() {
  try {
    await getPgVersion();
  } catch (error) {
    console.error("Failed to get PostgreSQL version:", error);
  }
}

getPgVersion();
app.use(express.json());
app.use(cors())

app.route("/boats").get(getAllBoats).post(searchBoats);
app.route("/boats/:id").get(getOneBoat);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
