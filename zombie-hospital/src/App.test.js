import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders ", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Our Suggested Hospitals/i);
  expect(linkElement).toBeInTheDocument();
});

test("click and select illness", async () => {
  const {  getByText } = render(<App />);
  const dropdownText = getByText(/Select an illness/i);
  expect(dropdownText).toBeInTheDocument();
  fireEvent.click(dropdownText);
 
});

test("select severity level", () => {
  const { getByText } = render(<App />);
  const dropdownText = getByText(/Select severity level/i);
  expect(dropdownText).toBeInTheDocument();
  fireEvent.click(dropdownText);
});
