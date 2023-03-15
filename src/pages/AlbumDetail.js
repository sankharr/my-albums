// modules
import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";

const Container = React.lazy(() => import("@mui/material/Container"));
const Typography = React.lazy(() => import("@mui/material/Typography"));
const CircularProgress = React.lazy(() =>
  import("@mui/material/CircularProgress")
);
const Grid = React.lazy(() => import("@mui/material/Grid"));

// this is used to compare titles
const compareTitles = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const AlbumDetail = () => {
  let tempArray;
  const [loading, setLoading] = useState(true);
  const [photoArray, setPhotoArray] = useState();
  const [sortOrder, setSortOrder] = useOutletContext();
  let { albumId } = useParams();
  const { state } = useLocation();
  const { albumTitle } = state;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((res) => res.json())
      .then((data) => {
        // setPhotoArray(data);
        // tempArray = data;
        tempArray = data;
        // sortData(data);
        tempArray.sort(compareTitles);
        setPhotoArray(tempArray);
        setLoading(false);
        console.log("data", data);
      });
  }, []);

  useEffect(() => {
    sortData(photoArray);
  }, [sortOrder, photoArray]);

//   this is used to fetch data
  const sortData = (array) => {
    tempArray = array;
    if (sortOrder === "Title DESC") {
      tempArray?.sort(compareTitles);
    } else {
      tempArray?.sort(compareTitles).reverse();
    }
    setPhotoArray(tempArray);
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
          <Typography
            variant="h4"
            noWrap={true}
            gutterBottom={true}
            sx={{ width: "80vw" }}
          >
            {albumTitle}
          </Typography>
          <Grid container spacing={1} sx={{ width: {xs: "94vw", sm: "90vw"} }}>
            {photoArray?.map((item) => (
              <Grid item xs={6} sm={3} key={item.id}>
                <img
                  src={item.url}
                  srcSet={item.url}
                  alt={item.title}
                  loading="lazy"
                  width={"100%"}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default AlbumDetail;
