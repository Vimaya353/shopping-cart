import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Unmount rendered components after each test so tests don't leak into each other
afterEach(() => {
  cleanup();
});