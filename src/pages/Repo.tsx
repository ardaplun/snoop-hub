import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container } from '../components/container';
import { getAPI } from '../api/api-method';
import { API_URL } from '../api/api-url';
import { PageHeader } from 'antd';
import ReactMarkdown from 'react-markdown'
import Loader from '../components/loader';

export const RepoPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [readme, setReadme] = useState('');
  const {userName, repoName} = useParams()
  const history = useHistory()
  useEffect(()=>{
    setIsLoading(true);
    getAPI(API_URL.REPO_README(userName, repoName))
      .then((resp: any) => {
        setReadme(resp.content);
        setIsLoading(false);
        console.log(resp);
        console.log(window.atob(resp.content));
      })
      .catch((err: any) => {
        setIsLoading(false);
        alert(err.message);
      });
  },[userName, repoName])

  return (
    <Container>
      <PageHeader onBack={() => history.goBack()} title={`${repoName} Readme`} style={{borderBottom:'1px solid #ccc', width:'100%'}}/>
      {isLoading && <Loader />}
      <div style={{textAlign:'left', margin:'40px 0'}}>{readme ? <ReactMarkdown source={window.atob(readme)} /> : ''}</div>
    </Container>
  );
}

export default RepoPage