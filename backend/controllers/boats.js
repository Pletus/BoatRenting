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
  
module.exports = {
    getAllBoats,
    getOneBoat,
  };
