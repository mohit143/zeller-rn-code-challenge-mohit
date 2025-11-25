// src/components/SearchBar.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const BG = "#F5F7FA";
const WHITE = "#FFFFFF";
const BLUE = "#007AFF";

export default function SearchBar({ value, onChange, placeholder = "Search users..." }: Props) {
  const [localValue, setLocalValue] = useState(value);
  const shadowAnim = useState(new Animated.Value(value.length > 0 ? 1 : 0))[0];

  useEffect(() => {
    Animated.timing(shadowAnim, {
      toValue: localValue.length > 0 ? 1 : 0,
      duration: 240,
      useNativeDriver: false,
    }).start();
  }, [localValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const animatedStyle = {
    shadowOpacity: shadowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.03, 0.14] }),
    elevation: shadowAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 8] }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.icon}>🔍</Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9AA0A6"
        value={localValue}
        onChangeText={(t) => {
          setLocalValue(t);
          onChange(t);
        }}
        style={styles.input}
        returnKeyType="search"
        accessible
        accessibilityLabel="Search users"
      />

      {localValue.length > 0 ? (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            setLocalValue("");
            onChange("");
          }}
          accessibilityLabel="Clear search"
        >
          <Text style={styles.clear}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: WHITE,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  icon: { fontSize: 18, marginRight: 8, color: "#8E8E93" },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    paddingVertical: 0,
  },
  clearBtn: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  clear: { fontSize: 16, color: "#9AA0A6" },
});
