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
import { useFeedBackForm, useFeedBackFormSubmit } from './api/useFeedBackForm'
import { QuestionModule } from '../../types/question'
import { QUESTION_TYPE } from '../../enums/questions'
import { isEmpty } from '../../utils'
import { getSessionStorage, STOGAGE_KEY } from '../../utils/session-storage'

const FeedBackForm: React.FC<{ visible: boolean; onFormSubmitted?: () => void; onClose?: () => void }> = ({
  visible,
  onFormSubmitted,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm()

  const formApi = useFeedBackForm()
  const formSubmitApi = useFeedBackFormSubmit({
    onSuccess: () => {
      onFormSubmitted?.()
    },
  })

  React.useEffect(() => {
    reset()
  }, [visible, reset])

  const questions = React.useMemo(() => {
    if (formApi.state.status === 'success') {
      return formApi.state.data as QuestionModule.Question[]
    }
    return []
  }, [formApi.state.data, formApi.state.status])

  return (
    <FeedFormUI visible={visible}>
      <FormHeader display="flex" justifyContent="flex-end" alignItems="center" padding="0 10px">
        <Text flexGrow={'1' as Property.FlexGrow} color={COLORS.WHITE} fontSize={FONT_SIZES.medium} fontWeight="bold">
          Tell us More
        </Text>
        <FontAwesomeIcon
          icon={faTimes}
          color={COLORS.WHITE}
          size="lg"
          cursor="pointer"
          onClick={() => {
            onClose?.()
          }}
        />
      </FormHeader>
      <Box padding="0 0 0 1px">
        <Form
          autoComplete="false"
          id="responseForm"
          onSubmit={handleSubmit((data) => {
            if (isEmpty(errors) && isDirty) {
              formSubmitApi.makeApiCall({
                data: {
                  responseData: questions.map((qItem) => ({ ...qItem, answer: data[qItem.fieldName] })),
                  userId: getSessionStorage(STOGAGE_KEY.USER_ID),
                },
              })
            }
          })}
        >
          {questions.map((qItem) => (
            <React.Fragment key={qItem.id}>
              {qItem.type === QUESTION_TYPE.SHORT_ANSWER && (
                <ShortAnswer
                  required={qItem.required}
                  fieldName={qItem.fieldName.trim()}
                  register={register}
                  question={qItem.question}
                  placeholder={qItem.placeholder}
                />
              )}
              {qItem.type === QUESTION_TYPE.EMAIL && (
                <Email
                  required={qItem.required}
                  fieldName={qItem.fieldName}
                  register={register}
                  question={qItem.question}
                  placeholder={qItem.placeholder}
                />
              )}
            </React.Fragment>
          ))}
        </Form>
        <Box display="flex" justifyContent="flex-end" paddingRight="30px">
          <SubmitButton disabled={isSubmitting || !isEmpty(errors) || !isDirty} type="submit" form="responseForm" />
        </Box>
      </Box>
    </FeedFormUI>
  )
}
export default FeedBackForm
