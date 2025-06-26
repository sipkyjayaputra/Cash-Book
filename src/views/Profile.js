import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { app } from "../firebase";
import Header from "../container/Header";
import MenuBar from "../container/MenuBar";
import { AuthContext } from "../Auth";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Header name={"Profile"} />
      <div style={{ height: "70vh" }} className="d-flex align-items-center">
        <div className="container text-center py-4 my-auto">
          <div className="d-flex flex-column align-items-center">
            <Avatar
              width={60}
              height={60}
              src={currentUser.photoURL ? currentUser.photoURL : ""}
            >
              {currentUser.displayName[0]}
            </Avatar>
            <h5 className="mt-3">{currentUser.displayName}</h5>
            <span>{currentUser.email}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <button
            className="btn text-white w-100 py-2"
            style={{
              borderRadius: 30,
              fontSize: 14,
              backgroundColor: "#035397",
            }}
            onClick={() => app.auth().signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
      <MenuBar name="profile" />
    </>
  );
}

export default Profile;
