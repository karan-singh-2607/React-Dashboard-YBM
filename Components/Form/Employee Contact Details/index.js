import { Col, Row, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { Country, State, City } from 'country-state-city';
import Styles from './EmployeeContactDetails.module.scss';

const { Option } = Select;

function ContactDetails() {
  /// //////// Country state city
  const updatedCountries = Country.getAllCountries().map((country) => ({ ...country }));
  const [Countries, setCountries] = useState('');
  const [States, setStates] = useState([]);
  const [Cities, setCities] = useState([]);

  const handleCountryChange = (val) => {
    setCountries(val);
    console.log('ISO code==>', val);
    const states = State.getStatesOfCountry(val);
    setStates(states);
  };
  const handleStateChange = (val) => {
    console.log(val);
    const cities = City.getCitiesOfState(Countries, val);
    setCities(cities);
  };
  const handleCityChange = (val) => {
    console.log(val);
  };
  // console.log('Country=>', Countries, 'State=>', States, 'Cities=>', Cities);
  /// ////////

  return (
    <Row>
      <Col span={8} className={Styles.formCol}>
        <Form.Item
          label="Addres line 1"
          name="addressLine1"
          rules={[
            { required: true, message: 'Please enter address line 1' },
            { whitespace: true, message: 'Addres line 1 cannot be empty ' },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Addres line 1"
            // onChange={(value) => HandleInputChanges(value.target.value, ' ')}
          />
        </Form.Item>
      </Col>
      <Col span={8} className={Styles.formCol}>
        <Form.Item label="Addres line 2" name="addressLine2" hasFeedback>
          <Input
            placeholder="Addres line 2"
            // onChange={(value) => HandleInputChanges(value.target.value, ' ')}
          />
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item label="Country" name="country" rules={[{ required: true }]}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Country"
            onChange={(e) => handleCountryChange(e)}
          >
            {updatedCountries.map((country) => (
              <Option key={country?.isoCode}>{country?.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={8} className={Styles.formCol}>
        <Form.Item label="State" name="state" rules={[{ required: true }]}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="State"
            onChange={(e) => handleStateChange(e)}
          >
            {States.map((state) => (
              <Option key={state?.isoCode}>{state?.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8} className={Styles.formCol}>
        <Form.Item label="City" rules={[{ required: true }]}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="City"
            onChange={(e) => handleCityChange(e)}
          >
            {Cities.map((city) => (
              <Option key={city?.name}>{city?.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8} className={Styles.formCol}>
        <Form.Item label="Zipcode" name="zipcode" rules={[{ required: true }]}>
          <Input placeholder="Zipcode" />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default ContactDetails;
