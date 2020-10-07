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
      <div className="nutrition-facts">
        {/* <!-- TOP SECTION --> */}

        <h1>Nutrition Facts</h1>
        <div className="serving">
          <span>
            <h6>Serving Size</h6>
            <h6>n/a</h6>
          </span>
          <span>
            <h6>Servings Per Container</h6>
            <h6>n/a</h6>
          </span>
        </div>
        {/* <!-- TOP SUB HEADING --> */}
        <p className="amnt-per-serving">Amount Per Serving</p>
        <div className="primary">
          <h3>
            Calories <span>{vals.nf_calories}</span>
          </h3>

          <h3>Calories from Fat n/a</h3>
        </div>

        <p className="perc-daily-val">% Daily Value*</p>

        <div className="primary">
          <h4>
            Total Fat <span>{vals.nf_total_fat}</span>
          </h4>

          <div>
            <h3>%</h3>
          </div>
        </div>

        <div class="secondary">
          <h3>
            Saturated Fat <span>{vals.nf_saturated_fat}</span>
          </h3>

          <h3>%</h3>
        </div>

        <div class="secondary">
          <h3>Trans Fat</h3>
        </div>
        {/* </div> */}
        <div class="primary chol">
          <h4>
            Cholesterol <span>{vals.nf_cholesterol}</span>
          </h4>
          <h3>%</h3>
        </div>

        <div class="primary">
          <h4>
            Sodium <span>{vals.nf_sodium}</span>
          </h4>
          <h3>%</h3>
        </div>

        <div class="primary">
          <h4>
            Total Carbohydrate <span>{vals.nf_total_carbohydrate}</span>
          </h4>
          <h3>%</h3>
        </div>

        <div class="secondary">
          <h3>
            Dietary Fiber <span>{vals.nf_dietary_fiber}</span>
          </h3>
          <h3>%</h3>
        </div>

        <div class="secondary">
          <h3>
            Sugars <span>{vals.nf_sugars}</span>
          </h3>
        </div>
        <div class="protein">
          <h4>
            Protein <span>{vals.nf_protein}</span>
          </h4>
          <h4 id="protein"> </h4>
        </div>
        {/* <!-- BOTTOM SECTION --> */}
        <div class="vitA">
          <h3>
            Vitamin A <span></span>
          </h3>
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
          <h3>
            Potassium <span>{vals.nf_potassium}</span>
          </h3>
          <h3>%</h3>
        </div>
        <div>
          <h6>*Percent Daily Values are based on a 2,000 calorie diet.</h6>
        </div>
      </div>
    </section>
  )
}

export default NutritionalLabel
