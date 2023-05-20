import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import "../index.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const entries = [name, email, password, password2];

  const onSubmit = (e) => {
    e.preventDefault();
    if (entries.some((entry) => entry === "")) {
      return toast.error("Please fill in all fields");
    }
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="container">
        <div className="row">
          <img
            src="https://windoe.shop/wp-content/uploads/2021/09/LOGO-WINDOE-APROBADO-01.png"
            alt="logo"
            className="img-fluid logo w-25 m-auto my-5"
          />
          <h2 className="text-uppercase text-primary mt-2">sign up</h2>
          <form
            onSubmit={onSubmit}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control input__field"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control input__field"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control input__field"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control input__field"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary login__btn">
              Register
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
