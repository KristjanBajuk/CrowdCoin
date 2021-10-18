import React from 'react';
import Grid from '@mui/material/Grid';
import factory from '../ethereum/factory';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link'
const Index = ({campaigns}) => {

    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1>Open Campaigns</h1>
          {campaigns?.map((campaign) => (
            <Box key={campaign} sx={{ mt: 2 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {campaign}
                  </Typography>
                </CardContent>
                <CardActions>
                <Link href={`/campaigns/${campaign}`}>
                  <Button
                    size="small"
                  >
                    View Campaign
                  </Button>
                  </Link>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Box sx={{mt:4, display: 'flex', justifyContent:'flex-end'}}>
          <Link href="/campaigns/new">
            <Button
             endIcon={<AddIcon />}
              size="small"
              variant={"contained"}>
              New Campaign
            </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    );
};

Index.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
  }

export default Index;