function InputRadio({
  id,
  name,
  onChangeRadio,
  checked,
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
        type="radio"
        id={id}
        name={name}
        value={id}
        checked={checked}
        onChange={onChangeRadio}
        className={inputContainer}
      />
    </div>
  );
}

export default InputRadio;
