const validatedate = (departureDate, returnDate) => {

    if (departureDate.getTime() < returnDate.getTime()) return true;

    return false;
};

export default validatedate;
