import React from 'react';
import user from '../_helpers/user';
import { RoleConstants } from '../constants/role.constants';
import AdminDashboard from './dashboard/admin.dashboard';
import UserDashboard from './dashboard/user.dashboard';

const Dashboard = () => {
  return (
    <>
      {user.role === RoleConstants.USER ? <UserDashboard /> : <></>}
      {user.role === RoleConstants.ADMIN ? <AdminDashboard /> : <></>}
    </>
  );
};

export default Dashboard;