const errorAssignment = (string, prop) => {
  const errors = {};
  if (!errors[prop]) errors[prop] = [string];
  else errors[prop].push(string);
  return errors;
};

export default errorAssignment;
