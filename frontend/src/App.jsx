import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center items-center max-h-min">
      <p className="font-bold text-5xl">Hello</p>
    </div>
  );
}

export default App;
