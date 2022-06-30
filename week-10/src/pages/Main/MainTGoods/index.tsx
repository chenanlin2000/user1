/*
 *   主界面的商品界面
 * */

import * as React from "react";
import * as api from '../../../services/api'
import { ISku } from '../../../types'
import Goods from '../../../components/Good'
import style from "./style.module.scss";
import { useState, useEffect } from "react";

export default function MainTGoods () {

const [rows , setrows] = useState<ISku[]>([])
useEffect(()=>{

  const  getData = async  () =>{
    //获取数据
    let result = await api.listSku()
    //更新状态
    if (result.stat === 'OK') {
      let iSkus = result.rows.filter(item => item.status !== 2);
      setrows(iSkus)
    }
  }
  getData();
},[])
  
    return (
      <div className={style.gpage}>
        <div className={style.glist}>
          {
            //渲染Good组件
           rows.map(item => (
              <Goods rows={item} key={item.id}/>
            ))}
        </div>
      </div>
    );

}
