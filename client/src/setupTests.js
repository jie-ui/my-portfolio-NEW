import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// mock alert
global.alert = vi.fn();

// mock Vite environment variables for tests
import.meta.env = {
  VITE_API_BASE_URL: "http://localhost:5000/api",
};
