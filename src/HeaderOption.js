import React, { useEffect, useState } from "react";
import "./HeaderOption.css";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
function HeaderOptions({ avatar, Icon, title, onClick, className }) {
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const avatarContent = user?.photoURL ? (
    <Avatar src={user.photoURL} className="headerOption__icon" />
  ) : (
    <Avatar className="headerOption__icon">
      {user?.email[0].toUpperCase()}
    </Avatar>
  );

  return (
    <div onClick={onClick} className={`headerOption ${className || ""}`}>
      {loading ? (
        <>
          <SkeletonCircle size="9">
            {Icon && <Icon className="headerOption__icon" />}
            {avatar && avatarContent}
          </SkeletonCircle>
          <SkeletonText noOfLines={1} mt={2}>
            <h3 className="headerOption__title">{title}</h3>
          </SkeletonText>
        </>
      ) : (
        <>
          {Icon && <Icon className="headerOption__icon" />}
          {avatar && avatarContent}
          <h3 className="headerOption__title">{title}</h3>
        </>
      )}
    </div>
  );
}

export default HeaderOptions;
