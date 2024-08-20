import WordSaveButton from "../../../features/ui/button/WordSaveButton";

export default function WordList({ searchResult }) {
  return (
    <div className="mt-[4rem]">
      {searchResult.channel === undefined
        ? null
        : searchResult.channel.item.map((data, index) => {
            return (
              <dl className="relative py-8 border-b-[.0625rem]" key={index}>
                <div className="pr-0 mb-6 sm:pr-[10rem] sm:mb-0">
                  <dt className="text-xl mb-2">
                    <strong>{data.word}</strong>
                    {/* <br /> */}
                  </dt>
                  <dd className="">{data.sense.definition}</dd>
                </div>
                <WordSaveButton data={data}>단어 저장</WordSaveButton>
              </dl>
            );
          })}
    </div>
  );
}
