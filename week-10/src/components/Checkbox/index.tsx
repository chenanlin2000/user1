import * as React from 'react'
import { useState} from 'react';
import style from './style.module.scss'

interface Props {
  value: boolean
  className?: string
  onChange: (value: boolean) => void
}

export default function Checkbox(props: Props) {
  const [name, setname] = useState('iconfont ' + style.checkbox)
 
    if (props.value === true)
      setname('iconfont ' + style.checkbox + ' icon-roundcheckfill ' + style.checked)
    else setname('iconfont ' + style.checkbox + ' icon-round')
    if (props.className) setname('iconfont ' + style.checkbox + ' ' + props.className)

  return (
    <i
      className={name}
      onClick={() => props.onChange(props.value)}
    />
  )
}