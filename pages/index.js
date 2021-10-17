import React from 'react';
import factory from '../ethereum/factory';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Index = ({campaigns}) => {

    return (
      <Box>
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
                <Button size="small">View Campaign</Button>
              </CardActions>
              </Card>
            </Box>
          ))}
       
      </Box>
    );
};

Index.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
  }

export default Index;