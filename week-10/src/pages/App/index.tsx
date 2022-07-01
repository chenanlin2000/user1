import * as React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
//import { observer } from "mobx-react"


import Main from "../Main"
import Login from "../Login";
import Detail from "../Detail";
import "./style.css"
import store from "../../store"
import * as api from "../../services/api"
import { useEffect } from 'react';

//@observer

export default function App() {
 
  useEffect(() => {
    const getUser = async () => {
      let userInfo = await api.userInfo();
      if (userInfo.stat === "OK") {
        store.setUsername(userInfo.data)
        store.setNickname(userInfo.data.nickname)
        store.setAvater(userInfo.data.avatar)
        store.setRole(userInfo.data.role)
      }
    }
    getUser();
  })
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/cart" component={Main} />
        <Route path="/me" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/sku/:id" component={Detail} />
      </Switch>
    </BrowserRouter>
  )
}

