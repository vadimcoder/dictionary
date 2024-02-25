import "./style.css";
import { Fragment } from "react";
import { DB } from "../../db/db";
import { T_GROUP, T_ROW, T_SUBGROUP, T_RECORD } from "../../db/types";
import { Tr } from "../../components/Tr";

function Associations({ records }: { records: T_RECORD[] }) {
  return (
    <>
      {records.map((record, index) => {
        return (
          <Tr
            key={record.wordSet.word}
            record={record}
            isBorderTop={index === 0}
            isBorderBottom={index === records.length - 1}
          />
        );
      })}
    </>
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

function SubgroupItem({ subgroupItem }: { subgroupItem: T_SUBGROUP<T_ROW> }) {
  const subgroupItems = subgroupItem.rows.map((row) => {
    if (row.isAssociation) {
      return (
        <Associations key={row.records[0].wordSet.word} records={row.records} />
      );
    }

    return <Tr key={row.records[0].wordSet.word} record={row.records[0]} />;
  });

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
