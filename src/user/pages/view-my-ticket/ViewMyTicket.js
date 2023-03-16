import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Input, Spacer, User } from "@nextui-org/react";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewMyTicket() {
  const comment = useRef();
  const url = useParams();
  let id = url.id;

  function CreateSupportRequestComment() {
    var payload = {
      supportReqwuestId: id,
      comment: comment.current.value,
    };

    axios
      .post("http://localhost:5010/api/SupportRequestComment/Create", payload)
      .then((response) => {
        toast.success("Comment created successfully!", {
          position: "top-right",
          onClose: () => {
            window.location.reload(false);
          },
          autoClose: 200,
        });
      })
      .catch((error) => console.log(error.message));
  }
  return (
    <Container>
      <Spacer y={3} />
      <Grid container spacing={5}>
        <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="caption"
              sx={{ color: "#00000050", fontWeight: "bold" }}
            >
              TICKET ID
            </Typography>
            <Spacer y={0.3} />
            <Typography
              variant="caption"
              sx={{ color: "#000000", fontWeight: "bold" }}
            >
              #82562278
            </Typography>
            <Spacer y={0.7} />
            <Typography
              variant="caption"
              sx={{ color: "#00000050", fontWeight: "bold" }}
            >
              CREATED
            </Typography>
            <Spacer y={0.3} />
            <Typography
              variant="caption"
              sx={{ color: "#000000", fontWeight: "bold" }}
            >
              February 10, 2023 14:16
            </Typography>
            <Spacer y={0.7} />
            <Typography
              variant="caption"
              sx={{ color: "#00000050", fontWeight: "bold" }}
            >
              LAST ACTIVITY
            </Typography>
            <Spacer y={0.3} />
            <Typography
              variant="caption"
              sx={{ color: "#000000", fontWeight: "bold" }}
            >
              1 month ago
            </Typography>
            <Spacer y={0.7} />
            <Typography
              variant="caption"
              sx={{ color: "#00000050", fontWeight: "bold" }}
            >
              STATUS
            </Typography>
            <Spacer y={0.3} />
            <Typography
              variant="caption"
              sx={{ color: "#000000", fontWeight: "bold" }}
            >
              Solved
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={9} sx={{ display: "flex", flexDirection: "column" }}>
          <Grid container sx={{ width: "100%", justifyContent: "end" }}>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="inherit"
                sx={{ mr: 2 }}
              >
                SEE MY OTHER TICKETS
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="caption"
            sx={{ color: "#000000", fontWeight: "bold" }}
          >
            TITLE
          </Typography>
          <Spacer y={0.3} />
          <Typography
            variant="caption"
            sx={{ color: "#00000050", fontWeight: "bold" }}
          >
            MESSAGE
          </Typography>
          <Spacer y={0.7} />
          <Divider />
          <Spacer y={0.7} />
          <User
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            name="Ariana Wattson"
            description="February 10, 2023 20:52"
          />
          <Spacer y={1} />
          <Typography variant="caption">
            Selam dostum, Paylaştığın Görsel için teşekkürler. Ama başka bir şey
            yazmadığın için sana aynı şekilde karşılık veriyorum ^^.
            WQIHDBQOW(UYDBQWYUDBQ... Sormak ya da söylemek istediğin bir şey
            olursa her daim buradayız. Hep bekleriz ^^ Zéus Riot Games Oyuncu
            Destek
          </Typography>
          <Spacer y={1} />
          <Divider />
          <Spacer y={1} />
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="caption">
                Selam dostum, Paylaştığın Görsel için teşekkürler. Ama başka bir
                şey yazmadığın için sana aynı şekilde karşılık veriyorum ^^.
                WQIHDBQOW(UYDBQWYUDBQ... Sormak ya da söylemek istediğin bir şey
                olursa her daim buradayız. Hep bekleriz ^^ Zéus Riot Games
                Oyuncu Destek
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <User src="https://i.pravatar.cc/113" size="lg" />
            </Grid>
          </Grid>
          <Spacer y={1} />
          <Grid container justifyContent="space-between" spacing="5">
            <Grid item xs={10}>
              <Input
                placeholder="Enter your message here"
                css={{ width: "100%", pr: "10px" }}
                ref={comment}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ borderRadius: 10 }}
                onClick={CreateSupportRequestComment}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
}
