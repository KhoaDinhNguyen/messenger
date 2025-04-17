function InputSelect({
  id,
  required,
  valueOption,
  onChangeOption,
  labelText,
  rootContainer,
  optionContainer,
  selectContainer,
  labelContainer,
  optionList,
  titleName,
}) {
  const labelConfig = !labelText ? "" : labelText;
  const titleNameConfig = !titleName ? "" : titleName;

  const options = optionList.map((option) => {
    return (
      <option value={option} key={option} className={optionContainer}>
        {option}
      </option>
    );
  });

  return (
    <div className={rootContainer}>
      {labelConfig && (
        <label className={labelContainer} htmlFor={id}>
          {labelText}
        </label>
      )}
      <select
        name={id}
        id={id}
        className={selectContainer}
        onChange={onChangeOption}
        value={valueOption}
        required={required}
      >
        {titleNameConfig && (
          <option disabled value="">
            {titleNameConfig}
          </option>
        )}

        {options}
      </select>
    </div>
  );
}

export default InputSelect;
