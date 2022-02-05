
var execTimers = [];
execTimers.sum = () => {
  var sum = 0;
  execTimers.forEach(item => {
    sum += item.time;
  });
  return sum;
};
execTimers.itemAVG = () => {
  return execTimers.sum() / execTimers.length;
};
execTimers.seconds = () => {
  return execTimers.sum() / 1000;
};

class execItem {

  constructor(name) {
    this.txt = name;
    this.start = Date.now();
  }

  async end () {
    this.end = Date.now();
    this.time = this.end - this.start;
    execTimers.push(this);
  }

}

module.exports = {execTimers, execItem};
