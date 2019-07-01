import moment from 'moment'

export function transformDate(value) {
  const momentGen = moment(value,
    ['DD/MM/YYYY', 'DD/MM/YY', 'DDMMYYYY', 'DDMMYY', 'YYYY/MM/DD', 'ddd MMM D YYYY', 'DD-MMM-YYYY', moment.ISO_8601])
  return momentGen.isValid() ? moment(momentGen.format('DD/MM/YYYY'), 'DD/MM/YYYY') : null
}

export function calcFinancialYear(date = moment()) {
  return date.month() < 6 ? date.year() : date.year() + 1
}

export const currentFinancialYear = calcFinancialYear()
