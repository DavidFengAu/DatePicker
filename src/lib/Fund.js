import moment from 'moment'
import { calcFinancialYear, currentFinancialYear } from './Utils'

class Fund {
  fyStartDate
  fyEndDate
  formedDate
  currentFY

  constructor(fyStartDate, fyEndDate, formedDate) {
    this.fyStartDate = fyStartDate
    this.fyEndDate = fyEndDate
    this.formedDate = formedDate
    this.currentFY = currentFinancialYear
  }

  isEmpty() {
    return this.fyStartDate === undefined && this.fyEndDate === undefined && this.formedDate === undefined
  }

  startDate() {
    return this.fyStartDate || this.formedDate || moment(`${this.currentFY - 1}-07-01`)
  }

  endDate() {
    return this.fyEndDate || moment(`${this.currentFY}-06-30`)
  }

  financialYear() {
    return this.fyEndDate ? calcFinancialYear(this.fyEndDate) : calcFinancialYear(moment())
  }
}

export default Fund
