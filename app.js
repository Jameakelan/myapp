const express = require("express");
const app = express();

// sample data
const data = [
  {
    id: 1,
    name: "John",
    age: 30,
    city: "New York",
  },
  {
    id: 2,
    name: "Jane",
    age: 25,
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Bob",
    age: 40,
    city: "Chicago",
  },
];

app.get("/", (req, res) => {
  res.json({ data });
});

// GET method to retrieve all data
app.get("/api/data", (req, res) => {
  res.json({ data });
});

// GET method to retrieve data by id
app.get("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = data.find((d) => d.id === id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

// POST method to add data
app.post("/api/data", (req, res) => {
  const new_data = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
  };
  data.push(new_data);
  res.json(new_data);
});

// PUT method to update data by id
app.put("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = data.find((d) => d.id === id);
  if (result) {
    result.name = req.body.name;
    result.age = req.body.age;
    result.city = req.body.city;
    res.json(result);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

// DELETE method to delete data by id
app.delete("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = data.find((d) => d.id === id);
  if (result) {
    const index = data.indexOf(result);
    data.splice(index, 1);
    res.json({ result: true });
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
