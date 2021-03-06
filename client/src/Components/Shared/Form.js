import React from "react"

const Form = ({className, idx, value, onClick, onChange, onSubmit, refo, origin }) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onClick={() => onClick(idx)}
        name={idx}
        id={`ingr${idx}`}
        placeholder="...enter food"
        ref={refo}
        autoComplete='off'
      />
      {console.log(refo)}
      <button type="submit">{origin === 'addItem' ? '+' : '>'}</button>
    </form>
  )
}

export default Form
