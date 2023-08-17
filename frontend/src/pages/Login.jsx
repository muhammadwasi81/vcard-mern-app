import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import '../index.css';
import { AiFillEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill all the fields');
    const userData = {
      email,
      password,
    };
    dispatch(login(userData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('User Logged in successfully');
      } else {
        toast.error('Sorry, Something went wrong');
      }
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <div className="row">
        <img
          src="https://windoe.shop/wp-content/uploads/2021/09/LOGO-WINDOE-APROBADO-01.png"
          alt="logo"
          className="img-fluid logo w-25 m-auto my-5"
        />
        <div>
          <h2 className="text-uppercase text-primary mt-2">sign in</h2>
          <button className="btn btn-primary btn-sm google__btn">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
              className="img-fluid google__logo"
            />
            {'  '}
            Sign in with Google
          </button>
        </div>
        <div className="my-2 d-flex justify-content-center align-items-center">
          <div className="border-width border-bottom"></div>
          <span className="mx-2 text-muted">or</span>
          <div className="border-width border-bottom"></div>
        </div>
        <form
          onSubmit={onSubmit}
          className="d-flex flex-column justify-content-center align-items-center"
        >
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
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control input__field"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
              <div
                className="eye__icon__container"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye className="eye__icon" />
                ) : (
                  <AiOutlineEyeInvisible className="eye__icon" />
                )}
              </div>
            </div>
          </div>
          <div>
            Don't have an account?
            <Link to="/register" className="text-primary">
              {' '}
              Sign up
            </Link>
          </div>
          <button type="submit" className="btn btn-primary login__btn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
