const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
  service: 'your-email-service', 
  auth: {
    user: 'shivanithoke3108@gmail.com',
    pass: 'your-email-password',
  },
});

app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;

    // Generate the Statement of Purpose (SOP)
    const sopText = `
      Dear ${formData.fullName},
      
      Here is your customized Statement of Purpose (SOP):
      
      Highest Level of Education: ${formData.highestEducation}
      Institute where you completed your highest level of education: ${formData.institute}
      What did you study: ${formData.fieldOfStudy}
      // ... (all your form fields)
      Your future goals: ${formData.futureGoals}
      
      Thank you for using our SOP Generation Tool!
      
      Sincerely,
      Your Name
    `;

    // Configure email data
    const mailOptions = {
      from: 'shivanithoke3108@gmail.com',
      to: formData.email,
      subject: 'Your Customized SOP',
      text: sopText,
    };

    // Send the email
    await transporter.sendMail(mailOptions);


    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
