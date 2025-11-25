import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserDTO } from "../types/UserDTO";

export type RootStackParamList = {
  Home: undefined;
  AddUser: undefined;
  EditUser: { user: UserDTO };
};

export type HomeScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type AddUserScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddUser"
>;
