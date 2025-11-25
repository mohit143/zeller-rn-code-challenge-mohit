import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  activeIndex: number;
  onTabPress: (index: number) => void;
}

const tabs = ["All", "Admin", "Manager"];

export default function TabBar({ activeIndex, onTabPress }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeIndex === index && styles.activeTab]}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={[
              styles.tabText,
              activeIndex === index && styles.activeText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={[styles.indicator, { left: activeIndex * 100 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    position: "relative",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  activeTab: {},
  activeText: {
    color: "#000",
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: 100,
    height: 3,
    backgroundColor: "#4A7DFF",
    transition: "left 0.25s",
  },
});
