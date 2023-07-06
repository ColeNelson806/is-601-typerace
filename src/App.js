import React from "react";
import { useState } from "react";

const App = () => {
  const defaultButtonTextItems = [
    "Bears, beets, battlestar galactica",
    "What's Forrest Gump's password? 1Forrest1",
    "Where do programmers like to hang out? The Foo Bar",
    "Buggy Bunny",
  ];
  // gameState ~ victory, startTime, 
  const initialGameState = { 
    victory: false, 
    startTime: null, 
    endTime:  null,
  };

  const [buttonTextItems, setButtonTextItems] = useState(defaultButtonTextItems)
  const [customSnippet, setCustomSnippet] = useState("");
  const updateCustomSnippetText = event => {
    setCustomSnippet(event.target.value)
  }

  const addCustomSnippet = (newCustom) => {
    buttonTextItems.push(newCustom);
    setButtonTextItems(buttonTextItems);
    setCustomSnippet("");
  }

  const [gameState, setGameState] = useState(initialGameState);
  const [highScore, setHighScore] = useState(0);
  const [snippet, setSnippet] = useState("");
  const [userText, setUserText] = useState("");
  const updateUserText = event => { 
    setUserText(event.target.value);

    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime,
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

  const updateHighScore = (speed) => {
    if(highScore === 0 && gameState.endTime !== null) {
      setHighScore(speed);
    } else if(gameState.endTime !== null && speed < highScore){
      setHighScore(speed);
    }
    return "";
  }

  return (
    <div>
      <h2>TypeRace</h2>
      <hr/>
      <h3>High Score: {highScore} ms</h3>
      <h3>Snippet</h3>
      <div>{snippet}</div>
      <h4>{gameState.victory ? `${updateHighScore(gameState.endTime)}Done! Woot! Time: ${gameState.endTime} ms` : null}</h4>
      <input id="inputTextbox" value={userText} onChange={updateUserText}/>
      <hr />
      {gameState.victory ? <h4>Click a snippet to reset!</h4> : null}
      {Object.values(buttonTextItems).map((textItem, index) => <button onClick={() => { 
        chooseSnippet(index);  // Selects the snippet of text to display above text box and also the snippet to compare against
        setUserText(""); // Resets the text box's value to be blank
        // updateHighScore(gameState.endTime);
        document.getElementById("inputTextbox").focus();
        resetGameState(); // Resets the victory status, and starts a new time count. 
      }}>{textItem}</button>)}
      <p>Add your own snippet!</p>
      <input value={customSnippet} onChange={updateCustomSnippetText}/>
      <button onClick={() => addCustomSnippet(customSnippet)}>Add</button>
    </div>
  );
};

export default App;

