import React, { useEffect, useState } from "react";
import "./header.css";
import { Search2Icon } from "@chakra-ui/icons";
import HeaderOptions from "./HeaderOption";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { BsBriefcase, BsPeople } from "react-icons/bs";
import { IoNotificationsOutline, IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import {
  Avatar,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="header">
      <div className="header__left">
        <img src={require("./png/001-black-hole.png")} alt="logo" />
        {loading ? (
          <Skeleton height="40px">
            <div className="header__search">
              <Search2Icon />
              <input placeholder="Search" type="text" />
            </div>
          </Skeleton>
        ) : (
          <div className="header__search">
            <Search2Icon />
            <input placeholder="Search" type="text" />
          </div>
        )}
      </div>
      <div className="header__logo">
        <img
          className="header__logoImg"
          src="https://uploads-ssl.webflow.com/60cf23f33fb64c66812c877e/61233978472b6a6c5ab39707_StLogoWhite.png"
          alt=""
        />
      </div>
      <div className="header__menu">
        <div className="header__right">
          <div className="header__rightMenu">
            <HeaderOptions Icon={AiOutlineHome} title="Home" />
            <HeaderOptions Icon={BsPeople} title="Network" />
            <HeaderOptions Icon={IoBriefcaseOutline} title="Jobs" />
            <HeaderOptions Icon={AiOutlineMessage} title="Messages" />
            <HeaderOptions Icon={IoNotificationsOutline} title="Notifs" />
            {user && (
              <HeaderOptions
                avatar={true}
                className="headerOption__user"
                title="My Account"
                onClick={logoutOfApp}
              />
            )}
          </div>

          <Menu className="headerOption__last">
            <MenuButton
              fontSize={35}
              size={"lg"}
              display={{ base: "block", md: "none" }}
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon marginBottom={1} />}
              variant="outline"
            />
            <MenuList fontSize={15}>
              <MenuItem
                icon={<AiOutlineHome />}
                onClick={() => console.log("Home clicked")}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<BsPeople />}
                onClick={() => console.log("My Network clicked")}
              >
                Network
              </MenuItem>

              <MenuItem
                icon={<IoBriefcaseOutline />}
                onClick={() => console.log("Jobs clicked")}
              >
                Jobs
              </MenuItem>
              <MenuItem
                icon={<AiOutlineMessage />}
                onClick={() => console.log("Messaging clicked")}
              >
                Messages
              </MenuItem>
              <MenuItem
                icon={<IoNotificationsOutline />}
                onClick={() => console.log("Notifications clicked")}
              >
                Notifs
              </MenuItem>
              {/* last menu Item should be the avatar and "me" */}
              {user && (
                <MenuItem
                  icon={<MdOutlineAccountCircle />}
                  onClick={() => console.log("Me clicked")}
                >
                  My Account
                </MenuItem>
              )}
            </MenuList>
          </Menu>

          {/* <HeaderOptions Icon={HamburgerIcon} className="headerOption__last" /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
