// src/components/UserCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserDTO } from "../db/UserSchema"; // adjust path if your types live elsewhere

type Props = {
  user: UserDTO;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function UserCard({ user, onPress, onEdit, onDelete }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        {user.email ? <Text style={styles.email}>{user.email}</Text> : null}
        <View style={{ marginTop: 8 }}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user.role}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const BLUE = "#007AFF";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#111" },
  email: { marginTop: 6, fontSize: 14, color: "#6B6B6B" },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: BLUE,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  actions: { marginLeft: 12, justifyContent: "center", alignItems: "flex-end" },

  editBtn: { backgroundColor: "#34C759", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 6 },
  editText: { color: "#fff", fontSize: 12, fontWeight: "700" },

  deleteBtn: { backgroundColor: "#E53935", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  deleteText: { color: "#fff", fontSize: 12, fontWeight: "700" },
});
