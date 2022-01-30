import * as React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { Property } from 'csstype'
import Text from '../../component/Text/index.style'
import { COLORS, FONT_SIZES } from '../../constants'
import { FeedFormUI, Form, FormHeader, SubmitButton } from './index.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '../../component/Box/index.style'

import ShortAnswer from './components/ShortAnswer'
import Email from './components/Email'

const FeedBackForm: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const [result, setResult] = React.useState('')

  return (
    <FeedFormUI>
      <FormHeader display="flex" justifyContent="flex-end" alignItems="center" padding="0 10px">
        <Text flexGrow={'1' as Property.FlexGrow} color={COLORS.WHITE} fontSize={FONT_SIZES.medium} fontWeight="bold">
          Tell us More
        </Text>
        <FontAwesomeIcon icon={faTimes} color={COLORS.WHITE} size="lg" cursor="pointer" />
      </FormHeader>
      <Box padding="0 0 0 1px">
        <Form autoComplete="false" id="responseForm" onSubmit={handleSubmit((data) => setResult(JSON.stringify(data)))}>
          <ShortAnswer
            fieldName="q1"
            register={register}
            question="What did you like the most"
            placeholder="Let us know how we can improve"
          />
          <ShortAnswer
            fieldName="q2"
            register={register}
            question="What did you like the least"
            placeholder="Let us know how we can improve"
          />
          <Email
            fieldName="email"
            register={register}
            question="Your Email"
            placeholder="Let us know how we can improve"
          />
          <p>{result}</p>
        </Form>
        <Box display="flex" justifyContent="flex-end" paddingRight="30px">
          <SubmitButton type="submit" form="responseForm" />
        </Box>
      </Box>
    </FeedFormUI>
  )
}
export default FeedBackForm
