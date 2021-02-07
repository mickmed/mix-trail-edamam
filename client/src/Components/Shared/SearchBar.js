import React, { Component } from "react"
import AsyncSelect from 'react-select/async'
import { getItem } from './'
// import Search from "./Search"

class SearchBar extends Component {
  state = { selectedFoods: [] }

  onChange = (selectedFoods) => {
    console.log(selectedFoods)
    
  }
  loadOptions = async(inputText, callback) => {
    const response = await getItem(inputText, 20)
  

    return callback(response.foods.map(el=>({label:el.description, value: el.fdcId})))
  }
 

  render() {
    return (
      <div>
       
        {<AsyncSelect
          isMulti
          value={this.state.selectedUsers}
          onChange={this.onChange}
          placeholder={'kate'}
          loadOptions={this.loadOptions}
        
        />}
      </div>
    )
  }
}
export default SearchBar