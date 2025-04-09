import { useState } from "react"
import words from "./wordList.json"

function App() {
  
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  }) // gets random word from words list between 0 and the length of the words array minus 1.
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  
  return (
   <h1>Hi</h1>
  )
}

export default App
