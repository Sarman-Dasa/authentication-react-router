import "./App.css";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useDispatch } from "react-redux";
import { setLoginUser } from "./Store/App";
import { Container } from "react-bootstrap";
import AddOrder from "./components/superAdmin/AddOrder";
import OrderList from "./components/superAdmin/OrderList";
import SellingProducts from "./components/Admin/SellingProducts";
import ViewStock from "./components/Admin/ViewStock";
import BuyItem from "./components/User/BuyItem";
import ViewCard from "./components/User/ViewCard";
import NoAccess from "./components/Error/NoAccess";
import Menubar from "./components/MenuBar";
import NotFound from "./components/Error/NotFound";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const isloggedin = localStorage.getItem("isloggedin");
  if (isloggedin === "true") {
    dispatch(setLoginUser(user));
  }

  return (
    <div className="App">
      <Menubar />
      <Container>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Dashboard />} />
          <Route element={<ProtectedRoute role={"SA"} />}>
            <Route path="/add-item" element={<AddOrder />} />
            <Route path="/order-list" element={<OrderList />} />
          </Route>
          <Route element={<ProtectedRoute role={"ADMIN"} />}>
            <Route path="/seleling-list" element={<SellingProducts />} />
            <Route path="/view-stock" element={<ViewStock />} />
          </Route>
          <Route element={<ProtectedRoute role={["USER", "ADMIN"]} />}>
            <Route path="/buy-product" element={<BuyItem />} />
            <Route path="/view-card" element={<ViewCard />} />
          </Route>
          <Route path="/no-access" element={<NoAccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
