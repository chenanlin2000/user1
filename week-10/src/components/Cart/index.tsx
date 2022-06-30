/*
*   购物车列表项
* */

import * as React from "react"
import style from "./style.module.scss"
import {ISku} from "../../types";

interface Props {
  ISku: ISku
  updateItem: (id:string) => void
  chose: boolean
}


export default function Cart (props:Props){

    const unchose = "iconfont icon-round"
    const chose = `iconfont icon-roundcheckfill ${style.orange}`

    return (
      <>
        <div className={style.item}>
          <div className={style.box}>
            <i onClick={() => props.updateItem(props.ISku.id as string)} className={ props.chose ? chose : unchose }/>
            <img
              src={props.ISku.cover}
              className={style.cover} 
              alt =''/>
            <div className={style.other}>
              <div className={style.title}>{props.ISku.title}</div>
              <div className={style.price}>￥{props.ISku.price}</div>
            </div>
          </div>
        </div>        
      </>
    );
  }
