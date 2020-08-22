exports.formatDates = (list) => {
  const formattedList = list.map((obj) => {
    const newCreatedAt = new Date(obj.exchanged_at);
    return { ...obj, exchanged_at: newCreatedAt };
  });

  return formattedList;
};
