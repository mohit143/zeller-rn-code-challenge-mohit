// MOCK REALM FOR WEB TESTING ONLY
// This lets Expo Web run without Realm native modules.

import { UserDTO } from "../types/UserDTO";

let mockUsers: UserDTO[] = [];

export const openRealm = async () => {
  return {
    objects: () => [...mockUsers],
    write: (fn: Function) => fn(),
    create: (schema: string, data: UserDTO) => {
      mockUsers.push(data);
      return data;
    },
    objectForPrimaryKey: (schema: string, id: string) =>
      mockUsers.find((u) => u._id === id) || null,

    delete: (user: UserDTO) => {
      mockUsers = mockUsers.filter((u) => u._id !== user._id);
    },
  };
};
