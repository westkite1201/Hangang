import React from 'react'
import Quote from '../pages/quote'

export default {
    component: Quote,
    title: 'Quote'
}

export const quote = () => <Quote />

quote.story = {
    name: 'Default'
}