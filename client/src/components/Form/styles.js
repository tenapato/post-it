import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      
    },
  },
  paper: {
    padding: theme.spacing(2),
    color: 'black',
    backgroundColor: '#393e46'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    color: 'red',
  },
  buttonSubmit: {
    marginBottom: 10,
    color: 'white',
    backgroundColor: '#0c4271'
  },
  buttonClear: {
  
    '&:hover': {
      backgroundColor: '#00adb5',
      color : 'white'
      
    },
    
      backgroundColor: '#0a81ab',
      color: 'white'
  },
  siginWarningCard: {
    padding: theme.spacing(2),
    color: 'black',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '40'
  },
  textField: {
    color: 'white',
    
  }
  
}));