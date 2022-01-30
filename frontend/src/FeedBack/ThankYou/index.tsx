import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Box from '../../component/Box/index.style'
import { ThankYouUI } from './index.style'
import { COLORS, FONT_SIZES } from '../../constants'
import Text from '../../component/Text/index.style'

const ThankYou: React.FC<{ visible: boolean; onCardClicked?: () => void; onClose?: () => void }> = ({
  visible,
  onCardClicked,
}) => {
  return (
    <ThankYouUI visible={visible}>
      <Box display="flex" flexDirection="column" height="90%" justifyContent="center">
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <Text
            fontSize={FONT_SIZES.medium}
            fontWeight="bold"
            color={COLORS.BLACK}
            cursor="pointer"
            onClick={() => {
              onCardClicked?.()
            }}
          >
            <FormattedMessage id="widget.rating.thankyou" />
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <Text
            fontSize={FONT_SIZES.medium}
            color={COLORS.BLACK}
            cursor="pointer"
            onClick={() => {
              onCardClicked?.()
            }}
          >
            <FormattedMessage id="widget.thankyou.your_feed_back_is_valuable_for_us" />
          </Text>
        </Box>
      </Box>
    </ThankYouUI>
  )
}

export default ThankYou
