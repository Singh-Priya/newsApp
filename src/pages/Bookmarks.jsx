import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsItem from './../components/NewsItem';
import TopNav from '../layout/TopNav';

const Bookmarks = ({ bookmarkItems }) => {
  return (
    <Fragment>
      <Container className="bookmarks">
      <TopNav />
        <Row className='justify-content-md-center py-4'>
          <Col xs lg='12'>
            <h2 className='text-center'>Bookmark News</h2>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* <Row className='py-4'>
          <Col xs={12} sm={12}>
            <p className='h5  text-center'>
              {bookmarkItems.length === 0 ? (
                <Fragment>
                  You have {bookmarkItems.length} Bookmarks(s)
                </Fragment>
              ) : (
                <Fragment> {bookmarkItems.length} Bookmarks(s)</Fragment>
              )}
            </p>
          </Col>
        </Row> */}
        <Row className='justify-content-md-center mb-4 pb-4'>
          {bookmarkItems.map((item, i) => (
            <NewsItem key={i} item={item} />
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  bookmarkItems: state.bookmarks.bookmarkItems,
});

export default connect(
  mapStateToProps,
  null
)(Bookmarks);
