const convertDataToAge = (data) => {
  const milliseconds = Date.parse(data);
  const ageMs = new Date().getTime() - new Date(milliseconds).getTime();
  return new Date(ageMs).getFullYear() - 1970;
};

module.exports = convertDataToAge;