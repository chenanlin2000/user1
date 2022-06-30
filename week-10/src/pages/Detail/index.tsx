/*
 *   商品详情界面
 * */

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import * as React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { RouteComponentProps } from 'react-router'
import { Link, useHistory, useParams } from "react-router-dom"
import { ISku } from '../../types'
import * as api from '../../services/api'
import 'swiper/swiper-bundle.min.css';
import './style.module.scss';
import {show} from "../../components/Toast";
import style from "./style.module.scss"
import { useState, useEffect } from 'react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface Params {
  id: string
}
type Props = RouteComponentProps<Params>
export default function Detail(props: Props) {

  const [isku, setisku] = useState<ISku>()
  const history = useHistory()
  const params = useParams<Params>()

  useEffect(() => {
    const load = async () => {
      let skuInfo = await api.getSku(params.id);
      if (skuInfo.stat === "OK") {
        setisku(skuInfo.data)
      }
    }
    load();
  })
  //加入购物车
  const addCart = async () => {
    let userInfo = await api.userInfo();
    if (userInfo.stat !== "OK") {
      show("请先登录")
      history.push("/login")
    } else {
      api.addCart((params.id)).then(r => {
        if (r.stat === "OK") {
          show("已加入购物车")
        } else {
          show("加入购物车失败")
        }
      });
    }
  const addCart = async () => {
    let userInfo = await api.userInfo();
    if (userInfo.stat !== "OK") {
      show("请先登录")
      history.push("/login")
    } else {
      api.addCart((params.id)).then(r => {
        if (r.stat === "OK") {
          show("已加入购物车")
        } else {
          show("加入购物车失败")
        }
      });
    }
  }


  return (
    <div className={style.page}>
      <main className={style.mainpage}>
        <div className={style.iconback} onClick={history.goBack}><i className="iconfont icon-back" /></div>
        <div className={style.swip}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {isku?.gallery.map((item, i) => (
              <SwiperSlide key={i}><img src={item} alt="" className={style.swipimg} /></SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={style.info}>
          <div className={style.infoprice}>￥{isku?.price}
          </div>
          <div className={style.infonum}>库存：{isku?.stock}
          </div>
          <div className={style.infotext}>{isku?.title}
          </div>
        </div>
        <div className={style.detailimg}>
          {isku?.detail.map((item, i) => (
            <img src={item} alt="" key={i} />
          ))}
        </div>
      </main>

      <footer className={style.footcss}>
        <Link className={style.foothref} to="/cart">
          <i className="iconfont icon-cart" />
          <span>购物车</span>
        </Link>
        <button className={style.btnjoin} onClick={() => addCart()}>加入购物车</button>
      </footer>
    </div>
  )
}
