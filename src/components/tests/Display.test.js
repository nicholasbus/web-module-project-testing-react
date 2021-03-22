import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockFetchShow from "../../api/fetchShow";
import Display from "./../Display";

jest.mock("../../api/fetchShow");

const testShow = {
  name: "Stranger Things",
  summary:
    "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [
        {
          id: 1,
          name: "",
          image: null,
          season: 1,
          number: 1,
          summary: "This is a specific summary",
          runtime: 1,
        },
      ],
    },
    {
      id: 1,
      name: "Season 2",
      episodes: [],
    },
    {
      id: 2,
      name: "Season 3",
      episodes: [],
    },
    {
      id: 3,
      name: "Season 4",
      episodes: [],
    },
  ],
};

test("Display component renders without any passed in props", () => {
  render(<Display />);
});

test("when the fetch button is pressed, the show component will display", async () => {
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce(testShow);

  const button = screen.queryByRole("button");
  userEvent.click(button);

  const showContainer = await screen.findByTestId("show-container");
  expect(showContainer).toBeInTheDocument();
});

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce(testShow);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const options = await screen.findAllByTestId("season-option");
  expect(options).toHaveLength(4);
});

test("when the fetch button is pressed, the passed function is called", () => {
  const mockDisplayFunc = jest.fn();
  render(<Display displayFunc={mockDisplayFunc()} />);
  mockFetchShow.mockResolvedValueOnce(testShow);

  const button = screen.getByRole("button");
  userEvent.click(button);

  expect(mockDisplayFunc).toHaveBeenCalled();
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
