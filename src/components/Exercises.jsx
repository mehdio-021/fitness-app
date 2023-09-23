import React, { useEffect, useState } from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";
import { fetchData } from "../services/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  console.log(exercises);

  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        let exercisesData = [];
        if (bodyPart === "all") {
          exercisesData = await fetchData("exercises");
        } else {
          exercisesData = await fetchData(`exercises/bodyPart/${bodyPart}`);
        }
        setExercises(exercisesData.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchExercisesData();
  }, [bodyPart]);

  //Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstexercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstexercise,
    indexOfLastExercise
  );
  const paginate = (event,value) =>{
    setCurrentPage(value);
    window.scrollTo({top:1800,behavior:"smooth"})
  }

  if (!currentExercises.length) return "Loading..."

  return (
    <Box id="exercises" sx={{ mt: { lg: "109px" } }} mt="50px" p="20px">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="46px"
      >
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "107px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
