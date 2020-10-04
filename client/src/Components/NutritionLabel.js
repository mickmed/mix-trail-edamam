import React from "react"
import "./NutritionLabel.scss"

const NutritionalLabel = ({ nutrientVals }) => {
  return (
    <section className="nutrition-label">
      <div>
         
        hi  
{nutrientVals.nf_calories}




      <div id="nut-facts-wrapper">
                <p id="ingID"></p>
                <div class="nutrition-facts">
                    {/* <!-- TOP SECTION --> */}
                    <h2 id="ingName">&nbsp</h2>
                    <h1>Nutrition Facts</h1>
                    <div class="top">
                        <span id="serv-size-row">
                        <h3>Serving Size</h3>&nbsp&nbsp<h3 id="servAmnt"></h3><h3 id="servMeas"></h3></span>
                        <span id="serv-cont-row">
                            <h3>Servings Per Container</h3>&nbsp&nbsp<h3 id="servCont"></h3>
                        </span>
                    </div>
                    {/* <!-- TOP SUB HEADING --> */}
                    <div>
                        <p class="amt-per-serv">Amount Per Serving</p>
                        <div class="calories-line">
        <h3>Calories</h3><h3 id="calories">{nutrientVals.nf_calories}</h3>
                            <h3>Calories from Fat</h3>
                        </div>
                        {/* <!-- MAIN SECTION --> */}
                        <p class="perc-daily-val">% Daily Value*</p>
                        <div class="sub-heading">
                            <div id="tot-fat-inner-row">
                                <h4>Total Fat</h4>&nbsp&nbsp<h4 id="totalFat"></h4>
                            </div>
                            <div>
                                <h3>%</h3>
                            </div>
                        </div>
                        <div class="fat-sub-heading">
                            <div class="sat-fat">
                                <span><h3>Saturated Fat</h3></span>
                                <h3>%</h3>
                            </div>
                            <h3>Trans Fat</h3>
                        </div>
                    </div>
                    <div class="chol">
                        <h4>Cholesterol</h4>
                        <h3>%</h3>
                    </div>
                    <div class="sodium">
                        <h4>Sodium</h4>
                        <h3>%</h3>
                    </div>
                    <div class="total-carb">
                        <div id="tot-carb-inner-row">
                            <h4>Total Carbohydrate</h4>&nbsp&nbsp<h4 id="totalCarb"></h4>
                        </div>
                        <div>
                            <h3>%</h3>
                        </div>
                    </div>
                    <div class="carb-sub-heading">
                        <div class="diet-fiber">
                            <h3>Dietary Fiber</h3>
                            <h3>%</h3>
                        </div>
                        <h3>Sugars</h3>
                    </div>
                    <div class="protein">
                        <h4>Protein</h4>&nbsp&nbsp<h4 id="protein"></h4>
                    </div>
                    {/* <!-- BOTTOM SECTION --> */}
                    <div class="vitA">
                        <h3>Vitamin A</h3>
                        <h3>%</h3>
                    </div>
                    <div class="vitC">
                        <h3>Vitamin C</h3>
                        <h3>%</h3>
                    </div>
                    <div class="calcium">
                        <h3>Calcium</h3>
                        <h3>%</h3>
                    </div>
                    <div class="iron">
                        <h3>Iron</h3>
                        <h3>%</h3>
                    </div>
                    <div>
                        <h6>*Percent Daily Values are based on a 2,000 calorie diet.</h6>
                    </div>
                </div>
            </div>
    </div>
    </section>
  )
}

export default NutritionalLabel
