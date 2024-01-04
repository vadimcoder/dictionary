import { Fragment } from "react";
import { T_GROUP, T_SUBGROUP, T_ROW } from "../../db/types";
import { Tr } from "./Tr/Tr";
import { db } from "../../db/db";

function Associations({ rows }: { rows: T_ROW[] }) {
  return (
    <>
      {rows.map((row, index) => {
        const isBorderBottom = rows.length === 1 || index === rows.length - 1;

        return (
          <Tr
            key={row[0]}
            row={row}
            rows={rows}
            index={index}
            isBorderBottom={isBorderBottom}
          />
        );
      })}
    </>
  );
}

function SubgroupItem({ subgroupItem }: { subgroupItem: T_SUBGROUP }) {
  const subgroupItems = subgroupItem.rows.map((translation, index) => {
    if (translation[0] instanceof Array) {
      return (
        <Associations key={translation[0][0]} rows={translation as T_ROW[]} />
      );
    }

    return (
      <Tr
        key={translation[0]}
        row={translation as T_ROW}
        rows={subgroupItem.rows as T_ROW[]}
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
    <Fragment>
      {db.map((group: T_GROUP) => {
        return (
          <Fragment key={group.groupName}>
            <h1>{group.groupName}</h1>
            <table cellSpacing={0}>
              <tbody>
                {group.subgroups.map((subgroupItem: T_SUBGROUP) => (
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
