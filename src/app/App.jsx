import { Header } from "widgets/header";
import MainVisual from "../widgets/slider/MainVisual";
import SideMenu from "../widgets/sidemenu/SideMenu";
import Search from "../pages/search/ui/Search";
import Modal from "../widgets/modal/Modal";
import { useSelector } from "react-redux";
// import { LayoutContainer } from "../widgets/layout/LayoutContainer";

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
      <Modal />
    </div>
  );
}
