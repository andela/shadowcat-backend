/**
 * Extracts msg property of express-validator objects
 * @param { array } errors - the errors from express validator
 * @return { array } the extracted errors
 */
const pullErrors = errors => {
  const combinedErrors = {};
  const currentOfficeLocation = [];
  const destination = [];
  const tripType = [];
  const departureDate = [];
  const travelReasons = [];
  const accommodation = [];
  errors.forEach(error => {
    const { msg } = error;
    const msgArray = msg.split(' ');
    const msgtripType = msgArray[0];
    msgArray.splice(0, 1);
    const extractedError = msgArray.join(' ');
    switch (msgtripType) {
      case 'currentOfficeLocation':
        currentOfficeLocation.push(extractedError);
        break;
      case 'destination':
        destination.push(extractedError);
        break;
      case 'tripType':
        destination.push(extractedError);
        break;
      case 'departureDate':
        departureDate.push(extractedError);
        break;
      case 'travelReasons':
        travelReasons.push(extractedError);
        break;
      case 'accommodation':
        accommodation.push(extractedError);
        break;
      default:
    }
  });
  if (currentOfficeLocation.length > 0) {
    combinedErrors.currentOfficeLocation = currentOfficeLocation;
  }
  if (destination.length > 0) {
    combinedErrors.destination = destination;
  }
  if (tripType.length > 0) {
    combinedErrors.destination = destination;
  }
  if (departureDate.length > 0) {
    combinedErrors.departureDate = departureDate;
  }
  if (travelReasons.length > 0) {
    combinedErrors.travelReasons = travelReasons;
  }
  if (accommodation.length > 0) {
    combinedErrors.accommodation = accommodation;
  }
  return combinedErrors;
};

export default pullErrors;
