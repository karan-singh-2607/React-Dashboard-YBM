/* eslint-disable no-param-reassign */
import { Button, Form, Upload, message } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Papa from 'papaparse';

function CsvDataReader(props) {
  const { setCsvArray } = props;

  const Uploadprops = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, '0000', info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      const { file } = info;
      if (file)
        Papa.parse(file, {
          header: true,
          complete(results) {
            console.log('Finished:', results?.data);
            setCsvArray(results?.data);
          },
        });
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Form>
      <Form.Item label="Import employee data">
        <Upload
          {...Uploadprops}
          accept=".csv"
          maxCount={1}
          beforeUpload={(e) => {
            const { files } = e.target;
            if (files) {
              console.log(files[0]);
              Papa.parse(files[0], {
                complete(results) {
                  console.log('Finished:', results.data);
                },
              });
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Click here to upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}

CsvDataReader.propTypes = {
  setCsvArray: PropTypes.func,
};
export default CsvDataReader;
