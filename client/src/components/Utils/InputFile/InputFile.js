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
  mutiple,
}) {
  const labelConfig = !labelText ? "" : labelText;
  const requireConfig = !required ? false : required;
  const multipleConfig = !mutiple ? false : mutiple;
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
        multiple={multipleConfig}
      />
    </div>
  );
}

export default InputFile;
