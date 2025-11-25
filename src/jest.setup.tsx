// Add Jest Native matchers (must be first)
import "@testing-library/jest-native/extend-expect";

// --- MOCK ASYNC STORAGE ---
jest.mock("@react-native-async-storage/async-storage", () =>
  require("./__mocks__/asyncStorageMock")
);

// --- MOCK REALM (ONE SINGLE MOCK) ---
jest.mock("realm", () => require("./__mocks__/realmMock"));


// --- MOCK NAVIGATION ---
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({ params: {} }),
  NavigationContainer: ({ children }: any) => children,
}));

jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ children }: any) => children,
  })),
}));

// --- MOCK REANIMATED ---
jest.mock("react-native-reanimated", () => {
  const actual = jest.requireActual("react-native-reanimated/mock");

  return {
    ...actual,
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    withTiming: jest.fn((v) => v),
    withSpring: jest.fn((v) => v),
    Easing: { inOut: jest.fn(), ease: jest.fn() },
  };
});

// --- MOCK PAGER VIEW ---
jest.mock("react-native-pager-view", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props: any) => React.createElement(View, props);
});

// --- MOCK SYNC SERVICE ---
jest.mock("./services/syncService", () => ({
  syncUsersFromAPI: jest.fn(() => Promise.resolve(false)),
}));

// Silence console warnings
jest.spyOn(console, "warn").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});
