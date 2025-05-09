import userImage from '../Images/userimage.png';
import { useSelector } from "react-redux";
import Location from "./Location";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  
  return (
    <div className="profileCard">
      <img src={userImage} className="userImage" alt="User Profile" />
      <h6>{user?.name}</h6>
      <h6>Email: {user?.email}</h6>
      <h6>User Id: {user?._id}</h6>
      <h6>Date: {user?.createdAt}</h6>
      <h6>lastLogin: {user?.lastLogin}</h6>
      <Location/>

    </div>
  );
};

export default Profile;