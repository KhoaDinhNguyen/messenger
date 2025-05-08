function InputTextArea({
  id,
  required,
  valueText,
  onChangeText,
  onFocusText,
  placeholder,
  labelText,
  minLength,
  maxLength,
  rootContainer,
  labelContainer,
  inputContainer,
}) {
  const placeHolderModifiers = placeholder === undefined ? "" : placeholder;
  const requiredModifers = required === undefined ? false : required;

  return (
    <div className={rootContainer}>
      {labelText !== undefined && labelText !== "" && (
        <label htmlFor={id} className={labelContainer}>
          {labelText}:
        </label>
      )}
      <textarea
        type="text"
        name={id}
        id={id}
        required={requiredModifers}
        value={valueText}
        onChange={onChangeText}
        onFocus={onFocusText}
        placeholder={placeHolderModifiers}
        minLength={minLength}
        maxLength={maxLength}
        rows={10}
        className={inputContainer}
      />
    </div>
  );
}

export default InputTextArea;
