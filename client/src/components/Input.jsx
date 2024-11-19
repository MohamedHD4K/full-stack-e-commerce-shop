function Input({ id, title, value, type, label, className , labelClass , handelChange, ...res }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClass +" form-label" }>
          {label}
        </label>
      )}
      <input
        className={ className + " form-control"}
        type={type}
        name={id}
        id={id}
        onChange={handelChange}
        value={value}
        placeholder={title}
        {...res}
      />
    </div>
  );
}

export default Input;
