import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Container, Spacer } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";
import "./css/style.css";

export default function Header() {
  return (
    <header className="header">
      <Container
        display="flex"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Typography
            sx={{
              mr: "10px",
              fontWeight: "600",
              color: "white",
            }}
          >
            SUPPORT
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ mr: "10px", fontWeight: "600", color: "white" }}>
            MY TICKETS
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ mr: "10px", fontWeight: "600", color: "white" }}>
            SUBMIT A TICKET
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://frostline.games/ods/wp-content/uploads/2022/08/logo.png"
            alt=""
            width="50%"
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e9e9e929!important",
              color: "#f9f9f9",
            }}
          >
            LOGIN
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e9e9e929!important",
              color: "#f9f9f9",
              ml: "10px",
              mr: "10px",
            }}
          >
            REGISTER
          </Button>
        </Grid>
      </Container>
      <Spacer y={2} />
      <Container display="flex" justify="center" css={{ width: "60%" }}>
        <Divider
          sx={{
            width: "100%",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "white",
          }}
        >
          FROSTLINE GAMES HELP DESK APP
        </Divider>
      </Container>
      <Spacer y={2} />
      <Container display="flex" justify="center">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
      <header className="ux-shape-divider ux-shape-divider--bottom ux-shape-divider--style-curve-opacity">
        <svg
          viewBox="0 0 1000 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            className="ux-shape-fill"
            opacity="0.15"
            d="M0 14C0 14 88.64 17.48 300 50C560 90 814 77 1003 40L1015 68L1018 104H0V14Z"
          ></path>
          <path
            className="ux-shape-fill"
            opacity="0.3"
            d="M0 45C0 45 271 90.13 500 77C657 68 830 30 1015 14V100H0V45Z"
          ></path>
          <path
            className="ux-shape-fill"
            d="M0 58C0 58 188.29 90 508 90C798 90 1002 55 1002 55V100H0V58Z"
          ></path>
        </svg>
      </header>
    </header>
  );
}
