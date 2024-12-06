import { useState } from "react";
import { Button } from "react-bootstrap";

function Input({
  id,
  title,
  value,
  type,
  label = null,
  className,
  labelClass,
  handelChange,
  ...res
}) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClass + " form-label"}>
          {label}
        </label>
      )}
      <div className="input-group">
        <input
          className={className + " form-control"}
          type={!visibility && type}
          name={id}
          id={id}
          onChange={handelChange}
          value={value}
          placeholder={title}
          {...res}
        />
        {type === "password" && (
          <Button
            variant="light"
            className="input-group-text material-symbols-outlined text-secondary"
            style={{zIndex:"0"}}
            onClick={() => setVisibility((prev) => !prev)}
          >
            visibility{!visibility && "_off"}
          </Button>
        )}
      </div>
    </div>
  );
}
export default Input;
