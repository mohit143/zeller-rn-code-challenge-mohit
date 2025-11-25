export interface UserDTO {
  _id: string;                // Realm ObjectId → converted to string for UI/Redux
  firstName: string;
  lastName: string;
  email?: string;
  role: "Admin" | "Manager";
}
