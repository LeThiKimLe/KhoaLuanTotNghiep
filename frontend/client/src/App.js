import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/customer/home";
import List from "./pages/customer/list";
import Trip from "./pages/customer/trip";
import Login from "./pages/general/login";
import Profile from "./pages/general/profile";
import Schedule from "./pages/customer/schedule";
import Ticket from "./pages/customer/ticket";
import Bill from "./pages/customer/bill";
import About from "./pages/customer/about";
import Payment from "./pages/customer/payment";
// import ProtectedRoute from './components/privateRoute';
import ProtectedRoute from "./privateRoute";
import TicketSignup from "./pages/bus_company/ticket-signup";
import PartnerSignup from "./pages/vehicle_owner/partner-signup";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/trips" element={<List />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/trip/:id" element={<Trip />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile/:action" element={<Profile />}></Route>
          </Route>
          <Route path="/schedule" element={<Schedule />}></Route>
          <Route path="/ticket" element={<Ticket />}></Route>
          <Route path="/bill" element={<Bill />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/payment/:bookingCode" element={<Payment />}></Route>
          <Route path="/sold_ticket" element={<TicketSignup />}></Route>
          <Route path="/transport_partner" element={<PartnerSignup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
