import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getAllCards } from '../features/cards/cardSlice';
import { BiError } from 'react-icons/bi';
import { toast } from 'react-toastify';
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
      <section className="w-50 flex m-auto">
        {cards && cards.length > 0 ? (
          cards?.map((card, index) => <GoalItem key={index} user={card} />)
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
