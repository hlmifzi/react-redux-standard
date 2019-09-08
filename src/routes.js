import React from 'react';

const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const DashboardBarang = React.lazy(() => import('./views/Dashboard/DashboardBarang'));
const DashboardPenjualan = React.lazy(() => import('./views/Dashboard/DashboardPenjualan'));
const UserManagement = React.lazy(() => import('./views/DataMasters/userManagement/Users'));
const UserManagementAdd = React.lazy(() => import('./views/DataMasters/userManagement/UserAdd'));
const TenantManagement = React.lazy(() => import('./views/DataMasters/tenantManagement/Tenants'));
const TenantManagementAdd = React.lazy(() => import('./views/DataMasters/tenantManagement/TenantsAdds'));
const ManageProduct = React.lazy(() => import('./views/ProductManagement/ManageAllProduct'));
const ListProduct = React.lazy(() => import('./views/ProductManagement/ListProduct'));
const ManageProductAdd = React.lazy(() => import('./views/ProductManagement/ManageAllProductAdd'));
const Entry = React.lazy(() => import('./views/ProductManagement/Entry'));
const Depreciation = React.lazy(() => import('./views/ProductManagement/Depreciation'));
const Retur = React.lazy(() => import('./views/ProductManagement/Retur'));
const Selling = React.lazy(() => import('./views/ProductManagement/Selling'));
const ReportEntry = React.lazy(() => import('./views/Report/Entry'));
const ReportDepreciation = React.lazy(() => import('./views/Report/Depreciation'));
const ReportRetur = React.lazy(() => import('./views/Report/Retur'));
const ReportSelling = React.lazy(() => import('./views/Report/Selling'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/DashboardBarang', name: 'Product Dashboard', component: DashboardBarang },
  { path: '/DashboardPenjualan', name: 'Sales Dashboard', component: DashboardPenjualan },
  { path: '/dataMaster', exact: true, name: 'Data Master', component: "" },
  { path: '/dataMaster/userManagement', exact: true, name: 'User Management', component: UserManagement },
  { path: '/dataMaster/userManagement/add',exact: true, name: 'Add', component: UserManagementAdd },
  { path: '/dataMaster/userManagement/edit/:id',exact: true, name: 'Edit', component: UserManagementAdd },
  { path: '/dataMaster/tenantManagement',exact: true, name: 'Tenant Management', component: TenantManagement },
  { path: '/dataMaster/tenantManagement/add', name: 'Add', component: TenantManagementAdd },
  { path: '/dataMaster/tenantManagement/edit/:id', name: 'Edit', component: TenantManagementAdd },
  { path: '/productManagement', exact: true, name: 'Product Management', component: "" },
  { path: '/productManagement/ListProduct', exact: true, name: 'List Product', component: ListProduct },
  { path: '/productManagement/ManageProduct', name: 'Manage All Product', component: ManageProduct },
  { path: '/productManagement/ManageProductAdd',  exact: true, name: 'Product', component: ManageProductAdd },
  { path: '/productManagement/ManageProductAdd/:id',  exact: true, name: 'Product', component: ManageProductAdd },
  { path: '/productManagement/Entry', name: 'Entry Product Management', component: Entry },
  { path: '/productManagement/Depreciation', name: 'Depreciation Product Management', component: Depreciation },
  { path: '/productManagement/Retur', name: 'Retur Product Management', component: Retur },
  { path: '/productManagement/Selling', name: 'Selling Product Management', component: Selling },
  { path: '/report', exact: true, name: 'Report', component: "" },
  { path: '/report/Entry', name: 'Entry Report', component: ReportEntry },
  { path: '/report/Depreciation', name: 'Depreciation Report', component: ReportDepreciation },
  { path: '/report/Retur', name: 'Retur Report', component: ReportRetur },
  { path: '/report/Selling', name: 'Selling Report', component: ReportSelling },


];

export default routes;
