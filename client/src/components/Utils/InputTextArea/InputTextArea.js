function InputTextArea({
  id,
  required,
  valueText,
  onChangeText,
  onFocusText,
  onKeyDown,
  placeholder,
  labelText,
  minLength,
  maxLength,
  rootContainer,
  labelContainer,
  inputContainer,
  row,
}) {
  const placeHolderModifiers = placeholder === undefined ? "" : placeholder;
  const requiredModifers = required === undefined ? false : required;
  const rowModifiers = row === undefined ? 10 : row;
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
        rows={rowModifiers}
        className={inputContainer}
        onKeyDown={onKeyDown}
        wrap="soft"
      />
    </div>
  );
}

export default InputTextArea;
