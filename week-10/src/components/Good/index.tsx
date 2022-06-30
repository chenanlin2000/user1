/*
*   商品组件
* */

import * as React from "react"
import { Link } from 'react-router-dom'
import { ISku } from '../../types'

import style from "./style.module.scss"

interface Props {
  rows: ISku
}
export default function Good (props:Props){

    return (
      <Link to={`/sku/${props.rows.id}`} className={style.gItem} key={props.rows.id}>
        <img
          src={props.rows.cover}
          alt=""
          className={style.gimg}
        />
        <div className={style.info}>
          <div className={style.description}>
            {props.rows.title}
          </div>
          <div className={style.price}>￥{props.rows.price}</div>
        </div>
      </Link>

    );
}
