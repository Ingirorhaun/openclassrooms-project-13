import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../api.js";
import { useSelector } from "react-redux";
import { setUserProfile } from "../store/features/userSlice";

export function Profile() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const fetchUserProfile = async (token) => {
    try {
      const userProfileData = await getUserProfile(token);
      if (userProfileData) {
        dispatch(setUserProfile(userProfileData));
        setFirstName(userProfileData.firstName);
        setLastName(userProfileData.lastName);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleEditButtonClick = () => {
    setIsEditingName(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName) {
      return;
    }
    try {
      setIsWaitingForResponse(true);
      await updateUserProfile(token, { firstName: firstName, lastName: lastName });
      const updatedUser = { ...user, firstName, lastName };
      dispatch(setUserProfile(updatedUser));
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
    setIsWaitingForResponse(false);
    setIsEditingName(false);
  };

  const handleCancel = () => {
    setIsEditingName(false);
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    }
  }, [token]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!isEditingName && user.firstName + " " + user.lastName + " !"}
        </h1>
        {isEditingName ? (
          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="edit-fields">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="edit-btns">
              <input type="submit" className="edit-button" value="Save" disabled={isWaitingForResponse} />
              <button className="cancel-button" onClick={handleCancel} disabled={isWaitingForResponse}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="edit-button" onClick={handleEditButtonClick}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
