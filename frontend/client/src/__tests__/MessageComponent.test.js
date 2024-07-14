import React from "react";
import { render, screen } from "@testing-library/react";
import Message from "../components/message";
import "@testing-library/jest-dom";

test("renders toast message with success type", async () => {
  render(<Message message="Success message" messagetype={1} repeat={false} />);

  // Assert that the success toast message is rendered
  const toastMessage = await screen.findByText(/Success message/i);
  expect(toastMessage).toBeInTheDocument();
});

test("renders toast message with error type", async () => {
  render(<Message message="Error message" messagetype={2} repeat={false} />);

  // Assert that the error toast message is rendered
  const toastMessage = await screen.findByText(/Error message/i);
  expect(toastMessage).toBeInTheDocument();
});

test("renders toast message with warning type", async () => {
  render(<Message message="Warning message" messagetype={3} repeat={false} />);

  // Assert that the warning toast message is rendered
  const toastMessage = await screen.findByText(/Warning message/i);
  expect(toastMessage).toBeInTheDocument();
});
