import { render, screen } from "@testing-library/react";
import App from ".";

test("renders without crashing", () => {
  render(<App />);
  const linkElement = screen.getByText(/VaxWarden/i);
  expect(linkElement).toBeInTheDocument();
});
