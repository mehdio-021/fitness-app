import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { fetchData } from "../services/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  

  useEffect(() => {
    const getExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData("exercises/bodyPartList");
        console.log(bodyPartsData);
  
        if (bodyPartsData && bodyPartsData.data && typeof bodyPartsData.data === 'object') {
          const bodyPartsArray = Object.values(bodyPartsData.data);
          setBodyParts(prevBodyParts => (["all", ...bodyPartsArray]));
        } else {
          setBodyParts(prevBodyParts => (["all"]));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const getData = async () => {
        try {
          const { data } = await fetchData("exercises");
          /*  console.log(data); */
          const searchExercises = data.filter(
            (item) =>
              item.name.toLowerCase().includes(search) ||
              item.target.toLowerCase().includes(search) ||
              item.equipment.toLowerCase().includes(search) ||
              item.bodyPart.toLowerCase().includes(search)
          );
          window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
          setSearch("");
          setExercises(searchExercises);
          /*           console.log(searchExercises); */
        } catch (error) {
          console.log(error.message);
        }
      };
      getData();
    }
  };
  /*   console.log(exercises) */

  /*   useEffect(() => {
     const getData = async () => {
       try {
        const { data } = await fetchData("exercises/bodyPartList");
        console.log(data)
      } catch (error) {
        console.log(error.message);
      }
     }
     getData();
  },[bodyParts]); */
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="49px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" md="72px">
        <TextField
          height="76px"
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "1170px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          placeholder="Search Exercises"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "173px", xs: "80px" },
            height: "56px",
            position: "absolute",
            right: "0px",
            fontSize: { lg: "20px", xs: "14px" },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
