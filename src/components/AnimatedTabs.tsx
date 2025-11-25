// src/components/AnimatedTabs.tsx
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";

const { width } = Dimensions.get("window");
const TAB_COUNT = 3;
const BLUE = "#007AFF";
const GREY = "#A0A0A0";

interface Props {
  onTabChange?: (index: number) => void;
  renderPage: (index: number) => React.ReactNode;
}

const tabs = ["All", "Admin", "Manager"];

export default function AnimatedTabs({ renderPage, onTabChange }: Props) {
  const pagerRef = useRef<PagerView | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const indicatorX = useRef(new Animated.Value(0)).current;
  const tabWidth = width / TAB_COUNT;

  useEffect(() => {
    // keep indicator in sync on mount
    animateTo(activeTab);
  }, []);

  const animateTo = (index: number) => {
    Animated.spring(indicatorX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
      stiffness: 120,
      damping: 18,
      mass: 1,
    }).start();
  };

  const onPressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setActiveTab(index);
    animateTo(index);
    onTabChange?.(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((label, i) => (
          <TouchableOpacity key={label} style={styles.tab} activeOpacity={0.7} onPress={() => onPressTab(i)}>
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.indicatorWrap}>
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth,
              transform: [{ translateX: indicatorX }],
            },
          ]}
        />
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => {
          const idx = e.nativeEvent.position;
          setActiveTab(idx);
          animateTo(idx);
          onTabChange?.(idx);
        }}
      >
        <View key="1">{renderPage(0)}</View>
        <View key="2">{renderPage(1)}</View>
        <View key="3">{renderPage(2)}</View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    marginHorizontal: 0,
  },
  tab: { flex: 1, alignItems: "center" },
  tabText: { fontSize: 15, color: "#9A9A9A", fontWeight: "600" },
  tabTextActive: { color: BLUE, fontWeight: "700" },
  indicatorWrap: {
    height: 3,
    backgroundColor: "#F0F2F5",
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    backgroundColor: BLUE,
    borderRadius: 3,
    position: "absolute",
    left: 0,
  },
  pager: { flex: 1 },
});
