import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from '../features/cards/cardSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinner from './Spinner';
import imageCompression from 'browser-image-compression';
import '../index.css';
import CustomLabel from './CustomLabel';
import { useNavigate } from 'react-router-dom';

function CardForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isLoading, message, isError } = useSelector(
    (state) => state.cards
  );
  const [uploading, setUploading] = useState(false);
  const [previewImg, setPreviewImg] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const [showPhoneSelect, setShowPhoneSelect] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [showSocialSelect, setShowSocialSelect] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [showOccupationInput, setShowOccupationInput] = useState(false);
  const [occupations, setOccupations] = useState([]);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emails, setEmails] = useState([]);
  const [cardName, setCardName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [website, setWebsite] = useState('');

  // console.log(socialLinks, 'socialLinks');
  // console.log(occupations, 'occupations');
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, dispatch, isError, message]);

  const setSocialType = (value, index) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index].type = value;
    setSocialLinks(newSocialLinks);
  };

  const setSocialLink = (value, index) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index].link = value;
    setSocialLinks(newSocialLinks);
  };

  const handleDeleteSocial = (index) => {
    console.log('handleDeleteSocial');
    const newSocialLinks = [...socialLinks];
    newSocialLinks.splice(index, 1);
    setSocialLinks(newSocialLinks);
  };

  const handleAddSocial = (event) => {
    event.stopPropagation();
    console.log('handleAddSocial');
    setShowSocialSelect(true);
    setSocialLinks([...socialLinks, { type: '', link: '' }]);
  };

  const setPhoneType = (value, index) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index].type = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const setPhoneNumber = (value, index) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index].number = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleDeletePhone = (index) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers.splice(index, 1);
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleAddPhone = () => {
    if (phoneNumbers.length >= 2) {
      return toast.error('You can add only 2 phone numbers');
    }
    setShowPhoneSelect(true);
    setPhoneNumbers([...phoneNumbers, { type: '', number: '' }]);
  };

  const setPositionTitle = (value, index) => {
    const newOccupations = [...occupations];
    newOccupations[index].positionTitle = value;
    setOccupations(newOccupations);
  };

  const setOrganizationName = (value, index) => {
    const newOccupations = [...occupations];
    newOccupations[index].organizationName = value;
    setOccupations(newOccupations);
  };

  const handleDeleteOccupation = (index) => {
    const newOccupations = [...occupations];
    newOccupations.splice(index, 1);
    setOccupations(newOccupations);
  };

  const handleAddOccupation = () => {
    setShowOccupationInput(true);
    if (occupations.length > 1)
      return toast.error('You can add only 1 occupations');
    setOccupations([
      ...occupations,
      { positionTitle: '', organizationName: '' },
    ]);
  };

  const setEmail = (value, index) => {
    const newEmails = [...emails];
    newEmails[index].emailInput = value;
    setEmails(newEmails);
  };

  const handleDeleteEmail = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setShowEmailInput(true);
    if (emails.length >= 2) return toast.error('You can add only 2 email');
    setEmails([...emails, { emailInput: '' }]);
  };

  const createPayload = () => {
    const payloadData = {
      cardName,
      firstName,
      lastName,
      address,
      notes,
      occupations,
      phoneNumbers,
      socialLinks,
      emails,
      image: base64Image,
    };
    return payloadData;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = createPayload();
    console.log(payload, 'payload');
    dispatch(createCard(payload)).then(() => {
      navigate(`/card/${cardName}`);
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log(base64data, 'base64data');
        const formData = new FormData();
        formData.append('file', compressedFile);
        formData.append('filename', compressedFile.name);
        setUploading(true);
        try {
          axios
            .post(`/api/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              const { data } = response;
              setImage(data.filename);
              setBase64Image(base64data);
              setUploading(false);
              setPreviewImg({
                preview: URL.createObjectURL(compressedFile),
                data: compressedFile,
                base64: base64data,
              });
              return toast.success(`Image uploaded successfully`);
            })
            .catch((error) => {
              console.log(error.message);
              setUploading(false);
            });
        } catch (error) {
          console.error(error);
          setUploading(false);
        }
      };
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw new Error(`Error: ${error}`, { cause: error });
    }
  };

  return (
    <section className="vCard__wrapper container">
      {isLoading && <Spinner />}
      <form onSubmit={onSubmit}>
        <div className="form-group mt-2">
          <CustomLabel htmlFor="name" children="card name" />
          <input
            type="text"
            name="cardName"
            id="cardName"
            value={cardName}
            placeholder="Card Name"
            className="form-control input__field"
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div className="imgUpload">
          <label htmlFor="imageInput" className="imgUploadLabel">
            <div className="imgUploadText">Upload Image</div>
            {previewImg && (
              <div
                className="imgPreview"
                style={{ backgroundImage: `url(${previewImg.preview})` }}
              />
            )}
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={uploadFileHandler}
            className="form-control-file"
          />
          {uploading && <Spinner />}
        </div>
        <div className="form-group mt-2">
          <CustomLabel htmlFor="firstName" children="first name" />
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            placeholder="First Name"
            className="form-control input__field"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <CustomLabel htmlFor="lastName" children="last name" />
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            placeholder="Last Name"
            className="form-control input__field"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* phone number */}
        <div className="d-flex flex-column">
          <div className="phone__text">
            <span onClick={handleAddPhone}>Add Phone</span>
          </div>
          {showPhoneSelect &&
            phoneNumbers.map((phone, index) => (
              <React.Fragment key={index}>
                <div className="d-flex" style={{ justifyContent: 'start' }}>
                  <CustomLabel htmlFor="phone" children="Phone" />
                </div>
                <div className="d-flex">
                  <select
                    className="form-select input__select"
                    value={phone.type}
                    onChange={(e) => setPhoneType(e.target.value, index)}
                  >
                    <option value="">Type</option>
                    <option value="cell">Cell</option>
                    <option value="fax">Fax</option>
                    <option value="main">Main</option>
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phone.number}
                    placeholder="Enter phone number"
                    className="form-control input__field"
                    onChange={(e) => setPhoneNumber(e.target.value, index)}
                  />

                  <button
                    className="delete__btn"
                    onClick={() => handleDeletePhone(index)}
                  >
                    x
                  </button>
                </div>
              </React.Fragment>
            ))}
        </div>
        {/*  Social links */}
        <div className="d-flex flex-column">
          <div className="phone__text my-2">
            <span onClick={handleAddSocial}>Add Social</span>
          </div>
          {showSocialSelect &&
            socialLinks.map((link, index) => (
              <React.Fragment key={index}>
                <div className="d-flex" style={{ justifyContent: 'start' }}>
                  <CustomLabel htmlFor="social" children="Social" />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="socialType"
                    id="socialType"
                    placeholder="social type"
                    className="form-control input__field w-25"
                    value={link.type}
                    onChange={(e) => setSocialType(e.target.value, index)}
                  />
                  <input
                    type="text"
                    name="socialLink"
                    id="socialLink"
                    value={link.link}
                    placeholder="Enter your social type"
                    className="form-control input__field"
                    onChange={(e) => setSocialLink(e.target.value, index)}
                  />
                  <button
                    className="delete__btn"
                    onClick={() => handleDeleteSocial(index)}
                  >
                    x
                  </button>
                </div>
              </React.Fragment>
            ))}
        </div>
        {/* Occupation */}
        <div className="d-flex flex-column">
          <div className="phone__text">
            <span onClick={handleAddOccupation}>Add Occupation</span>
          </div>
          {showOccupationInput &&
            occupations.map((occupation, index) => (
              <React.Fragment key={index}>
                <div className="d-flex" style={{ justifyContent: 'start' }}>
                  <CustomLabel htmlFor="occupation" children="Occupation" />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="positionTitle"
                    id="positionTitle"
                    value={occupation.positionTitle}
                    placeholder="position"
                    className="form-control input__field w-25"
                    onChange={(e) => setPositionTitle(e.target.value, index)}
                  />
                  <input
                    type="text"
                    name="organizationName"
                    id="organizationName"
                    value={occupation.organizationName}
                    placeholder="Enter organization name"
                    className="form-control input__field"
                    onChange={(e) => setOrganizationName(e.target.value, index)}
                  />
                  <button
                    className="delete__btn"
                    onClick={() => handleDeleteOccupation(index)}
                  >
                    x
                  </button>
                </div>
              </React.Fragment>
            ))}
        </div>
        {/* email */}
        <div className="d-flex flex-column">
          <div className="phone__text">
            <span onClick={handleAddEmail}>Add Email</span>
          </div>
          {showEmailInput &&
            emails.map((email, index) => (
              <React.Fragment key={index}>
                <div className="d-flex" style={{ justifyContent: 'start' }}>
                  <CustomLabel htmlFor="Email" children="Email" />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="organizationName"
                    id="organizationName"
                    value={email.emailInput}
                    placeholder="Enter email"
                    className="form-control input__field"
                    onChange={(e) => setEmail(e.target.value, index)}
                  />
                  <button
                    className="delete__btn"
                    onClick={() => handleDeleteEmail(index)}
                  >
                    x
                  </button>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            pattern="^(https?|ftp)://[^\s/$.?#].[^\s]*$"
            placeholder="Enter your Website"
            className="form-control input__field"
            onChange={(e) => setWebsite(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            name="address"
            id="address"
            value={address}
            placeholder="Enter your Address"
            className="form-control textarea__field"
            onChange={(e) => setAddress(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            name="notes"
            id="notes"
            value={notes}
            placeholder="Enter your Notes"
            className="form-control textarea__field"
            onChange={(e) => setNotes(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary login__btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Create'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CardForm;
