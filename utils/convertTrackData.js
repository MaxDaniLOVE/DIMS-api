const converttrackData = (task) => {
  const { _id: TaskTrackId, __v, ...data } = task._doc;
  return {
    TaskTrackId,
    ...data
  };
}

module.exports = converttrackData;
