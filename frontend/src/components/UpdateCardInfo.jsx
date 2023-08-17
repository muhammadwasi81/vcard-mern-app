import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardById } from '../features/cards/cardSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
import UserCard from './UserCard';
import { handleDownload } from '../utils/vCardDownload';

function UpdateCardInfo({ user }) {
  console.log(user, 'userview');
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdateUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emailInput') {
      setUpdateUser((prev) => ({
        ...prev,
        emails: [{ emailInput: value }],
      }));
    } else {
      setUpdateUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedUser.name !== user.name || updatedUser.email !== user.email) {
      return toast.error('Name and Email cannot be changed');
    }
    const payload = {
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      emails: updatedUser.emails,
      address: updatedUser.address,
      cardName: updatedUser.cardName,
      notes: updatedUser.notes,
      phoneNumbers: updatedUser.phoneNumbers,
      socialLinks: updatedUser.socialLinks,
      occupations: updatedUser.occupations,
    };
    console.log(payload, 'payload');
    dispatch(updateCardById({ payload }));
    setEditMode(false);
  };

  if (editMode) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="goal card shadow-lg  px-5">
          <div>
            <input
              type="text"
              name="firstName"
              className="form-control input__field"
              value={updatedUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              className="form-control input__field"
              value={updatedUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="emailInput" // Changed name
              className="form-control input__field"
              value={updatedUser.emails[0].emailInput} // Changed value
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="phoneNumbers"
              className="form-control input__field"
              value={updatedUser.phoneNumbers[0]?.number} // Changed value
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="socialLinks"
              id="socialLinks"
              className="form-control input__field"
              value={
                updatedUser?.socialLinks?.find(
                  (sl) =>
                    sl?.type === 'insta' ||
                    sl?.type === 'instagram' ||
                    sl?.type === 'facebook' ||
                    sl?.type === 'snapchat'
                )?.link
              }
              onChange={handleInputChange}
            />
          </div>
          {/* Occupation (assuming it's always the first one) */}
          <div>
            <input
              type="text"
              name="occupations"
              className="form-control input__field"
              value={updatedUser.occupations[0]?.organizationName} // Changed value
              onChange={handleInputChange}
            />
          </div>
          <img
            src={updatedUser.image}
            alt={updatedUser.name}
            className="m-auto"
            style={{ width: ' 50px', height: '50px', borderRadius: '50%' }}
          />
          <button className="btn btn-primary w-25" type="submit">
            Update
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <UserCard
      user={user}
      handleDownload={() => handleDownload(user)}
      setEditMode={setEditMode}
    />
  );
}

export default UpdateCardInfo;
