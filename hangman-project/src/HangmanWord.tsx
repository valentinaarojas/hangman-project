export function HangmanWord() {
  const word = "test";
  const guessedLetters = ["t"];
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {/** split word into individual letters, map through each letter and each index,
       * run a function with that info to render single span of each letter */}
      {word.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}> {/** index is unique identifier for our letter in our word */}
          {/** if correct letter is guessed (true), letter appears, if not (false), letters remain hidden */}
          <span
            style={{
              visibility: guessedLetters.includes(letter)
                ? "visible"
                : "hidden",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
