import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { Spacer } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { styled } from "@nextui-org/react";

const StyledBadge = styled("span", {
  display: "inline-block",
  textTransform: "uppercase",
  padding: "$2 $3",
  margin: "0 2px",
  fontSize: "10px",
  fontWeight: "$bold",
  borderRadius: "14px",
  letterSpacing: "0.6px",
  lineHeight: 1,
  boxShadow: "1px 2px 5px 0px rgb(0 0 0 / 5%)",
  alignItems: "center",
  alignSelf: "center",
  color: "$white",
  variants: {
    type: {
      0: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      2: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
      1: {
        bg: "$warningLight",
        color: "$warningLightContrast",
      },
    },
  },
  defaultVariants: {
    type: 2,
  },
});

export default function MyTickets() {
  const [age, setAge] = useState("");
  const [supportRequest, setSupportRequest] = useState([]);

  let navigate = useNavigate();

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  function routeChange(id) {
    navigate(`./view/${id}`);
  }
  function routeChangeDelete(id) {
    navigate(`./delete/${id}`);
  }
  function routeChangeEdit(id) {
    navigate(`./edit/${id}`);
  }
  const columns = [
    {
      field: "image",
      headerName: "IMG",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          height="30"
          width="30"
          style={{ marginLeft: "10px" }}
          alt="product"
        />
      ),
    },
    {
      field: "title",
      headerName: "Support Request Title",
      sortable: false,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "ticket",
      headerName: "Ticket Id",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        return <Typography>1233249</Typography>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        var statusName = "";
        const statusType = params.row.supportRequestStatusType;
        if (statusType === 0) {
          statusName = "To do";
        } else if (statusType === 1) {
          statusName = "In progress";
        } else {
          statusName = "Done";
        }
        return (
          <>
            <StyledBadge type={statusType}>{statusName}</StyledBadge>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <>
            <Tooltip
              content="View"
              color="success"
              onClick={() => console.log("View", id)}
            >
              <IconButton onClick={() => routeChange(id)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content="Edit">
              <IconButton onClick={() => routeChangeEdit(id)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              content="Delete"
              color="error"
              onClick={() => console.log("Delete", id)}
            >
              <IconButton onClick={() => routeChangeDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    function GetSupportRequest() {
      axios
        .get(
          "http://localhost:5010/api/SupportRequest/GetListByUserId?UserId=3&PageRequest.Page=0&PageRequest.PageSize=100"
        )
        .then((response) => {
          setSupportRequest((supportRequest) => {
            supportRequest = response.data.items;
            return supportRequest;
          });
        });
    }
    GetSupportRequest();
  }, []);

  return (
    <Container maxWidth="lg">
      <Spacer y={2} />
      <Grid container justifyContent="center">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          MY TICKETS
        </Typography>
      </Grid>
      <Spacer y={2} />
      <Grid container justifyContent="space-between">
        <Grid item>
          <Box
            display="flex"
            p={0.2}
            borderRadius={1}
            border="thin solid #00000020"
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
            <IconButton type="button">
              <SearchIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: "240px" }} size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>To do</MenuItem>
              <MenuItem value={20}>In Progress</MenuItem>
              <MenuItem value={30}>Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Spacer y={2} />
      <Grid container>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={supportRequest}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableColumnMenu
            disableSelectionOnClick
          />
        </div>
      </Grid>
    </Container>
  );
}
