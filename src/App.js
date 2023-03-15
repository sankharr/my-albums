import { Suspense } from "react";
import Router from "./routes";
import LoadingPage from "./components/LoadingPage";

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Router />
    </Suspense>
  );
}

export default App;
