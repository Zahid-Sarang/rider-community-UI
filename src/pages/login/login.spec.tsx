import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "./login";

describe("Login Page", () => {
    it("should render with requireds fields", () => {
        render(<LoginPage />);
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
        expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    });
});
