import last from "lodash.last";
import { T_ROW_WITH_ASSOCIATIONS } from "../../../db/helpers";
import { T_ROW } from "../../../db/types";

export type T_LATEST_TBODY = {
  isAssociation: boolean;
  associationMainRow?: T_ROW;
  rows: T_ROW[];
};

export function getRowsDividedByTBodies(
  rows: T_ROW_WITH_ASSOCIATIONS[],
  lastRowsCount: number,
): T_LATEST_TBODY[] {
  const tBodies: T_LATEST_TBODY[] = [];

  for (let i = 0; i < lastRowsCount; ++i) {
    const { row, associations } = rows[i];

    if (associations) {
      pushAssociations(tBodies, row, associations);
    } else {
      pushSingleRow(tBodies, row);
    }
  }

  return tBodies;
}

function pushAssociations(
  tBodies: T_LATEST_TBODY[],
  row: T_ROW,
  associations: T_ROW[],
) {
  const associationsWithoutTheRow = getAssociationsWithoutTheRow(
    associations,
    row,
  );

  tBodies.push({
    isAssociation: true,
    associationMainRow: row,
    rows: associationsWithoutTheRow,
  });
}

function getAssociationsWithoutTheRow(associations: T_ROW[], row: T_ROW) {
  return associations.filter((associationRow) => associationRow[0] !== row[0]);
}

function pushSingleRow(tBodies: T_LATEST_TBODY[], row: T_ROW) {
  const lastTBody = last(tBodies);

  if (lastTBody) {
    if (lastTBody.isAssociation) {
      tBodies.push({ isAssociation: false, rows: [row] });
    } else {
      lastTBody.rows.push(row);
    }
  } else {
    tBodies.push({ isAssociation: false, rows: [row] });
  }
}
