import { screen, render } from "@testing-library/react";
import Manage from "./Manage";

describe("Sample test suite", () => {
  test("Testing Manage.js", () => {
    render(<Manage />);

    const elem = screen.getByText(
      "Need more clarity on managing shop request and ancillary services"
    );
    expect(elem).toBeInTheDocument();
  });
});
