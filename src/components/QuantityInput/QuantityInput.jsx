import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityInput from "./QuantityInput";

function setup(value = 1) {
  const handlers = {
    onChange: vi.fn(),
    onIncrement: vi.fn(),
    onDecrement: vi.fn(),
  };
  render(<QuantityInput value={value} label="Backpack" {...handlers} />);
  return { user: userEvent.setup(), ...handlers };
}

describe("QuantityInput", () => {
  it("shows the value it is given", () => {
    setup(4);
    expect(screen.getByRole("spinbutton")).toHaveValue(4);
  });

  it("calls onIncrement when + is clicked", async () => {
    const { user, onIncrement } = setup();
    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it("calls onDecrement when - is clicked", async () => {
    const { user, onDecrement } = setup();
    await user.click(screen.getByRole("button", { name: /decrease/i }));
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it("reports typed text through onChange", async () => {
    const { user, onChange } = setup();
    await user.clear(screen.getByRole("spinbutton"));
    expect(onChange).toHaveBeenCalledWith("");
  });
});

export default QuantityInput;