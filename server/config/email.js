const Brevo = require('@getbrevo/brevo');

// Brevo API Client Setup
const defaultClient = Brevo.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; // Render Variables me 'BREVO_API_KEY' naam se key daal dena

const apiInstance = new Brevo.TransactionalEmailsApi();

// 1. Email Verification Function
const sendVerificationEmail = async (email, name, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = 'Verify your TableToken account';
  sendSmtpEmail.sender = { 
    name: "TableToken", 
    email: process.env.EMAIL_FROM // Yeh email Brevo dashboard me verified hona chahiye
  };
  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
      <div style="background: #111827; padding: 28px 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px;">🍽️ TableToken</h1>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #111827;">Hi ${name}! 👋</h2>
        <p style="color: #6b7280; line-height: 1.6;">Please verify your email to activate your account.</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${verifyUrl}" style="background: #e63946; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 600;">
            ✅ Verify Email Address
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">Link expires in 24 hours.</p>
      </div>
    </div>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Brevo API Error (Verification):", error);
    throw error;
  }
};

// 2. Forgot Password Function
const sendForgotPasswordEmail = async (email, name, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = 'Reset your TableToken password';
  sendSmtpEmail.sender = { 
    name: "TableToken", 
    email: process.env.EMAIL_FROM 
  };
  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
      <div style="background: #111827; padding: 28px 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px;">🍽️ TableToken</h1>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #111827;">Hi ${name}! 👋</h2>
        <p style="color: #6b7280; line-height: 1.6;">Click below to reset your password. Link expires in 1 hour.</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${resetUrl}" style="background: #e63946; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 600;">
            🔑 Reset Password
          </a>
        </div>
      </div>
    </div>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Brevo API Error (Forgot Password):", error);
    throw error;
  }
};

module.exports = { sendVerificationEmail, sendForgotPasswordEmail };
