import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardById } from '../features/cards/cardSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
import UserCard from './UserCard';

function GoalItem({ user }) {
  console.log(user, 'GoalItem');
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

  const handleDownload = () => {
    const imageBase64 = user.image.split(',')[1];
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${user.name}\nTEL:${
      user.telephone
    }\nEMAIL:${user.email}\nURL:${user.website}\nBDAY:${new Date(user.birthday)
      .toISOString()
      .substring(
        0,
        10
      )}\nPHOTO;TYPE=JPEG;ENCODING=BASE64:${imageBase64}\nX-SOCIALPROFILE;TYPE=linkedin:${
      user.linkedin
    }\nX-SOCIALPROFILE;TYPE=instagram:${
      user.instagram
    }\nX-SOCIALPROFILE;TYPE=snapchat:${user.snapchat}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${user.name}.vcf`;
    link.click();
  };

  // useEffect(() => {
  //   handleDownload();
  // }, []);

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
      handleDownload={handleDownload}
      setEditMode={setEditMode}
    />
  );
}

export default GoalItem;
