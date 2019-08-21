const correctUserEmail = {
  email: 'okaforchidimma.c@gmail.com',
};

const wrongUserEmail = {
  email: 'agentegwujii@gmail.com',
};

const notAnEmail = {
  email: 'agentegwujiigmailcom',
};
const correctUserPassword = {
  newPassword: 'iamasonofgod',
  confirmPassword: 'iamasonofgod',
};
const misMatchedUserPassword = {
  newPassword: 'iamasonofgod',
  confirmPassword: 'iamasonofgod1',
};
const lessUserPassword = {
  newPassword: 'iam',
  confirmPassword: 'iam',
};
const correctUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJva2Fmb3JjaGlkaW1tYS5jQGdtYWlsLmNvbSIsImlhdCI6MTU2NjUwMTQzMiwiZXhwIjoxNTY2NTg3ODMyfQ.nyqsaJup-PH8791qlOaCNsH8WAZed7L7W4_bGOTQWsQ';
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJva2Fmb3JjaGlkaW1tYS5jQGdtYWlsLmNvbSIsImlhdCI6MTU2NjUwMTQzMiwiZXhwIjoxNTY2NTg3ODMyfQ.aJup-PH8791qlOaCNsH8WAZed7L7W4_bGOTQWsQ';
export default {
  notAnEmail,
  correctUserEmail,
  wrongUserEmail,
  correctUserPassword,
  misMatchedUserPassword,
  lessUserPassword,
  correctUserToken,
  invalidToken
};
