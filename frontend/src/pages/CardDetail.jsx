import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDetail } from '../features/cards/cardSlice';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'; // import the QRCode library
import Spinner from '../components/Spinner';
import { FaDownload, FaQrcode } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

const CardDetail = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { CardDetail, isLoading } = useSelector((state) => state.cards);
  console.log(CardDetail);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDownload = () => {
    // TODO: implement vCard download logic here
    console.log('Download button clicked');
  };

  useEffect(() => {
    dispatch(getCardDetail(name));
  }, [name, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <img
              src={CardDetail?.image || 'https://vcard.link/avatar/DcUd'}
              style={{
                width: '100%',
                borderRadius: '50%',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
              alt={CardDetail?.name}
              className="img-fluid"
            />
            <h4 className="mt-2">{CardDetail?.cardName}</h4>
            <p>{CardDetail?.occupations?.map((x) => x?.organizationName)}</p>
          </div>
          <div className="col-sm-8">
            <h1>VCardLink</h1>
            <div>
              <FaQrcode
                size={32}
                onClick={handleShow}
                style={{ marginRight: '10px', cursor: 'pointer' }}
              />
              <FaDownload
                size={32}
                onClick={handleDownload}
                style={{
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>QR Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QRCode
              size={256}
              value={`https://vcard-app.onrender.com/${CardDetail.cardName}`}
            />
          </Modal.Body>
        </Modal>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QRCode
            size={256}
            className="m-auto w-75 h-75"
            value={`https://vcard-app.onrender.com/${CardDetail.cardName}`}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardDetail;
