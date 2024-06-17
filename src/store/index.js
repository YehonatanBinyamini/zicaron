import { configureStore } from '@reduxjs/toolkit'
import { monthsReducer } from './months'
import { niftarimReducer } from './niftarim'
import { jewishCalendarReducer } from './jewishCalendar'
import { authReducer } from './auth'

export const store = configureStore({
    reducer: { months: monthsReducer, niftarim: niftarimReducer, jewishCalendar: jewishCalendarReducer, auth: authReducer }
})