import UserCard from './UserCard';
import { handleDownload } from '../utils/vCardDownload';

function UpdateCardInfo({ cardData, setCard }) {
  const handleEdit = () => {
    console.log('handleEdit triggered in update', cardData);
    setCard(cardData);
  };
  return (
    <UserCard
      user={cardData}
      handleDownload={() => handleDownload(cardData)}
      setEditMode={handleEdit}
    />
  );
}

export default UpdateCardInfo;
