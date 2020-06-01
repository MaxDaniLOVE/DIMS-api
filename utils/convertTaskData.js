const convertTaskData = (task) => {
  const { _id, __v, ...data } = task._doc;
  return {
    TaskId: _id,
    ...data
  };
}

module.exports = convertTaskData;
