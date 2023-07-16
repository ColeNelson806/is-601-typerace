import { fireEvent, render, screen } from '@testing-library/react';
import App, { SnippetSelector } from './App';
import { act } from "react-dom/test-utils";
import * as fetchFunction  from "./FetchData";

const filmData = [
  {
    id: "1",
    title: "FakeTitle1",
    description: "FakeDescription1",
    director: "FakeDirector1"
  },
  {
    id: "2",
    title: "FakeTitle2",
    description: "FakeDescription2",
    director: "FakeDirector2"
  }
];

describe("App", () => {
  // These tests cause warning errors, I have no idea how to fix them and looking online didn't find my any working
  // results. Probably because the state changes I want to happen however I have no way to actually check them with
  // the way that this code is set up.
  describe("Reset Category Button", () => {
    // Creates fake data for fetch API to use instead of calling actual
    const fetchDataMock = jest.spyOn(fetchFunction, "FetchData");
    fetchDataMock.mockResolvedValue(filmData);

    // The way I check in this test ends up checking to make sure both don't exist, which is good but not unit then?
    test("unrender the chosen snippet text & button when clicked", async () => {
      const fetchDataMock = jest.spyOn(fetchFunction, "FetchData");
      fetchDataMock.mockResolvedValue(filmData);
      
      // Im aware I am very likely using await wrong, however it works... Please let me know if this isnt right.
      await render(<App/>);
      await fireEvent.click(screen.getByText("Film Title")); // Film title is clicked
      await fireEvent.click(screen.getByText("FakeTitle2")); // Clicks the fake title which is a snippet option
      await fireEvent.click(screen.getByText("Reset Category")); // Clicks the reset button

      await expect(screen.queryByText("FakeTitle2")).toEqual(null); // Does not find the button or string on screen
    }); 

    // test("empties typing textbox when clicked", async () => {
    // I think for this test to be able to happen, the input box would need to be its own comp so I can import it
    // In order to actually test it's state/display.?
    // }); 

    test("unrenders victory text when clicked", async () => {
      const fetchDataMock = jest.spyOn(fetchFunction, "FetchData");
      fetchDataMock.mockResolvedValue(filmData);
      
      await render(<App/>);
      await fireEvent.click(screen.getByText("Film Title"));
      await fireEvent.click(screen.getByText("FakeTitle2"));
      await fireEvent.click(screen.getByText("Reset Category")); 

      await expect(screen.queryByText("Done! Woot!", {exact: false})).toEqual(null); 
    });

    test("unrenders reset information text when clicked", async () => {
      const fetchDataMock = jest.spyOn(fetchFunction, "FetchData");
      fetchDataMock.mockResolvedValue(filmData);
      
      await render(<App/>);
      await fireEvent.click(screen.getByText("Film Title")); 
      await fireEvent.click(screen.getByText("FakeTitle2")); 
      await fireEvent.click(screen.getByText("Reset Category"));

      await expect(screen.queryByText("Click a new snippet or reset the categories.")).toEqual(null); 
    });

  });
});

describe("Snippet Selector", () => { 
  describe("initial render renders category buttons with intended labels", () => {
    test("Film Title", () => {
      const fakeFilmObj = [{id: 1, title : "fakeTitle"}];

      render(<SnippetSelector films={fakeFilmObj}/>);
      const buttonLabel = screen.getByText("Film Title"); //Searched DOM by text, text being "Film Title"

      expect(buttonLabel).toBeInTheDocument(); // Tests to see if "Film Title" is found
    });

    test("Description", () => {
      const fakeFilmObj = [{id: 1, description : "fakeDescription"}];

      render(<SnippetSelector films={fakeFilmObj}/>);
      const buttonLabel = screen.getByText("Description");

      expect(buttonLabel).toBeInTheDocument();
    });

    test("Director", () => {
      const fakeFilmObj = [{id: 1, director : "fakeDirector"}];

      render(<SnippetSelector films={fakeFilmObj}/>);
      const buttonLabel = screen.getByText("Director");
      
      expect(buttonLabel).toBeInTheDocument();
    });
  });

  describe("renders intended category content buttons when a category button is clicked", () => {
    test("Renders buttons with film titles once Film Title button has been clicked", () => {
      // Arrange/Setup
      const fakeFilmObj = [{id: 1, title : "fakeTitle"}];
      const mockChooseSnippet = jest.fn();
      // Act
      render(<SnippetSelector films={fakeFilmObj} chooseSnippet={mockChooseSnippet} />);
      fireEvent.click(screen.getByText("Film Title"));
      const testButton = screen.getByText("fakeTitle");
      // Assert
      expect(testButton).toBeInTheDocument();
    });
    
    test("Renders buttons with descriptions once Description button has been clicked", () => {
      const fakeFilmObj = [{id: 1, description : "fakeDescription"}];
      const mockChooseSnippet = jest.fn();
      
      render(<SnippetSelector films={fakeFilmObj} chooseSnippet={mockChooseSnippet} />);
      fireEvent.click(screen.getByText("Description"));
      const testButton = screen.getByText("fakeDescription");
      
      expect(testButton).toBeInTheDocument();
    });

    test("Renders buttons with directors once Directir button has been clicked", () => {
      const fakeFilmObj = [{id: 1, director : "fakeDirector"}];
      const mockChooseSnippet = jest.fn();
      
      render(<SnippetSelector films={fakeFilmObj} chooseSnippet={mockChooseSnippet} />);
      fireEvent.click(screen.getByText("Director"));
      const testButton = screen.getByText("fakeDirector");
      
      expect(testButton).toBeInTheDocument();
    });
  });
});


