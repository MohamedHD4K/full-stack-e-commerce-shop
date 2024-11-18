function Input({ id, title, value, type, handelChange }) {
  return (
    <div>
      <input
        className="form-control"
        type={type}
        name={id}
        onChange={handelChange}
        value={value}
        placeholder={title}
      />
    </div>
  );
}

export default Input;
