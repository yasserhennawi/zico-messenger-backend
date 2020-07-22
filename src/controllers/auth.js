import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { user as userController } from "../controllers";
import { secret } from "../config";

const key = secret.SECRET_KEY;

export const register = (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    password: rawPassword,
    image,
  } = req.body;
  var password = bcrypt.hashSync(rawPassword, 8);

  const newUser = new User({
    name,
    image,
    phoneNumber,
    email,
    password,
  });

  User.create(newUser, async (err, { _id: id }) => {
    if (err)
      return res
        .status(500)
        .send(
          "There was a problem registering the user." + JSON.stringify(err)
        );
    // create a token
    var token = jwt.sign({ id }, key, {
      expiresIn: 86400, // expires in 24 hours
    });
    const user = await userController.findByIdHandler(id);

    res.status(200).send({ auth: true, token, user });
  });
};
export const me = async (req, res) => {
  var token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, key, async function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    const id = decoded.id;
    const me = await userController.findByIdHandler(id);

    if (!me) res.status(404).send("No user found");
    res.send(JSON.stringify(me));
  });
};

export const login = async (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, key, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token, user });
  });
};

export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, key, function (err, decoded) {
    if (err)
      return res
        .send({ auth: false, message: "Failed to authenticate token." })
        .status(500);

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    console.log("decoded.id: ", decoded.id);
    next();
  });
};
