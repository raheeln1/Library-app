import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WelcomePage from "../Components/WelcomePage";

describe("Welcome Page", () => {
  it("renders welcome text1", () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    const element = screen.getByText(/welcome to my personal library/i);
    expect(element).toBeInTheDocument();
  });

  it("renders welcome text2", () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    const element = screen.getByText(/organize and track your reading journey/i);
    expect(element).toBeInTheDocument();
  });

  it("renders welcome buttons", () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("login link works", () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("renders welcome buttons1", () => {
  render(
    <MemoryRouter>
      <WelcomePage />
    </MemoryRouter>
  );
  const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

  const signUpButton = screen.getByRole('button', { name: /sign up/i });
  expect(signUpButton).toBeInTheDocument();
});
});
