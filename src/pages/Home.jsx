import React, { Fragment, useState, useEffect } from 'react';
import CategorySourceSearchForm from '../components/CategorySourceSearchForm';
import { setTopNews, clearTopNews } from '../actions/news';
import NewsList from '../components/NewsList';
import TopNav from '../layout/TopNav';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NewsItem from '../components/NewsItem';

const Home = ({ setTopNews, news, clearTopNews }) => {
  const [page, setPage] = useState(1);
  const [categorySourceUrl, setCategorySourceUrl] = useState('top-headlines?country=in&category=Business&sources=&q=');

  const handleCategorySourceSearch = categorySourceUrl => {
    setPage(1);
    setCategorySourceUrl(categorySourceUrl);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (categorySourceUrl) {
      const url = `${categorySourceUrl}`;
      setTopNews(url, page);
    }

    return () => {
      clearTopNews();
    };
    // eslint-disable-next-line
  }, [categorySourceUrl, page]);

  return (
    <Fragment>
      <Row className='justify-content-md-center mb-4 navigation'>
        <TopNav />
        <CategorySourceSearchForm
          onCategorySourceSearch={categorySourceUrl => {
            handleCategorySourceSearch(categorySourceUrl);
          }}
        />
      </Row>

{news.newsItemsTotal !== null && news.newsItems[0] && news.newsItems[0].urlToImage && (
  <Container>
        <Row className='justify-content-md-center mb-4'>
          <h2>Top News</h2>
          <NewsItem key={1} item={news.newsItems[0]} />
        </Row>
  </Container>
      )}

      <NewsList
        newsItemsTotal={news.newsItemsTotal}
        loading={news.newsLoading}
        newsItems={news.newsItems}
        loadMore={() => handleLoadMore()}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  { setTopNews, clearTopNews }
)(Home);
