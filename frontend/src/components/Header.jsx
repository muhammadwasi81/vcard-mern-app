import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register" && (
        <header className="header">
          <div className="logo">
            <Link to="/">
              <img
                src="https://windoe.shop/wp-content/uploads/2021/09/LOGO-WINDOE-APROBADO-01.png"
                alt="logo"
                className="img-fluid w-25"
              />
            </Link>
          </div>
          <ul>
            {user ? (
              <li>
                <button className="btn btn-danger" onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </header>
      )}
    </>
  );
}

export default Header;
