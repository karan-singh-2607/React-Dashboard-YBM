import { Modal } from 'antd';

// ///////
function httpErrorHandle(Error) {
  Modal.error({
    title: `Error ${Error.response.status}!`,
    content: `${Error.response.data.msg || Error.response.data.message}`,
  });
}

export default httpErrorHandle;
