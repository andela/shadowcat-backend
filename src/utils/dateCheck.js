const millisecondsPerDay = 1000 * 60 * 60 * 24;

const dateDifference = (dateOne, dateTwo) => {
  const firstDate = new Date(dateOne),
    secondDate = new Date(dateTwo);
  const date1 = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
  const date2 = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

  const duration = Math.round((date2 - date1) / millisecondsPerDay);
  if (duration <= 0) return false;
  return true;
};

export default dateDifference;
