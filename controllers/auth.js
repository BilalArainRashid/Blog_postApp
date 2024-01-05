// import database

import { db } from "../db.js";

// import bcrypt

import bcrypt from "bcryptjs";

// import jsonwebtoken

import jwt from "jsonwebtoken";

// create a new user

export const register = (req, res) => {
  const q = "SELECT * FROM user WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.lenght) return res.status(409).json("User already exists");

    // hash password

    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO user ('username', 'password' , 'email') VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Account has been created Successfully...");
    });
  });
};

// login user

export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.lenght === 0) return res.status(404).json("User Not found");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true
    })
    .status(200)
    .json("User has been logged out.");
};
