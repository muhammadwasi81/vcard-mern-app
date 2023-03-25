import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

function GoalForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ name, email, phone }));
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            name="text"
            id="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="text"
            id="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Phone</label>
          <input
            type="number"
            inputMode="numeric"
            name="text"
            id="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Card
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
