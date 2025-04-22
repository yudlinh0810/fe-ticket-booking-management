import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layouts/Layout";
import ManageLayout from "./layouts/ManageLayout";
import AddCar from "./pages/BusManage/AddBus";
import DetailCar from "./pages/BusManage/DetailBus";
import UpdateCar from "./pages/BusManage/UpdateBus";
import AddCustomer from "./pages/CustomerManage/AddCustomer";
import DetailCustomer from "./pages/CustomerManage/DetailCustomer";
import ManageCustomer from "./pages/CustomerManage/ManageCustomer";
import UpdateCustomer from "./pages/CustomerManage/UpdateCustomer";
import AddDriver from "./pages/DriverManage/AddDriver";
import DetailDriver from "./pages/DriverManage/DetailDriver";
import ManageDriver from "./pages/DriverManage/ManageDriver";
import UpdateDriver from "./pages/DriverManage/UpdateDriver";
import Login from "./pages/Login";
import "./styles/app.scss";
import "./styles/reset.scss";
import "./styles/root.scss";
import { handleTokenExpiration } from "./utils/handleTokenExpiration ";
import useClientWidth from "./utils/useClientWidth.util";
import BusManage from "./pages/BusManage/BusManage";
import TripManage from "./pages/TripManage/TripManage";
import ManageCoDriver from "./pages/CoDriverManage/ManageCoDriver";
import DetailCoDriver from "./pages/CoDriverManage/DetailCoDriver";
import AddCoDriver from "./pages/CoDriverManage/AddCoDriver";
import UpdateCoDriver from "./pages/CoDriverManage/UpdateCoDriver";

function App() {
  useClientWidth();

  useEffect(() => {
    const interval = setInterval(() => {
      const status = localStorage.getItem("status");
      if (status === "OK") {
        handleTokenExpiration();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Route bảo vệ */}
            <Route element={<PrivateRoute />}>
              <Route index element={<div>Home</div>} />

              {/* Car Manage */}
              <Route path="/bus-manage" element={<ManageLayout />}>
                <Route index element={<BusManage />} />
                <Route path="page/:page" element={<BusManage />} />
                <Route path="detail/:licensePlate" element={<DetailCar />} />
                <Route path="add" element={<AddCar />} />
                <Route path="update/:licensePlate" element={<UpdateCar />} />
              </Route>

              {/* Customer Manage */}
              <Route path="/customer-manage" element={<ManageLayout />}>
                <Route index element={<ManageCustomer />} />
                <Route path="page/:page" element={<ManageCustomer />} />
                <Route path="detail/:id" element={<DetailCustomer />} />
                <Route path="add" element={<AddCustomer />} />
                <Route path="update/:id" element={<UpdateCustomer />} />
              </Route>

              {/* Co-driver Manage */}
              <Route path="/co-driver-manage" element={<ManageLayout />}>
                <Route index element={<ManageCoDriver />} />
                <Route path="page/:page" element={<ManageCoDriver />} />
                <Route path="detail/:id" element={<DetailCoDriver />} />
                <Route path="add" element={<AddCoDriver />} />
                <Route path="update/:id" element={<UpdateCoDriver />} />
              </Route>

              {/* Driver Manage */}
              <Route path="/driver-manage" element={<ManageLayout />}>
                <Route index element={<ManageDriver />} />
                <Route path="page/:page" element={<ManageDriver />} />
                <Route path="detail/:id" element={<DetailDriver />} />
                <Route path="add" element={<AddDriver />} />
                <Route path="update/:id" element={<UpdateDriver />} />
              </Route>

              {/* Trip Manage */}
              <Route path="/trip-manage" element={<ManageLayout />}>
                <Route index element={<TripManage />} />
              </Route>
            </Route>
          </Routes>
        </Layout>

        <ToastContainer
          className="custom-toast"
          position="top-center"
          autoClose={700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </>
  );
}

export default App;
