import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingLeft:'20px',
    alignItems: 'center',
  },
  heading: {
    color: '#2F80ED',
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]:{
    mainContainer:{
      flexDirection:'column-reverse'
    }
  }
 
}));