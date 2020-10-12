import React from "react"
import { FaqsContainer } from "./containers/faqs"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { FooterContainer } from "./containers/footer"
import { JumbotronContainer } from "./containers/jumbotron"
import * as ROUTES from './constants/routes'

export default function App() {
  return (
    <>
      <JumbotronContainer/>
      <FaqsContainer/>
      <FooterContainer/>
    </>
  )
}