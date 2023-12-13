import { configureStore } from '@reduxjs/toolkit'
import { monthsReducer } from './months'
import { niftarimReducer } from './niftarim'
import { jewishCalendarReducer } from './jewishCalendar'

export const store = configureStore({
    reducer: { months: monthsReducer, niftarim: niftarimReducer, jewishCalendar: jewishCalendarReducer }
})