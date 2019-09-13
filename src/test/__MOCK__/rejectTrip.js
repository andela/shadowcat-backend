const correctTripId = {
  tripId: '0404e4b2-15d4-4b82-bec4-bb21a83ce6a2',
};

const wrongTripId = {
  tripId: '0404e4b2-15d4-4b82-bec4-bb21a83ce6a1',
};

const correctRequester = {
  email: 'stephenibaba@andela.com',
  password: 'Jennylove19'
};
const correctManager = {
  email: 'chidimma.okafor@andela.com',
  password: 'IamUser'
};
const correctManagerWrongTrip = {
  email: 'chima.ekeneme@andela.com',
  password: 'Qwertyuiop1!'
};
const status = {
  requestStatus: 'rejected'
};
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJva2Fmb3JjaGlkaW1tYS5jQGdtYWlsLmNvbSIsImlhdCI6MTU2NjUwMTQzMiwiZXhwIjoxNTY2NTg3ODMyfQ.aJup-PH8791qlOaCNsH8WAZed7L7W4_bGOTQWsQ';
export default {
  correctManager,
  correctManagerWrongTrip,
  correctRequester,
  correctTripId,
  wrongTripId,
  status,
  invalidToken
};
