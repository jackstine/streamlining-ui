import React from 'react'
import CardDisplay from './card/CardDisplay'
import ScrollingHOC from './ScrollingHOC'

const StreamlinedCardDisplay = ScrollingHOC(CardDisplay)
export default StreamlinedCardDisplay;
