import React from 'react'
import { Select } from 'components'
//import s from './StatusChange.sass'


const StatusChange = ({data, value, onChange}) => (
  <Select defaultValue={value} data={data} onChange={onChange} />
);

export default StatusChange;

