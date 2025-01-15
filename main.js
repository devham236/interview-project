const virtualMachines = [
  {
    cpu: 8,
    memory: 16,
    bandwidth: 250,
  },
  {
    cpu: 18,
    memory: 32,
    bandwidth: 500,
  },
  {
    cpu: 4,
    memory: 8,
    bandwidth: 125,
  },
];
const serverSpecs = {
  maxCpuCores: 16,
  maxMemory: 64,
  maxBandwidth: 500,
};

let serverCount = 0;

function calcHowManyServersNeeded(array) {
  // loop over virtualMachines
  const serversNeeded = array.reduce((acc, curr, index, array) => {
    // every VM that doesnt exceed Specs increases count
    if (curr.cpu > acc) {
      serverCount + 1;
      return curr.cpu;
    } else {
      return curr.cpu;
    }
  }, serverSpecs.maxCpuCores);

  return serverCount;
}

console.log(calcHowManyServersNeeded(virtualMachines));
