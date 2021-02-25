import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import OtpInput from "react-otp-input";
import Button from '@material-ui/core/Button';
//import axios from 'axios';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    backgroundColor: 'black',
  },
}));

export default function Checkotp() {

  const history = useHistory();
  //console.log(history);
  const [oTp, setOtp] = useState("");        //Inintialize otp with null
  const classes = useStyles();
  
  function handleChange(e) {
    setOtp(e);
    console.log(oTp);
  }

  function handleClick()
  {
    //console.log('otp',typeof oTp);
    //console.log('value', typeof history.location.state);

    if(history.location.state == oTp)              //value of params passed is matched with typed otp
    {
      history.push('/Login');
    }
    else
    alert('The OTP is wrong');
  }

  return (
    <div className={classes.box}>
    <h1>The OTP is {history.location.state} </h1>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="Icon" className={classes.avatar}>
            
          </Avatar>
        }
        title="OTP Verification"
        subheader="Enter the OTP send to your mail id."
      />
      <div className={classes.paper}>
        <OtpInput
          value={oTp}
          onChange={handleChange}
          numInputs={6}
        />
      </div>
      <CardContent>
      <Button variant="contained" color="primary" onClick={handleClick} >
        Verify
      </Button>
      </CardContent>
    </Card>
  </div>
  );
}

