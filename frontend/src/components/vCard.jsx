import { useSelector } from "react-redux";

const VCard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user, "user vCard");
  return (
    <div className="d-flex justify-content-center mt-10">
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.telephone}</li>
        <li>{user.website}</li>
        <li>{user.linkedin}</li>
        <li>{user.instagram}</li>
        <li>{user.snapchat}</li>
        <li>{user.birthday}</li>
      </ul>
    </div>
  );
};

export default VCard;
