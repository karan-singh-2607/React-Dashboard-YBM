import { makeStyles } from '@mui/styles';
import {
  Avatar,
  message,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Row,
  Upload,
  Input,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { API_CONFIG } from '../../../../lib/Config/API';

const useStyles = makeStyles({
  Label: {
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  Form: {
    '& .ant-form-item': {
      width: '100%',
      margin: 0,
    },
  },
});

const { Option } = Select;

/// //////////
const Uploadprops = {
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function EditProfileScreen() {
  useEffect(() => {
    getData();
  }, []);
  /// / Get API Call
  const [ResponseData, setResponseData] = useState({ CompData: null });
  const [CompanyData, setCompanyData] = useState([]);

  const getData = () => {
    const fetchData = async () => {
      const CompanyInfo = await axios
        .get(`${API_CONFIG.API_BASE_URL}company/get/6191cbd95d569a3bbaf321aa`)
        .then((response) => {
          setCompanyData(response.data);
        })
        .catch((error) => {
          setCompanyData(error);
        });

      setResponseData({ CompData: CompanyInfo });
    };
    fetchData();
  };
  if (ResponseData.CompData) {
    console.log('data--->', ResponseData);
  }
  console.log('object=>', CompanyData);

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

  const classes = useStyles();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="companyprofile"
      labelCol={{ span: 6, className: classes.Label }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ width: '100%' }}
      className={classes.Form}
      initialValues={{
        website: CompanyData?.website,
        company: CompanyData?.companyName,
        addressline1: CompanyData?.address,
        country: CompanyData?.country,
        state: CompanyData?.state,
        city: CompanyData?.city,
        zipcode: CompanyData?.pin,
        businesspan: CompanyData?.panNum,
        gstin: CompanyData?.gstNum,
        businesstan: CompanyData?.tanNum,
        esinum: CompanyData?.esiNum,
        contactno: CompanyData?.companyNumber,
        faxno: CompanyData?.fax,
        companyDirecotr: '',
      }}
    >
      <Row style={{ alignItems: 'center' }}>
        <Form.Item name="Logo" label="Logo">
          <Row style={{ width: '100%', alignItems: 'center' }}>
            <Col>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={
                  <Image
                    alt=""
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                }
              />
            </Col>
            <Col>
              <Row style={{ alignItems: 'center', marginLeft: '1rem' }}>
                <Upload {...Uploadprops} name="logo" action="/upload.do" maxCount={1}>
                  <Button type="link" icon={<AiOutlineEdit size={22} />} />
                </Upload>
                <Button type="link" icon={<RiDeleteBinLine size={22} />} danger />
              </Row>
            </Col>
          </Row>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: true, message: 'Please enter domain name' }]}
        >
          <Input addonBefore="https://" placeholder="example.com" />
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item
          label="Company name"
          name="company"
          rules={[{ required: true, message: 'Please inputcompany name' }]}
        >
          <Input placeholder="Company name" />
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item label="Company management">
          <Form.Item name="poc" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Point of contact person"
              optionLabelProp="label"
            >
              <Option value="hemant" label="Hemant">
                <div>
                  <span role="img" aria-label="hemant" style={{ marginRight: 10 }}>
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#00a2ae' }}>H</Avatar>
                  </span>
                  Hemant
                </div>
              </Option>
              <Option value="amit" label="Amit">
                <div>
                  <span role="img" aria-label="amit" style={{ marginRight: 10 }}>
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#00a2ae' }}>A</Avatar>
                  </span>
                  Amit
                </div>
              </Option>
              <Option value="prachi" label="Prachi">
                <div>
                  <span role="img" aria-label="prachi" style={{ marginRight: 10 }}>
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#00a2ae' }}>P</Avatar>
                  </span>
                  Prachi
                </div>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item name="companyDirecotr" rules={[{ required: true }]} style={{ marginTop: 10 }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Point of contact person"
              optionLabelProp="label"
            >
              <Option value="hemant" label="Hemant">
                <div>
                  <span role="img" aria-label="hemant" style={{ marginRight: 10 }}>
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#00a2ae' }}>H</Avatar>
                  </span>
                  Hemant
                </div>
              </Option>
              <Option value="amit" label="Amit">
                <div>
                  <span role="img" aria-label="amit" style={{ marginRight: 10 }}>
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#00a2ae' }}>A</Avatar>
                  </span>
                  Amit
                </div>
              </Option>
              <Option value="prachi" label="Prachi">
                <div>
                  <span role="img" aria-label="prachi" style={{ marginRight: 10 }}>
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#00a2ae' }}>P</Avatar>
                  </span>
                  Prachi
                </div>
              </Option>
            </Select>
          </Form.Item>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item label="Address">
          <Form.Item
            name="addressline1"
            rules={[{ required: true, message: 'Address line 1 is required' }]}
            style={{ display: 'inline-block' }}
          >
            <Input placeholder="Address line 1" />
          </Form.Item>
          <Form.Item name="addressline2" style={{ display: 'inline-block', margin: ' 10px 0' }}>
            <Input placeholder="Address line 2" />
          </Form.Item>
          <Row>
            <Col span={12} style={{ paddingRight: 10 }}>
              <Form.Item name="country" rules={[{ required: true }]}>
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
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item name="state" rules={[{ required: true }]}>
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
            <Col span={12} style={{ paddingRight: 10, display: 'inline-block', margin: ' 10px 0' }}>
              <Form.Item name="city" rules={[{ required: true }]}>
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
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Form.Item
                name="zipcode"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', margin: ' 10px 0' }}
              >
                <Input placeholder="Zipcode" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item label="Business information">
          <Row>
            <Col span={12} style={{ paddingRight: 10 }}>
              <Form.Item
                name="businesspan"
                rules={[{ required: true, message: 'PAN no is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="Busines pan number" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingleft: 10 }}>
              <Form.Item
                name="gstin"
                rules={[{ required: true, message: 'GST no is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="GST number" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingRight: 10, display: 'inline-block', margin: ' 10px 0' }}>
              <Form.Item
                name="businesstan"
                rules={[{ required: true, message: 'TAN no is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="Busines tan number" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ paddingleft: 10, display: 'inline-block', margin: ' 10px 0' }}>
              <Form.Item
                name="esinum"
                rules={[{ required: true, message: 'ESI no is required' }]}
                style={{ display: 'inline-block' }}
              >
                <Input placeholder="ESI number" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item label="Contact information">
          <Form.Item
            name="contactno"
            rules={[{ required: true, message: 'Contact no is required' }]}
            style={{ display: 'inline-block' }}
          >
            <Input placeholder="Contact number" />
          </Form.Item>
          <Form.Item
            name="emaiaddress"
            rules={[{ required: true, message: 'Email address is required' }, { type: 'email' }]}
            style={{ margin: ' 10px 0' }}
          >
            <Input placeholder="Email address" />
          </Form.Item>
          <Form.Item name="faxno">
            <Input placeholder="Fax number" />
          </Form.Item>
        </Form.Item>
      </Row>
      <Divider />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditProfileScreen;
