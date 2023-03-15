// modules
import React, { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
const Container = React.lazy(() => import("@mui/material/Container"));
const Box = React.lazy(() => import("@mui/material/Box"));
const Stack = React.lazy(() => import("@mui/material/Stack"));
const Grid = React.lazy(() => import("@mui/material/Grid"));
const Typography = React.lazy(() => import("@mui/material/Typography"));
const CircularProgress = React.lazy(() => import("@mui/material/CircularProgress"));

// function to compare title
const compareTitles = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

// album card implementation
const AlbumCard = ({ albumData }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="div"
      sx={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: {xs: 4, sm: 2},
        textOverflow: "ellipsis",
        
      }}
      onClick={() =>
        navigate(`/overview/${albumData.id}`, {
          state: { albumTitle: albumData.title },
        })
      }
    >
      <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
        <img
          // key={item.title}
          src={albumData.thumbnailUrl}
          srcSet={albumData.thumbnailUrl}
          alt={albumData.title}
          loading="lazy"
        />
        <Stack direction="column" display={'flex'} alignItems={{xs: 'center', sm: 'unset'}}>
          <Typography
            variant="h6"
            gutterBottom={true}
            noWrap={true}
            sx={{ width: "60vw" }}
          >
            {albumData.title}
          </Typography>
          <Typography variant="body1">
            ({albumData.photoCount} pictures)
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const Overview = () => {
  let albumDataArray = [],
    photoDataArray = [],
    tempArray = [],
    currentAlbumData,
    thumbnailObjectFound,
    photoCount,
    tempStack;

  const [loading, setLoading] = useState(true);
  const [albumData, setAlbumData] = useState();
  const [sortOrder, setSortOrder] = useOutletContext();

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("executed", sortOrder);
    sortData(sortOrder);
  }, [sortOrder, albumData]);

//   function that is used to fetch data and build up the needed data array
  const fetchData = () => {
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
            setLoading(false);
          })
          .catch((error) =>
            console.log("error occured while retrieving photo data", error)
          );
      })
      .catch((error) =>
        console.log("error occured while retrieving album data", error)
      );
  };

//   this is used to sort the data in an array and update the state with that array
  const sortData = (order) => {
    tempStack = albumData;
    if (order === "Title DESC") {
      tempStack?.sort(compareTitles);
    } else {
      tempStack?.sort(compareTitles).reverse();
    }
    setAlbumData(tempStack);
  };
  return (
    <Container
      sx={{
        position: "relative",
        flexGrow: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: loading ? "center" : "unset",
        justifyContent: loading ? "center" : "unset",
      }}
      maxWidth={"xl"}
      disableGutters={false}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {albumData?.map((item) => (
              <Grid item xs={12} sm={6} key={item.title}>
                <AlbumCard key={item.title} albumData={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Overview;
