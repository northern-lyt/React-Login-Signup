import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Links from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

//Copyright funtion 
function Copyright() 
{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Links color="inherit" href="https://material-ui.com/">
        Card Company
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//Styling
const styles = () => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper1: {
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%', 
    marginTop: 10,
  },
  submit: {
    marginTop:8,
    marginBottom: 7,
  },
});

const form = props => {
        const {
          classes,
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;

        return (
                  <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper1}>
                    <Typography component="h1" variant="h4">
                      Create new account
                    </Typography>
                    Use Email to create new account
                  </div>
                  <div className={classes.paper}>
                    <form  className={classes.form} onSubmit={handleSubmit} noValidate>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="First name"
                        name="name"
                        autoComplete="name"
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        noValidate
                      />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lname"
                        label="Last name"
                        name="lname"
                        autoComplete="lname"
                        helperText={touched.lname ? errors.lname : ""}
                        error={touched.lname && Boolean(errors.lname)}
                        value={values.lname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        noValidate
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        autoFocus
                        noValidate
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
                        autoComplete="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        noValidate
                       />
                      <FormControlLabel
                          control={
                          <Checkbox
                            name="checkedB"
                            color="primary"
                            id="checkbox"
                          />
                          }
                        label="I have read the" 
                        id="check"
                        name="check"
                      />
                      <Links  href="#" variant="body2">
                        Terms and Conditions
                      </Links>
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
                      <Grid container>
                        <Grid item>
                          <br/>
                          Have an account?
                          <Links  href="#" variant="body2">
                            Sign In
                          </Links>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                  <Box mt={6}>
                    <Copyright />
                  </Box>
                  </Container>
        );
};

//Formik 
const Form = withRouter(withFormik({
  mapPropsToValues: ({
    name,
    lname,
    email,
    password,
  }) => {
    return {
      name: name || "",
      lname: lname || "",
      email: email || "",
      password: password || "",
    };
  },

//Validation through yup
validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("First Name is required")
      .min(3, "First Name is Too Short"),
    lname: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name is Too Short"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short should be 8 characters minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  }),

//Submit function   
handleSubmit: async(values,{props}) => {                   //props is passed through handle submit
  //console.log('props',props);

  //JSON object created obj
  let obj={};
  obj.firstname=values.name;
  obj.lastname=values.lname;
  obj.email=values.email;
  obj.password=values.password;
  
  //API call from frontend
  await axios({
    method: "POST", 
    url: "https://dbcp.herokuapp.com/users/new/", 
    data: obj,  
  }).then((response)=>{
    console.log(response);
    if (response.statusText === 'OK') {
      alert("OTP sent");
      props.history.push('/Checkotp/',response.data.createdUser.otp);  //Routed to otp page with param otp value
      console.log(response.data.createdUser.otp);
    }else if(response.statusTextt === 'fail') {
      alert("Message failed to send.");
    }
   });
}
})(form));                                          //form is being passed as object

export default withStyles(styles)(Form);
