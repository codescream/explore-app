import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
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
  buttonSubmit: {
    marginBottom: 10,
  },
}));