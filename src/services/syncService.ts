import AsyncStorage from "@react-native-async-storage/async-storage";
import { listZellerCustomers } from "../../mock-server/queries/listZellerCustomers";
import { addUserToDB } from "../db/userRepository";

const FIRST_SYNC_KEY = "first_sync_done";

export async function syncUsersFromAPI(): Promise<boolean> {
  try {
    const alreadySynced = await AsyncStorage.getItem(FIRST_SYNC_KEY);
    if (alreadySynced === "true") {
      console.log("➡️ Users already synced — skipping API import.");
      return false;
    }

    console.log("⏳ Syncing users from mock API…");

    const items = listZellerCustomers.items ?? [];

    for (const item of items) {
      const nameParts = item.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      await addUserToDB({
        firstName,
        lastName,
        email: item.email ?? "",
        role: item.role === "Admin" ? "Admin" : "Manager", // <-- FIX
      });
    }

    await AsyncStorage.setItem(FIRST_SYNC_KEY, "true");
    console.log("✅ Initial sync complete");
    return true;

  } catch (err) {
    console.error("❌ Sync error:", err);
    return false;
  }
}
