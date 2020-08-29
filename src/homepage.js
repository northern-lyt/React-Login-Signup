import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    paper: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: 10,
      backgroundColor:'#dc004e',
    },
    first:{
      marginLeft:50,
    },
};

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          name:" ",
          name1:" "
        }
      }
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            this.setState({
              name1: this.userData.name
            })
          }
    }

    render() {
        const { classes } = this.props;
        return (
          <div>
              <br/>
              <div className={classes.first}>
                <Typography component="h4" variant="h6">
                  Hi!!!! {this.state.name1}
                </Typography>
              </div>
                <br/>
                <div className={classes.paper} >
                    <Avatar className={classes.avatar} >
                        <HomeOutlinedIcon />
                     </Avatar>
                     <br/>
                    <Typography component="h3" variant="h4">
                        HomePage
                    </Typography>
                    <h4 >You're logged in!!</h4>
                    <Link  href="#" variant="body2" onClick={() => this.props.history.push("/signin")}>
                         Logout
                    </Link>
                </div>
        </div>           
        )
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};
    
export default withStyles(styles)(Homepage);
