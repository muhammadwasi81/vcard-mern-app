import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getAllCards } from '../features/cards/cardSlice';
import CardForm from '../components/CardForm';

function Dashboard() {
  const dispatch = useDispatch();
  const { cards, isLoading } = useSelector((state) => state.cards);
  console.log('All cards', cards);

  useEffect(() => {
    dispatch(getAllCards());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <CardForm />
    </>
  );
}

export default Dashboard;
