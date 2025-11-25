import * as realmModule from "../../db/index";
import realmMock from "../../__mocks__/realmMock";

import {
  addUserToDB,
  getAllUsers,
  updateUserInDB,
  deleteUserFromDB,
} from "../../db/userRepository";

beforeEach(() => {
  // Reset mock realm state
  // realmMock is the entire default export, realmMock.default is the shared instance.
  (realmMock as any).default.data = {};
});


// Hook openRealm → use mock.open()
jest.spyOn(realmModule, "openRealm").mockImplementation(async () =>
(await realmMock.open()) as unknown as Realm
);

describe("Realm User Repository", () => {

  test("should add and fetch users", async () => {
    const created = await addUserToDB({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "Admin",
    });

    expect(created.firstName).toBe("John");

    const users = await getAllUsers();
    expect(users.length).toBe(1);
  });

  test("should update user", async () => {
    const user = await addUserToDB({
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      role: "Manager",
    });

    const updated = await updateUserInDB(user._id, { firstName: "Alicia" });
    expect(updated?.firstName).toBe("Alicia");
  });

  test("should delete user", async () => {
    const user = await addUserToDB({
      firstName: "Mark",
      lastName: "Taylor",
      role: "Admin",
    });

    const before = await getAllUsers();
    expect(before.length).toBe(1);

    await deleteUserFromDB(user._id);

    const after = await getAllUsers();
    expect(after.length).toBe(0);
  });
});
