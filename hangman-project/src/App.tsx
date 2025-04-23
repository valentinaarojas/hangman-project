import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function getWord() {
  // gets random word from words list between 0 and the length of the words array minus 1
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord); 
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  // get all guessed letters, filter those letters where the letter is not equal to a
  // letter that is in the word
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  // 'lose' state
  const isLoser = incorrectLetters.length >= 6; // 6 total tries/body parts

  // 'win' state
  const isWinner = wordToGuess
    .split("") // break target word into individual letters
    .every((letter) => guessedLetters.includes(letter)); // condition to check if EVERY letter has been guessed

  // checks to see if letter has already been guessed (already stored in guessedLetters)
  // in order to not guess same letter twice or if win/lose state has been reached
  // useCallback is a hook that ensures function stays in sync with list of guessed letters
  // whenever component updates for any reason
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) {
        return; // ignore letter and move on
      }
      // otherwise, store (setGuessedLetters funct) and add that letter to list of
      // already guessed letters
      // arrow function receives existing list of guessed letters
      // spread operator (...) copies all existing letters from current state
      // and adds new letter to end of that array
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser] // dependencies
  ); // make new version of function when list changes

  // react hook to connect actual keyboard to the virtual keyboard
  // so players can type letters instead of clicking on the virtual keyboard
  useEffect(() => {
    // function responds to every keyboard press
    const handler = (e: KeyboardEvent) => {
      // creates a var for every individual key passed through
      const key = e.key;
      // if key doesn't match anything between a-z (^ - start of string, $ - end)
      // skip over and ignore key
      if (!key.match(/^[a-z]$/)) {
        return;
      }
      // prevents the default browser action for this key press
      // (like 'space' key for scrolling or 'enter' key for form submission)
      e.preventDefault();
      // calls function
      addGuessedLetter(key);
    };
    // attaches handler to entire document, listens to keypresses
    // anywhere on the page
    document.addEventListener("keypress", handler);
    // cleanup function that removes event listener when component
    // disappears from screen (ex. user is on another screen)
    // this way the function doesn't run in the background
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]); // re-runs keyboard setup whenever list of guessed letters changes

  // hook in order to receive brand new word
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") {
        return;
      }

      setWordToGuess(getWord())

      e.preventDefault();
      setGuessedLetters([]); // clears list to start over
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
  
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [])

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
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Press 'Enter' to try again"}
        {isLoser && "Nice try! - Press 'Enter' to try again"}
      </div>
      {/** component for hangman figure */}
      {/** need to pass how many times a letter has been guessed for drawing */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />{" "}
      {/** component for word that is being guessed */}
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        {" "}
        {/** tells div to stretch and take up available width */}
        {/** component for virtual keyboard with letters to guess from */}
        <Keyboard
          // disables keyboard after win/lose state
          disabled={isWinner || isLoser}
          // prop to pass in correct letters
          // takes full list of guessed letters and filters to only keep letters
          // that are in word
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          // prop to pass in incorrect letters
          inactiveLetters={incorrectLetters}
          // prop to pass in function that updates guessed letters
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
