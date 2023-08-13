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
    setUpdateUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedUser.name !== user.name || updatedUser.email !== user.email) {
      return toast.error('Name and Email cannot be changed');
    }
    const payload = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      telephone: updatedUser.telephone,
      birthday: updatedUser.birthday,
      website: updatedUser.website,
      snapchat: updatedUser.snapchat,
      instagram: updatedUser.instagram,
      linkedin: updatedUser.linkedin,
      image: updatedUser.image,
    };
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
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="telephone"
              value={updatedUser.telephone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="url"
              name="website"
              value={updatedUser.website}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="linkedin"
              value={updatedUser.linkedin}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="instagram"
              value={updatedUser.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="snapchat"
              value={updatedUser.snapchat}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="date"
              name="birthday"
              value={moment(updatedUser.birthday).format('YYYY-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <img
            src={updatedUser.image}
            alt={updatedUser.name}
            className="m-auto"
            style={{ width: ' 50px', height: '50px', borderRadius: '50%' }}
          />
          <button className="btn btn-primary" type="submit">
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
