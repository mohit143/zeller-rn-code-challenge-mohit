import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (txt: string) => void;
}

export default function SearchInput({ value, onChangeText }: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search users"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 12,
  },
  input: {
    height: 45,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
