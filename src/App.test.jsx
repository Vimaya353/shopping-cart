import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

const mockProducts = [
  { id: 1, title: "Test Backpack", price: 10, image: "bag.jpg" },
  { id: 2, title: "Test Jacket", price: 20, image: "jacket.jpg" },
];

function renderApp(path = "/shop") {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return userEvent.setup();
}

describe("shopping cart app", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a loading message, then the products", async () => {
    renderApp();
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Test Backpack" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Test Jacket" })
    ).toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    renderApp();
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("updates the navbar badge when items are added", async () => {
    const user = renderApp();
    await screen.findByRole("heading", { name: "Test Backpack" });

    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).not.toHaveTextContent("(");

    const [firstAddButton] = screen.getAllByRole("button", {
      name: /add to cart/i,
    });
    await user.click(
      screen.getByRole("button", { name: /increase quantity of test backpack/i })
    );
    await user.click(firstAddButton);

    expect(cartLink).toHaveTextContent("(2)");
  });

  it("lets the user edit and remove items on the cart page", async () => {
    const user = renderApp();
    await screen.findByRole("heading", { name: "Test Backpack" });

    // Add 2 backpacks ($10 each)
    await user.click(
      screen.getByRole("button", { name: /increase quantity of test backpack/i })
    );
    await user.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);

    // Go to the cart page
    await user.click(screen.getByRole("link", { name: /cart/i }));
    expect(screen.getByText(/total: \$20\.00/i)).toBeInTheDocument();

    // Increase to 3
    await user.click(
      screen.getByRole("button", { name: /increase quantity of test backpack/i })
    );
    expect(screen.getByText(/total: \$30\.00/i)).toBeInTheDocument();

    // Remove it
    await user.click(screen.getByRole("button", { name: /remove/i }));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});

