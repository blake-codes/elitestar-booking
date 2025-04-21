import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/ Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";

import Messages from "./pages/Messages";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./pages/HowItWorks";
import Celebrities from "./pages/Celebrities";
import CelebrityDetails from "./pages/CelebrityDetails";
import AddCeleb from "./pages/AddCeleb";
import Bookings from "./pages/Bookings";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/celebrities" element={<Celebrities />} />
          <Route path="/celebrities/:id" element={<CelebrityDetails />} />
          <Route path="/blog" element={<Blog />} />

          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/accounts" element={<AdminDashboard />} />
            <Route path="/add-celeb" element={<AddCeleb />} />

            <Route path="/messages" element={<Messages />} />
            <Route path="/bookings" element={<Bookings />} />
          </Route>
          <Route
            element={<ProtectedRoute redirectTo="/" requireAdmin />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
