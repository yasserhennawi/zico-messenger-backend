import { Message } from "../models";
export const getMyMessages = async (id) => {
  const sentMessages = await Message.find({ senderId: id });
  const receivedMessages = await Message.find({ receiverId: id });
  const messages = [].concat(sentMessages, receivedMessages);
  return messages
}

export const getMessageBetweenUsers = async ( userId, friendId) => {
  const sentMessages = await Message.find({ senderId: userId, receiverId: friendId });
  const receivedMessages = await Message.find({ receiverId: friendId, senderId: userId });
  const messages = [].concat(sentMessages, receivedMessages);
  return messages;
};

export const findById = async (req, res) => {
  try {
    const friendId = req.params.id;
    const messages = await getMessageBetweenUsers(req.userId, friendId);
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

export const send = async (req, res) => {
  try {
    const senderId = req.userId;
    const { body, id: receiverId } = req.body;
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
