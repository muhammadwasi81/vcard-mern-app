import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
// import VCard from '../components/VCard';
import { getCards, reset } from '../features/cards/cardSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );
  console.log('cards', cards);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getCards());

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
      <section className="goals">
        {cards?.map((card) => (
          <GoalItem key={card._id} user={card} />
        ))}
      </section>
    </>
  );
}

export default Dashboard;
