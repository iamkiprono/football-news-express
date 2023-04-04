require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5174/" || "https://full-time-360.netlify.app/",
  })
);

const connection = mysql
  .createConnection(
    `mysql://wpcemnt3x2xqwddss8wh:pscale_pw_8M3702RzJxk2rj9wnblKEXqbQG16qc2p4Dk1NerzkBJ@aws.connect.psdb.cloud/football?ssl={"rejectUnauthorized":true}`
  )
  .promise();
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
//
app.post("/news", async (req, res) => {
  const { id, news, details, image, category } = req.body;
  const q = `INSERT INTO Persons(id, news, details, image, category) VALUES('${id}', '${news}', '${details}', '${image}', '${category}')`;

  try {
    await connection.query(q);
    res.json(`Added ${news}`);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/news/:id", async (req, res) => {
  const { id } = req.params;
  const q = `DELETE FROM Persons WHERE id = ?`;
  try {
    await connection.query(q, [id]);
    res.json(`${id} deleted`);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Listening on 3001");
});
