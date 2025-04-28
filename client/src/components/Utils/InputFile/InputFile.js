function InputFile({
  id,
  required,
  labelText,
  rootContainer,
  inputContainer,
  labelContainer,
  valueFile,
  onChangeFile,
  accept,
}) {
  const labelConfig = !labelText ? "" : labelText;
  const requireConfig = !required ? false : required;

  return (
    <div className={rootContainer}>
      {labelConfig && (
        <label className={labelContainer} htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        type="file"
        id={id}
        name={id}
        required={requireConfig}
        value={valueFile}
        onChange={onChangeFile}
        className={inputContainer}
        accept={accept}
      />
    </div>
  );
}

export default InputFile;
