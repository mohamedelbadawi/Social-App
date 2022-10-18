const db = require('./database');
const express = require('express');
const bodyParser = require("body-parser");
const authRoutes = require('../Auth/AuthRoutes');
const userRoutes = require('../user/UserRoutes');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = new express();

dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(userRoutes);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});