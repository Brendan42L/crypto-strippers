import React from "react";
import Messages from "../../../components/MobileLayout/chat/Messages";

import { useContext } from "react";
import AppContext from "../../../lib/AppContext";
import DesktopLayout from "../../../components/DesktopLayout/ComingSoon";

const jwt = require("jsonwebtoken");

export const getServerSideProps = async function ({ req, res }) {
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let decoded = jwt.verify(token, process.env.NEXT_PUBLIC_REACT_APP_JWT_SECRET);

  if (!decoded) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const messages = (props) => {
  const { size } = useContext(AppContext);
  return size < 1025 ? (
    <Messages style={{ backgroundColor: "#263238" }} />
  ) : (
    <DesktopLayout />
  );
};

export default messages;
