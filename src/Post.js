import React, { forwardRef, useEffect, useState } from "react";
import "./Post.css";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { AiOutlineShareAlt, AiOutlineSend } from "react-icons/ai";

import InputOption from "./InputOption";

//  let's add the Skeleton component for the loading state of the user's avatar and name:

const Post = forwardRef(({ name, desc, msg, photoURL }, ref) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div ref={ref} className="post">
      <div className="post__header">
        {loading ? (
          <SkeletonCircle size={12} mr={3} />
        ) : (
          <Avatar src={photoURL && photoURL}>{name && name[0]}</Avatar>
        )}
        <div className="post__info">
          {loading ? (
            <>
              <Skeleton height={5}>
                <h2>{name}</h2>
              </Skeleton>
              <SkeletonText noOfLines={1} width="60%">
                <p>{desc}</p>
              </SkeletonText>
            </>
          ) : (
            <>
              <h2>{name}</h2>
              <p>{desc}</p>
            </>
          )}
        </div>
      </div>
      <div className="post__body">
        {loading ? <SkeletonText noOfLines={3} pl={2} mr={4} /> : <p>{msg}</p>}
      </div>
      <div className="post__buttons">
        <InputOption Icon={IoHeartOutline} title="Like" color="gray" />
        <InputOption Icon={MdOutlineChat} title="Comment" color="gray" />
        <InputOption Icon={AiOutlineShareAlt} title="Share" color="gray" />
        <InputOption Icon={AiOutlineSend} title="Send" color="gray" />
      </div>
    </div>
  );
});

export default Post;
