
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
execTimers.perSecond = () => {
  return execTimers.length / execTimers.seconds();
};
execTimers.end = () =>{
  console.log(`Average Execution Time: ${execTimers.itemAVG()}ms`);
  console.log(`Exec Item Count: ${execTimers.length}`);
  console.log(`Total Execution Time: ${execTimers.seconds()}s [${execTimers.sum()}ms]`);
  console.log(`Items Per Second: ${execTimers.perSecond()}`);
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
