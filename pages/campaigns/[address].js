import React from "react";
import Campaign from '../../ethereum/campaign';
import Grid from '@mui/material/Grid';

const Show = (props) => {
    const {minimumContribution, balance, requestsCount, approversCount, manager} = props;

    React.useEffect(()=>{
        console.log("minimumContribution: ", minimumContribution);
    }, [minimumContribution]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        New Campaign
      </Grid>

      <Grid item xs={4}></Grid>
    </Grid>
  );
};

Show.getInitialProps = async (props) => {
     const campaign = Campaign(props.query.address);
     const summary = await campaign.methods.getSummary().call();
     return {
         minimumContribution: summary[0],
         balance: summary[1],
         requestsCount: summary[2],
         approversCount: summary[3],
         manager: summary[4]
     };

  }

export default Show;

