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

function Copyright() 
{
return (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      Card Company
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
  backgroundColor:'#000000',
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

class Login extends Component {
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
                            <Link  href="#" variant="body2" onClick={() => this.props.history.push("/Form")}>
                            Don't have an account? Sign Up
                            </Link>
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

Login.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
