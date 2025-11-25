import Realm from "realm";

export const UserSchema: Realm.ObjectSchema = {
  name: "User",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    firstName: "string",
    lastName: "string",
    email: "string?",
    role: "string",
  },
};

export type User = {
  _id: Realm.BSON.ObjectId;
  firstName: string;
  lastName: string;
  email?: string;
  role: string;
};

// Data Transfer Object (clean plain object)
export type UserDTO = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: string;
};
