const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

let provider = new HDWalletProvider({
    mnemonic: {
        phrase:'enhance kite liberty acid hawk enter raven mistake giant hundred coconut obey'
      },
      providerOrUrl: "https://rinkeby.infura.io/v3/371b70dc777746cb88d0a2d7dd707647"
    }
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi).deploy({data: compiledFactory.evm.bytecode.object}).send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to: ', result.options.address);
    process.exit();
};

deploy();