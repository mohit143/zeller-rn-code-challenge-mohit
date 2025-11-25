class MockRealm {
  data: Record<string, any[]> = {};

  write(fn: Function) {
    fn();
  }

  objects(schema: string) {
    const arr: any[] = this.data[schema] || [];

    (arr as any).sorted = (field: string) =>
      [...arr].sort((a, b) =>
        (a[field] ?? "").localeCompare(b[field] ?? "")
      );

    return arr;
  }

  create(schema: string, obj: any) {
    if (!this.data[schema]) this.data[schema] = [];
    this.data[schema].push(obj);
    return obj;
  }

  delete(obj: any) {
    for (const key of Object.keys(this.data)) {
      this.data[key] = this.data[key].filter((item) => item !== obj);
    }
  }

  objectForPrimaryKey(schema: string, id: any) {
    return this.data[schema]?.find(
      (u) => u._id.toString() === id.toString()
    ) ?? null;
  }
}

class ObjectId {
  private id: string = Math.random().toString(36).slice(2, 10);
  constructor(id?: string) {
    if (id) this.id = id;
  }
  toHexString() { return this.id; }
  toString() { return this.id; }
}

export const BSON = { ObjectId };

// shared instance
const instance = new MockRealm();

// THIS is the required structure to satisfy Realm API
export default {
  __esModule: true,
  default: instance,   // returned when you call Realm.open()
  open: async () => instance,
  BSON,
  Object: class {},    // base class
};
