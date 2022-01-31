import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import { faGrinAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Box from '../../component/Box/index.style'
import RatingButtons from '../../component/RatingButtons'
import Text from '../../component/Text/index.style'
import { COLORS, FONT_SIZES } from '../../constants'
import { setSessionStorage, STOGAGE_KEY } from '../../utils/session-storage'
import { RatingPointsResponse, useRatingFormSubmit } from './api'
import { AnimatedButtonWrapper, AnimatedTitle, FabIcon, RatingFormUI } from './index.style'

const RatingForm: React.FC<{ visible: boolean; onTellUsMoreClicked?: () => void; onClose?: () => void }> = ({
  visible,
  onTellUsMoreClicked,
  onClose,
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const create = useRatingFormSubmit({
    onLoading: () => {
      setIsSubmitting(true)
    },
    onSuccess: (data: any) => {
      const response = data as RatingPointsResponse
      setSessionStorage(STOGAGE_KEY.USER_ID, response?.userId)
      setSessionStorage(STOGAGE_KEY.USER_POINTS, response?.points)

      setIsSubmitted((prevVal) => !prevVal)
      setIsSubmitting(false)
    },
    onError: () => {
      setIsSubmitting(false)
    },
  })
  return (
    <RatingFormUI visible={visible}>
      <Box display="flex" justifyContent="flex-end" paddingRight="12px" paddingTop="12px">
        {!isSubmitted && (
          <FontAwesomeIcon
            icon={faTimes}
            color="grey"
            size="lg"
            cursor="pointer"
            onClick={() => {
              onClose?.()
            }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" height="90%" justifyContent="center">
        {!isSubmitted && (
          <>
            <Box display="flex" justifyContent="space-around">
              <AnimatedTitle fontSize={FONT_SIZES.medium} fontWeight="bold" marginBottom="0" marginTop="0">
                <FormattedMessage id="widget.rating.title" />
              </AnimatedTitle>
            </Box>
            <Box display="flex" justifyContent="space-around">
              <AnimatedButtonWrapper>
                <RatingButtons
                  count={6}
                  isDisabled={isSubmitting}
                  onRatingClick={(rating) => {
                    if (!isSubmitting) {
                      create.makeApiCall({ data: { points: rating } })
                    }
                  }}
                />
              </AnimatedButtonWrapper>
            </Box>
            <Box display="flex" justifyContent="space-evenly">
              <Text marginTop="2px">
                <FormattedMessage id="widget.rating.not_satisfied" />
              </Text>
              <Text marginTop="2px">
                <FormattedMessage id="widget.rating.very_satisfied" />
              </Text>
            </Box>
          </>
        )}
        {isSubmitted && (
          <>
            <Box display="flex" justifyContent="space-evenly" alignItems="center">
              <FabIcon>
                <FontAwesomeIcon icon={faGrinAlt} color="yellow" size="lg" />
              </FabIcon>
              <Text
                fontSize={FONT_SIZES.medium}
                fontWeight="bold"
                color={COLORS.BLACK}
                cursor="pointer"
                data-testid="thank-you"
                onClick={() => {
                  setIsSubmitted(false)
                  onTellUsMoreClicked?.()
                }}
              >
                <FormattedMessage id="widget.rating.thankyou" /> <FormattedMessage id="widget.rating.tell_us_more" />
              </Text>
            </Box>
          </>
        )}
      </Box>
    </RatingFormUI>
  )
}

export default RatingForm
