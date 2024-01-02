import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RegisterPage from "./Register";

describe("Register Page", () => {
    it("should render with requireds fields", () => {
        render(<RegisterPage />);
        expect(screen.getByPlaceholderText("User Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
    });
});
