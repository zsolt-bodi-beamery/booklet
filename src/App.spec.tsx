import { render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render a heading", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<App />);
    expect(screen.getByText("Booklet")).toBeInTheDocument();
  });
});