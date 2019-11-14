export const replayUserDetails = (userResults) => {
  return userResults.reduce((accumulatedStatus, currentStatus) => {
    return { ...accumulatedStatus, ...currentStatus };
  }, {});
};
