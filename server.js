require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const app = express();


const connection = mysql.createConnection(process.env.DATABASE_URL).promise();
app.use(express.json());
app.get("/", async (req, res) => {
  try {
    const results = await connection.query("select * from Persons");
    res.json(results[0]);
  } catch (err) {
    if (err) {
      res.send("Cannot find");
    }
  }
});

app.post("/news", async (req, res) => {
  const { id, news, details, image, category } = req.body;
  const q = `INSERT INTO Persons(id, news, details, image, category) VALUES('${id}', '${news}', '${details}', '${image}', '${category}')`;
 
  try {
    await connection.query(q);
    res.json("Added");
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("3001");
});
