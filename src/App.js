import { CssBaseline, Container } from "@mui/material";
import { Row } from "@nextui-org/react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./user/pages/homepage/Homepage";
import MyTickets from "./user/pages/myTickets/MyTickets";
import ViewMyTicket from "./user/pages/view-my-ticket/ViewMyTicket";
import CreateSupportRequest from "./user/pages/create/CreateSupportRequest";
import NavBar from "./user/layout/navbar/NavbarUser";

function App() {
  return (
    <>
      <CssBaseline />
      <Container disableGutters maxWidth="fluid">
        <Row>
          <NavBar />
        </Row>
      </Container>
      <Routes>
        <Route path={`/`} element={<Homepage />} />
        <Route path={`/my-tickets`} element={<MyTickets />} />
        <Route path={`/view/:id`} element={<ViewMyTicket />} />
        <Route path={`/create`} element={<CreateSupportRequest />} />
      </Routes>
    </>
  );
}

export default App;
