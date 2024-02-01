import { makeStyles } from "@material-ui/core";

const next_prev = {
  position: 'absolute',
  top: 'calc(50% - 20px)',
  width: '40px',
  height: '40px',
  backgroundColor: 'white',
  borderRadius: '30px',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  opacity: 0,
  // userSelect: 'none',
  cursor: 'pointer',
  // zIndex: '2',
};

export default makeStyles((theme) => ({
  postDetailsContainer: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: '100',
    background: 'rgba(0, 0, 0, 0.5)',
    top: '0',
    left: '0',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    overflowY: 'scroll',
  },
  postDetails: {
    width: '70%',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    backgroundColor: 'white',
    padding: '20px 10px',
  },
  postDetailsImages: {
    position: 'relative',
    backgroundColor: 'black',
    borderRadius: '5px',
    width: '80%',
    height: '500px',
    display: 'flex',
    justifyContent: 'center',

    '&:hover': {
      '& div': {
        display: 'flex'
      }
    },

    '& img': {
      width: '100%',
      objectFit: 'contain'
    },

    '& div': {
      ...next_prev,
    },

    [theme.breakpoints.down('sm')] : {
      height: '300px'
    }
    
  },
  next: {
    right: '10px'
  },
  prev: {
    left: '10px',
    transform: 'scale(-1)'
  },
  closePostDetailsBtn: {
    backgroundColor: "#f50057",
    height: 'fit-content',
    padding: '5px 12px',
    position: 'fixed',
    borderRadius: '50%',
    top: '10px',
    right: '30px',
    cursor: 'pointer'
  },
  refresh: {
    padding: '10px',
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '10px',
    width: '20px',
    height: '20px',
    top: '10px',
    right: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  relatedExplore: {
    width: '120px',
    // height: '100%',
  },
  relatedContainer: {
    justifyContent: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    }
  }
}));