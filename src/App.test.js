import { fireEvent, render, screen } from '@testing-library/react';
import App, { SnippetSelector, SelectorButton } from './App';

describe("App", () => {
  test("WIP", () => {
    render(<App/>)
  })
});

describe("Snippet Selector", () => { 
  describe("renders category buttons with intended labels", () => {
    test("Film Title", () => {
      const fakeFilmObj = [{id: 1, title : "fakeTitle"}];

      render(<SnippetSelector films={fakeFilmObj}/>);
      const buttonLabel = screen.getByText("Film Title"); //Searched DOM by text, text being "Film Title"
      
      expect(buttonLabel).toBeInTheDocument(); // Tests to see if "Film Title" is found
                                               // Instead do getByAllText + Map + filter by button & the key id?
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

  describe("Reset Category button", () => {
    test("WIP", () => {
      render(<SnippetSelector/>);
    })
  });
});

describe("Selector Button Buttons", () => {
  describe("attempt to render intended snippet when a category was chosen", () => {
    test.each`
    buttonCategory  | filmObjId | filmObjCategory   |  filmObjCategoryData
    ${"Fake Title"} | ${1}      | ${"title"}        | ${"Fake Title Data"}
    ${"Description"}| ${2}      | ${"description"}  | ${"Fake Description Data"}
    ${"Director"}   | ${3}      | ${"director"}     | ${"Fake Director Data"}
    `(`when $buttonCategory is clicked, then rendered snippet is $filmObjCategoryData`, ({buttonCategory, filmObjId, filmObjCategory, filmObjCategoryData}) => {
      const fakeFilmObj = [{id : filmObjId, [filmObjCategory]: filmObjCategoryData}];
      const mockChooseSnippet = jest.fn();

      render(<SelectorButton buttonNames={fakeFilmObj} onSelection={mockChooseSnippet} selectionType={buttonCategory}/>)
      fireEvent.click(screen.getByText(filmObjCategoryData));

      // The mock here is what function would normally run to render, will move to actual app testing? WAIT FOR RESPONSE TO NOT WASTE MY TIME
      expect(mockChooseSnippet).toHaveBeenCalledWith(filmObjCategoryData); 
    });
  });
//      const snippetLabel = screen.getByText(filmObjCategoryData); expect(snippetLabel).toBeInTheDocument();
  describe("resets the input text box when clicked", () => {
    
  });

  describe("resets the game state when clicked", () => {

  });

  describe("focus input textbox when clicked", () => {
    //toHaveFocus()
  });
});

