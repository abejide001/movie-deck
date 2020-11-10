import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Form } from "../components"
import { FirebaseContext } from "../context/firebase"
import { FooterContainer } from "../containers/footer"
import { HeaderContainer } from "../containers/header"
import * as ROUTES from "../constants/routes"


export default function Signup() {
    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()
    const [firstName, setFirstName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isInvalid = password === '' || emailAddress === '' || firstName === ''

    const handleSignUp = (e) => {
        e.preventDefault()

        // firebase auth
        firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
          .then((result) => {
              result.user.updateProfile({
                  displayName: firstName,
                  photoURL: Math.floor(Math.random() * 5) + 1
              })
          }).then(() => {
              history.push(ROUTES.BROWSE)
          }).catch((error) => {
              setFirstName('')
              setPassword('')
              setEmailAddress('')
              setError(error.message)
          })
    }
    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>
                        Sign up
            </Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}
                    <Form.Base onSubmit={handleSignUp} method="POST">
                        <Form.Input
                            placeholder="FirstName"
                            value={firstName}
                            onChange={({ target }) => setFirstName(target.value)}
                            autcomplete='off'
                        />
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
                            Sign up
                </Form.Submit>
                    </Form.Base>
                    <Form.Text>
                        Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
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