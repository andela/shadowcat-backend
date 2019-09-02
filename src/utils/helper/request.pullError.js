/**
 * Extracts msg property of express-validator objects
 * @param { array } errors - the errors from express validator
 * @return { array } the extracted errors
 */
const pullErrors = errors => {
  const combinedErrors = {};
  const origin = [];
  const destination = [];
  const type = [];
  const departuredate = [];
  const travelreasons = [];
  const accommodation = [];
  errors.forEach(error => {
    const { msg } = error;
    const msgArray = msg.split(' ');
    const msgType = msgArray[0];
    msgArray.splice(0, 1);
    const extractedError = msgArray.join(' ');
    switch (msgType) {
      case 'origin':
        origin.push(extractedError);
        break;
      case 'destination':
        destination.push(extractedError);
        break;
      case 'type':
        destination.push(extractedError);
        break;
      case 'departuredate':
        departuredate.push(extractedError);
        break;
      case 'travelreasons':
        travelreasons.push(extractedError);
        break;
      case 'accommodation':
        accommodation.push(extractedError);
        break;
      default:
    }
  });
  if (origin.length > 0) {
    combinedErrors.origin = origin;
  }
  if (destination.length > 0) {
    combinedErrors.destination = destination;
  }
  if (type.length > 0) {
    combinedErrors.destination = destination;
  }
  if (departuredate.length > 0) {
    combinedErrors.departuredate = departuredate;
  }
  if (travelreasons.length > 0) {
    combinedErrors.travelreasons = travelreasons;
  }
  if (accommodation.length > 0) {
    combinedErrors.accommodation = accommodation;
  }
  return combinedErrors;
};

export default pullErrors;
