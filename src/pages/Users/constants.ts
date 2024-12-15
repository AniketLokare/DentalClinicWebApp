import { ExtendedColumnDef } from 'src/components/Table';
import { USERS } from 'src/constants/paths';
import { object as yupObject, number, ObjectSchema, string } from 'yup';

export const listUsersBreadcrumbLinks = [
  {
    label: 'Users',
    href: USERS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Users',
    href: USERS,
  },
  {
    label: isEdit ? 'Edit User' : 'New User',
    href: '#',
  },
];

export const userRoleProps = [
  { 
    menuItemLabel: 'ADMIN', 
    menuItemValue: 'ADMIN', 
    menuItemId: 'ADMIN' 
  },
  { 
    menuItemLabel: 'USER', 
    menuItemValue: 'USER', 
    menuItemId: 'USER' 
  },
];

export const usersTableColumns: ExtendedColumnDef<User, string>[] = [
  {
    header: 'User Name',
    accessorKey: 'username',
  },
  {
    header: 'Password',
    accessorKey: 'password',
    mask: true,
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

export const userDefaultFormValues: CreateUserPayload = {
  username: '',
  password: '',
  role: '',
  mobileNumber: 0,
};

export const userFormValidationSchema: ObjectSchema<CreateUserPayload> =
  yupObject({
    username: string().required('User name is required'),
    password: string().required('Password is required'),
    role: string().required('Role is required'),
    mobileNumber: number().optional(),
  });
