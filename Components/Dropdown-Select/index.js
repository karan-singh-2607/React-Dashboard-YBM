import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types'; // ES6

const { Option } = Select;

function SelectDropdown(props) {
  const ResultValues = props?.Data;
  // console.log('Props value in dropdown', ResultValues);

  return (
    <Select
      showSearch
      placeholder={props?.Label}
      optionFilterProp="children"
      onChange={(value) => props?.HandleDropDownChanges(value, props?.Key)}
      name={props?.Key}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
    >
      {ResultValues.map((data) => (
        <Option key={data?.id || data?._id} value={data?._id || data?.value}>
          {data?.designation || data?.grade || data?.empstatus || data?.name || data?.genderName}
        </Option>
      ))}
    </Select>
  );
}

SelectDropdown.propTypes = {
  Data: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    value: PropTypes.string,
    designation: PropTypes.string,
    grade: PropTypes.string,
    empstatus: PropTypes.string,
    name: PropTypes.string,
    genderName: PropTypes.string,
  }),
  Label: PropTypes.string,
  HandleDropDownChanges: PropTypes.func,
  Key: PropTypes.string,
};

export default SelectDropdown;
