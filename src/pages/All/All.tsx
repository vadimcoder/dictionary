import { Fragment } from "react";
import "./style.css";
import { Tr } from "./Tr/Tr";
import { DB } from "../../db/db";
import { T_GROUP, T_ROW, T_SUBGROUP, T_WORD } from "../../types/dictionary";

function Associations({ words }: { words: T_WORD[] }) {
  return (
    <>
      {words.map((word, index) => {
        const isBorderBottom = words.length === 1 || index === words.length - 1;

        return (
          <Tr
            key={word.foreignWord}
            word={word}
            words={words}
            index={index}
            isBorderBottom={isBorderBottom}
          />
        );
      })}
    </>
  );
}

function SubgroupItem({ subgroupItem }: { subgroupItem: T_SUBGROUP<T_ROW> }) {
  const subgroupItems = subgroupItem.rows.map((row, index) => {
    if (row.isAssociation) {
      return <Associations key={row.words[0].foreignWord} words={row.words} />;
    }

    return (
      <Tr
        key={row.words[0].foreignWord}
        word={row.words[0]}
        rows={subgroupItem.rows}
        index={index}
      />
    );
  });

  return (
    <Fragment>
      <tr>
        <td colSpan={3} className="subgroup">
          {subgroupItem.subgroupName}
        </td>
      </tr>

      {subgroupItems}
    </Fragment>
  );
}

export function All() {
  return (
    <>
      {DB.dictionary.map((group: T_GROUP<T_ROW>) => (
        <Fragment key={group.groupName}>
          <h1>{group.groupName}</h1>
          <table cellSpacing={0}>
            <tbody>
              {group.subgroups.map((subgroupItem: T_SUBGROUP<T_ROW>) => (
                <SubgroupItem
                  key={subgroupItem.subgroupName}
                  subgroupItem={subgroupItem}
                />
              ))}
            </tbody>
          </table>
        </Fragment>
      ))}
    </>
  );
}
