import { openRealm } from "./index";
import { User, UserDTO } from "./UserSchema";
import Realm from "realm";

// Convert Realm → DTO
const toDTO = (user: User): UserDTO => ({
  _id: user._id.toHexString(),
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
});

// GET ALL USERS
export const getAllUsers = async (): Promise<UserDTO[]> => {
  const realm = await openRealm();
  const results = realm.objects<User>("User").sorted("firstName");
  return results.map(toDTO);
};

// ADD USER
export const addUserToDB = async (data: {
  firstName: string;
  lastName: string;
  email?: string;
  role: "Admin" | "Manager";
}): Promise<UserDTO> => {
  const realm = await openRealm();

  let created: User | undefined;

  realm.write(() => {
    created = realm.create<User>("User", {
      _id: new Realm.BSON.ObjectId(),  // ✅ FIXED
      ...data,
    });
  });

  return toDTO(created!);
};

// UPDATE USER
export const updateUserInDB = async (
  id: string,
  updates: Partial<User>
): Promise<UserDTO | null> => {
  const realm = await openRealm();
  const objectId = new Realm.BSON.ObjectId(id);  // ✅ FIXED

  let updated: User | null = null;

  realm.write(() => {
    const user = realm.objectForPrimaryKey<User>("User", objectId);
    if (user) {
      Object.assign(user, updates);
      updated = user;
    }
  });

  return updated ? toDTO(updated) : null;
};

// DELETE USER
export const deleteUserFromDB = async (id: string): Promise<boolean> => {
  const realm = await openRealm();
  const objectId = new Realm.BSON.ObjectId(id);  // ✅ FIXED

  let deleted = false;

  realm.write(() => {
    const user = realm.objectForPrimaryKey<User>("User", objectId);
    if (user) {
      realm.delete(user);
      deleted = true;
    }
  });

  return deleted;
};
