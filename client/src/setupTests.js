import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// mock alert()
global.alert = vi.fn();

// ---- Mock Vite Environment Variables ----
if (!import.meta.env) {
  Object.assign(import.meta, {
    env: {},
  });
}

import.meta.env.VITE_API_BASE_URL = "http://localhost:5000/api";
