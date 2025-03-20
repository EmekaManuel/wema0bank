"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ListItemIcon, MenuItem } from "@mui/material";

import {
  MaterialReactTable,
  MRT_RowData,
  useMaterialReactTable,
} from "material-react-table";

import { useMemo } from "react";

type TData = {
  [key: string]: any;
};

type RowAction = {
  name: string;
  icon: React.ReactNode;
  onClick: (rowData: TData) => void;
};

type MaterialTableProps = {
  data: TData[];
  columns: any;
  onRowClick?: (event: any, row: MRT_RowData) => void;
  tableHeader?: string;
  isLoading?: boolean;
  onCreateData?: (values: TData) => Promise<void>;
  onUpdateData?: (values: TData) => Promise<void>;
  onDeleteData?: (id: string | number) => Promise<void>;

  enableRowActions?: boolean;
  rowActions?: RowAction[];
};

function MaterialActionsTable({
  data,
  columns,
  onRowClick,
  tableHeader,
  isLoading = false,
  rowActions,
}: MaterialTableProps) {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useMaterialReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableRowSelection: true,

    createDisplayMode: "modal",
    editDisplayMode: "modal",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,

    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        if (onRowClick) onRowClick(event, row);
      },
      style: { cursor: "pointer" },
    }),

    initialState: {
      density: "compact",
      isFullScreen: false,
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },

    state: {
      isLoading,
    },

    renderRowActionMenuItems: ({ row, closeMenu }) => {
      return rowActions?.map((action, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            action.onClick(row.original);
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>{action.icon}</ListItemIcon>
          {action.name}
        </MenuItem>
      ));
    },
  });

  return (
    <div className="w-full bg-red-400">
      <div className="md:text-[24px] text-[20px] md:mb-2 text-center md:text-start  font-semibold">
        {tableHeader}
      </div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default MaterialActionsTable;
