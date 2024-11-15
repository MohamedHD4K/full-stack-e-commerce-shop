function Input({ id, title, value, type, handelChange }) {
  return (
    <div>
      <input
        className="form-control"
        type={type}
        id={id}
        name={id}
        onChange={handelChange}
        value={value}
        placeholder={title}
      />
    </div>
  );
}

export default Input;
