import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/Layout";
import ManageLayout from "./layouts/ManageLayout";
import AddCar from "./pages/CarManage/AddCar";
import DetailCar from "./pages/CarManage/DetailCar";
import { default as CarManage, default as ManageCar } from "./pages/CarManage/ManageCar";
import UpdateCar from "./pages/CarManage/UpdateCar";
import AddCustomer from "./pages/CustomerManage/AddCustomer";
import DetailCustomer from "./pages/CustomerManage/DetailCustomer";
import {
  default as CustomerManage,
  default as ManageCustomer,
} from "./pages/CustomerManage/ManageCustomer";
import UpdateCustomer from "./pages/CustomerManage/UpdateCustomer";
import AddDriver from "./pages/Drivermanage/AddDriver";
import DetailDriver from "./pages/Drivermanage/DetailDriver";
import ManageDriver from "./pages/Drivermanage/ManageDriver";
import UpdateDriver from "./pages/Drivermanage/UpdateDriver";
import "./styles/app.scss";
import "./styles/reset.scss";
import "./styles/root.scss";
import useClientWidth from "./utils/useClientWidth.util";

function App() {
  useClientWidth();
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route index element={<div>Home</div>} />
            <Route path="/car-manage" element={<ManageLayout />}>
              <Route index element={<ManageCar />} />
              <Route path="page/:page" element={<CarManage />} />
              <Route path="detail/:id" element={<DetailCar />} />
              <Route path="add" element={<AddCar />} />
              <Route path="update/:id" element={<UpdateCar />} />
            </Route>
            <Route path="/customer-manage" element={<ManageLayout />}>
              <Route index element={<CustomerManage />} />
              <Route path="page/:page" element={<ManageCustomer />} />
              <Route path="detail/:id" element={<DetailCustomer />} />
              <Route path="add" element={<AddCustomer />} />
              <Route path="update/:id" element={<UpdateCustomer />} />
            </Route>
            <Route path="/driver-manage" element={<ManageLayout />}>
              <Route index element={<ManageDriver />} />
              <Route path="page/:page" element={<ManageDriver />} />
              <Route path="detail/:id" element={<DetailDriver />} />
              <Route path="add" element={<AddDriver />} />
              <Route path="update/:id" element={<UpdateDriver />} />
            </Route>
          </Routes>
        </Layout>

        <ToastContainer
          className={"custom-toast"}
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
