import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm, Controller  } from "react-hook-form";
import Alert from '@mui/material/Alert';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

import { useRouter } from 'next/router'

const NewCampaign = () => {
    const router = useRouter()

    const [loading, setLoading] = React.useState(false);
    const {handleSubmit, control, setError, formState: { errors } } = useForm({ defaultValues: {
        minimumContribution: "",
      }});

  const onSubmit = async(data) =>{

    setLoading(true);
     try {
      
        // Request account access if needed
        const accounts = await web3.eth.requestAccounts();
        await factory.methods.createCampaign(data?.minimumContribution).send({
            from: accounts[0]
        });
        router.push('/');
    } catch (error) {
        console.log(error);
        setError("minimumContribution", error);
    }
    setLoading(false);
  };


    return <Box><h1>
            Create Campaign
                </h1>
               <form onSubmit={handleSubmit(onSubmit)}>
               <Controller
                    control={control}
                    name="minimumContribution"
                    render={({ field: { onChange, value } }) => (
                        <TextField type="tel" fullWidth id="minimumContribution" onChange={onChange} value={value} label="Minimum Contribution" variant="outlined"  InputProps={{
                            endAdornment: <InputAdornment position="start">WEI</InputAdornment>,
                        }} />
                    )}
                 />
                  <Box sx={{mt: 1}}>
                  {errors.minimumContribution && <Alert severity="error">{errors.minimumContribution.message}</Alert>}
                  </Box>
               
                <Box sx={{mt: 4}}><LoadingButton loading={loading} type="submit" variant="contained">Create!</LoadingButton></Box>
                </form>
        </Box>
}

export default NewCampaign;