import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import { auth } from "./firebase";
import Widgets from "./Widgets";
import { onAuthStateChanged } from "firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "SpaceTime";
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // User is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        // User is logged out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <Header />

        {/* If user is not logged in, show login page */}

        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
