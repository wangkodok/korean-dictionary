import { LayoutMainVisual } from "widgets/index";
import { ContentMainVisual } from "widgets/index";
import Title2 from "../../shared/ui/title/Title2";
import Desc from "../../shared/Desc";

export default function MainVisual() {
  return (
    <LayoutMainVisual>
      <ContentMainVisual>
        <Title2 className="sm:flex text-[1.75rem] sm:text-[2rem] font-['Pretendard'] font-bold">
          <Desc className="text-center">표준국어대사전&#160;</Desc>
          <Desc>423,170 단어 검색</Desc>
        </Title2>
      </ContentMainVisual>
    </LayoutMainVisual>
  );
}
