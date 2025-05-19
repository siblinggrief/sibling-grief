const { db } = require("../config/firebase");

exports.getUserRole = async (req, res) => {
  const { uid } = req.query;
  try {
    const userDoc = await db.collection("users").doc(uid).get();
    const role = userDoc.exists ? userDoc.data().role : "user";
    res.json({ role });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({ error: "Failed to fetch role" });
  }
};
