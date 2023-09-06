import { Fragment } from "react";
import { T_GROUP_ITEM, T_SUBGROUP_ITEM, T_ROW } from "./types.ts";
import { getDB } from "./database/helpers.ts";

function Tr({
  translation,
  translations,
  index,
  isBorderBottom = false,
}: {
  translation: T_ROW;
  translations: T_ROW[];
  index: number;
  isBorderBottom?: boolean;
}) {
  let rowspan = 1;
  let showRussianWord = true;

  const [foreignWord, transcription, russianWord] = translation;

  if (russianWord) {
    showRussianWord = !isBackwardTranslationTheSame(translations, index);

    if (showRussianWord) {
      rowspan = seeForward(translations, index);
    }
  }

  const props = rowspan > 1 ? { rowSpan: rowspan } : {};

  return (
    <tr className={isBorderBottom ? "solid-border" : undefined}>
      <td>{foreignWord}</td>
      <td>{transcription}</td>
      {showRussianWord && <td {...props}>{russianWord}</td>}

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

function Associations({ rows }: { rows: T_ROW[] }) {
  return (
    <>
      {rows.map((row, index) => {
        const isBorderBottom = rows.length === 1 || index === rows.length - 1;

        return (
          <Tr
            key={row[0]}
            translation={row}
            translations={rows}
            index={index}
            isBorderBottom={isBorderBottom}
          />
        );
      })}
    </>
  );
}

function isBackwardTranslationTheSame(
  translations: T_ROW[],
  startIndex: number,
): boolean {
  const backwardTranslation = translations[startIndex - 1];

  return (
    backwardTranslation &&
    backwardTranslation[2] === translations[startIndex][2]
  );
}

function seeForward(translations: T_ROW[], startIndex: number) {
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
        <Associations key={translation[0][0]} rows={translation as T_ROW[]} />
      );
    }

    // if (rowspan === 1) {
    //   rowspan = seeForward(subgroupItem.subgroupItems as T_ROW[], index);
    // } else {
    //   rowspan--;
    // }

    return (
      <Tr
        key={translation[0]}
        translation={translation as T_ROW}
        translations={subgroupItem.subgroupItems as T_ROW[]}
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
  //     hh.push(<Associations key={translation[0][0]} rows={translation as T_ROW[]} />);
  //   } else {
  //     hh.push(<Tr key={translation[0]} translation={translation as T_ROW} />);
  //   }
  //
  // }

  return (
    <Fragment>
      <tr>
        <td colSpan={4} className="subgroup">
          {subgroupItem.subgroupName}
        </td>
      </tr>

      {subgroupItems}
    </Fragment>
  );
}

export function All() {
  return (
    <Fragment>
      {getDB().map((group: T_GROUP_ITEM) => {
        return (
          <Fragment key={group.groupName}>
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
          </Fragment>
        );
      })}
    </Fragment>
  );
}
