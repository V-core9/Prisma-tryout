loopy = async (count, callback) => {
  for (let i = 0; i < count; i++) {
    await callback(i);
  }
};

module.exports = loopy;
