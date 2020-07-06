import { Message } from "../models";

export const findAll = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id: ", id)
    const sentMessages = await Message.find({ senderId: id });
    console.log("sentMessages: ", JSON.stringify(sentMessages))
    const receivedMessages = await Message.find({ receiverId: id });
    console.log("receivedMessages: ", JSON.stringify(receivedMessages))
    const messages = [].concat(sentMessages, receivedMessages);
    res.send(JSON.stringify(messages));
  } catch (err) {
    res.status(500).send(err);
  }
};

export const save = async (req, res) => {
  try {
    const { body, senderId, receiverId } = req.body;
    const message = new Message({
      body,
      senderId,
      receiverId,
    });
    await message.save();
    res.send(message);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await Message.findByIdAndDelete({ _id: id });

    if (!message) res.status(404).send("No message found");
    res.status(200).send(message);
  } catch (err) {
    res.status(500).send(err);
  }
};
