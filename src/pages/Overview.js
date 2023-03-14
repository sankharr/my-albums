import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinesEllipsis from "react-lines-ellipsis";
import { useOutletContext } from "react-router-dom";

const compareTitles = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const AlbumCard = ({ albumData }) => {
  //   console.log("albumData", albumData);
  return (
    <Box sx={{ border: 2, padding: 2 }}>
      <Stack direction="row" spacing={2}>
        <img
          // key={item.title}
          src={albumData.thumbnailUrl}
          srcSet={albumData.thumbnailUrl}
          alt={albumData.title}
          loading="lazy"
        />
        <Stack direction="column">
          <Typography variant="h6" gutterBottom={true}>
            <LinesEllipsis
              text={albumData.title}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          <Typography variant="body1">
            ({albumData.photoCount} pictures)
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const Overview = () => {
  let albumDataArray = [],
    photoDataArray = [],
    tempArray = [],
    currentAlbumData,
    thumbnailObjectFound,
    photoCount,
    tempStack;

  const [albumData, setAlbumData] = useState();
  const [sortOrder, setSortOrder] = useOutletContext();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums?userId=2")
      .then((res) => res.json())
      .then((data) => {
        setAlbumData(data);
        albumDataArray = data;
        fetch("https://jsonplaceholder.typicode.com/photos")
          .then((res) => res.json())
          .then((data) => {
            photoDataArray = data;
            tempArray = [];
            for (let album of albumDataArray) {
              thumbnailObjectFound = photoDataArray.find(
                (element) => element.albumId == album.id
              );
              photoCount = photoDataArray.filter(
                (element) => element.albumId == album.id
              );
              photoCount = photoCount.length;
              currentAlbumData = {
                ...album,
                thumbnailUrl: thumbnailObjectFound?.thumbnailUrl,
                photoCount,
              };
              tempArray.push(currentAlbumData);
            }
            tempArray.sort(compareTitles);
            console.log("tempArray", tempArray);
            setAlbumData(tempArray);
            console.log("albumData", albumData);
          })
          .catch((error) =>
            console.log("error occured while retrieving photo data", error)
          );
      })
      .catch((error) =>
        console.log("error occured while retrieving album data", error)
      );
  }, []);

  useEffect(() => {
    console.log("executed", sortOrder);
    sortData(sortOrder);
  }, [sortOrder,albumData]);

  const sortData = (order) => {
    tempStack = albumData;
    if (order === "Title DESC") {
      tempStack?.sort(compareTitles);
      setAlbumData(tempStack);
    } else {
      tempStack?.sort(compareTitles).reverse();
      setAlbumData(tempStack);
    }
  };
  return (
    <Container
      sx={{ position: "relative", flexGrow: 1, padding: 2 }}
      maxWidth={"xl"}
      disableGutters={false}
    >
      <Grid container spacing={2}>
        {albumData?.map((item) => (
          <Grid item xs={12} sm={6} key={item.title}>
            <AlbumCard key={item.title} albumData={item} />
            {/* <img
              // key={item.title}
              src={item.thumbnailUrl}
              srcSet={item.thumbnailUrl}
              alt={item.title}
              loading="lazy"
            /> */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Overview;
