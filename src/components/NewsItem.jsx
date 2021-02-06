import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Truncate from 'react-truncate';
import { connect } from 'react-redux';
import { bookmarkItem, unBookmarkItem } from '../actions/bookmarks';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import NewsDefaultImage from '../assests/news-default-image.jpg';

const NewsItem = ({
  item,
  theme,
  bookmarkItem,
  unBookmarkItem,
  bookmarkItems
}) => {
  const isBookmark = item => {
    if (bookmarkItems !== null) {
      return (
        bookmarkItems.findIndex(bookmark => bookmark.title === item.title) > -1
      );
    }
  };
  const bookmark = item => {
    bookmarkItem(item);
  };

  const unBookmark = item => {
    unBookmarkItem(item);
  };
  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} className='my-2'>
      <Card>
        {item.urlToImage ? (
          <div
            className='urlImage'
            style={{ backgroundImage: `url(${item.urlToImage})` }}
          />
        ) : (
          <div
            className='urlImage'
            style={{ backgroundImage: `url(${NewsDefaultImage})` }}
          />
        )}

        <Card.Body>
          <a href={item.url} target ="_blank" rel="noopener noreferrer">
          <Card.Title>
            <Truncate ellipsis={<span>...</span>}>
              {item.title}
            </Truncate>
          </Card.Title>
          </a>
          <Card.Text>
            <Truncate lines={3} ellipsis={<span>...</span>}>
              {item.description}
            </Truncate>
          </Card.Text>
          <div className="mark">
          {isBookmark(item) ? (
            <FaBookmark
              className='float-right mt-2 icon-button'
              size='1.5em'
              onClick={() => unBookmark(item)}
            />
          ) : (
            <FaRegBookmark
              className='float-right mt-2 icon-button'
              size='1.5em'
              onClick={() => bookmark(item)}
            />
          )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const mapStateToProps = state => ({
  bookmarkItems: state.bookmarks.bookmarkItems
});

export default connect(
  mapStateToProps,
  { bookmarkItem, unBookmarkItem }
)(NewsItem);
