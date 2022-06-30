/*
*   主界面中的购物车界面
* */

import * as React from "react";
import { withRouter } from "react-router"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

import * as api from '../../../services/api'
import Cart from '../../../components/Cart'
import style from './style.module.scss';
import { ISku } from "../../../types";


function MainCart() {

  const [Ids, setIds] = useState<string[]>([])
  const [SkuList, setSkuList] = useState<ISku[]>([])
  const [CheckAll, setCheckAll] = useState(false)
  const history = useHistory()
  const unchose = "iconfont icon-round"
  const chose = `iconfont icon-roundcheckfill ${style.orange}`

  const getData = async () => {
    //获取数据
    let result = await api.listCart()
    if (result.stat === 'OK') {
      setSkuList(result.rows)
    }
  }

  //更新选中的状态.
  const updateItem = (id: string) => {
    if (Ids.includes(id)) {
      let new_Ids = Ids.filter(item => item !== id)
      setIds(new_Ids)
      //有不选的情况下全选按钮肯定为false
      setCheckAll(false)
    } else {
       setIds(Ids.concat([id]))
      //判断是否需要全选
      if (Ids.concat([id]).length === SkuList.length) {
        setCheckAll(true)
      }
    }
  }

  //全选按钮
  const handlecheckAll = () => {
    if (CheckAll === true) {
      //设置为全不选状态
      setIds([])
    } else if (CheckAll === false) {
      //设置为全选状态
      const Ids = SkuList.map(row => row.id)
      setIds(Ids as string[])
    }
    setCheckAll(!CheckAll)
  }

  //删除所选的东西
  const deletechose = () => {
    //无需从后台重新请求数据
    let newSkuList = SkuList.filter(ISku => !Ids.includes(ISku.id as string));
    setSkuList(newSkuList)
    //调用api删除选中购物车列表项
    api.removeCart(Ids);
  }

  useEffect(() => {
    const load = async () => {
      let userInfo = await api.userInfo();
      if (userInfo.stat !== "OK") {
        history.push('/login')
      } else {
        getData()
      }
    }
    load();
  }, [history])

  if (SkuList.length > 0) {
    return (
      <>
        <div className={style.shopping}>
          <div className={style.list}>
            {
              //渲染Cart组件
              SkuList.map(item => {
                return <Cart key={item.id} ISku={item} chose={Ids.includes(item.id as string)} updateItem={updateItem} />
              })
            }
          </div>
        </div>
        <div className={style.delete}>
          <i onClick={() => handlecheckAll()} className={CheckAll ? chose : unchose} />
          <span className={style.chose}>全选</span>
          <button onClick={() => deletechose()} className={Ids.length > 0 ? style.det : style.notdet} >删除</button>
        </div>
      </>
    )
  } else {
    return (
      <div className={style.content}>
        <i className="iconfont icon-shop" />
        <div>购物车是空的</div>
      </div>
    )
  }
}
export default withRouter(MainCart)
