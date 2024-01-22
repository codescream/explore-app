import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import paginateStyles from './styles';

const Paginate = () => {
  const classes = paginateStyles();
  
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={2}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem 
          { ...item }
          component={Link}
          to={`/posts?page=${1}`}
        />
      )}
    />
  )
}

export default Paginate;