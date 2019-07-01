import moment from 'moment'
import { calcFinancialYear } from './Utils'

class Fund {
  fyStartDate
  fyEndDate
  formedDate

  constructor(fyStartDate, fyEndDate, formedDate) {
    this.fyStartDate = fyStartDate
    this.fyEndDate = fyEndDate
    this.formedDate = formedDate
  }

  startDate() {
    return this.fyStartDate || this.formedDate || moment('1970-01-01')
  }

  endDate() {
    return this.fyEndDate || moment()
  }

  financialYear() {
    return this.fyEndDate ? calcFinancialYear(this.fyEndDate) : calcFinancialYear(moment())
  }
}

export default Fund
