import React from "react";
import Box from "@mui/material/Box";
import Campaign from "../../../ethereum/campaign";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ContributeForm from "../../../components/ContributeForm";
import { Button } from "@mui/material";

import web3 from "../../../ethereum/web3";
import Link from "next/link";

const Show = (props) => {
  const {
    address,
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
  } = props;

  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description:
        "The manager created this campaign and can create requests to withdraw money",
    },
    {
      header: minimumContribution,
      meta: "Minimum contribution (Wei)",
      description: "You must contribute at this musch wei to become a approver",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign Balance (ether)",
      description: "Balance is how much money this campaign has left to spend",
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description:
        "A request tries to withdraw the money from the contract. Request must be approved by approvers",
    },
    {
      header: approversCount,
      meta: "Number of Approvers",
      description: "Number of people who have already donated to this campaign",
    },
  ];

  return (
    <Box>
      <h1>Campaign Details</h1>
      <Grid container spacing={10}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {items?.map((item, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  variant="outlined"
                  sx={{ p: 1 }}
                  sx={{ minHeight: "200px" }}
                >
                  <CardContent>
                    <Typography
                      sx={{ overflowWrap: "break-word" }}
                      variant="h6"
                      component="div"
                    >
                      {item?.header}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item?.meta}
                    </Typography>
                    <Typography variant="body2">{item?.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
            <Link href={`/campaigns/${address}/requests`}>
              <Button variant="contained">View Requests</Button>
            </Link>
          </Grid>
        </Grid>
          </Grid>

         

        <Grid item xs={4}>
          <ContributeForm address={address} />
        </Grid>
      </Grid>
    </Box>
  );
};

Show.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default Show;
