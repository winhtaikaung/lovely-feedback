import * as React from 'react'

import { RatingButtonUI, RatingButtonWrapper } from './index.style'

const RatingButtons: React.FC<{ isDisabled: boolean; count: number; onRatingClick?: (points: number) => void }> = ({
  count,
  onRatingClick,
  isDisabled,
}) => (
  <>
    <RatingButtonWrapper data-testid={`rating-button-wrapper`}>
      {[...Array.from(new Array(count).keys())].map((i) => (
        <RatingButtonUI
          isDisabled={isDisabled}
          onClick={() => onRatingClick?.(i + 1)}
          key={btoa(`${i + 1}${new Date().toDateString()}`)}
          data-testid={`rating-${i + 1}`}
        >
          {i + 1}
        </RatingButtonUI>
      ))}
    </RatingButtonWrapper>
  </>
)
export default RatingButtons
