import { Layout, Row, Avatar } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Styles from './EditEmployee.module.scss';

function EditEmployee(props) {
  const { EditEmployeeDrawer } = props;
  const AvtarName = EditEmployeeDrawer?.firstName;
  console.log('eeee->', EditEmployeeDrawer);
  return (
    <Layout>
      <Row className={Styles.EployeeDataContainer}>
        <div className={Styles.LastModified}>
          Last modified: {moment(EditEmployeeDrawer?.updatedAt).startOf('day').fromNow()}
        </div>
        <Row justify="center" style={{ marginBottom: 20 }} className={Styles.UserContainer}>
          <div>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {AvtarName.slice(0, 1)}
            </Avatar>
            <strong>
              {EditEmployeeDrawer?.firstName} {EditEmployeeDrawer?.lastName}
            </strong>
            <p>{EditEmployeeDrawer?.designation}</p>
          </div>
        </Row>
        <div className={Styles.contentContainer}>
          <div>
            <strong>Gender : </strong>
            {EditEmployeeDrawer?.gender}
          </div>
          <div>
            <strong>Date of birth : </strong>
            {moment(EditEmployeeDrawer?.dob).format('DD/MM/YYYY')}
          </div>
          <div>
            <strong>Email Address : </strong>
            {EditEmployeeDrawer?.personalEmail}
          </div>
          <div>
            <strong>Location : </strong>
            {EditEmployeeDrawer?.location}
          </div>
          <div>
            <strong>Employee status : </strong>
            {EditEmployeeDrawer?.status}
          </div>
          <div>
            <strong>CTC : </strong>
            {EditEmployeeDrawer?.ctc}
          </div>
          <div>
            <strong>Employee Type : </strong>
            {EditEmployeeDrawer?.employeementType}
          </div>
          <div>
            <strong>Employee Grade : </strong>
            {EditEmployeeDrawer?.grade}
          </div>
          <div>
            <strong>Employee mobile : </strong>
            {EditEmployeeDrawer?.mobile}
          </div>
          <div>
            <strong>Salary structure : </strong>
            {EditEmployeeDrawer?.salaryTemplate}
          </div>
        </div>
        <h6 className="text-muted text-uppercase mb-3">Bank Account details</h6>
        <div className={Styles.contentContainer}>
          <div>
            <strong>Bank name : </strong>N/A
          </div>
          <div>
            <strong>Account holder name : </strong>N/A
          </div>
          <div>
            <strong>Account number : </strong>N/A
          </div>
          <div>
            <strong>IFSC code : </strong>N/A
          </div>
          <div>
            <strong>Branch : </strong>N/A
          </div>
        </div>
        <h6 className="text-muted text-uppercase mb-3">Documents</h6>
        <div className={Styles.contentContainer}>
          <div>
            <strong>PAN no : </strong>N/A
          </div>
          <div>
            <strong>Aadhar no : </strong>N/A
          </div>
          <div>
            <strong>ESIC no : </strong>N/A
          </div>
          <div>
            <strong>PF account no : </strong>N/A
          </div>
        </div>
      </Row>
    </Layout>
  );
}

EditEmployee.propTypes = {
  EditEmployeeDrawer: PropTypes.shape({
    firstName: PropTypes.string,
    updatedAt: PropTypes.string,
    lastName: PropTypes.string,
    designation: PropTypes.string,
    gender: PropTypes.string,
    personalEmail: PropTypes.string,
    location: PropTypes.string,
    dob: PropTypes.string,
    status: PropTypes.string,
    ctc: PropTypes.number,
    employeementType: PropTypes.string,
    grade: PropTypes.string,
    mobile: PropTypes.string,
    salaryTemplate: PropTypes.string,
  }),
};
export default EditEmployee;
