import { User } from "../models";

export const findAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(JSON.stringify(users));
  } catch (err) {
    res.status(500).send(err);
  }
};

export const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    
    if (!user) res.status(404).send("No user found");
    res.send(JSON.stringify(user));
  } catch (err) {
    res.status(500).send(err);
  }
};

export const save = async (req, res) => {
  try {
    const { name, image, phoneNumber, email, password } = req.body;
    const newUser = new User({
      name,
      image,
      phoneNumber,
      email,
      password,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) res.status(404).send("No user found");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
