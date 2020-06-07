import React, { useState, Fragment, useEffect } from 'react';
import { Input, Row, Col, Pagination, Typography } from 'antd';
import Container from '../components/container';
import { getAPI } from '../api/api-method';
import { API_URL } from '../api/api-url';
import Loader from '../components/loader';
import { useHistory } from 'react-router-dom';
const { Search } = Input;
const { Title } = Typography;

interface User {
  avatar_url: string;
  login: string;
  id: string;
}

interface SearchUsersType {
  incomplete_results: boolean;
  items: Array<User>;
  total_count: number;
}
export const HomePage = () => {
  const [totalCount, setTotalCount] = useState<string>('');
  const [results, setResult] = useState<Array<User>>([]);
  const [page, setPage] = useState<number>(1);
  const [searchVal, setSearchVal] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const history = useHistory()

  useEffect(() => {
    if (searchVal) {
      setIsSearching(true);
      setResult([]);
      getAPI(API_URL.SEARCH_USER + `?q=${searchVal}&page=${page}`).then((resp: any) => {
        setTotalCount(resp.total_count.toString());
        setResult(resp.items);
        setIsSearching(false);
      })
      .catch((err:any)=>{
        alert(err.message)
        setIsSearching(false);
      })
    }
  }, [page, searchVal]);

  const searchHandler = (value: string) => {
    setSearchVal(value);
  };

  const paginationHandler = (page: number) => {
    setPage(page);
  };

  return (
    <Container>
      <Search
        placeholder="Search github user"
        onSearch={searchHandler}
        loading={isSearching}
        disabled={isSearching}
        style={{ margin: '100px 0px 16px' }}
      />
      <div style={{ flex: 1, width: '100%' }}>
        {isSearching && <Loader fullPage />}
        {totalCount && <Title level={4}>Found {totalCount}</Title>}
        {results.length > 0 ? (
          <Fragment>
            <Row justify="space-around" align="middle">
              {results.map((user: User) => {
                return (
                  <Col
                    span={12}
                    key={user.id}
                    style={{
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px',
                    }}
                    onClick={()=>history.push(`user/${user.login}`)}
                  >
                    <img
                      loading="lazy"
                      src={user.avatar_url}
                      alt={`Avatar of ${user.login}`}
                      width="60px"
                      height="60px"
                    />
                    <b>{user.login}</b>
                  </Col>
                );
              })}
            </Row>
          </Fragment>
        ) : (
          <Title level={4}>{isSearching ? '' : 'No Result'}</Title>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 40px' }}>
          <Pagination
            size="small"
            total={Number(totalCount)}
            pageSize={30}
            current={page}
            showSizeChanger={false}
            onChange={paginationHandler}
            hideOnSinglePage={true}
          />
        </div>
      </div>
    </Container>
  );
};
export default HomePage;
