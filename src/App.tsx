import * as React from "react";
import { DB } from "./db.ts";
import { T_GROUP_ITEM, T_SUBGROUP_ITEM, T_TRANSLATION } from "./types.ts";

function Row({
  translation,
  translations,
  index,
  isBorderBottom = false,
}: {
  translation: T_TRANSLATION;
  translations: T_TRANSLATION[];
  index: number;
  isBorderBottom?: boolean;
}) {
  let rowspan = 1;
  let showRussianWord = true;

  const foreignWord = translation[0];
  const transcription = translation[1];
  const russianWord = translation[2];

  if (russianWord) {
    showRussianWord = !isBackwardTranslationTheSame(translations, index);

    if (showRussianWord) {
      rowspan = seeForward(translations, index);
    }
  }

  const style = isBorderBottom ? { borderBottom: "1px solid black" } : {};
  const props = rowspan > 1 ? { rowSpan: rowspan } : {};

  return (
    <tr>
      <td style={style}>{foreignWord}</td>
      <td style={style}>{transcription}</td>
      {showRussianWord && (
        <td style={style} {...props}>
          {russianWord}
        </td>
      )}

      {/*{translation.map((value: string, index) => {*/}
      {/*  return index === (translation.length - 1) ?*/}
      {/*    null : (*/}
      {/*    <td key={value + index} >*/}
      {/*      {value}*/}
      {/*    </td>*/}
      {/*    );*/}
      {/*})}*/}
    </tr>
  );
}

function Associations({ translations }: { translations: T_TRANSLATION[] }) {
  return (
    <>
      {translations.map((translation, index) => {
        const isBorderBottom =
          translations.length === 1 || index === translations.length - 1;

        return (
          <Row
            key={translation[0]}
            translation={translation}
            translations={translations}
            index={index}
            isBorderBottom={isBorderBottom}
          />
        );
      })}
    </>
  );
}

function isBackwardTranslationTheSame(
  translations: T_TRANSLATION[],
  startIndex: number,
): boolean {
  const backwardTranslation = translations[startIndex - 1];

  return (
    backwardTranslation &&
    backwardTranslation[2] === translations[startIndex][2]
  );
}

function seeForward(translations: T_TRANSLATION[], startIndex: number) {
  let rowspan = 1;

  for (let i = startIndex; i < translations.length - 1; ++i) {
    if (translations[startIndex][2] === translations[i + 1][2]) {
      rowspan++;
    } else {
      break;
    }
  }

  return rowspan;
}

function SubgroupItem({ subgroupItem }: { subgroupItem: T_SUBGROUP_ITEM }) {
  // let rowspan = 1;

  const subgroupItems = subgroupItem.subgroupItems.map((translation, index) => {
    if (translation[0] instanceof Array) {
      return (
        <Associations
          key={translation[0][0]}
          translations={translation as T_TRANSLATION[]}
        />
      );
    }

    // if (rowspan === 1) {
    //   rowspan = seeForward(subgroupItem.subgroupItems as T_TRANSLATION[], index);
    // } else {
    //   rowspan--;
    // }

    return (
      <Row
        key={translation[0]}
        translation={translation as T_TRANSLATION}
        translations={subgroupItem.subgroupItems as T_TRANSLATION[]}
        index={index}
      />
    );
  });

  // const hh = [];
  //
  // for (let i = 0; i < subgroupItem.subgroupItems.length; ++i) {
  //   const translation = subgroupItem.subgroupItems[i];
  //
  //   if (translation[0] instanceof Array) {
  //     hh.push(<Associations key={translation[0][0]} translations={translation as T_TRANSLATION[]} />);
  //   } else {
  //     hh.push(<Row key={translation[0]} translation={translation as T_TRANSLATION} />);
  //   }
  //
  // }

  return (
    <React.Fragment>
      <tr>
        <td colSpan={4} className="subgroup">
          {subgroupItem.subgroupName}
        </td>
      </tr>

      {subgroupItems}
    </React.Fragment>
  );
}

export function App() {
  DB.forEach((group: T_GROUP_ITEM) => {});
  const group = DB[0].groupItems[0].subgroupItems[2];

  if (group[0] instanceof Array) {
    const gg = group[0];
  } else {
    const hh = group[0];
    hh.endsWith("afd");
  }
  // } else if (group[0] instanceof Array)
  // else {
  //   switch (group.type) {
  //     case T_TRANSLATION_TYPES.ASSOCIATION:
  //       console.log(1);
  //       break;
  //     case T_TRANSLATION_TYPES.ONE_TRANSLATION:
  //       console.log(1);
  //       break;
  //   }
  // }

  // if ((group as T_ASSOCIATION).items) {
  //   group = group as T_ASSOCIATION;
  // } else if ((group as T_ONE_TRANSLATION).oneTranslation) {
  //   group = group as T_ONE_TRANSLATION;
  //
  // } else {
  //   group = group as T_TRANSLATION;
  // }

  return (
    <React.Fragment key={123}>
      {DB.map((group: T_GROUP_ITEM) => {
        return (
          <React.Fragment key={group.groupName}>
            <h1>{group.groupName}</h1>
            <table cellSpacing={0}>
              <tbody>
                {group.groupItems.map((subgroupItem: T_SUBGROUP_ITEM) => (
                  <SubgroupItem
                    key={subgroupItem.subgroupName}
                    subgroupItem={subgroupItem}
                  />
                ))}
              </tbody>
            </table>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
