import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "./login";

describe("Login Page", () => {
    it("should render with requireds fields", () => {
        render(<LoginPage />);
        expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    });
});
