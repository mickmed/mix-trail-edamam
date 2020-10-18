import axios from "axios"

export const getItem = async (search, pageSize) => {
  /**NUTRITIONIX KEYS AND HEADER */

  const configHeaders = {
    headers: {
      "x-app-id": process.env.REACT_APP_NUTRITIONIX_X_APP_ID,
      "x-app-key": process.env.REACT_APP_NUTRITIONIX_X_APP_KEY,
      "x-remote-user-id": process.env.REACT_APP_NUTRITIONIX_X_REMOTE_USER_ID,
    },
  }
  // const instant = `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`
  try {
    const resp = await axios.post(
      `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      {
        query: `${search}`,
      },
      configHeaders
    )
    console.log(resp)
    return resp.data
  } catch (error) {
    console.log(error)
  }

 
}


