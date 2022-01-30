import * as React from 'react'
import FloatingActionButton from '../component/FloatingActionButton'
import FeedBackForm from './FeedBackForm'
import RatingForm from './RatingForm'

const FeedBack: React.FC = () => (
  <>
    <FloatingActionButton />
    <RatingForm />
    <FeedBackForm />
  </>
)

export default FeedBack
