// server/services/resendService.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendNewsletterEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: 'Test Sender <sender@resend.dev>', // Any name + test domain
      to, // e.g., ['naomi@resend.dev']
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.error('Resend email error:', error);
    throw error;
  }
};

module.exports = { sendNewsletterEmail };
