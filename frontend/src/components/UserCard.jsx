import moment from 'moment';
import QRCode from 'qrcode.react';
import { useDispatch } from 'react-redux';
import { deleteCardById, removeCards } from '../features/cards/cardSlice';
import { toast } from 'react-toastify';

const UserCard = ({ user, handleDownload, setEditMode }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeCards(user?._id));
    dispatch(deleteCardById(user?._id));
    toast.success('Card deleted successfully');
  };
  return (
    <div className="goal card shadow-lg px-5">
      <div className="label">Name: {user.card?.name || user?.name}</div>
      <div className="label">Email: {user.card?.email || user.email}</div>
      <div className="label">
        Telephone: {user.card?.telephone || user.telephone}
      </div>
      <div className="label">Website: {user.card?.website || user.website}</div>
      <div className="label">
        Linkedin: {user.card?.linkedin || user.linkedin}
      </div>
      <div className="label">Instagram: {user.card?.instagram}</div>
      <div className="label">
        Snapchat: {user.card?.snapchat || user.snapchat}
      </div>
      <div className="label">
        BirthDate:{' '}
        {moment(user.card?.birthday || user.birthday).format('MM/DD/YYYY')}
      </div>
      <img
        src={user?.image || 'https://via.placeholder.com/150'}
        alt={user.card?.name || user.name}
        className="m-auto"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
      <QRCode
        size={256}
        className="m-auto w-75 h-75"
        value={`https://vcard-app.onrender.com/${user.card?.name || user.name}`}
      />

      <button className="btn btn-primary login__btn" onClick={handleDownload}>
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
      {/* copy link */}
      {/* <CopyToClipboard
          text={`http://localhost:3000/vcard/${user._id}`}
          onCopy={() => toast.success("Copied to clipboard")}
        >
          <button className="btn btn-primary">Copy Link</button>
        </CopyToClipboard> */}
    </div>
  );
};

export default UserCard;
