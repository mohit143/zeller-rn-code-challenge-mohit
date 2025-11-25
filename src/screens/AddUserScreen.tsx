import React, { useState } from "react";
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

import { useNavigation } from "@react-navigation/native";
import { addUserToDB } from "../db/userRepository";
import type { AddUserScreenNavProp } from "../navigation/types";

type Props = {
  navigation: AddUserScreenNavProp;
};

export default function AddUserScreen() {
  const navigation = useNavigation<AddUserScreenNavProp>();

  // -------------------------
  // Local Form State
  // -------------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Admin" | "Manager">("Admin");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // -------------------------
  // Validation Rules
  // -------------------------
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
      tempErrors.firstName = "Only letters and spaces allowed";
    } else if (firstName.length > 50) {
      valid = false;
      tempErrors.firstName = "Cannot exceed 50 characters";
    }

    if (!lastName.trim()) {
      valid = false;
      tempErrors.lastName = "Last name cannot be empty";
    } else if (!nameRegex.test(lastName)) {
      valid = false;
      tempErrors.lastName = "Only letters and spaces allowed";
    } else if (lastName.length > 50) {
      valid = false;
      tempErrors.lastName = "Cannot exceed 50 characters";
    }

    if (email.trim() && !emailRegex.test(email)) {
      valid = false;
      tempErrors.email = "Invalid email format";
    }

    setErrors(tempErrors);
    return valid;
  };

  // -------------------------
  // Handle Form Submission
  // -------------------------
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await addUserToDB({
        firstName,
        lastName,
        email,
        role,
      });

      Alert.alert("Success", "User added successfully!");
      navigation.goBack(); // return to Home

    } catch (err) {
      Alert.alert("Error", "Failed to save user");
    }
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>

        {/* FIRST NAME */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, !!errors.firstName && styles.inputError]}
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}

        {/* LAST NAME */}
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, !!errors.lastName && styles.inputError]}
          value={lastName}
          onChangeText={setLastName}
        />
        {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}

        {/* EMAIL */}
        <Text style={styles.label}>Email (optional)</Text>
        <TextInput
          style={[styles.input, !!errors.email && styles.inputError]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        {/* ROLE SELECTOR */}
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

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save User</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// -------------------------
// Styles
// -------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },

  form: {
    marginTop: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 18,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    fontSize: 16,
  },

  inputError: {
    borderColor: "red",
  },

  error: {
    color: "red",
    marginTop: 4,
    fontSize: 13,
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  roleButton: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#888",
    alignItems: "center",
  },

  roleActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },

  roleText: {
    color: "#fff",
    fontWeight: "600",
  },

  saveButton: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
});
