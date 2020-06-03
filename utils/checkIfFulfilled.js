const checkIfFulfilled = (arrayOfResults) => {
  const filtered = arrayOfResults.filter(({ status }) => status === 'fulfilled');
  return filtered.map(({ value }) => value);
}

module.exports = checkIfFulfilled;
