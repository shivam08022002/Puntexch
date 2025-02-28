import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import TokenService from "../services/token-service";
import { changePassword, changePasswordProfile } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const CricChangePassword = ({ role, logout }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState({});
  let navigate = useNavigate();
  // const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearMessage());
  }, [dispatch]);

  const validateInput = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = "Old password is required.";
    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 6 || newPassword.length > 40) {
      newErrors.newPassword = "Password must be between 6 and 40 characters.";
    }
    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm the new password.";
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    const user = TokenService.getUser(role);
    if (user && user.accountStatus === "ACTIVE") {
      try {
        const data = await dispatch(changePasswordProfile(oldPassword, newPassword, role));
        if (data.status === 401) {
          data.data === "Wrong password" ? alert("Wrong password") : logout();
        } else {
          alert("Password Changed Successfully!");
        }
      } catch {}
    } else {
      try {
        const data = await dispatch(changePassword(oldPassword, newPassword, user.userId, role));
        if (data.status === 401) {
          data.data === "Wrong password" ? alert("Wrong password") : logout();
        } else {
          navigate("/home");
        }
      } catch {}
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Change Password</h2>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={error.oldPassword ? "input-error" : ""} />
        <small>{error.oldPassword}</small>
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={error.newPassword ? "input-error" : ""} />
        <small>{error.newPassword}</small>
        <input type="password" placeholder="Confirm Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className={error.confirmNewPassword ? "input-error" : ""} />
        <small>{error.confirmNewPassword}</small>
        <button onClick={handleChangePassword}>Change Password</button>
        {/* {{message}} */}

      </div>
    </div>
  );
};

export default CricChangePassword;
