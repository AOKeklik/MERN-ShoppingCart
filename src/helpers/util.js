import moment from 'moment'


export const formatCurrency = (num) => `$${Number(num.toFixed(1)).toLocaleString()} `

export const generateDate = (date, format) => moment(date).format(format)