// body elements stored as variables since elements will be
// dynamically displayed based on incorrect letters guessed
const HEAD = (
  <div
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "100%", // creates perfect circle
      border: "10px solid black",
      position: "absolute",
      top: "50px", // positions head below hook
      right: "-30px", // centers head at the hook
    }}
  />
);

const BODY = (
  <div
    style={{
      width: "10px",
      height: "100px",
      background: "black",
      position: "absolute",
      top: "119px",
      right: "-1px",
    }}
  />
);

const RIGHT_ARM = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "-100px",
      rotate: "-30deg",
      transformOrigin: "left bottom", // this corner stays fixed (acts like a pin; when the element rotates, it spins around this pin)
    }}
  />
);

const LEFT_ARM = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "9px",
      rotate: "30deg",
      transformOrigin: "right bottom", // this corner stays fixed (acts like a pin; when the element rotates, it spins around this pin)
    }}
  />
);

const RIGHT_LEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "210px",
      right: "-90px",
      rotate: "60deg",
      transformOrigin: "left bottom", // this corner stays fixed (acts like a pin; when the element rotates, it spins around this pin)
    }}
  />
);

const LEFT_LEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "210px",
      right: 0,
      rotate: "-60deg",
      transformOrigin: "right bottom", // this corner stays fixed (acts like a pin; when the element rotates, it spins around this pin)
    }}
  />
);

// order is important when defining var (this is to be displayed on screen)
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

// typescript interface definition (defines expected props for component)
// component only expects numberOfGuesses and it must be a number
type HangmanDrawingProps = {
  numberOfGuesses: number;
};

// pass through number of guesses
// use destructuring { numberOfGuesses } to extract that specific value from the props object
// { numberOfGuesses }: HangmanDrawingProps is like saying 'int numberOfGuesses' in java
export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  // absolutely position each part of hangman person within container
  return (
    <div style={{ position: "relative" }}>
      {/** creates a new array containing only elements from index 0 up to (but not including) 
       * the index specified by numberOfGuesses 
       * so:
       if numberOfGuesses is 0: No body parts are shown
       if numberOfGuesses is 1: Only HEAD is shown
       if numberOfGuesses is 2: HEAD and BODY are shown
       */}
      {BODY_PARTS.slice(0, numberOfGuesses)}
      {/** rendering hook of top bar */}
      <div
        style={{
          height: "50px",
          width: "10px",
          background: "black",
          marginLeft: "310px",
          position: "absolute",
        }}
      />
      {/** rendering top bar */}
      <div
        style={{
          height: "10px",
          width: "200px",
          background: "black",
          marginLeft: "120px",
        }}
      />
      {/** rendering upright bar */}
      <div
        style={{
          height: "400px",
          width: "10px",
          background: "black",
          marginLeft: "120px",
        }}
      />
      {/** rendering bottom bar */}
      <div style={{ height: "10px", width: "250px", background: "black" }} />
    </div>
  );
}
