import { Avatar, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {loading ? (
          <Skeleton width={240} height="12" />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        )}

        {/* when loading, the avatar should not be displayed, so display none till page loaded */}

        {loading ? (
          <Avatar className="sidebar__avatar" style={{ display: "none" }} />
        ) : (
          <Avatar src={user.photoURL} className="sidebar__avatar">
            {!user.photoURL && user.email && user.email[0].toUpperCase()}
          </Avatar>
        )}

        {loading ? (
          <>
            <Skeleton height={4} width="28" mt={5} mb={2}>
              <h2>{user.displayName}</h2>
            </Skeleton>
            <SkeletonText noOfLines={1} margin={1}>
              <h4>{user.email}</h4>
            </SkeletonText>
          </>
        ) : (
          <>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>
          </>
        )}
      </div>
      <div className="sidebar__stats">
        {loading ? (
          <>
            <SkeletonText noOfLines={1} my={5} />
            <SkeletonText noOfLines={1} my={5} />
          </>
        ) : (
          <>
            <div className="sidebar__stat">
              <p>Who viewed you</p>
              <p className="sidebar__statNumber">2,543</p>
            </div>
            <div className="sidebar__stat">
              <p>Views on post</p>
              <p className="sidebar__statNumber">2,448</p>
            </div>
          </>
        )}
      </div>
      <div className="sidebar__bottom">
        {loading ? (
          <>
            <Skeleton
              height="20px"
              noOfLines={1}
              margin={"auto"}
              width="30%"
              my={3}
            />
            <SkeletonText noOfLines={1} mb={5} />
            <SkeletonText noOfLines={1} my={4} />
            <SkeletonText noOfLines={1} my={4} />
            <SkeletonText noOfLines={1} my={4} />
            <SkeletonText noOfLines={1} my={4} />
            <SkeletonText noOfLines={1} my={4} />
          </>
        ) : (
          <>
            <p>Recent</p>
            {recentItem("reactjs")}
            {recentItem("full-stack")}
            {recentItem("softwareengineering")}
            {recentItem("design")}
            {recentItem("developer")}
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
