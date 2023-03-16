import { Badge, Container, Grid, Paper, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { Spacer } from "@nextui-org/react";
import Select from "react-select";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Assign() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [operationClaim, setOperationClaim] = useState([]);
  const [username, setUsername] = useState([]);
  const [role, setRole] = useState([]);
  const [options, setOptions] = useState([
    { value: 0, label: "Choose Someone" },
  ]);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  console.log(operationClaim);
  console.log(username);

  useEffect(() => {
    function GetUserOperationClaim() {
      axios
        .get(
          "http://localhost:5010/api/UserOperationClaims/GetUserOperationList?PageRequest.Page=0&PageRequest.PageSize=10"
        )
        .then((response) => {
          setOperationClaim((userOperationClaim) => {
            return response.data.items;
          });
        });
      operationClaim &&
        operationClaim.map((item) => {
          axios
            .get(`http://localhost:5010/api/User/GetById?Id=${item.userId}`)
            .then((response) => {
              const newList = username.concat(
                response.data.firstName.toString() +
                  " " +
                  response.data.lastName.toString()
              );
              setUsername(newList);
            });
          return username;
        });
    }
    GetUserOperationClaim();
  }, [operationClaim, username]);

  function getOperationId() {
    operationClaim &&
      operationClaim.map((item) => {
        axios
          .get(
            `http://localhost:5010/api/OperationClaims/GetOperationById?Id=${item.operationClaimId}`
          )
          .then((response1) => {
            const newList = role.concat(response1.data.name.toString());
            setRole(newList);
          });
        return username;
      });
  }
  return (
    <Container>
      <Spacer y={1} />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
            <Badge
              color="primary"
              variant="dot"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ mr: 1 }}
            ></Badge>
            TO DO
          </Typography>
          <Spacer y={1} />
          <Paper sx={{ borderLeft: "4px solid #1976d2", p: 2 }}>
            <Grid container sx={{ ml: 1 }}>
              <Grid item>
                <TaskIcon sx={{ color: "#1976d2", mr: 1 }} />
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Support Request 213920193's issue
                </Typography>
              </Grid>
            </Grid>
            <Spacer y={1} />
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              styles={{ width: "70%" }}
            />
            <Spacer y={1} />
            <Grid container sx={{ p: 1 }} justifyContent="space-between">
              <Grid item>
                <Typography variant="caption">State</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <Badge
                    color="primary"
                    variant="dot"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    sx={{ mr: 1 }}
                  ></Badge>
                  To Do
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
            <Badge
              color="secondary"
              variant="dot"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ mr: 1 }}
            ></Badge>
            IN PROGRESS
          </Typography>
          <Spacer y={1} />
          <Paper sx={{ borderLeft: "4px solid #9c27b0", p: 2 }}>
            <Grid container sx={{ ml: 1 }}>
              <Grid item>
                <TaskIcon sx={{ color: "#9c27b0", mr: 1 }} />
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Support Request 213920193's issue
                </Typography>
              </Grid>
            </Grid>
            <Spacer y={1} />
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              styles={{ width: "70%" }}
            />
            <Spacer y={1} />
            <Grid container sx={{ p: 1 }} justifyContent="space-between">
              <Grid item>
                <Typography variant="caption">State</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <Badge
                    color="secondary"
                    variant="dot"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    sx={{ mr: 1 }}
                  ></Badge>
                  In Progress
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
            <Badge
              color="success"
              variant="dot"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ mr: 1 }}
            ></Badge>
            DONE
          </Typography>
          <Spacer y={1} />
          <Paper sx={{ borderLeft: "4px solid #2e7d32", p: 2 }}>
            <Grid container sx={{ ml: 1 }}>
              <Grid item>
                <TaskIcon sx={{ color: "#2e7d32", mr: 1 }} />
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Support Request 213920193's issue
                </Typography>
              </Grid>
            </Grid>
            <Spacer y={1} />
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              styles={{ width: "70%" }}
            />
            <Spacer y={1} />
            <Grid container sx={{ p: 1 }} justifyContent="space-between">
              <Grid item>
                <Typography variant="caption">State</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <Badge
                    color="success"
                    variant="dot"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    sx={{ mr: 1 }}
                  ></Badge>
                  Done
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
