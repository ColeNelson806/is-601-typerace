import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const initialGameState = { 
    startTime: null, 
    timeTaken:  null,
  };

  const [CUSTOM_SNIPPETS, setCUSTOM_SNIPPETS] = useState(false)
  const [customSnippet, setCustomSnippet] = useState("");
  const updateCustomSnippetText = event => {
    setCustomSnippet(event.target.value)
  }
  
  // const addCustomSnippet = (newCustom) => {
  //   const matchingIndex = buttonTextItems.indexOf(newCustom)
  //   if (matchingIndex === -1){
  //     buttonTextItems.push(newCustom);
  //     setButtonTextItems(buttonTextItems);
  //   } else {
  //     buttonTextItems.splice(matchingIndex, 1);
  //     setButtonTextItems(buttonTextItems);
  //   }
  //   setCustomSnippet("");
  // }

  const [gameState, setGameState] = useState(initialGameState);
  const [highScore, setHighScore] = useState(0);
  const [snippet, setSnippet] = useState("");
  const [userText, setUserText] = useState("");
  const [hasError, setErrors] = useState(false);
  const [films, setFilms] = useState([]);

  const updateUserText = event => { 
    setUserText(event.target.value);

    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        
        timeTaken: new Date().getTime() - gameState.startTime,
      });
    }
  };

  const chooseSnippet = selectedSnippet => { 
    setSnippet(selectedSnippet);
    setGameState({ ...gameState, startTime: new Date().getTime() });
  }; 

  const fetchData = async () => {
    const response = await fetch("https://ghibliapi.vercel.app/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49")
    response
      .json()
      .then(response => setFilms([response]))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const resetGameState = () => {
    setGameState({...initialGameState, startTime: new Date().getTime()});
  }

  const updateHighScore = (speed) => {
    if(highScore === 0 && gameState.timeTaken !== null) {
      setHighScore(speed);
    } else if(gameState.timeTaken !== null && speed < highScore){
      setHighScore(speed);
    }
    return "";
  }

  return (
    <div>
      <h2 className="leftMarg" id="gameName">TypeRace</h2>
      <hr/>
      <h3 className="text" id="highScore">High Score: {highScore} ms</h3>
      <hr />
      <h3 className="leftMarg text" id="snippetText">Snippet</h3>
      <div className="leftMarg text" id="snippetAct">{snippet}</div>
      <h4 className="leftMarg text">{gameState.timeTaken ? `${updateHighScore(gameState.timeTaken)}Done! Woot! Time: ${gameState.timeTaken} ms` : null}</h4>
      <input className="leftMarg" id="inputTextbox" value={userText} onChange={updateUserText}/>
      <hr />
      {gameState.timeTaken ? <h4 className="leftMarg text">Click a new snippet or reset the categories.</h4> : null}
      <SnippetSelector chooseSnippet={chooseSnippet} films={films} setUserText={setUserText} resetGameState={resetGameState}/>
      <>{hasError ? "An error has occurred": null}</>
      {CUSTOM_SNIPPETS ?
        <>
          <hr />
          <p className="leftMarg text">Type a snippet you want to add or remove.</p>
          <input value={customSnippet} onChange={updateCustomSnippetText} type=""/>
          <button /* onClick={() => addCustomSnippet(customSnippet)}*/>Add</button>
          <hr />
          <button className="outerDiv BROKEN" onClick={() => setCUSTOM_SNIPPETS(false)}>~BROKEN~ Disable Custom Snippets ~BROKEN~</button>
        </>
      : <><hr/><button className="outerDiv BROKEN" onClick={() => setCUSTOM_SNIPPETS(true)}>~BROKEN~ Enable Custom Snippets ~BROKEN~</button></>}
    </div>
  );
};
export default App;

const SnippetSelector = ({films, chooseSnippet, setUserText, resetGameState}) => {
  const selections = [
    {id : 1, title : "Film Title"},
    {id : 2, title : "Description"},
    {id : 3, title : "Director"},
  ];

  const [whatToType, setWhatToType] = useState(null);
  const chooseWhatToType = (selection) => setWhatToType(selection);

  const changeType = () => {
    setWhatToType(null);
  }

  return (
    <div className="outerDiv">
      {!whatToType ?
      <div>
        <h4 className="text">What category would you like to type?</h4>
        <SelectorButton buttonNames={selections} onSelection={chooseWhatToType} setUserText={setUserText} resetGameState={resetGameState}/>
      </div>
      : null}
      {whatToType && films?
      <div>
        <h4 className="text">Choose One</h4>
        <SelectorButton buttonNames={films} onSelection={chooseSnippet} selectionType={whatToType} setUserText={setUserText} resetGameState={resetGameState}/>
      </div>
      : null}
      <br/>
      <button cclassName="outerDiv" onClick={changeType}>Reset Category</button>
    </div>
  );
};

const SelectorButton = ({buttonNames, onSelection, selectionType, setUserText, resetGameState}) => {
  switch(selectionType) {
    case "Film Title":
      return (buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => {
        onSelection(buttonName.title)
        setUserText("");
        resetGameState();
        document.getElementById("inputTextbox").focus();
      }}>{buttonName.title}</button>));
    case "Description":
      return (buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => {
        onSelection(buttonName.description)
        setUserText("");
        resetGameState();
        document.getElementById("inputTextbox").focus();
      }}>{buttonName.description}</button>));
    case "Director":
      return (buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => {
        onSelection(buttonName.director)
        setUserText("");
        resetGameState();
        document.getElementById("inputTextbox").focus();
      }}>{buttonName.director}</button>));
    default:
      return (buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => {
        onSelection(buttonName.title)
        setUserText("");
        resetGameState();
        document.getElementById("inputTextbox").focus();
      }}>{buttonName.title}</button>));
  }
};