/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  partner: string;
  location: string;
  status: string;
}

export const userColumns: MRT_ColumnDef<any>[] = [
  {
    header: "First Name",
    accessorKey: "firstName",
    size: 200,
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Phone Number",
    accessorKey: "phoneNumber",
  },
  {
    header: "Partner",
    accessorKey: "partner",
  },
  {
    header: "Location",
    accessorKey: "location",
  },
  {
    header: "Status",
    accessorKey: "status",
    Cell: ({ row }) => {
      const status = row.getValue<string>("status");

      return (
        <Box
          component="span"
          sx={(theme) => ({
            backgroundColor:
              status === "active"
                ? "#27A7131A"
                : status === "awaiting"
                ? "#FF99001A"
                : "#FF00001A",
            color:
              status === "active"
                ? theme.palette.success.dark
                : status === "awaiting"
                ? theme.palette.warning.dark
                : theme.palette.error.dark,
            borderRadius: "1rem",
            padding: "0.25rem 0.75rem",
            fontWeight: 500,
            fontSize: "0.875rem",
          })}
        >
          {status === "active"
            ? "Active"
            : status === "awaiting"
            ? "Awaiting approval"
            : status === "deactivated"
            ? "Deactivated"
            : status}
        </Box>
      );
    },
  },
];

// dummy data
export const userData: User[] = [
  {
    id: 1,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "active",
  },
  {
    id: 2,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "awaiting",
  },
  {
    id: 3,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "active",
  },
  {
    id: 4,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "deactivated",
  },
  {
    id: 5,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "active",
  },
  {
    id: 6,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "deactivated",
  },
  {
    id: 7,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "awaiting",
  },
  {
    id: 8,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "active",
  },
  {
    id: 9,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "deactivated",
  },
  {
    id: 10,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "awaiting",
  },
  {
    id: 11,
    firstName: "Temitope",
    lastName: "Adejumoke",
    phoneNumber: "+234800 000 0000",
    partner: "The Place",
    location: "Festac",
    status: "active",
  },
];
