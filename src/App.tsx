import "./App.scss";
import '@/styles/all/defaultFont.scss'
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;