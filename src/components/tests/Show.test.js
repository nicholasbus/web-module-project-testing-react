import React from "react";
import { getByAltText, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

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

test("renders testShow and no selected Season without errors", () => {
  render(<Show show={testShow} selectedSeason='none' />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} selectedSeason='none' />);
  const loadingComponent = screen.queryByText("Fetching data...");
  expect(loadingComponent).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={testShow} selectedSeason='none' />);
  const selects = screen.queryAllByTestId("season-option");
  expect(selects).toHaveLength(4);
});

test("handleSelect is called when an season is selected", () => {
  const mockHandleSelect = jest.fn();

  render(
    <Show
      show={testShow}
      selectedSeason='none'
      handleSelect={mockHandleSelect}
    />
  );
  const select = screen.queryByLabelText("Select A Season");
  userEvent.selectOptions(select, ["2"]);
  expect(mockHandleSelect.mock.calls).toHaveLength(1);
});

test("component renders when no seasons are selected and when rerenders with a season passed in", async () => {
  const show = render(<Show show={testShow} selectedSeason='none' />);
  const episodeNumber = screen.queryByText("Season 2, Episode 1");
  expect(episodeNumber).not.toBeInTheDocument();

  show.rerender(<Show show={testShow} selectedSeason='0' />);
  const newEpisodeNumber = screen.queryByText("Season 1, Episode 1");
  expect(newEpisodeNumber).toBeInTheDocument();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
