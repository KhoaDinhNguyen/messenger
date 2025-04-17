function InputButton({
  id,
  valueButton,
  onClickHandler,
  labelText,
  rootContainer,
  inputContainer,
  labelContainer,
  type,
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
        type={type}
        id={id}
        name={id}
        value={valueButton}
        onClick={onClickHandler}
        className={inputContainer}
        autoComplete="off"
      />
    </div>
  );
}

export default InputButton;
