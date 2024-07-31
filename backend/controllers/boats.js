const { pool } = require("../connect.js");

const getAllBoats = (req, res) => {
  pool.query("SELECT * FROM boats", (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
};

const getOneBoat = (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM boats WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results) {
      res.status(200).json(results.rows);
    }
  });
};

const searchBoats = async (req, res) => {
  const { type, locations } = req.body;

  // Asegúrate de que type y locations sean arrays
  const typeArray = Array.isArray(type) ? type : [type];
  const locationArray = Array.isArray(locations) ? locations : [locations];

  console.log("Search parameters:", { typeArray, locationArray });

  const query = `
    SELECT * FROM boats
    WHERE
      (type = ANY($1::text[])) AND
      (locations && $2::text[]);
  `;

  const values = [typeArray, locationArray];

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error searching boats by type:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllBoats,
  getOneBoat,
  searchBoats,
};
