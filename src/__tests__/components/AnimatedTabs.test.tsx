import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AnimatedTabs from "../../../src/components/AnimatedTabs";

jest.mock("react-native-pager-view", () => {
  return function MockPagerView({ children }: any) {
    return <>{children}</>;
  };
});

describe("AnimatedTabs", () => {
  const renderPage = jest.fn((index) => <></>);
  const onTabChange = jest.fn();

  test("renders all tabs", () => {
    const { getByText } = render(
      <AnimatedTabs renderPage={renderPage} onTabChange={onTabChange} />
    );

    expect(getByText("All")).toBeTruthy();
    expect(getByText("Admin")).toBeTruthy();
    expect(getByText("Manager")).toBeTruthy();
  });

  test("pressing a tab triggers onTabChange", () => {
    const { getByText } = render(
      <AnimatedTabs renderPage={renderPage} onTabChange={onTabChange} />
    );

    fireEvent.press(getByText("Admin"));
    expect(onTabChange).toHaveBeenCalledWith(1);

    fireEvent.press(getByText("Manager"));
    expect(onTabChange).toHaveBeenCalledWith(2);
  });

  test("renderPage is called for each page index", () => {
    render(
      <AnimatedTabs renderPage={renderPage} onTabChange={onTabChange} />
    );

    expect(renderPage).toHaveBeenCalledWith(0);
    expect(renderPage).toHaveBeenCalledWith(1);
    expect(renderPage).toHaveBeenCalledWith(2);
  });
});
