import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { TextAreaUI } from '../../../../component/Input/TextArea/index.style'
import Text from '../../../../component/Text/index.style'
import { FONT_SIZES } from '../../../../constants'

const ShortAnswer: React.FC<{
  fieldName: string
  question: string
  placeholder: string
  register: UseFormRegister<Record<string, any>>
  required?: boolean
}> = ({ fieldName, question, placeholder, register, required }) => {
  const [isReadonly, setIsReadonly] = React.useState(true)
  return (
    <>
      <Text fontSize={FONT_SIZES.medium} fontWeight="bold" textAlign="left" margin="10px 0">
        {question}
      </Text>
      <TextAreaUI
        {...register(fieldName, { required })}
        rows={5}
        placeholder={placeholder || ''}
        readOnly={isReadonly}
        onFocus={() => setIsReadonly(false)}
        onBlur={() => setIsReadonly(true)}
      />
    </>
  )
}

export default ShortAnswer
