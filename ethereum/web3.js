import Web3 from "web3";

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // we are in the browser and metamask is running.
    web3 = new Web3(window.ethereum);
} else {
    // we are on the server OR the user is not running metamask.
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/371b70dc777746cb88d0a2d7dd707647'
    );
    web3 = new Web3(provider);
}

export default web3;