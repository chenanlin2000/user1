// /*
// *   登录界面
// * */

import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom"
import { useHistory} from "react-router-dom"
import style from "./style.module.scss"
import * as api from "../../services/api"
import {show} from "../../components/Toast";
import store from "../../store"
import { useState } from "react";

interface State {
  username: string
  password: string
}
type Props = RouteComponentProps<null, {}, State>
export default function Login(props: Props) {

  const [username, setusername] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const history = useHistory()

  const login = async () => {
    let loginRes = await api.login(username, password);
    //不成功展示Toast提示失败信息
    try {
      if (loginRes.stat !== "OK") {
        if (loginRes.message != null) {
          show(loginRes.message)
        }
      } else {
        //成功就将数据写入全局状态store
        const { user } = loginRes
        store.setUsername(user.username)
        store.setAvater(user.avatar)
        store.setRole(user.role)
        store.setNickname(user.nickname)
        //跳转至个人中心页面
        history.push("/me")
      }
    } catch (error) { }
  }

  return (
    <div className={style.login}>
      <Link className={style.link} to="/">
        <img src="https://gw.alicdn.com/tfs/TB1puqzr6MZ7e4jSZFOXXX7epXa-160-160.png" alt=' '/>
      </Link>
      <input type="text" className={style.username} placeholder="用户名" autoComplete="off"
        onChange={event => setusername(event.target.value)} value={username} />
      <input type="password" className={style.password} placeholder="密 码"
        onChange={event => setpassword(event.target.value)} value={password} />
      <button onClick={() => login()} className={style.btn} disabled={username === "" || password === ""}>登 录</button>
    </div>
  );
}