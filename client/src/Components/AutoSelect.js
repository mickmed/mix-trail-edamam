import React from "react"
import AsyncSelect from "react-select/async"

const AutoSelect = ({
  label,
  items,
  handleUpdateIndex,
  loadOptions,
  inputElemen,
}) => (
  <AsyncSelect
    value={{ value: "oragne pasoof", label: label }}
    onChange={(option, name) => handleUpdateIndex(option, items.length)}
    // onClick={() => setSelectedId(idx)}
    loadOptions={loadOptions}
    name={items.length}
    id={`ingr${items.length}`}
    placeholder="...food"
    ref={inputElemen}
  />
)

export default AutoSelect

{
  /* <form className="item-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input[items.length]}
              onChange={handleChange}
              onClick={() => setSelectedId(items.length)}
              name={items.length}
              id={`ingr${items.length}`}removeItem
              placeholder="...food"
              ref={inputElement}
            />
            <button type="submit">></button>
          </form> */
}

// const handleChange = (e) => {
//   setSearch(e.target.value)
//   e.target.value.length > 3 && getSuggestions(e.target.value)
// }

// const handleSubmit = async (e) => {
//   e.preventDefault()
//   const resp = await getQueryData(search, 1)
//   console.log(resp)
//   if (resp.foods.length !== 0) {
//     let currentItem = resp.foods[0].foodNutrients
//     nutrientVals.length === 0 && setNutrientVals(currentItem)
//     nutrientVals.length !== 0 &&
//       setNutrientVals((prevState) => {
//         return [
//           ...prevState.map((item, index) => {
//             return {
//               ...item,
//               value:
//                 item.value.toFixed(2) + currentItem[index].value.toFixed(2),
//             }
//           }),
//         ]
//       })
//     setItems((prevState) => [...prevState, resp])
//     setSelectedId(selectedId + 1)
//   }
// }

// const getSuggestions = async (str) => {
//   console.log(str)
//   const suggestions = await getItem(str, 50)
//   console.log(suggestions)
//   setSuggestions(suggestions.foods)
// }
