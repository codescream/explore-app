import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    padding:  "1px 20px",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red'
    }
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none'
  },
  image: {
    marginLeft: '15px',
  },
  profile: {
    gap: '10px',
  }
}))