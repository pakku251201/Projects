import React from 'react'
import project1 from "../images/project1.jpeg";
import project2 from "../images/project2.jpeg";
import project3 from "../images/project3.jpeg";
import {Card} from "react-bootstrap";
import { motion } from 'framer-motion';
const Projects = () => {
    const ProjectList =[{
      id:1,
      name: "Timezone Finder",
      imageUrl: project1,
    },
    {
      id:2,
      name:"To-Do-List",
      imageUrl: project2,
    },
    {
      id:3,
      name:"Pixel Perfection",
      imageUrl: project3,
    },]
    return(
      <motion.div
      animate={{
        scale: [2, 1],
      }}
      transition={{
        duration: 0.5,
        ease:"easeInOut"
      }}
      exit={{scaleX:0}}
      className="projects"
    >
        <h2><i>PROJECTS</i></h2>
        <div className='wrapper'>
          {ProjectList.map((item)=>{
            return (
              <motion.div key={item.id} whileHover={{scale:1.1, transition:{duration:0.5}}}>
                <Card>
                  <Card.Img variant="top" src={item.imageUrl} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Link href='https://github.com/pakku251201/Projects'>Github</Card.Link>
                  </Card.Body>
                </Card>
              </motion.div>  
            );
          })} 
        </div>
      </motion.div>
    );
}

export default Projects;