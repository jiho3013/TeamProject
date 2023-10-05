import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async";

export function SignUp(){
    const titleStyle = {
        position: 'fixed',
        top: '10vh',
        left: '7vw',
        fontSize: '2.5vh',
        fontWeight: 'bold'
    };
    const formStyle = {
        position: 'fixed',
        top: '20vh',
        left: '50%',
        transform: 'translate(-50%)',
        fontSize: '2vh'
    };
    const signUpStyle = {
        width: '80vw',
        height: 'auto',
        margin: 0,
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '2vh 4vw 2vh 4vw',
        fontSize: '2vh',
        backgroundColor: 'rgb(128, 128, 128, 0.5)'
    };
    const signUpTextStyle = {
        margin: '1vh 0'
    };
    const signupSubmitStyle = {
        width: '25vw',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '1vh 2vw 1vh 2vw',
        fontSize: '2vh',
        backgroundColor: 'black',
        color: 'white'
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Sign Up</title>
                </Helmet>
            </HelmetProvider>
            <div style={titleStyle}>회원가입</div>
            <div style={formStyle}>
                <form>
                    <label>
                        <p style={signUpTextStyle}>name</p>
                        <input type="text" id="signupName" style={signUpStyle} name="name" value="" />
                    </label>
                    <label>
                        <p style={signUpTextStyle}>email</p>
                        <input type="email" id="signupEmail" style={signUpStyle} name="email" value="" />
                    </label>
                    <label>
                        <p style={signUpTextStyle}>password</p>
                        <input type="password" id="signupPassword" style={signUpStyle} name="password" value="" />
                    </label>
                    <label>
                        <p style={signUpTextStyle}>password check</p>
                        <input type="password" id="signupPasswordCheck" style={signUpStyle} name="passwordcheck" value="" />
                    </label>
                    <label>
                        <p style={signUpTextStyle}>nickname</p>
                        <input type="text" id="signupNickName" style={signUpStyle} name="nickname" value="" />
                    </label>
                    <br/><br/>
                    <input type="submit" style={signupSubmitStyle} value="join" />
                </form>
            </div>
        </>
    );
}