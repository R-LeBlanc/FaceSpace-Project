import React from "react";

export const UsersContext = React.createContext(null);

const initialState = {
  loading: true,
  data: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "recieve-user-data-from-server": {
      //   console.log(state);
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }
    default:
      throw new Error("Unrecognized action");
  }
}

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const recieveUserDataFromServer = (data) => {
    return dispatch({ type: "recieve-user-data-from-server", ...data });
  };

  return (
    <UsersContext.Provider
      value={{
        state,
        actions: {
          recieveUserDataFromServer,
        },
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
