import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const VCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleDownload = () => {
    const url = `https://windoe.link/${name}`;
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${telephone}\nEMAIL:${email}\nURL:${url}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${name}.vcf`;
    link.click();
  };

  return (
    <div className="d-flex flex-column">
      <h2>Create a vCard</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Phone</label>
        <input
          type="number"
          inputMode="numeric"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter PhoneNo"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleDownload}>
        Download vCard
      </button>
      <br />
      <p>Scan this QR code with your mobile device to save the contact:</p>
      <QRCode
        value={`BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${telephone}\nEMAIL:${email}\nEND:VCARD`}
        className="m-auto"
      />
      <p>
        On most devices, you can tap and hold the QR code to bring up a menu
        that will allow you to save the contact.
      </p>
    </div>
  );
};

export default VCard;
