import styles from "./Keyboard.module.css"

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function Keyboard() {
  return (
    <div
      style={{
        display: "grid",
        // auto-fit: create as many columns as will fit in available space
        // minmax: each col should be 75 pixels wide, but could grow larger to fill space
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem", // adds space between grid items
      }}
    >
      {/** loop through each key and render to screen */}
      {KEYS.map((key) => {
        // button includes a combination of general css styling, inactive styling
        return <button className={`${styles.btn}`} key={key}>{key}</button>;
      })}
    </div>
  );
}
