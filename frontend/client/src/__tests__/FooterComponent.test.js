import React from "react";
import { render } from "@testing-library/react";
import Footer from "../components/footer";
import "@testing-library/jest-dom";

test("renders footer component", () => {
  const { getByText } = render(<Footer />);

  // Assert that the required elements are rendered
  expect(getByText("Trung tâm tổng đài & CSKH")).toBeInTheDocument();
  expect(
    getByText("Công ty cổ phần Xe khách Kim Nguyên - XEKIMNGUYEN"),
  ).toBeInTheDocument();
  expect(getByText("Địa chỉ:")).toBeInTheDocument();
  expect(
    getByText("Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức"),
  ).toBeInTheDocument();
  expect(getByText("Email:")).toBeInTheDocument();
  expect(getByText("20110248@student.hcmute.edu.vn")).toBeInTheDocument();
  expect(getByText("Điện thoại:")).toBeInTheDocument();
  expect(getByText("Xe Kim Nguyên")).toBeInTheDocument();
  expect(getByText("Về chúng tôi")).toBeInTheDocument();
  expect(getByText("Lịch trình")).toBeInTheDocument();
  expect(getByText("Hỗ trợ")).toBeInTheDocument();
  expect(getByText("Tra cứu thông tin đặt vé")).toBeInTheDocument();
  expect(getByText("Điều khoản sử dụng")).toBeInTheDocument();
  expect(getByText("Hướng dẫn đặt vé")).toBeInTheDocument();
  expect(getByText("Câu hỏi thường gặp")).toBeInTheDocument();
  expect(getByText("Chính sách bảo mật")).toBeInTheDocument();
  expect(
    getByText(
      "Copyright @ 2023 | Bản quyền thuộc về Công ty cổ phần Xe khách Kim Nguyên",
    ),
  ).toBeInTheDocument();
});
