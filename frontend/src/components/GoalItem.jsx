import { useDispatch } from 'react-redux';
import { deleteCardById } from '../features/cards/cardSlice';
import QRCode from 'qrcode.react';

function GoalItem({ user }) {
  console.log('user', user);
  const dispatch = useDispatch();

  const handleDownload = () => {
    const url = `https://windoe.link/${user.name}`;
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${user.name}\nTEL:${user.phone}\nEMAIL:${user.email}\nURL:${url}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${user.name}.vcf`;
    link.click();
  };

  return (
    <div className="goal">
      <div>{new Date(user.createdAt).toLocaleString('en-US')}</div>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
      <h2>{user.telephone}</h2>
      <QRCode
        value={`BEGIN:VCARD\nVERSION:3.0\nN:${user.name}\nTEL:${user.telephone}\nEMAIL:${user.email}\nEND:VCARD`}
      />
      <button className="btn btn-primary" onClick={handleDownload}>
        Download vCard
      </button>
      <button
        onClick={() => dispatch(deleteCardById(user._id))}
        className="close"
      >
        X
      </button>
    </div>
  );
}

export default GoalItem;
