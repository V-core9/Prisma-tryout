const item_count = 1000;

loopy = async (callback) => {
  for (let i = 0; i < item_count; i++) {
    await callback(i);
  }
};

module.exports = loopy;
