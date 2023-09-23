import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchData, fetchVideoData } from "../services/fetchData";
import Detail from "./../components/Detail";
import ExerciseVideos from "./../components/ExerciseVideos";
import SimilarExercises from "./../components/SimilarExercises";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState();
  const [exerciseVideos, setExerciseVideos] = useState();
  const [targetMuscleExercises, setTargetMuscleExercises] = useState();
  const [equipmentExercises, setEquipmentExercises] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {

      const exerciseDetailData = await fetchData(`exercises/exercise/${id}`);
      setExerciseDetail(exerciseDetailData);
      console.log(exerciseDetailData);
      /* console.log(exerciseDetailData.data.target) */

      const exerciseVideosData = await fetchVideoData(
        `search?query=${exerciseDetailData.name} exercise`
      );
      setExerciseVideos(exerciseVideosData.data.contents);

      const targetMuscleExercisesData = await fetchData(
        `exercises/target/${exerciseDetailData.data.target}`
      );
      setTargetMuscleExercises(targetMuscleExercisesData.data);
 /*      console.log(targetMuscleExercisesData); */

      const equimentExercisesData = await fetchData(
        `exercises/equipment/${exerciseDetailData.data.equipment}`
      );
      setEquipmentExercises(equimentExercisesData.data);
    /*   console.log(equimentExercisesData); */
    };
    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

/*   console.log(exerciseDetail);
  console.log(targetMuscleExercises);
  console.log(equipmentExercises);
  console.log(exerciseVideos); */
  return (
    <Box
      sx={{
        mt: { lg: "96px", xs: "60px" },
      }}
    >
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.data.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
