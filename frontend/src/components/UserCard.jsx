import QRCode from 'qrcode.react';
import { useDispatch } from 'react-redux';
import { deleteCardById, removeCards } from '../features/cards/cardSlice';
import { toast } from 'react-toastify';

const UserCard = ({ user, handleDownload, setEditMode }) => {
  console.log(user, 'user in usercard');
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeCards(user?._id));
    dispatch(deleteCardById(user?._id));
    toast.success('Card deleted successfully');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="goal card shadow-lg px-5">
      <div className="label">Card Name: {user?.cardName || ''}</div>
      <div className="label">First Name: {user?.firstName || ''}</div>
      <div className="label">Last Name: {user?.lastName || ''}</div>
      <div className="label">Address: {user?.address || ''}</div>
      <div className="label">Website: {user?.website || ''}</div>
      <div className="label">Notes: {user?.notes || ''}</div>
      {user.occupations?.map((occupation, index) => (
        <div key={index}>
          <div className="label">
            Occupation Title: {occupation.positionTitle || ''}
          </div>
          <div className="label">
            Organization Name: {occupation.organizationName || ''}
          </div>
        </div>
      ))}
      {user.phoneNumbers?.map((phone, index) => (
        <div key={index}>
          <div className="label">Phone Type: {phone.type || ''}</div>
          <div className="label">Phone Number: {phone.number || ''}</div>
        </div>
      ))}
      {user?.socialLinks?.map((link, index) => (
        <div key={index}>
          <div className="label">Social Link Type: {link.type}</div>
          <div className="label">Social Link: {link.link}</div>
        </div>
      ))}
      {user.emails?.map((email, index) => (
        <div key={index}>
          <div className="label">Email: {email.emailInput || ''}</div>
        </div>
      ))}
      <img
        src={user.image || 'https://via.placeholder.com/150'}
        alt={user.cardName}
        className="m-auto"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
      <QRCode
        size={256}
        className="m-auto w-75 h-75"
        value={`https://vcard-app.onrender.com/${user.cardName}`}
      />
      <button
        className="btn btn-primary w-50 login__btn"
        onClick={() => handleDownload(user)}
      >
        Download vCard
      </button>
      <button onClick={handleDelete} className="close">
        X
      </button>
      <button
        className="btn btn-danger mt-2 w-25 m-auto"
        onClick={() => setEditMode(true)}
      >
        Edit
      </button>
    </div>
  );
};

export default UserCard;
