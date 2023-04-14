// import { useDispatch } from "react-redux";
// import { deleteCardById } from "../features/cards/cardSlice";
// import QRCode from "qrcode.react";
// import moment from "moment";

// function GoalItem({ user }) {
//   const dispatch = useDispatch();
//   const URL = "https://windoe.link/";
//   const handleDownload = () => {
//     const url = `https://windoe.link/${user.image}`;
//     const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${user.name}\nTEL:${
//       user.telephone
//     }\nEMAIL:${user.email}\nURL:${url}\nBDAY:${new Date(user.birthday)
//       .toISOString()
//       .slice(0, 10)}\nPHOTO;VALUE=URI:${user.image}
//     }\nX-SOCIALPROFILE;TYPE=linkedin:${
//       user.linkedin
//     }\nX-SOCIALPROFILE;TYPE=instagram:${
//       user.instagram
//     }\nX-SOCIALPROFILE;TYPE=snapchat:${user.snapchat}\nEND:VCARD`;
//     const blob = new Blob([vcard], { type: "text/vcard" });
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = `${user.name}.vcf`;
//     link.click();
//   };

//   return (
//     <div className="goal card">
//       <div>{new Date(user.createdAt).toLocaleString("en-US")}</div>
//       <div>Name: {user.name}</div>
//       <div>Email: {user.email}</div>
//       <div>Telephone: {user.telephone}</div>
//       <div>Website: {user.website}</div>
//       <div>Linkedin: {user.linkedin}</div>
//       <div>Instagram: {user.instagram}</div>
//       <div>Snapchat: {user.snapchat}</div>
//       <div>
//         BirthDate:
//         {moment(user.birthday).format("MM/DD/YYYY")}
//       </div>
//       <img
//         src={
//           "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
//         }
//         alt={user.name}
//         className="m-auto"
//         style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//       />
//         <QRCode
//           className="m-auto w-50 h-50 my-2"
//           value={`BEGIN:VCARD\nVERSION:3.0\nN:${user.name}\nTEL:${
//             user.telephone
//           }\nEMAIL:${user.email}\nURL:${user.website}\nBDAY:${new Date(
//             user.birthday
//           )
//             .toISOString()
//             .substring(0, 10)}\nX-SOCIALPROFILE;TYPE=linkedin:${
//             user.linkedin
//           }\nX-SOCIALPROFILE;TYPE=snapchat:${
//             user.snapchat
//           }\nX-SOCIALPROFILE;TYPE=instagram:${
//             user.instagram
//           }\nURL:${URL}\nitem1.X-ABLabel:profile\nEND:VCARD`}
//         />

//       <button className="btn btn-primary" onClick={handleDownload}>
//         Download vCard
//       </button>
//       <button
//         onClick={() => dispatch(deleteCardById(user._id))}
//         className="close"
//       >
//         X
//       </button>
//     </div>
//   );
// }

// export default GoalItem;

import { useDispatch } from "react-redux";
import { deleteCardById } from "../features/cards/cardSlice";
import QRCode from "qrcode.react";
import moment from "moment";

function GoalItem({ user }) {
  // console.log("user", user);
  const dispatch = useDispatch();

  const handleDownload = () => {
    const url = `https://windoe.link/${user.image}`;
    const imageBase64 = user.image.split(",")[1];
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${user.name}\nTEL:${
      user.telephone
    }\nEMAIL:${user.email}\nURL:${user.website}\nBDAY:${new Date(user.birthday)
      .toISOString()
      .substring(
        0,
        10
      )}\nPHOTO;VALUE=uri:data:image/jpeg;base64,${imageBase64}\nX-SOCIALPROFILE;TYPE=linkedin:${
      user.linkedin
    }\nX-SOCIALPROFILE;TYPE=instagram:${
      user.instagram
    }\nX-SOCIALPROFILE;TYPE=snapchat:${user.snapchat}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${user.name}.vcf`;
    link.click();
  };

  return (
    <div className="goal card">
      <div>Name: {user?.name}</div>
      <div>Email: {user?.email}</div>
      <div>Telephone: {user?.telephone}</div>
      <div>Website: {user?.website}</div>
      <div>Linkedin: {user?.linkedin}</div>
      <div>Instagram: {user?.instagram}</div>
      <div>Snapchat: {user?.snapchat}</div>
      <div>
        BirthDate:
        {moment(user?.birthday).format("MM/DD/YYYY")}
      </div>
      <img
        src={user?.image}
        alt={user?.name}
        className="m-auto"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
      <QRCode
        className="m-auto w-75 h-75"
        value={`BEGIN:VCARD\nVERSION:3.0\nN:${user.name}\nTEL:${
          user.telephone
        }\nEMAIL:${user.email}\nURL:${user.website}\nBDAY:${new Date(
          user.birthday
        )
          .toISOString()
          .substring(
            0,
            10
          )}\nX-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/${
          user.linkedin
        }\nX-SOCIALPROFILE;TYPE=snapchat:${
          user.snapchat
        }\nX-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/${
          user.instagram
        }\nEND:VCARD`}
      />

      <button className="btn btn-primary" onClick={handleDownload}>
        Download vCard
      </button>
      <button
        onClick={() => dispatch(deleteCardById(user._id))}
        className="close"
      >
        X
      </button>
    </div>
  );
}

export default GoalItem;
