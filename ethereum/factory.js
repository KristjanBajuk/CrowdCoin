import web3 from './web3';
import Campaignfactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(Campaignfactory.abi, "0x981c8fAdfF9B6b9a722EeC41694A2c54aeB9EA8d");

export default instance;

