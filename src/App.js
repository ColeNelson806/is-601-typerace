import React from "react";
import { useState } from "react";

const App = () => {
  const buttonTextItems = [
    "Bears, beets, battlestar galactica",
    "What's Forrest Gump's password? 1Forrest1",
    "Where do programmers like to hang out? The Foo Bar",
    "Buggy Bunny",
  ];
  // gameState ~ victory, startTime, 
  const initialGameState = { 
    victory: false, 
    startTime: null, 
    endTime: null,
  };

  const [gameState, setGameState] = useState(initialGameState);
  const [snippet, setSnippet] = useState("");
  const [userText, setUserText] = useState("");
  const updateUserText = event => { 
    setUserText(event.target.value);

    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  };

  const chooseSnippet = index => { 
    setSnippet(buttonTextItems[index]);
    setGameState({victory: false, startTime: new Date().getTime() });
  }; 

  const resetGameState = () => {
    setGameState({victory: false, startTime: new Date().getTime(), endTime: null });
  }

  return (
    <div>
      <h2>TypeRace</h2>
      <hr />
      <h3>Snippet</h3>
      <div>{snippet}</div>
      <h4>{gameState.victory ? `Done! Woot! Time: ${gameState.endTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText}/>
      <hr />
      {gameState.victory ? <h5>Click a snippet to reset!</h5> : null}
      {buttonTextItems.map((textItem, index) => <button onClick={() => { 
        chooseSnippet(index);  // Selects the snippet of text to display above text box and also the snippet to compare against
        setUserText("") // Resets the text box's value to be blank
        resetGameState(); // Resets the victory status, and starts a new time count. 
      }}>{textItem}</button>)}
    </div>
  );
};

export default App;

