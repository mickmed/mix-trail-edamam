import React from "react"

const Form = ({idx, value, onClick, onChange, onSubmit, refo }) => {
  return (
    <form className="item-input" onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onClick={() => onClick(idx)}
        name={idx}
        id={`ingr${idx}`}
        placeholder="...enter food"
        ref={refo}
        autocomplete='off'
      />
      <button type="submit">+</button>
    </form>
  )
}

export default Form
