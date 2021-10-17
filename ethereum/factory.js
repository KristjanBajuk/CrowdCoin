import web3 from './web3';
import Campaignfactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(Campaignfactory.abi, "0x829d9E854Bcb2a418d0d9c249120D926cA018802");

export default instance;

