const correctTripId = '0404e4b2-15d4-4b82-bec4-bb21a83ce6a2';
const wrongTripId = '0404e4b2-15d4-4b82-bec4-bb21a83ce6a1';

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
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhZGZiYzcxLWRlZDUtNDhiMi1hYjA5LTQzNjdiMjEzMmUyZSIsImlzQWRtaW4iOmZhbHNlLCJlbWFpbCI6ImNoaWRpbW1hLm9rYWZvckBhbmRlbGEuY29tIiwiaWF0IjoxNTY4NDEyMjQwLCJleHAiOjE1Njg0OTg2NDB9.vWOEoB0WqoqKDLGOSCmBgQVMYWhy2e-cPyVTPcwaHha';
export default {
  correctManager,
  correctManagerWrongTrip,
  correctRequester,
  correctTripId,
  wrongTripId,
  status,
  invalidToken
};
