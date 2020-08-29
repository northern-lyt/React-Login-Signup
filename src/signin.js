import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router-dom';

function Copyright() 
{
return (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      Demo Form
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
}

const styles = {
paper: {
  marginTop: 70,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},
avatar: {
  margin: 10,
  backgroundColor:'#dc004e',
},
form: {
  width: '100%', 
  marginTop: 10,
},
submit: {
  marginTop:8,
  marginBottom: 15,
},
};

class SignIn extends Component {
constructor(props){
  super(props);
  this.state = {
    email:" ",
    typepassword:" ",
    email1:" ",
    typepassword1:" "
  }
}

onChange = (newName) => {
  this.setState({isLogin: newName});
};

componentDidMount(){
  this.userData = JSON.parse(localStorage.getItem('user'));
  if (localStorage.getItem('user')) {
      this.setState({
        email1: this.userData.email,
        typepassword1: this.userData.typepassword
      })
    }
    else {
      this.setState({
          email1:" ",
          typepassword1:" "
      })
    }
}  
handleuser=(event)=>
{
  this.setState(
    {
      email:event.target.value
    }
  )
}
handlepsswd=(event)=>
{
  this.setState(
    {
      typepassword:event.target.value
    }
  )
}
check=()=>
{
  if(this.state.email===this.state.email1)
  {
    if(this.state.typepassword===this.state.typepassword1)
    { 
      alert("Login Successfull");
      return(this.props.history.push('/homepage'));
    }
    else{
      alert("Password did not match");
    }
  }
  else{
    alert("Not Registered");
  }
}

render(){
  const { classes } = this.props;
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper} >
      <Avatar className={classes.avatar} >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={this.handleuser}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={this.handlepsswd}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color= "primary"
          className={classes.submit}
          onClick = {this.check}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
          {/* <Redirect to="/signup"> */}
            <Link  href="#" variant="body2" onClick={() => this.props.history.push("/signup")}>
              Don't have an account? Sign Up
            </Link>
          {/* /</Redirect> */}
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={7}>
    <Copyright />
    </Box>
    </Container>
  );
}
}

SignIn.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);

// export default class SignIn extends React.Component {
//   render(){
//     return(
//       <h1>signin</h1>
//     )
      
    
//   }
// }