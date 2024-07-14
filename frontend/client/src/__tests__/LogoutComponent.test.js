import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogoutConfirmation from "../components/logout/Logout";
import "@testing-library/jest-dom";

test("renders the logout confirmation dialog", () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const type = "confirm";

  const { getByText, getByTestId } = render(
    <LogoutConfirmation
      onConfirm={onConfirm}
      onCancel={onCancel}
      type={type}
    />,
  );

  // Assert that the dialog title is rendered correctly
  expect(getByText("Bạn thực sự muốn đăng xuất?")).toBeInTheDocument();

  // Assert that the cancel button is rendered when the type is 'confirm'
  const cancelButton = getByText("Hủy");
  expect(cancelButton).toBeInTheDocument();

  // Assert that the confirm button is rendered
  const confirmButton = getByText("Xác nhận");
  expect(confirmButton).toBeInTheDocument();

  // Simulate clicking the cancel button
  fireEvent.click(cancelButton);
  expect(onCancel).toHaveBeenCalledTimes(1);

  // Simulate clicking the confirm button
  fireEvent.click(confirmButton);
  expect(onConfirm).toHaveBeenCalledTimes(1);

  // Assert that the accept button is focused on mount
  const acceptButton = getByText("Xác nhận");
  expect(document.activeElement).toBe(acceptButton);
});

test("renders the logout confirmation dialog with an inform message", () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const type = "inform";

  const { getByText } = render(
    <LogoutConfirmation
      onConfirm={onConfirm}
      onCancel={onCancel}
      type={type}
    />,
  );

  // Assert that the dialog title is rendered correctly
  expect(
    getByText("Bạn vừa đổi mật khẩu, hãy đăng nhập lại với mật khẩu mới"),
  ).toBeInTheDocument();
});

test("renders the logout confirmation dialog with an interupt message", () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const type = "interupt";

  const { getByText } = render(
    <LogoutConfirmation
      onConfirm={onConfirm}
      onCancel={onCancel}
      type={type}
    />,
  );

  // Assert that the dialog title is rendered correctly
  expect(
    getByText("Phiên đăng nhập của bạn bị gián đoạn. Hãy đăng nhập lại"),
  ).toBeInTheDocument();
});
