import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import CardForm from '../components/CardForm';
import UpdateCardInfo from '../components/UpdateCardInfo';
import { getCardByIdAction, reset } from '../features/cards/cardSlice';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log(user, 'user in home page');
  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );
  console.log(cards, 'card');

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    user && dispatch(getCardByIdAction(user?._id));
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <CardForm />
      <section className="goals">
        {cards &&
          cards?.map((card) => <UpdateCardInfo key={card._id} user={card} />)}
      </section>
    </>
  );
}

export default Dashboard;
