import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container } from '../components/container';
import { getAPI } from '../api/api-method';
import { API_URL } from '../api/api-url';
import { PageHeader } from 'antd';
import ReactMarkdown from 'react-markdown'
import Loader from '../components/loader';
import { toastError } from '../utils/toast';

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
      })
      .catch((err: any) => {
        setIsLoading(false);
        toastError(err.message);
      });
  },[userName, repoName])

  return (
    <Container>
      <PageHeader onBack={() => history.goBack()} title={`${repoName} Readme`} style={{borderBottom:'1px solid #ccc', width:'100%'}}/>
      {isLoading && <Loader fullPage/>}
      <div style={{textAlign:'left', padding:'40px 16px', overflow:'auto', width:'100%'}}>{readme ? <ReactMarkdown source={window.atob(readme)} /> : ''}</div>
    </Container>
  );
}

export default RepoPage