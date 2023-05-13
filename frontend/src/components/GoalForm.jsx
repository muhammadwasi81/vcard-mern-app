import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../features/cards/cardSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "./Spinner";
import imageCompression from "browser-image-compression";

function GoalForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [website, setWebsite] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [base64Image, setBase64Image] = useState("");

  console.log("base64Image", base64Image);
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
    console.log(payloadData, "payloadData");
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
    if (entities.some((entity) => entity === "")) {
      return toast.error("Please fill in all fields");
    }
    const payload = createPayload();
    dispatch(createCard(payload));
    setName("");
    setEmail("");
    setPhone("");
    setBirthday("");
    setWebsite("");
    setSnapchat("");
    setInstagram("");
    setLinkedin("");
    setImage("");
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
        console.log(base64data, "base64data");
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("filename", compressedFile.name);
        setUploading(true);
        try {
          axios
            .post(`/api/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              const { data } = response;
              console.log(data, "data");
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
              console.error(error);
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
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={uploadFileHandler}
          />
          {uploading && <Spinner />}
          {previewImg && (
            <img src={previewImg.preview} width="100" height="100" alt="#" />
          )}
        </div>
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
        <div className="form-group">
          <label htmlFor="text">Birthday</label>
          <input
            type="date"
            name="date"
            id="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Website</label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Snapchat</label>
          <input
            type="text"
            name="text"
            id="text"
            value={snapchat}
            onChange={(e) => setSnapchat(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">linkedin</label>
          <input
            type="text"
            name="text"
            id="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Instagram</label>
          <input
            type="text"
            name="text"
            id="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
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
