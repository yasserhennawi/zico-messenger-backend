import mongoose from "mongoose";
import { getMyMessages } from "./message";
import { User } from "../models";

const getUserShownData = (user) => ({
  name: user.name,
  id: user._id,
  image: user.image,
  phoneNumber: user.phoneNumber,
  email: user.email,
})

export const findAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(JSON.stringify(users.map(user => getUserShownData(user))));
  } catch (err) {
    res.status(500).send(err);
  }
};

export const findByIdHandler = async (id) => {
  const user = await User.findById(id);
  return getUserShownData(user);
};

export const findById = async (req, res) => {
  try {
    const user = await findByIdHandler(req.body.id);
    if (!user) res.status(404).send("No user found");
    res.send(JSON.stringify(user));
  } catch (err) {
    res.status(500).send(err);
  }
};

export const findRecent = async (req, res) => {
  try {
    const id = req.userId;
    console.log("id: ", id)
    // const user = await User.findById(id);
    const allMessages = await getMyMessages(id);
    const recentMessage = {};
    allMessages.forEach((message) => {
      const newId =
        message.senderId === id ? message.receiverId : message.senderId;
      if (recentMessage[newId]) {
        const messageDate = new Date(message.time);
        const recentMessageDate = new Date(recentMessage[newId].time);
        if (messageDate.getTime() > recentMessageDate.getTime()) {
          recentMessage[newId] = message;
        }
      } else {
        recentMessage[newId] = message;
      }
    });
    const recentUsers = await User.find({
      _id: {
        $in: Object.keys(recentMessage).map((userId) =>
          mongoose.Types.ObjectId(userId)
        ),
      },
    });

    const response = recentUsers.map((recentUser) => ({
      ...recentUser._doc,
      lastMessage: recentMessage[recentUser._id],
    }));

    res.send(JSON.stringify(response));
  } catch (err) {
    console.log("err: ", err);
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
