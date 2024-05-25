import { T_ROWS, T_SUBGROUP } from "../../db/types";
import { Tr } from "../../components/Tr";
import { DB } from "../../db/db";
import { ALL_NAV_ARIA } from "./index";
import { useEffect } from "react";
import { scrollToChecked } from "../../utils/utils";

function Associations({ rows }: { rows: T_ROWS }) {
  return (
    <>
      {rows.map((row, index) => {
        return (
          <Tr
            key={row.wordSet.word}
            row={row}
            isBorderTop={index === 0}
            isBorderBottom={index === rows.length - 1}
          />
        );
      })}
    </>
  );
}

function SubgroupItem({ subgroupItem }: { subgroupItem: T_SUBGROUP<T_ROWS> }) {
  const subgroupItems = subgroupItem.rows.map((row: T_ROWS) => {
    if (row.length > 1) {
      return <Associations key={row[0].wordSet.word} rows={row} />;
    }

    return <Tr key={row[0].wordSet.word} row={row[0]} />;
  });

  return (
    <>
      <tr>
        <td colSpan={4} className="subgroup">
          {subgroupItem.subgroupName}
        </td>
      </tr>

      {subgroupItems}
    </>
  );
}

export function TabContent({ groupName }: { groupName: string }) {
  const group = DB.dictionary.find((group) => group.groupName === groupName);

  useEffect(scrollToChecked, [groupName]);

  return (
    <div
      id={`${ALL_NAV_ARIA.contentId}${groupName}`}
      aria-labelledby={`${ALL_NAV_ARIA.tabId}${groupName}`}
    >
      <button onClick={scrollToChecked}>Scroll to last word</button>

      {group ? (
        <table cellSpacing={0}>
          <tbody>
            {group.subgroups.map((subgroupItem: T_SUBGROUP<T_ROWS>) => (
              <SubgroupItem
                key={subgroupItem.subgroupName}
                subgroupItem={subgroupItem}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div>No such group: {groupName}</div>
      )}
    </div>
  );
}
