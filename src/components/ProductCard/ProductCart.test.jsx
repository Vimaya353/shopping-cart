import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const product = { id: 1, title: "Test Backpack", price: 10, image: "bag.jpg" };

function setup() {
  const onAddToCart = vi.fn();
  render(<ProductCard product={product} onAddToCart={onAddToCart} />);
  return { user: userEvent.setup(), onAddToCart };
}

describe("ProductCard", () => {
  it("shows the title and formatted price", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Test Backpack" })
    ).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("increments but never goes below 1", async () => {
    const { user } = setup();
    const input = screen.getByRole("spinbutton");

    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(input).toHaveValue(2);

    await user.click(screen.getByRole("button", { name: /decrease/i }));
    await user.click(screen.getByRole("button", { name: /decrease/i }));
    expect(input).toHaveValue(1);
  });

  it("treats an empty field as 1 when + is clicked", async () => {
    const { user } = setup();
    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(input).toHaveValue(2);
  });

  it("adds the chosen quantity, then resets to 1", async () => {
    const { user, onAddToCart } = setup();

    await user.click(screen.getByRole("button", { name: /increase/i }));
    await user.click(screen.getByRole("button", { name: /increase/i }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(product, 3);
    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });
});