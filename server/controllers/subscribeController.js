// controllers/subscribeController.js
const { db } = require("../config/firebase");
const { sendNewsletterEmail } = require("../services/resendService");

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

const sendNewsLetterEmail = async (req, res) => {
  try {
    await sendNewsletterEmail({
      to: ['Test Recipient <recipient@resend.dev>'], // Only works with .resend.dev
      subject: 'Weekly Highlights Test',
      html: '<h1>This is a test newsletter.</h1><p>Posts will go here...</p>',
    });
    res.status(200).json({ message: 'Test email sent via Resend.dev' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to send test email' });
  }
};

const sendWeeklyNewsletter = async (req, res) => {
  try {
    // 1. Get date range: last 7 days
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    // 2. Fetch posts from Firestore
    const snapshot = await db.collection('posts')
      .where('status', '==', 'approved')
      .where('createdAt', '>=', lastWeek)
      .get();

    const posts = snapshot.docs.map(doc => ({
      id: doc.id,          
      ...doc.data(),   
    }));

    if (!posts.length) {
      return res.status(200).json({ message: "No new posts this week" });
    }

    // 3. Generate HTML content
    const html = `
      <h2>Weekly Highlights</h2>
      ${posts.map(post => `
        <div style="margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px; padding: 10px;">
          <h3 style="margin-top: 0px;">${post.title}</h3>
          <p>${post.description?.slice(0, 1000)}...</p>
          <a 
            href="${process.env.APP_URL}/to-share?highlight=${post.id}" 
            target="_blank" 
            style="color: #2a7f62; text-decoration: underline;">
            View this post
          </a>
        </div>
      `).join("")}
    `;

    // 4. Fetch subscribers
    const subsSnap = await db.collection("subscriptions").get();
    const recipients = subsSnap.docs.map(doc => doc.id); // email is doc ID

    if (!recipients.length) {
      return res.status(200).json({ message: "No subscribers to send to" });
    }
    
    // 5. Send email
    await sendNewsletterEmail({
      to: ['Test Recipient <recipient@resend.dev>'],
      subject: "Your Weekly Sibling Grief Digest",
      html,
    });

    res.status(200).json({ message: "Newsletter sent", recipientsCount: recipients.length });
  } catch (error) {
    console.error("Weekly newsletter error:", error);
    res.status(500).json({ error: "Failed to send newsletter" });
  }
};

module.exports = {
  subscribeUser,
  unsubscribeUser,
  getSubscribers,
  sendNewsLetterEmail,
  sendWeeklyNewsletter,
};
