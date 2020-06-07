import React from 'react';
import { Spin } from 'antd';
import './loader.scss';

interface LoaderType {
  fullPage?: boolean;
}
export const Loader = ({ fullPage = false }: LoaderType) => {
  return (
    <div className={`loader ${fullPage ? 'fullPage' : ''}`} data-testid='loader'>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
