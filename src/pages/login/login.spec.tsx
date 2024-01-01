import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "./login";

describe("Login Page", () => {
    it("should render with requireds fields", () => {
        render(<LoginPage />);
        expect(screen.getByText(/Sign In/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
        expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    });
});
