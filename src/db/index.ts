import Realm from "realm";
import { UserSchema } from "./UserSchema";

let realm: Realm | null = null;

export const openRealm = async () => {
  if (realm) return realm;

  realm = await Realm.open({
    schema: [UserSchema],
    schemaVersion: 1,
  });

  return realm;
};

export const closeRealm = () => {
  if (realm && !realm.isClosed) {
    realm.close();
    realm = null;
  }
};
