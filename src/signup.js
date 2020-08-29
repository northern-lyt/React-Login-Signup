import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Links from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

function Copyright() 
{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Links color="inherit" href="https://material-ui.com/">
        Demo form
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = {
  paper: {
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 10,
  },
  submit: {
    marginTop:8,
    marginBottom: 7,
  },
};

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const validPhoneRegex = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count+1)
  );
  return count;
}

class SignUp extends React.Component {
  userData;
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCollege = this.onChangeCollege.bind(this);
    this.onChangefirstPassword = this.onChangefirstPassword.bind(this);
    this.onChangesecondPassword = this.onChangesecondPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
    this.state = {
    name:'',
    email:'',  
    phoneno: '',
    college: '',
    typepassword:'',
    retypepassword: '',
    errorCount: 0,
    errors: {
      name: '',
      email: '',
      phoneno:'',
      typepassword: '',
      retypepassword:'',
    }
    };
  }


  handleChange = (event) => {
    event.preventDefault();

    const temp = event.target.name;
    const value = event.target.value;
    let errors = this.state.errors;


    switch (temp) {
      case 'name': 
        errors.name = 
          value.length < 3
            ? 'Name must be 3 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid';
        break;
        case 'phoneno':
          errors.phoneno = 
            validPhoneRegex.test(value)
              ? ''
              : 'Phone no. must have 10 digits';
            break;
      case 'typepassword': 
        errors.typepassword = 
          validPasswordRegex.test(value)
            ? ''
            : 'Password should be Minimum of eight characters, at least one uppercase and lowercase letter, one number and one special character';
        break;
      case 'retypepassword':
        let all_values=JSON.parse(localStorage.getItem('user'));
        let firstPassword = all_values.typepassword;

        errors.retypepassword = 
        firstPassword === value
        ? ''
        : 'Password did not match';
        break;
      default:
        break;
    }

    this.setState({errors, [temp]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let totalErrors = countErrors(this.state.errors);
    console.log(totalErrors);
    if(totalErrors !== 0) 
      alert("Invalid form");
    else{
      alert("You are successfully registered");
      return(this.props.history.push('/signin'));
    }
  }

  onChangeName(e) {
      this.setState({ name: e.target.value })
  }

  onChangeEmail(e) {
      this.setState({ email: e.target.value })
  }

  onChangePhone(e){
      this.setState({ phoneno: e.target.value })
  }
  
  onChangeCollege(e){
      this.setState({ college: e.target.value })
  }
    
  onChangefirstPassword(e) {
      this.setState({ typepassword: e.target.value })
  }
  
  onChangesecondPassword(e) {
      this.setState({ retypepassword: e.target.value })
  }
    

  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem('user'));
      
    if (localStorage.getItem('user')) {
      this.setState({
      name: this.userData.name,
      email: this.userData.email,
      phoneno: this.userData.phoneno,
      college: this.userData.college,
      typepassword: this.userData.typepassword,
      retypepassword: this.userData.retypepassword
      })
    }
    else {
        this.setState({
          name: '',
          email: '',
          phoneno: '',
          college: '',
          typepassword: '',
          retypepassword: ''
        })
      }
  }

  componentWillUpdate(nextProps, nextState) {
      localStorage.setItem('user', JSON.stringify(nextState));
  }

  render() {
      const { classes } = this.props;
      const {errors} = this.state;
      return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
            <form  className={classes.form} onSubmit={this.handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                value={this.state.name}
                onChange={e => {this.handleChange(e);
                this.onChangeName(e)}}
                noValidate
              />
               {errors.name.length > 0 && 
                <span style={{color: "red"}} className='error'>{errors.name}</span>}
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
                value={this.state.email}
                onChange={e => {this.handleChange(e);
                  this.onChangeEmail(e)}}
                noValidate
                />
                {errors.email.length > 0 && 
                <span style={{color: "red"}} className='error'>{errors.email}</span>}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneno"
                label="Phone Number"
                name="phoneno"
                autoComplete="phoneno"
                autoFocus
                value={this.state.phoneno}
                onChange={e => {this.handleChange(e);
                  this.onChangePhone(e)}}
                noValidate
                />
                {errors.phoneno.length > 0 && 
                <span style={{color: "red"}} className='error'>{errors.phoneno}</span>}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="college"
                label="College name"
                name="college"
                autoComplete="College name"
                autoFocus
                value={this.state.college}
                onChange={this.onChangeCollege} />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="typepassword"
                label="Password"
                type="password"
                id="password"
                autoComplete="type-password"
                value={this.state.typepassword}
                onChange={e => {this.handleChange(e);
                  this.onChangefirstPassword(e)}}
                noValidate
                />
                {errors.typepassword.length > 0 && 
                  <span style={{color: "red"}} className='error'>{errors.typepassword}</span>}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="retypepassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="retype-password"
                value={this.state.retypepassword}
                onChange={e => {this.handleChange(e);
                  this.onChangesecondPassword(e)}}
                noValidate
                />
                {errors.retypepassword.length > 0 && 
                  <span style={{color: "red"}} className='error'>{errors.retypepassword}</ span>} 
              <Button
                type="submit"
                value="Submit"
                fullWidth
                variant="contained"
                color= "primary"
                classname={classes.submit}
              >
                Submit
              </Button>

            </form>
          </div>
            <Box mt={6}>
              <Copyright />
            </Box>
          </Container>
      );
    }
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(SignUp);