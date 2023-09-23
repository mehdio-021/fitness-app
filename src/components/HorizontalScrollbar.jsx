import React, { useContext } from 'react';

import { Box,  } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';




const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
  <div  style={{display:"flex" ,flexWrap:"wrap" ,alignItems:"center" ,justifyContent:"center"}}>
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
        m="10px 17px"
        
      >
        {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} /> }
      </Box>
    ))}
  </div>
);

export default HorizontalScrollbar;
