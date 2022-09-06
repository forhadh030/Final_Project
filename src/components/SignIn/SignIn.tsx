import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Input } from '../SharedComponents/Input';
import { Container, Button, makeStyles, Typography, Snackbar } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Navbar } from '../Navbar';
import '../../style.css';

const Alert = (props:AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles({
    googleButton:{
        backgroundColor: 'rgb(66,133,244)',
        marginTop: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, airal, sans-seriff',
        cursor: 'pointer',
        marginBottom: '24px'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block',
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-seriff',
        textAlign: 'center',
        fontSize: '2em',
        marginTop: '25px',
    },
    containerStyle: {
        marginTop: '2em',
        border: '1px solid lightgray',
    },
    SnackBar: {
        color: 'white',
        backgroundColor: '$4caf50'
    },
    margin: {
        margin: '20px',
    },
    marginTop: {
        marginTop: '10%'
    },
    width90: {
        width: '90%',
    },
});

interface SignInProps {
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps["match"];
}

export const SignIn = withRouter( (props:SignInProps ) => {
    require("../Weather/index.css")
    
    const auth = useAuth();
    const classes = useStyles();
    const { history } = props;
    const [ open, setOpen ] = useState(false);

    const handleSnackOpen = () => {
        setOpen(true)
    };

    // if you click outside of the sign in, courser will go away
    const handleSnackClose = (event?: React.SyntheticEvent, reason?:string) => {
        if(reason == 'clickaway'){
            return;
        }

        setOpen(false);
        history.push('/')
    };

    const sign_in = async () => {
        const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
        if(response.user){
            handleSnackOpen();
        }
    };

    const sign_out = async () => {
        await auth.signOut();
    }

  return (
    <div>
        <Navbar />
        <div>
        <Container maxWidth = 'sm' className={`${classes.containerStyle} ${classes.marginTop}`}>
            <Typography className={classes.typographyStyle}>Sign In Below</Typography>
            <form>
                <div className={classes.margin}>
                    <label htmlFor="email">Email<br/></label>
                    <input className={classes.width90} name="email" placeholder="Place Email Here" required/>
                </div>
                <div className={classes.margin}>
                    <label htmlFor="password">Password<br/></label>
                    <input className={classes.width90} name="password" placeholder="Place Password Here" required/>
                </div>
                <Button className={classes.margin} type="submit" variant="contained" color="primary">Submit</Button>
            </form>

            <AuthCheck fallback={
                <Button className={classes.googleButton} onClick={sign_in}>Sign In with Google</Button>
            }>
                
            </AuthCheck>
            <Snackbar message={'Success'} open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success">
                    Successful Sign In - Redirect in 6 seconds
                </Alert>
            </Snackbar>
        </Container>
        </div>
    </div>
  )
});