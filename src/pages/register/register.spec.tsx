import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RegisterPage from "./Register";

describe("Login Page", () => {
    it("should render with requireds fields", () => {
        render(<RegisterPage />);
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("FirstName")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("LastName")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Register " })).toBeInTheDocument();
    });
});
