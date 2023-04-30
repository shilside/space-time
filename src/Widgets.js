import React, { useEffect, useState } from "react";
import "./Widgets.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineFiberManualRecord } from "react-icons/md";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
function Widgets() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      {loading ? (
        <SkeletonCircle size={3} mr="10px" />
      ) : (
        <div className="widgets__articleLeft">
          <MdOutlineFiberManualRecord />
        </div>
      )}
      <div className="widgets__articleRight">
        {loading ? (
          <>
            <Skeleton height="15px" width="90%" marginBottom={2} margin={1}>
              <h4>{heading}</h4>
            </Skeleton>
            <SkeletonText width="65%" noOfLines={1} margin={1}>
              <p>{subtitle}</p>
            </SkeletonText>
          </>
        ) : (
          <>
            <h4>{heading}</h4>
            <p>{subtitle}</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        {loading ? (
          <>
            <Skeleton variant="rounded" width="60%" height={25} />
            <Skeleton variant="circular" width={25} height={25} />
          </>
        ) : (
          <>
            <h2>Cosmo News</h2>
            <IoInformationCircleOutline />
          </>
        )}
      </div>
      {newsArticle("SpaceX Launches Starship", "Top News - 9099 readers")}
      {newsArticle("NASA's New Rover", "Top News - 886 readers")}
      {newsArticle("Corona Virus: UK Updates", "Top News - 886 readers")}
      {newsArticle("Arsenal Wins 2021 FA Cup", "Top News - 300 readers")}
      {newsArticle("Bitcoin Breaks $22k", "Crypto - 8000 readers")}
      {newsArticle("Buhari: Nigeria's President", "Top News - 886 readers")}
    </div>
  );
}

export default Widgets;
