import React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Button } from "@mui/material";
import Campaign from "../../../../ethereum/campaign";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import web3 from "../../../../ethereum/web3";

const Requests = ({ address, requests, requestCount, approversCount }) => {
  const handleApprove = async (index) => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.requestAccounts();
      await campaign.methods.approveRequest(index).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalize = async (index) => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.requestAccounts();
      await campaign.methods.finalizeRequest(index).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <h1>Pending Requests</h1>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button variant="contained">Add Request</Button>
      </Link>
      <TableContainer sx={{ mt: 5 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="requests table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Recipient</TableCell>
              <TableCell align="right">Complete</TableCell>
              <TableCell align="right">Approval Count</TableCell>
              <TableCell align="right">Approve</TableCell>
              <TableCell align="right">Finalize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests?.map((request, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">{request.description}</TableCell>
                <TableCell align="right">
                  {web3.utils.fromWei(request.value, "ether")}
                </TableCell>

                <TableCell align="right">{request.recipient}</TableCell>
                <TableCell align="right">
                  {request.complete ? "TRUE" : "FALSE"}
                </TableCell>
                <TableCell align="right">
                  {request.approvalCount}/{approversCount}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => handleApprove(index)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color={"secondary"}
                    variant="outlined"
                    onClick={()=>handleFinalize(index)}
                  >
                    Finalize
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

Requests.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => campaign.methods.requests(index).call())
  );

  return {
    address,
    requests,
    requestCount,
    approversCount,
  };
};

export default Requests;
