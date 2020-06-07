import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../components/container';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Container>
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%' }}
      >
        <h1>
          Not Found, back to
          <br />
          <Button type="primary" icon={<HomeOutlined />} size="large" onClick={() => history.push('/')}>
            Home
          </Button>
        </h1>
      </div>
    </Container>
  );
};
export default NotFoundPage;
