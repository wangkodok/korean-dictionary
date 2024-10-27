import WordSaveButton from "../../../features/ui/button/WordSaveButton";

export default function WordList({
  dataApi,
}: {
  dataApi: null | {
    channel: { item: [{ word: string; sense: { definition: string } }] };
  };
}) {
  return (
    <div className="mt-[4rem]">
      {!dataApi && null}
      {dataApi &&
        dataApi.channel.item.map(
          (
            data: { word: string; sense: { definition: string } },
            index: number
          ) => {
            return (
              <dl className="relative py-8 border-b-[.0625rem]" key={index}>
                <div className="pr-0 mb-6 sm:pr-[10rem] sm:mb-0">
                  <dt className="text-xl mb-2">
                    <strong>{data.word}</strong>
                  </dt>
                  <dd>{data.sense.definition}</dd>
                </div>
                <WordSaveButton data={data}>단어 저장</WordSaveButton>
              </dl>
            );
          }
        )}
    </div>
  );
}
