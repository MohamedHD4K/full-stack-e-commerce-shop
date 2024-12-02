import { useState } from "react";

function Tag({ value, onToggle }) {
  const [tag, setTag] = useState(true);

  const handleClick = () => {
    setTag((prev) => !prev);
    onToggle(value);
  };
  return (
    <div
      className={
        tag
          ? "btn btn-outline-dark rounded-pill m-1"
          : "btn btn-dark rounded-pill m-1"
      }
      onClick={handleClick}
    >
      {value}
    </div>
  );
}

export default Tag;
