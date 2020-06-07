import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../components/container';

export const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:'100%' }}>
        <h1>
          Not Found, back to{' '}
          <a href=" " onClick={() => history.push('/')}>
            Home
          </a>
        </h1>
      </div>
    </Container>
  );
};
export default NotFoundPage;
