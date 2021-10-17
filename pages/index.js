import React from 'react';
import factory from '../ethereum/factory';

const Index = ({campaigns}) => {

    return <div>{
    campaigns?.map(campaign => campaign)
    }</div>
};

Index.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
  }

export default Index;