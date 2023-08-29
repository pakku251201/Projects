import React from 'react'
import {motion, useScroll, useSpring} from "framer-motion";

const About = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="progress-bar-animate"
      />
      <motion.div className="about" transition={{ease:'easeInOut', duration:0.5}} exit={{scaleY:0}}>
        <h2 style={{color:'yellowgreen', fontFamily:'optima, sans-serif'}}>About</h2>
        <>
          <article>
            <p style={{color: 'yellowgreen', fontFamily:'sans-serif'}}>
            I am a committed and goal-oriented computer science graduate looking to pursue a career in the software engineering domain. I possess knowledge in HTML, CSS, Python, Django and Flask. I am capable of working in a fast-paced, team-driven environment and learn things quickly. I bring excellent communication skills and have the ability to understand client requirements.
            Constantly striving to improve my skills I make sure to stay up-to-date on the latest industry trends, and I am eager to bring my expertise and enthusiasm to your organization.
            </p>
          </article> 
        </>
      </motion.div> 
    </>     
  );
};

export default About