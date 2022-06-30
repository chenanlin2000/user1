import {makeAutoObservable} from "mobx"

class Store {
  username: string = ""
  nickname: string = ""
  avater: string = ""
  role: number = 1

  setUsername(value: string) {
    this.username = value;
  }

  setNickname(value: string) {
    this.nickname = value;
  }

  setAvater(value: string) {
    this.avater = value;
  }

  setRole(value: number) {
    this.role = value;
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new Store()