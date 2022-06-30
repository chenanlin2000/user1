/*
*   主界面
* */
import * as React from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom"

import MainCart from "./MainCart";
import MainMe from "./MainMe";
import MainTGoods from "./MainTGoods";
import style from "./style.module.scss"

export default function Main() {

  return (
    <div className={style.page}>

      <Switch>
        <Route path="/" exact component={MainTGoods} />
        <Route path="/cart" component={MainCart} />
        <Route path="/me" component={MainMe} />
        <Redirect to="/" />
      </Switch>

      <div className={style.footer}>
        <NavLink className={style.navlink} to="/" exact activeClassName={style.active}>
          <i className="iconfont icon-goods" />
          <span>商品</span>
        </NavLink>
        <NavLink className={style.navlink} to="/cart" activeClassName={style.active}>
          <i className="iconfont icon-cart" />
          <span>购物车</span>
        </NavLink>
        <NavLink className={style.navlink} to="/me" activeClassName={style.active}>
          <i className="iconfont icon-people" />
          <span>个人</span>
        </NavLink>
      </div>
    </div>
  );
}