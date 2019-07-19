import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import Fund from './Fund'
import DatePicker from './DatePicker'

class DateRangePicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    startDate: MomentPropTypes.momentObj,
    endDate: MomentPropTypes.momentObj,
    startDatePlaceholder: PropTypes.string,
    endDatePlaceholder: PropTypes.string,
    showClearAll: PropTypes.bool,
    fundFYStartDate: MomentPropTypes.momentObj,
    fundFYEndDate: MomentPropTypes.momentObj,
    fundFormedDate: MomentPropTypes.momentObj
  }

  onChange = (startDate, endDate) => {
    this.props.onChange({ startDate, endDate })
  }

  onChangeStartDate = (startDate) => {
    this.onChange(startDate, this.props.endDate)
  }

  onChangeEndDate = (endDate) => {
    this.onChange(this.props.startDate, endDate)
  }

  onClearDate = () => {
    this.onChange()
    this.datePickerStart.datePicker.handleCalendarClickOutside()
    this.datePickerEnd.datePicker.handleCalendarClickOutside()
  }

  setDatesByFY = (startDate, endDate) => {
    this.onChange(startDate, endDate)
    this.datePickerStart.datePicker.handleCalendarClickOutside()
    this.datePickerEnd.datePicker.handleCalendarClickOutside()
  }

  datePeriodOptions = () => {
    const fund = new Fund(this.props.fundFYStartDate, this.props.fundFYEndDate, this.props.fundFormedDate)
    const fy = fund.financialYear()
    return (
      <div className="datePeriodOptions">
        <div key="currentFY" onClick={() => this.setDatesByFY(fund.startDate(), fund.endDate())}>
          {fund.isEmpty() ? 'Current Financial Year' : 'Current Fund FY'}
        </div>
        <div key="nextFY" onClick={() => this.setDatesByFY(moment(`${fy}-07-01`), moment(`${fy + 1}-06-30`))}>
          {fund.isEmpty() ? 'Next Financial Year' : 'Next Fund FY'}
        </div>
        {this.props.showClearAll ? <div className="clearAll" onClick={this.onClearDate}>Clear Dates</div> : null}
      </div>
    )
  }

  render() {
    return [
      <DatePicker
        ref={(ref) => { this.datePickerStart = ref }}
        key="startDate"
        className="form-control start"
        selected={this.props.startDate}
        selectsStart
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        onChange={this.onChangeStartDate}
        maxDate={this.props.endDate}
        showYearDropdown
        placeholderText={this.props.startDatePlaceholder || 'Start Date'}
      >
        {this.datePeriodOptions()}
      </DatePicker>,
      <span key="separator" className="separator">-</span>,
      <DatePicker
        ref={(ref) => { this.datePickerEnd = ref }}
        key="endDate"
        className="form-control end"
        selected={this.props.endDate}
        selectsEnd
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        onChange={this.onChangeEndDate}
        minDate={this.props.startDate}
        allowSameDay
        showYearDropdown
        placeholderText={this.props.endDatePlaceholder || 'End Date'}
      >
        {this.datePeriodOptions()}
      </DatePicker>]
  }
}

export default DateRangePicker
