const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchemas");

const User = mongoose.model("ASSIGNMENT", userSchema);

module.exports = User;