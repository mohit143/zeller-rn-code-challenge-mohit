// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import AnimatedTabs from "../components/AnimatedTabs";
import UserCard from "../components/UserCard";

import { RootState } from "../types/ReduxTypes";
import { setSearchQuery } from "../store/searchSlice";
import { loadUsersFromDB } from "../store/usersSlice";

import type { AppDispatch } from "../store";
import { useNavigation } from "@react-navigation/native";
import type { HomeScreenNavProp } from "../navigation/types";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomeScreenNavProp>();

  const users = useSelector((s: RootState) => s.users.users);
  const loading = useSelector((s: RootState) => s.users.loading);
  const searchQuery = useSelector((s: RootState) => s.search.query);

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Load local DB users on mount
  useEffect(() => {
    dispatch(loadUsersFromDB());
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => dispatch(setSearchQuery(debouncedQuery)), 300);
    return () => clearTimeout(t);
  }, [debouncedQuery]);

  // Filter users by text search
  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // FlatList renderer
  const renderList = (list: any[]) => {
    if (!list.length) {
      return (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No users found.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(loadUsersFromDB())}
          />
        }
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onEdit={() => navigation.navigate("EditUser", { user: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    );
  };

  // Select list based on tab
  const renderPage = (index: number) => {
    if (index === 0) return renderList(filtered);

    const role = index === 1 ? "Admin" : "Manager";
    return renderList(filtered.filter((u) => u.role === role));
  };

  // UI
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Zeller Customers</Text>
        <Text style={styles.subtitle}>{users.length} users</Text>
      </View>

      <SearchBar value={debouncedQuery} onChange={setDebouncedQuery} />

      <AnimatedTabs renderPage={renderPage} />

      {/* FAB for Add User */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddUser")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabPlus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F7FA" },

  header: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#777",
  },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  fabPlus: {
    color: "white",
    fontSize: 34,
    fontWeight: "900",
    marginTop: -2,
  },
});
