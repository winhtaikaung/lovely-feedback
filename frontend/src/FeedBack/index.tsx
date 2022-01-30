import * as React from 'react'
import FloatingActionButton from '../component/FloatingActionButton'
import FeedBackForm from './FeedBackForm'
import useFormFlow, { FormUIType } from './hook/useFormFlow'
import RatingForm from './RatingForm'
import ThankYou from './ThankYou'

const FeedBack: React.FC = () => {
  const { state, dispatch } = useFormFlow()

  return (
    <>
      {state.formUiType === FormUIType.SMILY_BUTTON && (
        <FloatingActionButton
          onHelpClick={() => {
            dispatch({ formUiType: FormUIType.RATING_FORM })
          }}
        />
      )}

      <RatingForm
        visible={state.formUiType === FormUIType.RATING_FORM}
        onTellUsMoreClicked={() => {
          dispatch({ formUiType: FormUIType.TELL_US_MORE_FORM })
        }}
        onClose={() => {
          dispatch({ formUiType: FormUIType.SMILY_BUTTON })
        }}
      />

      <FeedBackForm
        visible={state.formUiType === FormUIType.TELL_US_MORE_FORM}
        onFormSubmitted={() => {
          dispatch({ formUiType: FormUIType.THANK_YOU_FORM })
        }}
        onClose={() => {
          dispatch({ formUiType: FormUIType.SMILY_BUTTON })
        }}
      />
      <ThankYou
        visible={state.formUiType === FormUIType.THANK_YOU_FORM}
        onCardClicked={() => {
          dispatch({ formUiType: FormUIType.SMILY_BUTTON })
        }}
      />
    </>
  )
}

export default FeedBack
