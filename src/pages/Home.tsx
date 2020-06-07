import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Input, Row, Col, Pagination, Typography } from 'antd';
import Container from '../components/container';
import { getAPI } from '../api/api-method';
import { API_URL } from '../api/api-url';
import Loader from '../components/loader';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { toastError } from '../utils/toast';
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
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const history = useHistory();
  const { searchVal, users, totalCount, setUsers, setSearchVal } = useContext(UserContext);

  useEffect(() => {
    console.log({searchVal});
    
    if (searchVal && searchVal.length > 0) {
      setIsSearching(true);
      getAPI(API_URL.SEARCH_USER + `?q=${searchVal}&page=${page}`)
        .then((resp: any) => {
          setIsFirst(false);
          setUsers(resp);
          setIsSearching(false);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        })
        .catch((err: any) => {
          toastError(err.message);
          setIsSearching(false);
        });
    }
  }, [searchVal, page, setUsers]);

  const searchHandler = (value: string) => {
    if(value)setSearchVal(value);
    else toastError(`Please don't leave the input empty`)
  };

  const paginationHandler = (page: number) => {
    setPage(page);
  };

  return (
    <Container>
      <div style={{ margin: '100px 0px 16px', padding: '0 16px', width: '100%' }}>
        {/* Search ANTD make an error. I can't do much for remove the errors */}
        <Search
          placeholder="Search github user"
          defaultValue={searchVal}
          onSearch={searchHandler}
          loading={isSearching}
          disabled={isSearching}
          enterButton
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        {totalCount && (
          <Title level={4}>
            Found {totalCount} for {searchVal} user
          </Title>
        )}
      </div>

      <div style={{ flex: 1, width: '100%', padding: '16px', overflowY: 'auto' }}>
        {isSearching && <Loader fullPage />}
        {users && users.length > 0 ? (
          <Fragment>
            <Row justify="space-around" align="middle">
              {users.map((user: User) => {
                return (
                  <Col
                    span={11}
                    key={user.id}
                    style={{
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px',
                      marginBottom: '16px',
                    }}
                    onClick={() => history.push(`user/${user.login}`)}
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
          <div style={{ textAlign: 'center' }}>
            <Title level={4}>{isFirst ? 'Welcome to Git-Peek :)' : isSearching ? '' : 'No Result'}</Title>
          </div>
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
