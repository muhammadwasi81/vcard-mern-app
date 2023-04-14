import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../features/cards/cardSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "./Spinner";

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
      image: `/images/${image}`,
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
    const formData = new FormData();
    const files = e.target.files[0];
    formData.append("file", files);
    formData.append("filename", e.target.files[0].name);
    console.log(formData, "formData");
    setUploading(true);
    try {
      const { data } = await axios.post(`/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "data");
      setImage(data.filename);
      setUploading(false);
      setPreviewImg({
        preview: URL.createObjectURL(files),
        data: files,
      });
    } catch (error) {
      console.error(error);
      setUploading(false);
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
