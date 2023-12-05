import React from "react";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  info,
  error,
  type = "text",
  disabled,
  icon,
  options,
  onChange,
}) => {
  if (type === "inputGroup") {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text p-100">
            {" "}
            <i className={icon} />
          </span>
        </div>
        <input
          onChange={onChange}
          type="text"
          className={`${error && "is-invalid"} form-control form-control-lg`}
          placeholder={placeholder}
          value={value}
          name={name}
        />
        {error && <p style={{ color: "red" }}> {error}</p>}
      </div>
    );
  }
  if (type === "select") {
    const selectOption = options.map((option) => (
      <option
        key={option.label}
        selected={option?.selected || false}
        value={option.value}
      >
        {option.label}
      </option>
    ));
    return (
      <div className="form-group">
        <select
          onChange={onChange}
          className={`${error && "is-invalid"} form-control form-control-lg`}
          value={value}
          name={name}
        >
          {selectOption}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <p style={{ color: "red" }}> {error}</p>}
      </div>
    );
  }
  if (type === "textarea") {
    return (
      <div className="form-group">
        <textarea
          onChange={onChange}
          className={`${error && "is-invalid"} form-control form-control-lg`}
          placeholder={placeholder}
          value={value}
          name={name}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <p style={{ color: "red" }}> {error}</p>}
      </div>
    );
  }
  return (
    <div className="form-group">
      <input
        onChange={onChange}
        type={type}
        className={`${error && "is-invalid"} form-control form-control-lg mb-2`}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <p style={{ color: "red" }}> {error}</p>}
    </div>
  );
};

export default TextFieldGroup;
