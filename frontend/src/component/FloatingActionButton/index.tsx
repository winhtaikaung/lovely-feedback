import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import { faGrinAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { COLORS, FONT_SIZES } from '../../constants'
import Text from '../Text/index.style'
import { FabUI } from './index.style'

const FloatingActionButton: React.FC<{ onHelpClick?: () => void }> = ({ onHelpClick }) => {
  const [toggleComponent, setToggleComponent] = React.useState(
    <FontAwesomeIcon icon={faGrinAlt} color="yellow" size="lg" />,
  )

  return (
    <FabUI
      onMouseEnter={() =>
        setToggleComponent(() => (
          <Text
            color={COLORS.WHITE}
            fontSize={FONT_SIZES.medium}
            fontWeight="bold"
            whiteSpace="nowrap"
            onClick={() => onHelpClick?.()}
            data-testid="help-us-improved"
          >
            <FormattedMessage id="widget.help_us_improved" />
          </Text>
        ))
      }
      data-testid="fab-help-improved"
      onMouseLeave={() => setToggleComponent(() => <FontAwesomeIcon icon={faGrinAlt} color="yellow" size="1x" />)}
    >
      {toggleComponent}
    </FabUI>
  )
}

export default FloatingActionButton
