import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCard } from '../features/cards/cardSlice';
import QRCode from 'qrcode.react';
import { toast } from 'react-toastify';

function GoalForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const dispatch = useDispatch();

  // const handleDownload = () => {
  //   const url = `https://windoe.link/${name}`;
  //   const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nURL:${url}\nEND:VCARD`;
  //   const blob = new Blob([vcard], { type: 'text/vcard' });
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = `${name}.vcf`;
  //   link.click();
  // };

  useEffect(() => {
    async function generateQRCode() {
      const qrData = await QRCode.toDataURL(
        JSON.stringify({ name, email, phone })
      );
      setQrCodeData(qrData);
    }
    generateQRCode();
  }, [name, email, phone]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      return toast.error('Please fill in all fields');
    }
    dispatch(createCard({ name, email, telephone: phone }, qrCodeData));
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
        {/* <div>
          <button className="btn btn-primary" onClick={handleDownload}>
            Download vCard
          </button>
          <br />
          <p>Scan this QR code with your mobile device to save the contact:</p>
          <QRCode
            value={`BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`}
            className="m-auto"
          />
          <p>
            On most devices, you can tap and hold the QR code to bring up a menu
            that will allow you to save the contact.
          </p>
        </div> */}
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
