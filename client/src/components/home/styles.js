import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  // [theme.breakpoints.down('sm')]: {
  //   mobile: {
  //     flexDirection: 'column-reverse',
  //   }
  // },
  [theme.breakpoints.down('xs')]: {
    gridContainer: {
      flexDirection: 'column-reverse',
    }
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px ',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tags: {
    border: '1px solid rgb(169, 169, 169)',
    '&:hover': {
      border: '1px solid black',
    },
    '&:focus': {
      border: '2px solid #3F51B5',
    }
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  test: {
    '&::placeholder': {
      color: 'rgb(46, 46, 46)'
    },
    paddingLeft: '10px'
  }
  // gridContainer: 
}));