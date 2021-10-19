import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm, Controller } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const NewRequest = ({address}) => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipient: "",
      value: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const campaign = Campaign(address);
    try {
      // Request account access if needed
      const accounts = await web3.eth.requestAccounts();
      await campaign.methods.createRequest(data?.description, web3.utils.toWei(data?.value, 'ether'), data?.recipient).send({
        from: accounts[0],
      });
      router.push(`/campaigns/${address}/requests`);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };
  return (
    <Box>
      <h1>Create a Request</h1>
       <Box sx={{mb: 2}}>
            <Link href={`/campaigns/${address}/requests`}>
              <Button variant="outlined">Back</Button>
            </Link>
        </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{mb: 2}}>
          <Controller
            control={control}
            name="recipient"
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                id="recipient"
                onChange={onChange}
                value={value}
                label="Recipient"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">ADDRESS</InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Box sx={{mb: 2}}>
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <TextField
                type="tel"
                fullWidth
                id="value"
                onChange={onChange}
                value={value}
                label="Value"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">ETHER</InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Box sx={{mb: 2}}>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextField
                multiline
                rows={5}
                type="tel"
                fullWidth
                id="description"
                onChange={onChange}
                value={value}
                label="Description"
                variant="outlined"
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          {errors.minimumContribution && (
            <Alert severity="error">{errors.minimumContribution.message}</Alert>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <LoadingButton loading={loading} type="submit" variant="contained">
            Create!
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

NewRequest.getInitialProps = async (props) => {
    const address = props.query.address;
    return {
      address
    };
  };

export default NewRequest;
