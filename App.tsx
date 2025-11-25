import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/store";

import { loadUsersFromDB } from "./src/store/usersSlice";
import { syncUsersFromAPI } from "./src/services/syncService";

import MainNavigator from "./src/navigation/MainNavigator";
import type { AppDispatch } from "./src/store";

function Root() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initialize = async () => {
      // 1. Sync mock GraphQL → Realm only once
      await syncUsersFromAPI();

      // 2. Load users into Redux from Realm
      dispatch(loadUsersFromDB());
    };

    initialize();
  }, []);

  return <MainNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
