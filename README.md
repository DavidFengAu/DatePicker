# @bgl/date-picker

React Date Picker initially built for use in BGL SF360.

## Installation and usage

```
yarn add @bgl/date-picker
```

Then use it in your app:

```js
import React from 'react'
import moment from 'moment'
import DatePicker from '@bigdata/date-picker'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(date) {
    this.setState({
      startDate: date
    })
  }
    
  render() {
    return (
      <DatePicker
        onChange={this.handleChange}
        selected={this.state.Date}
        className="form-control"
      />
    )
  }
}
```

Use Date Range Picker:
```js
import { DateRangePicker } from '@bigdata/date-picker'
```

## Props

Common props you may want to specify include:

- `onChange` - subscribe to date change
- `selected`  - control the current value
- `tabIndex` - specify the tab index
- `className` - apply a className to the component
- `minDate` - Min Date allowed to select
- `maxDate` - Max Date allowed to select
- `placeholderText` - string
- `allowSameDay` - boolean
- `showYearDropdown` - boolean

Extra props for date range picker:

- `selectsStart` - boolean
- `selectsEnd` - boolean
- `startDate` - moment
- `endDate` - moment

## Development
```js
yarn install
yarn run build
```

## Publish
```js
npm publish --registry http://repo.bglcorp.com.au:8081/content/repositories/bgl.npm/
```
