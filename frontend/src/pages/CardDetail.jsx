import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDetail } from '../features/cards/cardSlice';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'; 
import Spinner from '../components/Spinner';
import { FaDownload, FaQrcode, FaNote, FaMapMarker, FaGlobe, FaPhone } from 'react-icons/fa';
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
            {CardDetail?.image && (
           <img
              src={CardDetail?.image}
              style={{
                width: '100%',
                borderRadius: '50%',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
              alt={CardDetail?.name}
              className="img-fluid"
            />
          )}
            <h4 className="mt-2">{CardDetail?.cardName}</h4>
            <p>{CardDetail?.occupations?.map((x) => x?.organizationName)}</p>
            {CardDetail?.notes && (
              <p>
              <FaNote /> {CardDetail?.notes}
            </p>
            )}
            {CardDetail?.address && (
              <p>
                <FaMapMarker /> {CardDetail?.address}
              </p>
            )}   
           {CardDetail?.website && (
              <p>
              <FaGlobe /> {CardDetail?.website}
            </p>
           )}
           {CardDetail?.phone && (
              <p>
                <FaPhone /> {CardDetail?.phone}
              </p>
            )}
          </div>
          <div className="col-sm-8">
            <h1>VCardLink</h1>
            <div>
              <FaQrcode
                size={32}
                onClick={handleShow}
                style={{ marginRight: '10px', cursor: 'pointer' }}
              />
              <span>Scan</span>
              <FaDownload
                size={32}
                onClick={handleDownload}
                style={{
                  cursor: 'pointer',
                }}
              />
              <span>Save</span>
            </div>
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
            className="m-auto w-75 h-75"
            value={`https://vcard-app.onrender.com/card/${CardDetail?.cardName}`}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardDetail;
