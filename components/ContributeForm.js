import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm, Controller  } from "react-hook-form";
import Alert from '@mui/material/Alert';

import web3 from '../ethereum/web3';

import Campaign from '../ethereum/campaign';

import { useRouter } from 'next/router'

const ContributeForm = ({address}) => {
    const router = useRouter()

    const [loading, setLoading] = React.useState(false);
    const {handleSubmit, control, setError, formState: { errors } } = useForm({ defaultValues: {
        contribute: "",
      }});

  const onSubmit = async(data) =>{
    const campaign = Campaign(address);

    setLoading(true);
     try {
        const accounts = await web3.eth.requestAccounts();
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(data?.contribute, 'ether')
        });
        router.push(`/campaigns/${address}`);
    } catch (error) {
        setError("contribute", error);
    }
    setLoading(false);
  };

    return <Box><h4 style={{margin: 0, marginBottom: '16px'}}>
   Contribute to this Campaign!
        </h4>
       <form onSubmit={handleSubmit(onSubmit)}>
       <Controller
            control={control}
            name="contribute"
            render={({ field: { onChange, value } }) => (
                <TextField type="tel" fullWidth id="contribute" onChange={onChange} value={value} label="Amount to Contribute" variant="outlined"  InputProps={{
                    endAdornment: <InputAdornment position="start">ETHER</InputAdornment>,
                }} />
            )}
         />
          <Box sx={{mt: 1}}>
          {errors.contribute && <Alert severity="error">{errors.contribute.message}</Alert>}
          </Box>
       
        <Box sx={{mt: 2}}><LoadingButton loading={loading} type="submit" variant="contained">Contribute!</LoadingButton></Box>
        </form>
</Box>
};

export default ContributeForm;