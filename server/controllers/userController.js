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

exports.requestAdminAccess = async (req, res) => {
  const { uid, email } = req.body;

  try {
    const requestRef = db.collection("adminRequests").doc(uid);
    const existingRequest = await requestRef.get();

    if (existingRequest.exists && existingRequest.data().status === "pending") {
      return res.status(400).json({ message: "Request already pending" });
    }

    await requestRef.set({
      uid,
      email,
      timestamp: new Date().toISOString(),
      status: "pending"
    });

    res.status(200).json({ message: "Admin request submitted" });
  } catch (error) {
    console.error("Error submitting admin request:", error);
    res.status(500).json({ error: "Failed to submit request" });
  }
};

exports.getAdminRequests = async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists || userDoc.data().role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const requestsSnapshot = await db.collection("adminRequests").get();
    const requests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching admin requests:", error);
    res.status(500).json({ error: "Failed to fetch admin requests" });
  }
};

exports.updateAdminRequestsStatus = async (req, res) => {
  const { reqId } = req.params;
  const { status } = req.body;
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ message: 'UID is required' });
  }

  const userDoc = await db.collection("users").doc(uid).get();

  if (!userDoc.exists || userDoc.data().role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
  }

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Check if the user is an admin
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists || userDoc.data().role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const reqRef = db.collection('adminRequests').doc(reqId);
    const requestDoc = await reqRef.get();

    if (!requestDoc.exists) {
      return res.status(404).json({ message: 'Admin request not found' });
    }

    await reqRef.update({ status });

    // If approved, update the user's role
    if (status === 'approved') {
      const { uid: targetUid, email } = requestDoc.data();
      const userRef = db.collection('users').doc(targetUid);

      await userRef.set(
        {
          email,
          role: 'admin'
        },
        { merge: true }
      );
    }

    res.status(200).json({ message: 'Admin request status updated' });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


