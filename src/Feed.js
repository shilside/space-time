import React, { useEffect, useState } from "react";
import "./Feed.css";
import { IoCreateOutline, IoImageOutline } from "react-icons/io5";
import { AiOutlineVideoCameraAdd, AiOutlineAppstore } from "react-icons/ai";
import { RxCalendar } from "react-icons/rx";
import InputOption from "./InputOption";
import Post from "./Post";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
function Feed() {
  const user = useSelector(selectUser); // this is a hook

  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  //to add Material-UI's Skeleton component for loading states of your Feed and Post components

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // this is where the code runs
    // this is a realtime listener
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const sendPost = (e) => {
    e.preventDefault();

    //we will use firebase

    addDoc(collection(db, "posts"), {
      name: user.displayName,
      desc: user.email,
      msg: input,
      photoURL: user.photoURL || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="feed">
      {/* this is a linkedn clone */}
      <div className="feed__inputContainer">
        {loading ? (
          <Skeleton>
            <div className="feed__input">
              <IoCreateOutline />
              <form>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                />
                <button onClick={sendPost} type="submit">
                  Send
                </button>
              </form>
            </div>
          </Skeleton>
        ) : (
          <div className="feed__input">
            <IoCreateOutline
              style={{
                fontSize: "20px",
              }}
            />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
              />
              <button onClick={sendPost} type="submit">
                Send
              </button>
            </form>
          </div>
        )}
        {/* hide the feed__inputOptions, until page loaded, so feedinuptoptions will have display none if loading */}

        {loading ? (
          <div className="feed__inputOptions" style={{ display: "none" }}></div>
        ) : (
          <div className="feed__inputOptions">
            <InputOption Icon={IoImageOutline} title="Photo" color="#70B5F9" />
            <InputOption
              Icon={AiOutlineVideoCameraAdd}
              title="Video"
              color="#E7A33E"
            />
            <InputOption
              Icon={AiOutlineAppstore}
              title="Collection"
              color="#C0CBCD"
            />
            <InputOption Icon={RxCalendar} title="Events" color="#7FC15E" />
          </div>
        )}
      </div>

      {/* Posts */}

      <FlipMove>
        {posts.map(({ id, data: { name, desc, msg, photoURL, loading } }) => (
          <Post
            key={id}
            name={name}
            desc={desc}
            msg={msg}
            photoURL={photoURL}
            loading={loading}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
