import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/register' && (
        <header className="navbar flex-nowrap navbar-expand-lg">
          <div className="container">
            <Link to="/">
              <img
                src="https://windoe.shop/wp-content/uploads/2021/09/LOGO-WINDOE-APROBADO-01.png"
                alt="logo"
                className="img-fluid"
                style={{ width: '150px' }}
              />
            </Link>
            <ul className="navbar-nav flex-row align-items-center">
              {user ? (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={onLogout}>
                    <FaSignOutAlt className="ml-auto" /> Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-primary me-2">
                      <FaSignInAlt className="me-2" /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-secondary">
                      <FaUser className="me-2" /> Register
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
