// Un artifact es un archivo JSON de toda la información resultado de la compilación de un smart contract

const OracleArtifact = {
  address: {
      5: '0xf646dF33d203D30f2898c031a0D5Bf002629552D',
  },
  abi: [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },{
    "inputs": [],
    "name": "getLatestPrice",
    "outputs": [{
      "internalType": "int256",
      "name": "",
      "type": "int256"
    }],
    "stateMutability": "view",
    "type": "function"
  }],
}

export default OracleArtifact;
