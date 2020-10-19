import React from "react"
import { Link } from "react-router-dom"
import "./About.scss"

const About = () => {
  return (
    <section className="about">
      <article>
        <h4>About Scaled</h4>
        <p>
          Scaled is a recipe calculator that allows users to calculate a nutrition label based on given ingredients. Natural language processing is available, for e.g., '1/2 cup strawberries.' The app uses the free tier of the nutritionix API. Unfortunately this limits calls to 200/day, including undefined returns but is sufficient to showcase the functionality. Apart from Potassium, the free tier doesn't return the vitamin list on the bottom of the label. Users can, however, save recipes that when retrieved do not make an api call. The app was built by &nbsp;
          <a target="_blank" href="https://mickroth.com">
             Mick Roth
          </a>
          &nbsp; and the code is available on &nbsp;
          <a
            target="_blank"
            href="https://github.com/mickmed/mix-trail-nutritionix"
          >
            Github.
          </a>
        </p>
      </article>
    </section>
  )
}

export default About
