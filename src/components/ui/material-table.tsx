/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_RowData,
  useMaterialReactTable,
} from "material-react-table";

type TData = {
  [key: string]: any;
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

  enableEditing?: boolean;
  enableRowActions?: boolean;
  enableCreate?: boolean;
};

function MaterialTable({
  data,
  columns,
  onRowClick,
  isLoading = false,
}: MaterialTableProps) {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useMaterialReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    enableEditing: false,
    enableTopToolbar: false,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    positionToolbarAlertBanner: "bottom",
    enablePagination: false,

    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        if (onRowClick) onRowClick(event, row);
      },
      style: { cursor: "pointer" },
    }),

    initialState: {
      density: "compact",
      isFullScreen: false,
    },

    state: {
      isLoading,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
}

export default MaterialTable;
