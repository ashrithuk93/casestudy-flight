import { render, screen } from "@testing-library/react";
import Select from "./Select";
import { Provider } from "react-redux";
import store from "../../store";

describe("Select.js test set", () => {
  test("render all flight", async () => {
    render(
      <Provider store={store}>
        <Select />
      </Provider>
    );

    const listElements = await screen.findByRole(
      "listitem",
      {},
      { timeout: 3 }
    );
    expect(listElements).not.toHaveLength(0);
  });
});
