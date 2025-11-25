import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "@/auth/authContext";
import { vi } from "vitest";

// ------ Mock useAuth ------
vi.mock("@/auth/authContext", () => ({
  useAuth: vi.fn(),
}));

describe("Login Component", () => {

  beforeEach(() => {
    //  mock
    vi.clearAllMocks();
  });

  test("renders the form fields", () => {
    // mock signin 
    useAuth.mockReturnValue({
      signin: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // heading
    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();

    // input fields
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // button
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("calls signin() when form is submitted", async () => {
    const signinMock = vi.fn();

    useAuth.mockReturnValue({
      signin: signinMock,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(signinMock).toHaveBeenCalledOnce();
    expect(signinMock).toHaveBeenCalledWith("test@example.com", "123456");
  });
});
