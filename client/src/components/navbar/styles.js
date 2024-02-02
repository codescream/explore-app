import { makeStyles } from "@material-ui/core";

const appBar = {
  borderRadius: 15,
  margin: '30px 0',
  padding:  "1px 20px",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& div': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
};

export default makeStyles((theme) => ({
  loggedIn: {
    ...appBar,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  loggedOut: {
    ...appBar,
    [theme.breakpoints.down('xs')]: {
      '& div': {
        justifyContent: 'flex-end',
      }
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontSize: ' 2.5em'
  },
  image: {
    marginLeft: '15px',

    [theme.breakpoints.down('xs')]: {
      height: '40px'
    },
  },
  profile: {
    gap: '10px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-around',
      width: '100%'
    },
  },
  noProfile: {
    gap: '10px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
      width: '100%'
    },
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '0px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  }
}))