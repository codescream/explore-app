import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  gridItem: {
    backgroundColor: '#4356d3',
    margin: '2px',
    paddingLeft: '10px !important',
    borderRadius: '14px',
    height: 'fit-content'
  },
  typography: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '13px'
  },
  span: {
    cursor: 'pointer',
    color: 'black',
    padding: '0px 8px 1px',
    marginLeft: '5px',
    fontSize: '15px',
    backgroundColor: '#f50057',
    borderRadius: '60%',
    textAlign: 'center',
    fontWeight: 'bold'
  }
}))