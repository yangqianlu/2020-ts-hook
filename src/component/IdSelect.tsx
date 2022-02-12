import { Select } from 'antd'
import React from 'react'
type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'option' | 'onChange'> {
  value: string | number | null | undefined
  option: { name: string; id: number }[]
  defaultOptionName?: string
  onChange: (value: number) => void
}
const IdSelect = (props: IdSelectProps) => {
  const { value, option, defaultOptionName, onChange, ...restProps } = props
  console.log(option, 'option')
  return (
    <Select
      value={option.length ? toNumber(value) : 0}
      onChange={(v) => onChange(toNumber(v))}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {option.map((o) => (
        <Select.Option key={o.id} value={o.id}>
          {o.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
export default IdSelect
