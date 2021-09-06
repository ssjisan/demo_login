import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { AiFillFacebook, AiFillLinkedin, AiFillYoutube, AiOutlineGlobal, AiOutlineTwitter } from "react-icons/ai";
import { Redirect } from 'react-router-dom';
import auth from './../auth/auth-helper';
import worker from './../image.jpg';
import logo from './../logo.png';
import { signin } from './api-auth.js';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    maxWidth: 1200,
    margin: 'auto',
    textAlign: 'center',
    boxShadow: 'none',
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  footerBasic: {
    position: 'fixed', 
    height: "100",
    zIndex: '0',
    width: '100%',
    padding: "40px",
    boxShadow: "0px 16px 18px -15px rgba(204,204,204,0.97) inset",
    bottom: '0px'
  },
  listInline: {
    padding: "0px",
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "18px",

  },
  social: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    fontSize: "25px",
  },
  socialList: {
    fontSize: "30px",
    padding: "10px",
    transition: 'all 0.5s ease-in-out',
    "&:hover": {
      boxShadow: '5px 5px 15px #ccc',
      borderRadius: '6px',
    }
  },
  companyLogo: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },

  listInlineList: {
    fontSize: "20px",
    paddingLeft: "10px",
    color: '#444'
  },
  copyright:{
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '15px',
    marginBottom: '0px'
  }
}))

export default function Signin(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })
  
  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = props.location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
  if (redirectToReferrer) { 
      return (<Redirect to={from}/>)
  }

  return (
    <div>
      <div style={{textAlign:"center"}}>
          <Typography className={classes.title} variant="h1">Login to Techhack</Typography>
          <Typography className={classes.title} variant="h5">Login to your Techhack account and Start Hiring</Typography>
      </div>
    <Card className={classes.card} >
      <Grid container>
            <Grid item lg={6} sm={12}>
                <img src={worker} alt="" />
            </Grid>
            <Grid item lg={6} sm={12} style={{display:"flex", justifyContent:"center", alignItems:'center'}}>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField id="outlined-basic" label="Email" variant="outlined" style={{width:"426px",height:"78px"}} /> <br></br>
                  <TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: "426px", height: "78px" }} /> <br></br>
                  <Checkbox color="primary" inputProps={{ 'aria-label': 'primary checkbox' }}/> Remember me <br></br>
                  <Button variant="contained" color="primary" style={{ width: "426px", height: "45px" }}>Login</Button>
                  <Typography className={classes.title}> <strong>Not a member yet?</strong>
                  <Button color="primary">SignUP</Button>  </Typography>
                </form>
          </Grid>
      </Grid>
      </Card>
      <div className={classes.footerBasic}>
        <footer>
        <ul className={classes.companyLogo}>
            <li> <img src={logo} style={{width:'50%'}}/> </li>
          </ul>
          <ul className={classes.social}>
            <li className={classes.socialList} style={{color:"#3C5A96"}}><AiFillFacebook /> </li>
            <li className={classes.socialList}><AiFillLinkedin style={{color:"#1178B3"}}/></li>
            <li className={classes.socialList}><AiFillYoutube style={{color:"#FC0D1B"}}/></li>
            <li className={classes.socialList}><AiOutlineTwitter style={{ color: "#2AA3EF" }} /></li>
            <li className={classes.socialList}><AiOutlineGlobal style={{color:"#DE1D64"}}/></li>
          </ul>
          <ul className={classes.listInline}>
            <li className={classes.listInlineList}>Home</li>
            <li className={classes.listInlineList}>Services</li>
            <li className={classes.listInlineList}>About</li>
            <li className={classes.listInlineList}>Terms</li>
            <li className={classes.listInlineList}>Privacy Policy</li>
          </ul>
          <p className={classes.copyright }>Tech Hack &copy; 2021</p>
        </footer>
      </div>
    </div>
    )
}
