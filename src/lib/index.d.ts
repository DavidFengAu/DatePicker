import * as moment from 'moment'
import * as React from 'react'

export declare class Fund {
  fyStartDate?: moment.Moment
  fyEndDate?: moment.Moment
  formedDate?: moment.Moment
}

declare function transformDate(value: string): moment.Moment | null

declare function calcFinancialYear(date: moment.Moment): number

declare const currentFinancialYear: number

export interface IDatePickerProps {
  onChange: (date: moment.Moment | undefined) => void,
  selected?: moment.Moment | undefined,
  tabIndex?: number | undefined,
  className?: string | undefined,
  minDate?: moment.Moment | undefined,
  maxDate?: moment.Moment | undefined,
  placeholderText?: string | undefined,
  allowSameDay?: boolean | undefined,
  showYearDropdown?: boolean | undefined
}

export interface IDatePickerStates {
  value: string
}

declare class DatePicker extends React.Component<IDatePickerProps, IDatePickerStates> {
  onChange(date: moment.Moment | null): void
  onBlur(event: React.FocusEvent<HTMLInputElement>): void
  onKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void
  onChangeRaw(event: React.FocusEvent<HTMLInputElement>): void
}

export default DatePicker

export interface IDateRangePickerProps {
  onChange: (dateRange: { startDate: moment.Moment | undefined, endDate: moment.Moment | undefined }) => void,
  fund?: Fund | undefined,
  selectsStart?: boolean | undefined,
  selectsEnd?: boolean | undefined,
  startDate?: moment.Moment | undefined,
  endDate?: moment.Moment | undefined,
  startDatePlaceholder?: string | undefined,
  endDatePlaceholder?: string | undefined,
  showClearAll?: boolean | undefined
}

declare class DateRangePicker extends React.Component<IDateRangePickerProps> {
  onChange(startDate?: moment.Moment | undefined, endDate?: moment.Moment | undefined): void
  onChangeStartDate(startDate: moment.Moment): void
  onChangeEndDate(endDate: moment.Moment): void
  onClearDate(): void
  setDatesByFY(startDate: moment.Moment, endDate: moment.Moment): void
}
