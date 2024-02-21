import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Switch, useNavigate} from "react-router-dom";
import Home from './pages/customer/home';
import List from './pages/customer/list';
import Trip from './pages/customer/trip';
import Login from './pages/general/login';
import Profile from './pages/general/profile';
import Schedule from './pages/customer/schedule';
import Ticket from './pages/customer/ticket';
import Bill from './pages/customer/bill';
import About from './pages/customer/about';
import Payment from './pages/customer/payment';
// import ProtectedRoute from './components/privateRoute';
import ProtectedRoute from './privateRoute';
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
                        <Route path="/profile/:action" element={<Profile/>}></Route>  
                    </Route>
                    <Route path="/schedule" element={<Schedule />}></Route>
                    <Route path="/ticket" element={<Ticket />}></Route>
                    <Route path="/bill" element={<Bill />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/payment/:bookingCode" element={<Payment/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
