//import * as request from './request'
import axios from 'axios'
import { ISku, IUser } from '../types'

interface BaseRes {
  stat: string
  message?: string
}

interface LoginRes extends BaseRes {
  token: string
  user: IUser
}

interface SkuList extends BaseRes {
  rows: ISku[]
}

interface SkuInfo extends BaseRes {
  data: ISku
}

interface UserInfo extends BaseRes {
  data: IUser
}

/**
 * 商品列表
 * @returns 
 */
export async function listSku() {
  let result = await axios.post<SkuList>('/api/sku/list')
  return result.data
}

/**
 * 获取商品详情
 * @param id 商品ID
 * @returns 
 */
export async function getSku(id: string) {
  let result = await axios.post<SkuInfo>('/api/sku/info', { id })
  return result.data
}

/**
 * 购物车列表
 * @returns 
 */
export async function listCart() {
  let result = await axios.post<SkuList>('/api/cart/list')
  return result.data
}

/**
 * 添加商品到购物车
 * @param skuId 商品ID
 * @returns 
 */
export async function addCart(skuId: string) {
  let result = await axios.post<BaseRes>('/api/cart/add', { skuId })
  return result.data
}

/**
 * 删除购物车中的商品
 * @param ids 商品ID数组
 * @returns 
 */
export async function removeCart(ids: string[]) {
  let result = await axios.post<BaseRes>('/api/cart/remove', { ids })
  return result.data
}

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @returns 
 */
export async function login(username: string, password: string) {
  let result = await axios.post<LoginRes>('/api/user/login', { username, password })
  return result.data
}

/**
 * 注销登录
 * @returns 
 */
export async function logout() {
  let result = await axios.post<BaseRes>('/api/user/logout')
  return result.data
}

/**
 * 获取当前登录用户信息
 * @returns 
 */
export async function userInfo() {
  let result = await axios.post<UserInfo>('/api/user/info')
  return result.data
}
