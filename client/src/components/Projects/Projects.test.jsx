import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Projects from "./Projects";
import http from "@/api/http";

vi.mock("@/api/http");

describe("Projects Component", () => {
  it("loads and displays project list", async () => {
    http.get.mockResolvedValue({
      data: {
        data: [
          {
            _id: "1",
            title: "Test Project",
            description: "This is a test",
            img: "",
            firstname: "Jie",
            lastname: "Yang",
            email: "test@example.com",
            tech: ["React"],
          },
        ],
      },
    });

    render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );

    expect(screen.getByText("Projects")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });
  });
});
