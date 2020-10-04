import React from "react"
import "./NutritionLabel.scss"

const NutritionalLabel = ({ nutrientVals }) => {
  const vals = {}
  for (let key in nutrientVals) {
    vals[key] = Math.round(nutrientVals[key])
  }

  return (
    // this nutrition label was part of my final project at PerScholas, Nov 2018
    <section className="nutrition-label">
      <div>
        <div id="nut-facts-wrapper">
          <p id="ingID"></p>
          <div className="nutrition-facts">
            {/* <!-- TOP SECTION --> */}
            <h2 id="ingName">&nbsp</h2>
            <h1>Nutrition Facts</h1>
            <div className="serving">
              <span id="serv-size-row">
                <h3>Serving Size</h3>
                <h3 id="servAmnt">n/a</h3>
                <h3 id="servMeas"></h3>
              </span>
              <span id="serv-cont-row">
                <h3>Servings Per Container</h3>
                <h3 id="servCont">n/a</h3>
              </span>
            </div>
            {/* <!-- TOP SUB HEADING --> */}
            <div className="calories">
              <p className="amt-per-serv">Amount Per Serving</p>
              <div className="calories-line">
                <h3>
                  Calories <span>{vals.nf_calories}</span>
                </h3>

                <h3>Calories from Fat n/a</h3>
              </div>
            </div>
            {/* <!-- MAIN SECTION --> */}
            <p class="perc-daily-val">% Daily Value*</p>

            <div class="sub-heading">
              <div id="tot-fat-inner-row">
                <h4>
                  Total Fat <span>{vals.nf_total_fat}</span>
                </h4>

                <div>
                  <h3>%</h3>
                </div>
              </div>

              <div class="fat-sub-heading">
                <div class="sat-fat">
                  <h3>
                    Saturated Fat <span>{vals.nf_saturated_fat}</span>
                  </h3>

                  <h3>%</h3>
                </div>
                <h3>Trans Fat</h3>
              </div>
            </div>
            <div class="chol">
              <h4>Cholesterol <span>{vals.nf_cholesterol}</span></h4>
              <h3>%</h3>
            </div>
            <div class="sodium">
              <h4>Sodium <span>{vals.nf_sodium}</span></h4>
              <h3>%</h3>
            </div>
            <div class="total-carb">
              <div id="tot-carb-inner-row">
                <h4>Total Carbohydrate <span>{vals.nf_total_carbohydrate}</span></h4>
                <h4 id="totalCarb"></h4>
              </div>
              <div>
                <h3>%</h3>
              </div>
            </div>
            <div class="carb-sub-heading">
              <div class="diet-fiber">
                <h3>Dietary Fiber <span>{vals.nf_dietary_fiber}</span></h3>
                <h3>%</h3>
              </div>
              <h3>Sugars <span>{vals.nf_sugars}</span></h3>
            </div>
            <div class="protein">
              <h4>Protein <span>{vals.nf_protein}</span></h4>
              <h4 id="protein"> </h4>
            </div>
            {/* <!-- BOTTOM SECTION --> */}
            <div class="vitA">
              <h3>Vitamin A <span></span></h3>
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
            <div class="potassium">
              <h3>Potassium <span>{vals.nf_potassium}</span></h3>
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
