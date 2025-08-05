// server/controllers/settingsController.js
const { db } = require('../config/firebase'); // your Firestore init

exports.getFont = async (req, res) => {
  try {
    const docRef = db.collection('settings').doc('siteConfig');
    const docSnap = await docRef.get();
    if (!docSnap.exists) return res.status(404).json({ font: 'Libre+Baskerville' });
    res.json({ font: docSnap.data().font });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFont = async (req, res) => {
  try {
    const { font } = req.body;
    await db.collection('settings').doc('siteConfig').set({ font }, { merge: true });
    res.json({ success: true, font });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
