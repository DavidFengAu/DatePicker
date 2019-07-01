import moment from 'moment'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDatePicker from 'react-datepicker'
import { E_KEY, ENTER_KEY, F_KEY, H_KEY, HOME_BACKWARD_KEY, HOME_FORWARD_KEY, K_KEY, L_KEY, M_KEY, MINUS_KEY,
  MINUS_KEY_2, MINUS_KEY_3, PAGE_DOWN_KEY, PAGE_UP_KEY, PLUS_KEY, PLUS_KEY_2, PLUS_KEY_3, R_KEY, T_KEY, W_KEY,
  Y_KEY } from './KeysCode'
import { currentFinancialYear, transformDate } from './Utils'

class DatePicker extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    tabIndex: PropTypes.number,
    className: PropTypes.string,
    minDate: PropTypes.instanceOf(moment),
    maxDate: PropTypes.instanceOf(moment),
    placeholderText: PropTypes.string,
    allowSameDay: PropTypes.bool,
    showYearDropdown: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.selected ? props.selected.format('DD/MM/YYYY') : ''
    }
  }

  componentDidUpdate(prevProps) {
    const preDate = prevProps.selected
    const thisDate = this.props.selected
    if ((!moment.isMoment(preDate && thisDate) && moment.isMoment(thisDate || preDate))
      || (preDate && thisDate && !preDate.isSame(thisDate, 'day'))) {
      this.setState({
        value: thisDate ? thisDate.format('DD/MM/YYYY') : ''
      })
    }
  }

  isInRange = (date) => {
    return date === null || date === undefined || (
      (!this.props.minDate || date.isSameOrAfter(this.props.minDate))
      && (!this.props.maxDate || date.isSameOrBefore(this.props.maxDate))
    )
  }

  onChange = (date) => {
    const checkedDate = this.isInRange(date) ? date : this.props.selected
    if (checkedDate === null || this.props.selected === null
      || (checkedDate && !checkedDate.isSame(this.props.selected))) {
      this.props.onChange(date)
    }
    this.setState({ value: checkedDate ? checkedDate.format('DD/MM/YYYY') : '' })
  }

  onBlur = (event) => {
    if (event && event.target) {
      this.onChange(transformDate(event.target.value))
    }
  }

  onKeyDown = (event) => {
    switch (event.keyCode) {
      case ENTER_KEY:
        // @ts-ignore
        this.onBlur(event)
        break
      case T_KEY:
        this.onChange(moment())
        break
      case PLUS_KEY:
      case PLUS_KEY_2:
      case PLUS_KEY_3:
        this.onChange(moment(this.props.selected).add(1, 'days'))
        break
      case MINUS_KEY:
      case MINUS_KEY_2:
      case MINUS_KEY_3:
        this.onChange(moment(this.props.selected).subtract(1, 'days'))
        break
      case PAGE_DOWN_KEY:
        this.onChange(moment(this.props.selected).add(1, 'months'))
        break
      case PAGE_UP_KEY:
        this.onChange(moment(this.props.selected).subtract(1, 'months'))
        break
      case HOME_FORWARD_KEY:
        this.onChange(moment(this.props.selected).add(1, 'years'))
        break
      case HOME_BACKWARD_KEY:
        this.onChange(moment(this.props.selected).subtract(1, 'years'))
        break
      case F_KEY:
        this.onChange(moment(`${currentFinancialYear - 1}-07-01`))
        break
      case L_KEY:
      case E_KEY:
        this.onChange(moment(`${currentFinancialYear}-06-30`))
        break
      case W_KEY:
        this.onChange(moment().startOf('week'))
        break
      case K_KEY:
        this.onChange(moment().endOf('week'))
        break
      case M_KEY:
        this.onChange(moment().startOf('month'))
        break
      case H_KEY:
        this.onChange(moment().endOf('month'))
        break
      case Y_KEY:
        this.onChange(moment().startOf('year'))
        break
      case R_KEY:
        this.onChange(moment().endOf('year'))
        break
      default:
    }
  }

  onChangeRaw = (event) => {
    this.setState({
      value: event.target.value.replace(/[^0-9/]+/g, '')
    })
  }

  render() {
    return (
      <ReactDatePicker
        {...this.props}
        ref={(ref) => { this.datePicker = ref }}
        dateFormat="DD/MM/YYYY"
        value={this.state.value}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onChangeRaw={this.onChangeRaw}
      />
    )
  }
}

export default DatePicker
