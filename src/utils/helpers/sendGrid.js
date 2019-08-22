import sgMail from '@sendgrid/mail';

/**
 * Uses SendGrid to send mails
 * @param { string } receiver - Email of the receiver
 * @param { string } verificationToken - Verification token
 * @return { void }
 */
const sendVerification = async (receiver, verificationToken) => {
  let verificationUrl = '';
  if (process.env.NODE_ENV === 'development') {
    verificationUrl = 'http://localhost:3000/api/v1/auth/verify/';
  } else if (process.env.NODE_ENV === 'test') {
    verificationUrl = 'http://localhost:3001/api/v1/auth/verify/';
  } else {
    verificationUrl = 'https://shadowcat-backend-staging.herokuapp.com';
  }

  verificationUrl += verificationToken;
  await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: receiver,
    from: `${process.env.WEB_MAIL_URL}`,
    subject: 'Just a few more things',
    text: 'Verify your email',
    html: `
          <div style="display: flex; justify-content: center;">
            <div style="max-width: 400px; margin: 10px;">
              <h2><span style="color: #5C6BC0">You are almost done!</span><br/> <span style="color: #37474F">Let us confirm your email address</span></h2>
              <p>
                By clicking on the following link, you are confirming your email
                address
              </p>
              <div style="padding-top:10px">
                <a href="${verificationUrl}" style="padding: 7px; text-transform: capitalize; border-radius: 3px; background-color:#5C6BC0; color: white; text-decoration: none">Confirm Email address</a>
              </div>
            </div>
          </div>
        `
  };
  await sgMail.send(msg);
};

export default sendVerification;
