import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UsersSlice";

// Mock hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ to, children, ...rest }) => <a href={to} {...rest}>{children}</a>
}));

jest.mock("../Features/UsersSlice", () => ({
  logout: jest.fn()
}));

describe("Header Component", () => {
  const mockDispatch = jest.fn();
  
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("renders logo image", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logo = screen.getByAltText("bookslogo");
    expect(logo).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.getByText(/add-book/i)).toBeInTheDocument();
  });

 it("calls logout and navigates on logout click", async () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const logoutButton = screen.getByRole("button", { name: /logout/i });
  fireEvent.click(logoutButton);

  await new Promise((resolve) => setTimeout(resolve, 150));

  expect(mockDispatch).toHaveBeenCalledWith(logout());
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});


  });
