import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';
import VCard from '../components/VCard';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  console.log('goals', goals);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Card Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((user) => (
              <GoalItem key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <h3>You have not set any card</h3>
        )}
        {/* <VCard /> */}
      </section>
    </>
  );
}

export default Dashboard;
