import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCard } from '../features/cards/cardSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinner from './Spinner';
import imageCompression from 'browser-image-compression';
import '../index.css';

function GoalForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [website, setWebsite] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [base64Image, setBase64Image] = useState('');

  const createPayload = () => {
    const payloadData = {
      name,
      email,
      telephone: phone,
      birthday,
      website,
      snapchat,
      instagram,
      linkedin,
      image: base64Image,
    };
    return payloadData;
  };
  const entities = [
    name,
    email,
    phone,
    birthday,
    website,
    snapchat,
    instagram,
    linkedin,
    image,
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (entities.some((entity) => entity === '')) {
      return toast.error('Please fill in all fields');
    }
    const payload = createPayload();
    dispatch(createCard(payload));
    setName('');
    setEmail('');
    setPhone('');
    setBirthday('');
    setWebsite('');
    setSnapchat('');
    setInstagram('');
    setLinkedin('');
    setImage('');
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
      throw new Error(`Error: ${error}`, { cause: error });
    }
  };
  return (
    <section className="vCard__wrapper">
      <form onSubmit={onSubmit}>
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
        <div className="form-group">
          <label htmlFor="text" className="label">
            Name
          </label>
          <input
            type="text"
            name="text"
            id="text"
            value={name}
            placeholder="Enter your Name"
            className="form-control input__field"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="text"
            id="text"
            value={email}
            placeholder="Enter your Email"
            className="form-control input__field"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="label">
            Phone
          </label>
          <input
            type="number"
            inputMode="numeric"
            name="text"
            id="text"
            value={phone}
            placeholder="Enter your Phone"
            className="form-control input__field"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="label">
            Birthday
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={birthday}
            placeholder="Enter your Birthday"
            className="form-control input__field"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="label">
            Website
          </label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            pattern="^(https?|ftp)://[^\s/$.?#].[^\s]*$"
            placeholder="Enter your Website"
            className="form-control input__field"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="label">
            Snapchat
          </label>
          <input
            type="text"
            name="text"
            id="text"
            value={snapchat}
            pattern="^[a-zA-Z][a-zA-Z0-9_]{2,14}$"
            placeholder="Enter your Snapchat"
            className="form-control input__field"
            onChange={(e) => setSnapchat(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="label">
            linkedin
          </label>
          <input
            type="text"
            name="text"
            id="text"
            value={linkedin}
            pattern="^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$"
            placeholder="Enter your linkedin"
            className="form-control input__field"
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="label">
            Instagram
          </label>
          <input
            type="text"
            name="text"
            id="text"
            value={instagram}
            pattern="^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$"
            placeholder="Enter your Instagram"
            className="form-control input__field"
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary login__btn" type="submit">
            Create
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
