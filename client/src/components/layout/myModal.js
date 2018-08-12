import { Modal } from 'antd';

const myModal = (type, title, content, ok = () => {}) => {
  return Modal[type]({
    title,
    content,
    onOk() {
      ok();
    }
  });
};

export default myModal;
