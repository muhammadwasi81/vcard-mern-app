import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import {
  getCards,
  getCardsForCurrentUser,
  reset,
} from "../features/cards/cardSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );
  console.log("singleUser data", cards);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(getCards());
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
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>vCard Dashboard</p>
      </section>
      <GoalForm />
      <section className="goals">
        {cards?.map((card) => (
          <GoalItem key={card?._id} user={card} />
        ))}
      </section>
    </>
  );
}

export default Dashboard;
