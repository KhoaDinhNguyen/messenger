function InputText({
  id,
  required,
  placeholder,
  minLength,
  maxLength,
  valueText,
  onChangeText,
  labelText,
  rootContainer,
  inputContainer,
  labelContainer,
  autoComplete,
  pattern,
  onFocusText,
}) {
  const labelConfig = !labelText ? "" : labelText;
  const autoCompleteConfig = !autoComplete ? "off" : autoComplete;
  const requireConfig = !required ? false : required;

  return (
    <div className={rootContainer}>
      {labelConfig && (
        <label className={labelContainer} htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        required={requireConfig}
        minLength={minLength}
        maxLength={maxLength}
        value={valueText}
        onChange={onChangeText}
        onFocus={onFocusText}
        className={inputContainer}
        autoComplete={autoCompleteConfig}
        autoSave="off"
        pattern={pattern}
      />
    </div>
  );
}

export default InputText;
