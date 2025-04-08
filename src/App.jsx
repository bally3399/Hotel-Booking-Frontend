import './index.css';
import {useRoutes} from "react-router-dom";
import {ROUTES} from "./routes/Routes";

function App() {
  return (
      useRoutes(ROUTES)
  );
}

export default App;
