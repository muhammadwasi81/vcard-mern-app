import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
    toast.success('User Logged out successfully');
  };

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/register' && (
        <header className="header py-2">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="logo">
              <Link to="/">
                <img
                  src="https://windoe.shop/wp-content/uploads/2021/09/LOGO-WINDOE-APROBADO-01.png"
                  alt="logo"
                  className="img-fluid"
                  loading="lazy"
                  style={{ width: '25%' }}
                />
              </Link>
            </div>
            <ul className="list-unstyled d-flex mb-0">
              {user ? (
                <li className="mx-2">
                  <button className="btn btn-danger" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="mx-2">
                    <Link to="/login" className="btn btn-primary">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link to="/register" className="btn btn-secondary">
                      <FaUser /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
