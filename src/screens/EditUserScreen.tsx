import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { updateUserInDB } from "../db/userRepository";
import { loadUsersFromDB } from "../store/usersSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";

import { UserDTO } from "../types/UserDTO";

export default function EditUserScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute<any>();

  const user: UserDTO = route.params.user;

  // -------------------------
  // State Setup
  // -------------------------
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email ?? "");
  const [role, setRole] = useState<"Admin" | "Manager">(user.role);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    let valid = true;
    let tempErrors: any = { firstName: "", lastName: "", email: "" };

    if (!firstName.trim()) {
      valid = false;
      tempErrors.firstName = "First name cannot be empty";
    } else if (!nameRegex.test(firstName)) {
      valid = false;
      tempErrors.firstName = "Letters and spaces only";
    } else if (firstName.length > 50) {
      valid = false;
      tempErrors.firstName = "Max length is 50";
    }

    if (!lastName.trim()) {
      valid = false;
      tempErrors.lastName = "Last name cannot be empty";
    } else if (!nameRegex.test(lastName)) {
      valid = false;
      tempErrors.lastName = "Letters and spaces only";
    } else if (lastName.length > 50) {
      valid = false;
      tempErrors.lastName = "Max length is 50";
    }

    if (email.trim() && !emailRegex.test(email)) {
      valid = false;
      tempErrors.email = "Invalid email format";
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await updateUserInDB(user._id, {
        firstName,
        lastName,
        email,
        role,
      });

      dispatch(loadUsersFromDB());
      Alert.alert("Updated", "User updated successfully");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Failed to update user");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Edit User</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, !!errors.firstName && styles.inputError]}
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, !!errors.lastName && styles.inputError]}
          value={lastName}
          onChangeText={setLastName}
        />
        {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}

        <Text style={styles.label}>Email (optional)</Text>
        <TextInput
          style={[styles.input, !!errors.email && styles.inputError]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <Text style={styles.label}>Role</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, role === "Admin" && styles.roleActive]}
            onPress={() => setRole("Admin")}
          >
            <Text style={styles.roleText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === "Manager" && styles.roleActive]}
            onPress={() => setRole("Manager")}
          >
            <Text style={styles.roleText}>Manager</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// -------------------------
// Styles
// -------------------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  form: { marginTop: 10 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },

  label: { fontSize: 16, fontWeight: "600", marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    fontSize: 16,
  },
  inputError: { borderColor: "red" },
  error: { color: "red", fontSize: 13, marginTop: 3 },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#888",
    alignItems: "center",
  },
  roleActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  roleText: { color: "white", fontWeight: "600" },

  saveButton: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
