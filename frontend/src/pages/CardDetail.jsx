import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDetail } from '../features/cards/cardSlice';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Spinner from '../components/Spinner';
import { Modal } from 'react-bootstrap';
import {
  FaEnvelope,
  FaGlobe,
  FaBuilding,
  FaNotesMedical,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaStickyNote,
  FaMapMarker,
  FaQrcode,
  FaDownload,
} from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

const CardDetail = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { CardDetail, isLoading } = useSelector((state) => state.cards);
  console.log(CardDetail);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDownload = () => {
    const {
      image,
      firstName,
      lastName,
      address,
      occupations,
      phoneNumbers,
      socialLinks,
      emails,
      website,
      notes,
    } = CardDetail;

    let vCardData = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};;;\nFN:${firstName} ${lastName}\n`;

    if (image) {
      vCardData += `PHOTO;ENCODING=b;TYPE=JPEG:${image.split(',')[1]}\n`;
    }

    if (occupations && occupations[0]) {
      vCardData += `ORG:${occupations[0].organizationName}\nTITLE:${occupations[0].positionTitle}\n`;
    }

    if (phoneNumbers && phoneNumbers[0]) {
      vCardData += `TEL;TYPE=WORK,VOICE:${phoneNumbers[0].number}\n`;
    }

    if (emails && emails[0]) {
      vCardData += `EMAIL;TYPE=INTERNET:${emails[0].emailInput}\n`;
    }

    vCardData += `ADR;TYPE=HOME:;;${address};;;;\n`;

    if (website) {
      vCardData += `URL:${website}\n`;
    }

    if (notes) {
      vCardData += `NOTE:${notes}\n`;
    }

    if (socialLinks && socialLinks[0]) {
      vCardData += `X-SOCIALPROFILE:${socialLinks[0].link}\n`;
    }

    vCardData += 'END:VCARD';

    const vCardBlob = new Blob([vCardData], {
      type: 'text/vcard;charset=utf-8;',
    });

    const url = window.URL.createObjectURL(vCardBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${firstName}_${lastName}.vcf`;
    link.click();
  };

  useEffect(() => {
    dispatch(getCardDetail(name));
  }, [name, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="row">
          <div className="col-sm-4">
            {CardDetail?.image && (
              <img
                src={CardDetail?.image}
                style={{
                  width: '100%',
                  height: '35%',
                  borderRadius: '50%',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                }}
                alt={CardDetail?.name}
                className="img-fluid"
              />
            )}
            <h4 className="mt-2">{CardDetail?.cardName}</h4>
            {CardDetail?.occupations?.map((x, i) => (
              <p key={i}>
                <FaBuilding size={25} /> {x?.organizationName}
              </p>
            ))}
            {CardDetail?.phoneNumbers?.map((phone, i) => (
              <p key={i}>
                <FaPhone size={25} /> {phone?.number}
              </p>
            ))}
            {CardDetail?.emails?.map((email, i) => (
              <p key={i}>
                <FaEnvelope size={25} /> {email?.emailInput}
              </p>
            ))}
            {CardDetail?.socialLinks?.map((social, i) => (
              <p key={i}>
                {social?.type === 'insta' ? (
                  <FaInstagram size={25} />
                ) : social?.type === 'facebook' ? (
                  <FaFacebook size={25} />
                ) : null}{' '}
                {social?.link}
              </p>
            ))}
            <p>
              <AiFillHome size={25} /> {CardDetail?.address}
            </p>
            <p>
              <FaGlobe size={25} /> {CardDetail?.website}
            </p>
            <p>
              <FaNotesMedical size={25} /> {CardDetail?.notes}
            </p>
            <p>{CardDetail?.occupations?.map((x) => x?.organizationName)}</p>
            {CardDetail?.notes && (
              <p>
                <FaStickyNote /> {CardDetail?.notes}
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
            value={`https://vcard-app.onrender.com/card/${CardDetail.cardName}`}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardDetail;
