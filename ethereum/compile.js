const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol' : {
            content: source
        }
    },
    settings: {
        optimizer:
        {
            enabled: true
        },
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

let output = JSON.parse(solc.compile((JSON.stringify(input))));

fs.ensureDirSync(buildPath);

for (let file in output.contracts) {
    for(let contract in output.contracts[file]) {
        fs.outputJSONSync(
            path.resolve(buildPath, contract + '.json'),
            output.contracts[file][contract]
        );
    }
}
