const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(bodyParser.json());

// API endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'To, subject, and text are required in the request.' });
  }

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'probity.devv@gmail.com',
      pass: 'zidbmxtmnfhtjxnr',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'dev.nirajpatil@gmail.com',
    to,
    subject,
    text,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return res.json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error.toString());
    return res.status(500).json({ error: 'Error sending email.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
