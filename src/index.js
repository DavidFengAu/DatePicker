import React from 'react'
import moment from 'moment'
import DatePicker from './lib'

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

render(<App />, document.getElementById("root"))
