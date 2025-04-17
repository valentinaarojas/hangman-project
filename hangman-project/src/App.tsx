import { useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  }); // gets random word from words list between 0 and the length of the words array minus 1.
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  return (
    // displays JSX styling of UI for hangman game
    <div
      style={{
        maxWidth: "800px", // max width for full screen
        display: "flex", // center items
        flexDirection: "column", // stack items
        gap: "2rem", // space out every item
        margin: "0 auto", // center everything automatically
        alignItems: "center", // center all diff objects
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>
      <HangmanDrawing /> {/** component for hangman figure */}
      <HangmanWord /> {/** component for word that is being guessed */}
      <div style={{ alignSelf: "stretch" }}>
        {/** tells div to stretch and take up available width */}
        <Keyboard /> {/** component for letters to guess from */}
      </div>
    </div>
  );
}

export default App;
