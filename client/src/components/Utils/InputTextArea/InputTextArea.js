import { useEffect, useRef } from "react";

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
  defaultHeight,
}) {
  const placeHolderModifiers = placeholder === undefined ? "" : placeholder;
  const requiredModifers = required === undefined ? false : required;
  const rowModifiers = row === undefined ? 10 : row;
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      if (valueText === "" && defaultHeight !== undefined) {
        textareaRef.current.style.height = defaultHeight;
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  }, [valueText, defaultHeight]);

  return (
    <div className={rootContainer}>
      {labelText !== undefined && labelText !== "" && (
        <label htmlFor={id} className={labelContainer}>
          {labelText}
        </label>
      )}
      <textarea
        type="text"
        name={id}
        id={id}
        ref={textareaRef}
        required={requiredModifers}
        value={valueText}
        onChange={onChangeText}
        onFocus={onFocusText}
        placeholder={placeHolderModifiers}
        minLength={minLength}
        maxLength={maxLength}
        className={inputContainer}
        onKeyDown={onKeyDown}
        wrap="soft"
      />
    </div>
  );
}

export default InputTextArea;
