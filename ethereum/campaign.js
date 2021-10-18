import web3 from "./web3";
import Campaign from './build/Campaign.json';

 const Instance = (address) => {
    return new web3.eth.Contract(
        Campaign.abi,
        address
    )
};

export default Instance;