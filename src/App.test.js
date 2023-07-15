import { fireEvent, render, screen } from '@testing-library/react';
import App, { SnippetSelector } from './App';
import { FetchData } from "./FetchData";

// [
//   {
//     title: "FakeTitle1",
//     description: "FakeDescription1",
//     director: "FakeDirector1"
//   },
//   {
//     title: "FakeTitle2",
//     description: "FakeDescription2",
//     director: "FakeDirector2"
//   }
// ]

// jest.mock("./FetchData");
// FetchData.mockImplementation(() => {
//   Promise.resolve(
//   [
//     {
//       title: "FakeTitle1",
//       description: "FakeDescription1",
//       director: "FakeDirector1"
//     },
//     {
//       title: "FakeTitle2",
//       description: "FakeDescription2",
//       director: "FakeDirector2"
//     }
//   ]
// )})

jest.mock("./FetchData");


// FetchData.FetchData = jest.fn().mockResolvedValue(
//   [
//     {
//       title: "FakeTitle1",
//       description: "FakeDescription1",
//       director: "FakeDirector1"
//     },
//     {
//       title: "FakeTitle2",
//       description: "FakeDescription2",
//       director: "FakeDirector2"
//     }
//   ]
// )


describe("App", () => {
  describe("Reset Category Button", () => {
    //console.log(FetchData)

    // test("TestTest Film Title Found After Click", () => {
    //   expect(FetchData).toHaveBeenCalledTimes(0); // Hasnt been called
    //   render(<App/>);
    //   expect(FetchData).toHaveBeenCalledTimes(1); // Has been called during render 
    //   expect(screen.getByText("Film Title")).toBeInTheDocument(); // Film Title is found
    //   fireEvent.click(screen.getByText("Film Title")); // Film title is clicked

    //   expect(screen.getByText("Film Title")).toBeInTheDocument();
    // });

    test("TestTest FakeTitle1 Found After Click", () => {
      // expect(FetchData).toHaveBeenCalledTimes(0); // Hasnt been called
      // render(<App/>);
      // expect(FetchData).toHaveBeenCalledTimes(1); // Has been called during render 
      // expect(screen.getByText("Film Title")).toBeInTheDocument(); // Film Title is found
      // fireEvent.click(screen.getByText("Film Title")); // Film title is clicked
      
      // expect(screen.getByText("FakeTitle1")).toBeInTheDocument();

      // console.log(FetchData())
      // console.log(typeof FetchData())
      //console.log(FetchData)

      // console.log("type of")
      FetchData.mockResolvedValue(15)
      console.log(typeof FetchData)
      console.log("actual")
      console.log(FetchData)
      console.log("then")
      //FetchData.then((value) => {console.log(value)})
      expect(FetchData).toEqual(15);


    }); 
    // test("TestTest FakeTitle2 Found After Click", () => {
    //   expect(FetchData).toHaveBeenCalledTimes(0); // Hasnt been called
    //   render(<App/>);
    //   expect(FetchData).toHaveBeenCalledTimes(1); // Has been called during render 
    //   expect(screen.getByText("Film Title")).toBeInTheDocument(); // Film Title is found
    //   fireEvent.click(screen.getByText("Film Title")); // Film title is clicked
      
    //   expect(screen.getByText("FakeTitle2")).toBeInTheDocument();
    // });
    // test("TestTest Castle Found After Click", () => {
    //   expect(FetchData).toHaveBeenCalledTimes(0); // Hasnt been called
    //   render(<App/>);
    //   expect(FetchData).toHaveBeenCalledTimes(1); // Has been called during render 
    //   expect(screen.getByText("Film Title")).toBeInTheDocument(); // Film Title is found
    //   fireEvent.click(screen.getByText("Film Title")); // Film title is clicked
      
    //   expect(screen.getByText("Castle")).toBeInTheDocument();
    // });

    test("empties typing textbox when clicked", () => {
      
      // expect(FetchData).toHaveBeenCalledTimes(0); // Hasnt been called

      // console.log(FetchData.FetchData);
      // console.log(typeof FetchData.FetchData);

      //render(<App/>);

      // expect(FetchData).toHaveBeenCalledTimes(1); // Has been called during render 

      // expect(screen.getByText("Film Title")).toBeInTheDocument(); // Film Title is found
      //fireEvent.click(screen.getByText("Film Title")); // Film title is clicked

      //expect(screen.getByText("FakeTitle1")).toBeInTheDocument(); // Film title is no longer found 

      

      // ?????????????????????????????????????????????????????????????????????
      //expect(screen.getByText("Film Title")).toBeInTheDocument();
      //expect(screen.getByText("FakeTitle1")).toBeInTheDocument();
      //expect(screen.getByText("FakeTitle2")).toBeInTheDocument();
      //expect(screen.getByText("Castle")).toBeInTheDocument();
    });

    test("unrenders chosen snippet when clicked", () => {
      //render(<App/>);
    });

    test("unrenders victory text when clicked", () => {
      //render(<App/>);
    });

    test("unrenders reset information text when clicked", () => {
      //render(<App/>);
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


