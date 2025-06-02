// controllers/subscribeController.js
const { db } = require("../config/firebase");

const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const docRef = db.collection("subscriptions").doc(email);
    const doc = await docRef.get();

    if (doc.exists) {
      return res.status(400).json({ error: "This email is already subscribed" });
    }

    await docRef.set({
      email,
      subscribedAt: new Date(),
    });

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
};

const unsubscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const docRef = db.collection("subscriptions").doc(email);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(400).json({ error: "This email is not subscribed" });
    }

    await docRef.delete();
    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ error: "Failed to unsubscribe" });
  }
};

const getSubscribers = async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists || userDoc.data().role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const snapshot = await db.collection("subscriptions").get();
    const subscribers = snapshot.docs.map(doc => doc.data());

    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
};

module.exports = {
  subscribeUser,
  unsubscribeUser,
  getSubscribers,
};
