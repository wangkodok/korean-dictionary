import Header from "./components/Header";
import MainVisual from "./components/MainVisual";
import SideMenu from "./components/SideMenu";
import Search from "./Search";
import { useSelector } from "react-redux";

export default function App() {
  const sideToggle = useSelector((state) => {
    return state.toggle;
  });

  return (
    <div>
      <Header />
      {sideToggle === false ? null : <SideMenu />}
      <MainVisual />
      <Search />
    </div>
  );
}
