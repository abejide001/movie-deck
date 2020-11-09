import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Form } from "../components"
import { FirebaseContext } from "../context/firebase"
import { FooterContainer } from "../containers/footer"
import { HeaderContainer } from "../containers/header"
import * as ROUTES from "../constants/routes"

export default function Signin() {
    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isInvalid = password === '' || emailAddress === ''
    const handleSignin = (e) => {
        e.preventDefault()

        // firebase auth
        firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                history.push(ROUTES.BROWSE)
            }).catch((error) => {
                setEmailAddress('')
                setPassword('')
                setError(error.message)
            })
    }
    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>
                        Sign in
                </Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}
                    <Form.Base onSubmit={handleSignin} method="POST">
                        <Form.Input
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                            autcomplete='off'
                        />
                        <Form.Input
                            placeholder="Password"
                            autcomplete="off"
                            value={password}
                            type="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Form.Submit disabled={isInvalid} type="submit">
                            Sign In
                    </Form.Submit>
                    </Form.Base>
                    <Form.Text>
                        New to Netflix <Form.Link to="/signup">Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA to ensure you are not a bot
                    </Form.TextSmall>
                </Form>
            </HeaderContainer>
            <FooterContainer />
        </>
    )
}