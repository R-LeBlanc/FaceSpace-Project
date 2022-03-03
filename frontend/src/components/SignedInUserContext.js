import React from "react";

export const SignedInUserContex = React.createContext(null);

const initialState = {
  loading: true,
  signedIn: false,
  currentUser: null,
};

function reducer(userState, action) {
  switch (action.type) {
    case "recieve-signed-in-user-data": {
      return {
        ...userState,
        loading: false,
        signedIn: true,
        currentUser: action,
      };
    }
    default:
      throw new Error("Unrecognized action");
  }
}

export const SignedInUserProvider = ({ children }) => {
  const [userState, dispatch] = React.useReducer(reducer, initialState);

  const recieveSignedInUserData = (data) => {
    return dispatch({ type: "recieve-signed-in-user-data", ...data });
  };

  return (
    <SignedInUserContex.Provider
      value={{
        userState,
        actions: {
          recieveSignedInUserData,
        },
      }}
    >
      {children}
    </SignedInUserContex.Provider>
  );
};
