import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { PieChartOutlined, SettingOutlined } from '@ant-design/icons';
import { FiUsers } from 'react-icons/fi';
import { BsCardChecklist } from 'react-icons/bs';
import { AiOutlineCalculator, AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import { BiBuildings } from 'react-icons/bi';
import { RiProfileLine } from 'react-icons/ri';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const { SubMenu } = Menu; // ES6

const rootSubmenuKeys = ['employee', 'admin', 'masterlist', 'payroll', 'leaves', 'superadmin'];
// Hash Map to maintain the URL Path(Page) and associated submenu(selected) and menuitem(open) associated with that page.
const menuPathHash = new Map([
  // employee
  ['/AddEmployee', { selected: 'employee', open: 'addemployee' }],
  ['/ViewEmployee', { selected: 'employee', open: 'viewemployee' }],
  ['/EmployeeData', { selected: 'employee', open: 'importExport' }],
  // leaves
  ['/ApprovalLeaves', { selected: 'leave', open: 'approvalleaves' }],
  ['/ViewLeavesCalender', { selected: 'leave', open: 'viewleavecalender' }],
  // admin
  ['/SalaryStructure', { selected: 'superadmin', open: 'salarystructure' }],
  // master list
  ['/Department', { selected: 'masterlist', open: 'department' }],
  ['/Grade', { selected: 'masterlist', open: 'grade' }],
  ['/Designation', { selected: 'masterlist', open: 'designation' }],
  // company
  ['/CompanyOverview', { selected: 'company', open: 'profile' }],
  // profile
  ['/UserProfile', { selected: 'userprofile', open: 'userprofile' }],
  // setting
]);
function SideNavigation(props) {
  const [defaultSelected, setDefaultSel] = useState(['']); // default selected sub menu hook.
  const [openKeys, setOpenKeys] = React.useState([' ']);
  // next router to read the URL path
  const router = useRouter();

  // useEffect on router path and then using the Map to extract the key values for that path and setting them as open keys and selected keys.
  useEffect(() => {
    if (router.pathname === '/') {
      // console.log('got /');//Home or Default URL '/'
    } else {
      const getPathkey = menuPathHash.get(router.pathname);
      if (getPathkey) {
        const newArr = [getPathkey.selected];
        // setting key for opened submenu
        setOpenKeys(newArr);
        // setting hook for default selected menu item in sub menu
        setDefaultSel(getPathkey.open);
      }
    }
  }, [router.pathname]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
    // console.log('Datasss-->', keys, latestOpenKey, openKeys);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={defaultSelected}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      theme="light"
      defaultSelectedKeys={['1']}
    >
      <Menu.Item
        key="overview"
        icon={<PieChartOutlined />}
        onClick={() => props?.handleOverview(0)}
      >
        <Link href="/Overview" passHref>
          <span>Overview</span>
        </Link>
      </Menu.Item>

      <Menu.ItemGroup key="management" title="Management">
        <SubMenu key="employee" icon={<FiUsers />} title="Employee">
          <Menu.Item key="addemployee">
            <Link href="/AddEmployee" passHref>
              Add Employee
            </Link>
          </Menu.Item>
          <Menu.Item key="viewemployee" onClick={() => props?.handleOverview(2)}>
            <Link href="/ViewEmployee">View Employee</Link>
          </Menu.Item>

          <Menu.Item
            key="importExport"
            // icon={<BiImport />}
            onClick={() => props?.handleOverview(3)}
          >
            <Link href="/EmployeeData" passHref>
              <span>Employee Data</span>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="payroll" icon={<AiOutlineCalculator />} title="Payroll">
          <Menu.Item key="processpayroll" onClick={() => props?.handleOverview(4)}>
            Process Payroll
          </Menu.Item>
          <Menu.Item key="payrollhistroy" onClick={() => props?.handleOverview(5)}>
            Payroll History
          </Menu.Item>
          <Menu.Item key="reports" onClick={() => props?.handleOverview(6)}>
            Reports
          </Menu.Item>
          <Menu.Item key="investmentdeclaration" onClick={() => props?.handleOverview(7)}>
            Investment Declaration
          </Menu.Item>
          <Menu.Item key="taxationanddeductions" onClick={() => props?.handleOverview(8)}>
            Taxation and Deductions
          </Menu.Item>
        </SubMenu>
        <SubMenu key="leave" icon={<AiOutlineCalendar />} title="Leaves">
          <Menu.Item key="approvalleaves" onClick={() => props?.handleOverview(9)}>
            <Link href="/ApprovalLeaves" passHref>
              Pending Approval
            </Link>
          </Menu.Item>
          <Menu.Item key="viewleavecalender" onClick={() => props?.handleOverview(10)}>
            <Link href="/ViewLeavesCalender" passHref>
              View Leave Calender
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="admin" title="Admin">
        <SubMenu key="superadmin" icon={<AiOutlineUser />} title="Admin">
          <Menu.Item key="rolemanagement" onClick={() => props?.handleOverview(11)}>
            Role Management
          </Menu.Item>
          <Menu.Item key="salarystructure" onClick={() => props?.handleOverview(12)}>
            <Link href="/SalaryStructure" passHref>
              Salary Structure
            </Link>
          </Menu.Item>
          <Menu.Item key="payrollsetting" onClick={() => props?.handleOverview(13)}>
            Payroll Settings
          </Menu.Item>
          <Menu.Item key="ourpartners" onClick={() => props?.handleOverview(14)}>
            Our Partners
          </Menu.Item>
          <Menu.Item key="hrpolicies" onClick={() => props?.handleOverview(15)}>
            Hr Policies
          </Menu.Item>
        </SubMenu>
        <SubMenu key="masterlist" icon={<BsCardChecklist />} title="Master List">
          <Menu.Item key="department" onClick={() => props?.handleOverview(16)}>
            <Link href="/Department" passHref>
              Department
            </Link>
          </Menu.Item>
          <Menu.Item key="grade" onClick={() => props?.handleOverview(17)}>
            <Link href="/Grade" passHref>
              Grade
            </Link>
          </Menu.Item>
          <Menu.Item key="designation" onClick={() => props?.handleOverview(18)}>
            <Link href="/Designation" passHref>
              Designation
            </Link>
          </Menu.Item>
          <Menu.Item key="employeestatus" onClick={() => props?.handleOverview(19)}>
            <Link href="/EmployeeStatus" passHref>
              Employee Status
            </Link>
          </Menu.Item>
          <Menu.Item key="employeetype" onClick={() => props?.handleOverview(20)}>
            <Link href="/EmployeeType" passHref>
              Employee Type
            </Link>
          </Menu.Item>
          <Menu.Item key="employeetype" onClick={() => props?.handleOverview(23)}>
            <Link href="/LeaveTypes" passHref>
              Leave Types
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu.ItemGroup>

      {/* <Menu.Item
        key="article"
        icon={<IoNewspaperOutline />}
        onClick={() => props?.handleOverview(18)}
      >
        <span>Article</span>
      </Menu.Item> */}

      <Menu.ItemGroup key="company" title="Company">
        <Menu.Item key="profile" icon={<BiBuildings />} onClick={() => props?.handleOverview(21)}>
          <Link href="/CompanyOverview" passHref>
            <span>Company Overview</span>
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Item
        key="userprofile"
        icon={<RiProfileLine />}
        onClick={() => props?.handleOverview(21)}
      >
        <Link href="/userProfile/UserProfile" passHref>
          <span>Profile</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        onClick={() => props?.handleOverview(22)}
      >
        <span>Settings</span>
      </Menu.Item>
    </Menu>
  );
}

SideNavigation.propTypes = {
  handleOverview: PropTypes.func,
};
export default SideNavigation;
