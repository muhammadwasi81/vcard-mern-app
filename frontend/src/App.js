import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/404';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <>
      <ToastContainer position="top-right" draggable={false} autoClose={3000} />
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/card/:name" element={<CardDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
