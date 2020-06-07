import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, PageHeader, Menu, Dropdown } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import Container from '../components/container';
import { getAPI } from '../api/api-method';
import { API_URL } from '../api/api-url';
import Loader from '../components/loader';
const { Title } = Typography;

interface RepoType {
  id: string;
  name: string;
  clone_url: string;
  downloads_url: string;
  description: string;
  language: string;
  updated_at: string;
}

export const UserPage = () => {
  const { userName } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Array<RepoType>>([]);
  const history = useHistory()

  useEffect(() => {
    setIsLoading(true);
    getAPI(API_URL.USER_REPOS(userName))
      .then((resp: any) => {
        setIsLoading(false);
        console.log(resp);
        setProjects(resp);
      })
      .catch((err: any) => {
        setIsLoading(false);
        alert(err.message);
      });
  }, [userName]);

  const downloadHandler = (repoName:string, format:any) => {
    console.log({format});
    getAPI(API_URL.DOWNLOAD_REPO(userName, repoName, format))
      .then((resp: any) => {
        setIsLoading(false);
        console.log(resp);
      })
      .catch((err: any) => {
        setIsLoading(false);
        alert(err.message);
      });
  }

  const cloneHanlder = (link: string) => {
    const tempInput = document.createElement('input');
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Link copied!');
  };

  return (
    <Container>
      <PageHeader
        onBack={() => history.goBack()}
        title={`Welcome to ${userName} page`}
        style={{ borderBottom: '1px solid #ccc', width: '100%' }}
      />
      {isLoading && <Loader />}
      {projects.length > 0 ? (
        <Row style={{ padding: '40px 16px', overflowY:'auto' }}>
          {projects.map((project: RepoType) => {
            return (
              <Col
                span={24}
                key={project.id}
                style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}
              >
                <Title level={4}>{project.name}</Title>
                <p style={{ fontWeight: 600 }}>{project.description}</p>
                <span>Last update: {new Date('2020-01-23T12:34:38Z').toLocaleString()}</span>
                <br />
                <span>{project.language && `Language: ${project.language}`}</span>
                <Row justify="space-around" align="middle" style={{ margin: '16px 0 0' }}>
                  <Dropdown
                    overlay={
                      <Menu onClick={({ key }: { key: string }) => downloadHandler(project.name, key)}>
                        <Menu.Item key="tarball">Download Tar</Menu.Item>
                        <Menu.Item key="zipball">Download Zip</Menu.Item>
                      </Menu>
                    }
                  >
                    <Button style={{ backgroundColor: '#52c41a', color: 'white' }}>Download</Button>
                  </Dropdown>
                  <Button
                    style={{ backgroundColor: '#13c2c2', color: 'white' }}
                    onClick={() => cloneHanlder(project.clone_url)}
                  >
                    Clone
                  </Button>
                  <Button
                    style={{ backgroundColor: '#1890ff', color: 'white' }}
                    onClick={() => history.push(`${userName}/repo/${project.name}`)}
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
