import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stores from "./pages/Stores";
import SKUs from "./pages/SKUs";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";
import Layout from "./components/layout/Layout";

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/stores" element={<Stores />} />
          <Route path="/skus" element={<SKUs />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
