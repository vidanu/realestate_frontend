import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPropertybyUserId } from "RealEstateCbe/helpers/REbackend_helper";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const [currentUser, setCurrentUser] = useState(user);
  const [currentProperty, setCurrentProperty] = useState({});
  useEffect(() => {
    if (currentUser) {
      const handleFetching = async () => {
        const res = await getPropertybyUserId({ userID: currentUser.userID });
        if (res.success) {
          setCurrentProperty(res.property);
        }
      };

      handleFetching();
    }
    return () => {};
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentProperty,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.any,
};
