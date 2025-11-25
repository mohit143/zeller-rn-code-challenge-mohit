import searchReducer, { setSearchQuery } from "../../store/searchSlice";

describe("searchSlice", () => {
  test("should return initial state", () => {
    const initial = searchReducer(undefined, { type: "" });
    expect(initial.query).toBe("");
  });

  test("should update search query", () => {
    const state = { query: "" };
    const next = searchReducer(state, setSearchQuery("john"));

    expect(next.query).toBe("john");
  });

  test("should clear the search query", () => {
    const state = { query: "admin" };
    const next = searchReducer(state, setSearchQuery(""));

    expect(next.query).toBe("");
  });
});
