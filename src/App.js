import { Suspense } from "react";
import Router from "./routes";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingPage from "./components/LoadingPage";

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Router />
    </Suspense>
  );
}

export default App;
