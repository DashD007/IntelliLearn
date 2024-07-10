import React from 'react'
import LandingComponent from '../components/LandingComponent'
import image1 from "../assests/images/Learning-cuate.svg"
import image2 from "../assests/images/29825236_character_23.jpg"
import image3 from "../assests/images/Questions-pana.svg"
import image4 from "../assests/images/Research paper-pana.svg"
const Landing = () => {
  return (
    <div>
      <LandingComponent heading={"Say hello to"} sub={"Interactive Learning experience"} basicText={"User-friendly environment with rich resources"} btnText={"Get Started"} src={image1} />
      <LandingComponent swap heading={"Explore"} sub={"Define your career goal with clarity and determination"} basicText={"Leaverage our career counselling bot assistance"} btnText={"Learn more"} src={image2}/>
      <LandingComponent heading={"Have a question?"} sub={"Voice doubts to other peers"} basicText={"Maintain your curiosity and keep learning"} btnText={"Ask Them"} src={image3}/>
      <LandingComponent swap heading={"Wants to Research"} sub={"Employ our AI summarization tool for your next research paper"} basicText={"Get the perfect analysis in a nut shell"} src={image4} btnText={"Let's Summarize"}/>
    </div>
  )
}

export default Landing