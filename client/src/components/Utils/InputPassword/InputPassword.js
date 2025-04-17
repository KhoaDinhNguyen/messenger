function InputPassword({
  id,
  required,
  placeholder,
  minLength,
  maxLength,
  valuePassword,
  onChangePassword,
  labelText,
  rootContainer,
  inputContainer,
  labelContainer,
}) {
  const labelConfig = !labelText ? "" : labelText;

  return (
    <div className={rootContainer}>
      {labelConfig && (
        <label className={labelContainer} htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        type="password"
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        value={valuePassword}
        onChange={onChangePassword}
        className={inputContainer}
        autoComplete="off"
      />
    </div>
  );
}

export default InputPassword;
