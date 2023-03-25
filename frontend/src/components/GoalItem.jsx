import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

function GoalItem({ user }) {
  console.log('user', user);
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(user.createdAt).toLocaleString('en-US')}</div>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
      <h2>{user.phone}</h2>
      <button onClick={() => dispatch(deleteGoal(user._id))} className="close">
        X
      </button>
    </div>
  );
}

export default GoalItem;
