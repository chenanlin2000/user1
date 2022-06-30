/*
*   主界面的个人中心界面
* */

import * as React from "react"
import { useHistory} from "react-router-dom"

import style from './style.module.scss'
import store from '../../../store/index'
import * as api from "../../../services/api"
import { useEffect } from "react"

export default function MainMe() {

  const history = useHistory()
  const loginOut = async () => {
    let baseRes = await api.logout();
    if (baseRes.stat === "OK") {
      store.setUsername("")
      store.setNickname("")
      store.setAvater("")
      store.setRole(1)
      history.push("/login")
    }
  }

  useEffect(() => {
    const load = async () => {
      let userInfo = await api.userInfo();
      if (userInfo.stat !== "OK")
        history.push('/login')
    }
    load()
  })

    return(
      <div className = { style.content } >
        <img className={style.img_avatar} src={store.avater} alt=''/>
        <div className={style.username}>{store.nickname}</div>
        <button className={style.exit_box + " " + style.exit_text} onClick={() =>loginOut()}>退出登录</button>
      </div>
    );
}