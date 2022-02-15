import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  console.log(user);
  const history = useHistory();

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formData, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(setLoading(false))
            .catch((e) => console.log(e));
        });
      });
  }, [history, user]);

  const handelLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  if (!user || loading) return "loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">React Chat App</div>
        <div className="logout-tab" onClick={handelLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};
export default Chats;
