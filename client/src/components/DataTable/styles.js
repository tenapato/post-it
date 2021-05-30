import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    delete: {
        padding: '10px',
        margin: '5px',
        
        '&:hover': {
            backgroundColor: '#903749',
            color : 'white'
            
          },
          
            backgroundColor: '#e84545',
            color: 'white'
          
        },
        
        
    
  }));