import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import EditSeats from './EditSeats';
import About from './About';
import ZImporter from './ZImporter';
import Tutorials from './Tutorials';
import Terms from './Terms';
import BuyLicense from './BuyLicense';
import License from './License';
import PaymentSuccess from './PaymentSuccess';
import PaymentCancelled from './PaymentCancelled';
import './App.css';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple attempts to ensure scroll to top
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    scrollToTop();
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-seats/:id" element={<EditSeats />} />
              <Route path="/about" element={<About />} />
              <Route path="/z-importer" element={<ZImporter />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/buy-license" element={<BuyLicense />} />
              <Route path="/license" element={<License />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancelled" element={<PaymentCancelled />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
