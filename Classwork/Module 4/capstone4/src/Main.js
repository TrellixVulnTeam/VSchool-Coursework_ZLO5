import React, { Component } from 'react'

import { ThemeContextConsumer } from './ThemeContext'


// for date retrieval and display
var d = new Date()
var day = d.getDate()
var month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];


class Main extends Component {
    state = {
        daily: {}
    }

    // api GET for weather//
    componentDidMount(){
        fetch("https://api.openweathermap.org/data/2.5/weather?id=5780993&units=imperial&appid=5ae7b3c76c2e696e51c9f8585a68c324")
        // one call daily
        // fetch("https://api.openweathermap.org/data/2.5/onecall?lat=40.767&lon=-111.8904&exclude=minutely&appid=5ae7b3c76c2e696e51c9f8585a68c324")
        .then(response => response.json())
        .then(data => {
            this.setState({
                daily: data
            })
        })
    }

    render(){
        const temp = this.state.daily?.main?.temp;

        return(
            <div className='main'>
                <ThemeContextConsumer>
                    {context =>(
                        <div>
                            <h1 style={{padding: '15px'}}> {day} {n} </h1>
                            <h2> {this.state.daily.name} </h2>
                            <h1> {temp}{`º`} </h1>
                            {/* ?. checks  */}
                            <h3> {this.state.daily?.weather?.[0]?.description} </h3>
                            <h4>{`humidity`} {this.state.daily?.main?.humidity}{`%`} </h4> 
                        </div>
                    )}
                </ThemeContextConsumer>
            </div>
        )
    }
}

export default Main