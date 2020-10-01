import React from "react"
import axios from "axios"

export const getItem = async (search, pageSize) => {
  /**NUTRITIONIX KEYS AND HEADER */
  // const configHeaders = {
  //   headers: {
  //     "x-app-id": process.env.REACT_APP_NUTRITIONIX_X_APP_ID,
  //     "x-app-key": process.env.REACT_APP_NUTRITIONIX_X_APP_KEY,
  //     "x-remote-user-id": process.env.REACT_APP_NUTRITIONIX_X_REMOTE_USER_ID,
  //   },
  // }
  // const instant = `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`
   // const nutsResp = await axios.post(
  //   `https://trackapi.nutritionix.com/v2/natural/nutrients`,
  //   {
  //     query: `${search}`,
  //   },
  //   configHeaders
  // )

  /**EDAMAM KEYS **/
  // const appId = process.env.REACT_APP_EDAMAM_NUTRITION_DATA_APP_ID
  // const appKey = process.env.REACT_APP_EDAMAM_NUTRITION_DATA_APP_KEY
  // const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${search} `
// console.log(pageSize)
  /**USDA KEY */
  const api_key = process.env.REACT_APP_USDA_API_KEY
  const baseUrl = 
  `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api_key}&dataType= 
  
  Survey (FNDDS),

  `

  const params = `&query=${search}&pageSize=${pageSize}`
  const url = baseUrl + params


  const itemResp = await axios(url)
  return itemResp.data
 

}
