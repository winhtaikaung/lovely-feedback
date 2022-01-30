import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

import Box from '../../component/Box/index.style'
import { AnimatedTitle, AnimatedButtonWrapper, FabIcon, RatingFormUI } from './index.style'
import { COLORS, FONT_SIZES } from '../../constants'
import Text from '../../component/Text/index.style'
import RatingButtons from '../../component/RatingButtons'

const RatingForm: React.FC<{ onTellUsMoreClicked?: () => void; onClose?: () => void }> = ({
  onTellUsMoreClicked,
  onClose,
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  return (
    <RatingFormUI>
      <Box display="flex" justifyContent="flex-end" paddingRight="12px" paddingTop="12px" onClick={() => onClose?.()}>
        <FontAwesomeIcon icon={faTimes} color="grey" size="lg" cursor="pointer" />
      </Box>
      <Box display="flex" flexDirection="column" height="70%" justifyContent="center">
        {!isSubmitted && (
          <>
            <Box display="flex" justifyContent="space-around">
              <AnimatedTitle fontSize={FONT_SIZES.medium} fontWeight="bold" marginBottom="0">
                Rate your experience
              </AnimatedTitle>
            </Box>
            <Box display="flex" justifyContent="space-around">
              <AnimatedButtonWrapper>
                <RatingButtons count={6} onRatingClick={(rating) => setIsSubmitted((prevVal) => !prevVal)} />
              </AnimatedButtonWrapper>
            </Box>
            <Box display="flex" justifyContent="space-evenly">
              <Text marginTop="2px">NOT SATISFIED</Text> <Text marginTop="2px">VERY SATISFIED</Text>
            </Box>
          </>
        )}
        {isSubmitted && (
          <>
            <Box display="flex" justifyContent="space-evenly" alignItems="center">
              <FabIcon>
                <FontAwesomeIcon icon={faGrinAlt} color="yellow" size="1x" />
              </FabIcon>
              <Text
                fontSize={FONT_SIZES.medium}
                fontWeight="bold"
                color={COLORS.BLACK}
                cursor="pointer"
                onClick={() => onTellUsMoreClicked?.()}
              >
                Thank you! Tell us more
              </Text>
            </Box>
          </>
        )}
      </Box>
    </RatingFormUI>
  )
}

export default RatingForm
