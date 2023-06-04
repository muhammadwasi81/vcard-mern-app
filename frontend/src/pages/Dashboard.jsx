import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getCardsForCurrentUser, reset } from '../features/cards/cardSlice';
import { BiError } from 'react-icons/bi';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );
  console.log('singleUser data', cards);
  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.log('error', isError);
    }

    if (!user) {
      navigate('/');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getCardsForCurrentUser(user?._id));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <GoalForm />
      <section className="w-50 flex m-auto">
        {cards && cards.length > 0 ? (
          cards?.map((card) => <GoalItem key={card?._id} user={card} />)
        ) : (
          <div>
            <BiError className="display-2" />
            <h2 className="text-center">No vCard Found</h2>
          </div>
        )}
      </section>
    </>
  );
}

export default Dashboard;
