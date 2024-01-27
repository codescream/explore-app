import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import paginateStyles from './styles';

const Paginate = ({page}) => {
  const classes = paginateStyles();

  const totalPages = useSelector(state => state.postsReducer.totalPages);
  console.log(totalPages);
  
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={page}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem 
          { ...item }
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  )
}

export default Paginate;