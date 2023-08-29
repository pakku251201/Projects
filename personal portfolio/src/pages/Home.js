import React from 'react'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className='home'>
      <motion.div className='name' initial={{x: -300, scale:0.5}} animate={{x:0, scale:1}} transition={{duration: 0.5}} exit={{scaleY:0}}>
        <font>Pratheek</font> P Rao
      </motion.div>
      <motion.div className='description' initial={{x: 300, scale:0.5}} animate={{x:0, scale:1}} transition={{duration: 0.5}} exit={{scaleX:0}}>
        <font>A highly motivated FullStack Developer based in Chennai.</font>
      </motion.div>
    </div>
  )
}

export default Home