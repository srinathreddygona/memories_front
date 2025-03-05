import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: '12px',
  },
  form: {
    padding: '2px',
    borderRadius: '90px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },

  // New styles for aligning the form to the right
  // formWrapper: {
  //   display: 'flex',
  //   justifyContent: 'flex-end', // Moves the form to the right
  //   width: '100%',
  //   padding: '20px',
  // },
  errorText: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '-8px',
    marginBottom: '8px',
  },

  [theme.breakpoints.down('sm')]: {
    formWrapper: {
      justifyContent: 'center', // Center the form on small screens
      padding: '10px',
    },
  },
}));
