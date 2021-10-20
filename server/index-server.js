const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "contact_db",
});

app.use(urlencoded({ extended: true }));

app.post("/create", (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const location = req.body.location;
  const registeredDate = req.body.registeredDate;

  db.query(
    "INSERT INTO contact (fullName, email, contactNumber, location, registeredDate) VALUES (?,?,?,?,?)",
    [fullName, email, contactNumber, location, registeredDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inputted");
      }
    }
  );
});

app.get("/contacts", (req, res) => {
  const sqldisplay = "SELECT * FROM contact";
  db.query(sqldisplay, (err, result) => {
    res.send(result);
  });
});

app.get("/viewContact/:id", (req, res) => {
  const conid = req.params.id;
  const displayContact = "SELECT * FROM contact WHERE id = ?";
  db.query(displayContact, conid, (err, result) => {
    res.send(result);
  });
});

app.delete("/deleteContact/:deleteId", (req, res) => {
  const delId = req.params.deleteId;
  const deleteContactData = "DELETE FROM contact WHERE id = ?";
  db.query(deleteContactData, delId, (err, result) => {});
});

app.get("/selectUpdateContact/:updateId", (req, res) => {
  const conid = req.params.contactId;
  const displayContact = "SELECT * FROM contact WHERE id = ?";
  db.query(displayContact, conid, (err, result) => {
    res.send(result);
  });
});

app.put("/updateContact", (req, res) => {
  const updateId = req.body.id;
  const updateName = req.body.fullName;
  const updateEmail = req.body.email;
  const updateContact = req.body.contactNumber;
  const updateLocation = req.body.location;
  const updateDate = req.body.registeredDate;
  const updateContactData =
    "UPDATE contact SET fullName = ?, email = ?, contactNumber = ?, location = ?, registeredDate = ? WHERE id = ?";
  db.query(
    updateContactData,
    [
      updateName,
      updateEmail,
      updateContact,
      updateLocation,
      updateDate,
      updateId,
    ],
    (err, result) => {}
  );
});

app.listen(3001, () => {
  console.log("port 3001");
});
