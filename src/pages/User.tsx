import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Typography, Button, PageHeader, Menu, Dropdown } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import Container from '../components/container';
import { getAPI } from '../api/api-method';
import { API_URL } from '../api/api-url';
import Loader from '../components/loader';
import { RepoType, RepoContext } from '../context/repoContext';
import { toastError, toastInfo } from '../utils/toast';
const { Title } = Typography;

export const UserPage = () => {
  const { userName } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory()
  const {repos, setRepos} = useContext(RepoContext);

  useEffect(() => {
    setIsLoading(true);
    getAPI(API_URL.USER_REPOS(userName))
      .then((resp: any) => {
        setIsLoading(false);
        setRepos(resp);
      })
      .catch((err: any) => {
        setIsLoading(false);
        toastError(err.message);
      });
  }, [userName, setRepos]);

  const downloadHandler = (repoName:string, format:any) => {
    getAPI(API_URL.DOWNLOAD_REPO(userName, repoName, format))
      .then(() => {
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        toastError(err.message);
      });
  }

  const cloneHanlder = (link: string) => {
    const tempInput = document.createElement('input');
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toastInfo('Link copied!');
  };

  return (
    <Container>
      <PageHeader
        onBack={() => history.goBack()}
        title={`Welcome to ${userName} page`}
        style={{ borderBottom: '1px solid #ccc', width: '100%' }}
      />
      {isLoading && <Loader />}
      {repos && repos.length > 0 ? (
        <Row style={{ padding: '40px 16px', overflowY: 'auto' }}>
          {repos.map((repo: RepoType) => {
            return (
              <Col span={24} key={repo.id} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
                <Title level={4}>{repo.name}</Title>
                <p style={{ fontWeight: 600 }}>{repo.description}</p>
                <span>Last update: {new Date('2020-01-23T12:34:38Z').toLocaleString()}</span>
                <br />
                <span>{repo.language && `Language: ${repo.language}`}</span>
                <Row justify="space-around" align="middle" style={{ margin: '16px 0 0' }}>
                  <Dropdown
                    overlay={
                      <Menu onClick={({ key }: { key: string }) => downloadHandler(repo.name, key)}>
                        <Menu.Item key="tarball">Download Tar</Menu.Item>
                        <Menu.Item key="zipball">Download Zip</Menu.Item>
                      </Menu>
                    }
                  >
                    <Button style={{ backgroundColor: '#52c41a', color: 'white' }}>Download</Button>
                  </Dropdown>
                  <Button
                    style={{ backgroundColor: '#13c2c2', color: 'white' }}
                    onClick={() => cloneHanlder(repo.clone_url)}
                  >
                    Clone
                  </Button>
                  <Button
                    style={{ backgroundColor: '#1890ff', color: 'white' }}
                    onClick={() => history.push(`${userName}/repo/${repo.name}`)}
                  >
                    Readme
                  </Button>
                </Row>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Title level={4}>{isLoading ? '' : 'No project'}</Title>
      )}
    </Container>
  );
};
export default UserPage;
