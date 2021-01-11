// write the server here and export it
const express = require("express"); // CommonJS
// import express from 'express'
const User = require("./user-data.js");
const server = express(); // instantiates an express app

server.use(express.json()); // configures the app to read the body of requests

server.get("/api/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved.",
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  // 1- pull info from request
  const { id } = req.params;
  // 2- interact with the database
  User.findById(id)
    .then((user) => {
      // 3- send the client appropriate response
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.delete(id)
    .then((deleted) => {
      if (!deleted) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(deleted);
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.post("/api/users", async (req, res) => {
  // 1- pull info from request and validating a bit
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    // 2- interact with the database
    try {
      const newlyCreatedUser = await User.create(user);
      // 3- send the client appropriate response
      res.status(201).json(newlyCreatedUser);
    } catch (error) {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
});

server.put("/api/users/:id", async (req, res) => {
  // 1- pull info from request and validating a bit
  const id = req.params.id;
  const changes = req.body;
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      // 2- interact with the database
      const updated = await User.update(id, changes);
      if (!updated) {
        // 3- send the client appropriate response
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(updated);
      }
    } catch (error) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    }
  }
});

module.exports = server;
