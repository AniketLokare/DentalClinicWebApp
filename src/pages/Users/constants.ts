import { ColumnDef } from "@tanstack/react-table";
import { USERS } from "src/constants/paths";

export const listUsersBreadcrumbLinks = [
  {
    label: 'Users',
    href: USERS,
  },
];

export const usersTableColumns: ColumnDef<User, string>[] = [
  {
    header: 'User Name',
    accessorKey: 'username',
  },
  {
    header: 'Password',
    accessorKey: 'password',
  },
  {
    header: 'Role',
    accessorKey: 'role',
  },
  {
    header: 'Mobile Number',
    accessorKey: 'mobileNumber',
  },
];