import "./styles/app.scss";
import "./styles/reset.scss";
import "./styles/root.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useClientWidth from "./utils/useClientWidth.util";
import CarManage from "./pages/CarManage/CarManage";
import AddCar from "./pages/CarManage/AddCar";
import UpdateCar from "./pages/CarManage/UpdateCar";
import Layout from "./layouts/Layout";
import DetailCar from "./pages/CarManage/DetailCar";
import ManageLayout from "./layouts/ManageLayout";
import CustomerManage from "./pages/CustomerManage/CustomerManage";
import AddCustomer from "./pages/CustomerManage/AddCustomer";
import UpdateCustomer from "./pages/CustomerManage/UpdateCustomer";

function App() {
  useClientWidth();
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route index element={<div>Home</div>} />
            <Route path="/car-manage" element={<ManageLayout />}>
              <Route index element={<CarManage />} />
              <Route path="page/:page" element={<CarManage />} />
              <Route path="detail/:id" element={<DetailCar />} />
              <Route path="add" element={<AddCar />} />
              <Route path="update/:id" element={<UpdateCar />} />
            </Route>
            <Route path="/customer-manage" element={<ManageLayout />}>
              <Route index element={<CustomerManage />} />
              <Route path="page/:page" element={<CustomerManage />} />
              {/* <Route path="detail/:id" element={<CustomerDetail />} /> */}
              <Route path="add" element={<AddCustomer />} />
              <Route path="update/:id" element={<UpdateCustomer />} />
            </Route>
          </Routes>
        </Layout>

        <ToastContainer
          position="top-right"
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
