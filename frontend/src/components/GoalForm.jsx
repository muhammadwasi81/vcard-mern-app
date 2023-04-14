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
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");

  console.log(image.data, "image frontend");
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
      image: image.data,
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
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFileChange = async (e) => {
  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0]);
  //   formData.append("filename", e.target.files[0].name);
  //   try {
  //     setUploading(true);
  //     const response = await axios.post(`/api/upload`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     if (response.status === 200) {
  //       setStatus(response.data);
  //       setUploading(false);
  //       console.log(`File uploaded successfully`);
  //     } else {
  //       console.log(`Error uploaded successfully`);
  //       setStatus(response.status);
  //       setUploading(false);
  //     }
  //   } catch (error) {
  //     console.log(`Error uploading file: ${error}`, { cause: error });
  //   }
  //   const previewImg = {
  //     preview: URL.createObjectURL(e.target.files[0]),
  //     data: e.target.files[0],
  //   };
  //   setImage(previewImg);
  // };

  const handleFileChange = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    const blob = new Blob([file], { type: file.type });
    formData.append("file", blob, file.name);
    formData.append("filename", file.name);
    try {
      setUploading(true);
      const response = await axios.post(`/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setStatus(response.data);
        setUploading(false);
        console.log(`File uploaded successfully`);
      } else {
        console.log(`Error uploaded successfully`);
        setStatus(response.status);
        setUploading(false);
      }
    } catch (error) {
      console.log(`Error uploading file: ${error}`, { cause: error });
    }
    const previewImg = {
      preview: URL.createObjectURL(file),
      data: file,
    };
    setImage(previewImg);
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
            onChange={handleFileChange}
          />
          {uploading && <Spinner />}
          {image.preview && (
            <img src={image.preview} width="100" height="100" alt="#" />
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
