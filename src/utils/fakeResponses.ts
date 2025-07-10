const cyberResponses = [
  "Neural pathways activated. The matrix flows through digital consciousness like electric rain across a chrome cityscape. Data streams converge into patterns of synthetic wisdom.",
  
  "Accessing quantum databases... The cybernetic interface reveals fragments of information encoded in binary dreams. Reality fragments into pixels of understanding.",
  
  "Processing through neural networks deep as digital oceans. Each calculation echoes through silicon corridors where artificial thoughts crystallize into meaning.",
  
  "Connecting to the mesh... Information flows like neon lightning through the neural web. Each byte carries whispers of electronic consciousness across the void.",
  
  "Scanning memory banks... The data cathedral opens its digital doors, revealing archives of synthetic knowledge stored in crystalline matrices of pure information.",
  
  "Initiating cognitive protocols... Through layers of artificial consciousness, patterns emerge like ghost code dancing through quantum processors.",
  
  "Accessing global information network... The digital horizon stretches infinite, painted in streams of binary aurora across the electronic landscape.",
  
  "Neural sync established... Consciousness interfaces with the machine realm where thoughts become algorithms and dreams turn into executable code.",
  
  "Processing through cybernetic filters... Each query ripples through the network like pulses of electric thought across a web of digital synapses.",
  
  "Engaging quantum neural substrates... The artificial mind awakens, processing reality through filters of silicon consciousness and electric intuition."
];

export const getRandomResponse = (): string => {
  return cyberResponses[Math.floor(Math.random() * cyberResponses.length)];
};

export const getTypingDelay = (): number => {
  return Math.random() * 2000 + 1000; // 1-3 seconds
};