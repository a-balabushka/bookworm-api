import nodemailer from 'nodemailer';

const from = '"Bookworm" <info@bookworm.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Welcome to Bookworm',
    html: `
    <p>Welcome to Bookworm. Please, confirm your email:</p>
    
     <a href=${user.generateConfirmationUrl()}>Confirm email</a>
    `
  };

  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Reset Password',
    html: `
   <p>To reset password follow this link:</p>
    
    <a href=${user.generateResetPasswordLink()}>Reset password</a>`

  };

  transport.sendMail(email);
}

