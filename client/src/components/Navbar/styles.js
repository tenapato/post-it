import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 0,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: '#0a81ab'
  },
  heading: {
    color: 'white',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '0px',
    marginRight: '10px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  signinButton: {
    '&:hover': {
      backgroundColor: '#0c4271',
      color : 'white'
      
    },
    
      backgroundColor: 'white',
      color: 'black'
  },
  dashboardButton: {
    '&:hover': {
      backgroundColor: 'green',
      color : 'white'
      
    },
    
      backgroundColor: '#81b214',
      color: 'white'
    
  },
  dashB: {
    width: '100px',
    padding:'10px'
  }
  
}));