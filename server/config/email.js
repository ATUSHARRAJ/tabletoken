const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, name, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  await resend.emails.send({
    from:    'TableToken <onboarding@resend.dev>',
    to:      email,
    subject: 'Verify your TableToken account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto;">
        <div style="background: #111827; padding: 28px 32px; text-align: center; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">🍽️ TableToken</h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
          <h2 style="color: #111827;">Hi ${name}! 👋</h2>
          <p style="color: #6b7280;">Please verify your email to activate your account.</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${verifyUrl}" style="background: #e63946; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 600;">
              ✅ Verify Email Address
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 12px;">Link expires in 24 hours.</p>
        </div>
      </div>
    `,
  });
};

const sendForgotPasswordEmail = async (email, name, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
  await resend.emails.send({
    from:    'TableToken <onboarding@resend.dev>',
    to:      email,
    subject: 'Reset your TableToken password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto;">
        <div style="background: #111827; padding: 28px 32px; text-align: center; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">🍽️ TableToken</h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
          <h2 style="color: #111827;">Hi ${name}! 👋</h2>
          <p style="color: #6b7280;">Click below to reset your password. Link expires in 1 hour.</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${resetUrl}" style="background: #e63946; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 600;">
              🔑 Reset Password
            </a>
          </div>
        </div>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail, sendForgotPasswordEmail };
