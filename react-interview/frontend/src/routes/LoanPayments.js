import React from 'react';
import superagent from 'superagent';
import csv from 'csvtojson';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import humanReadable from '../util';
class LoanPayments extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      columns: null
    }
  }
  componentWillMount() {
    superagent
      .get('http://localhost:12059/react-interview/getLoanData')
      .then(res => {
        // It would be better to handle this on the server side
        // but since this is a front end test, I will handle it here
        const humanizeResponse = humanReadable(res.text);
        csv()
          .fromString(humanizeResponse)
          .then(result => {
            this.setState({data: result});
            this.setState({columns: Object.keys(result[0]).map((key)=>{
              const humanize = humanReadable(key);
              return {
                Header: humanize,
                accessor: key
              }
            })});
          });
      });
  }

    render() {
      if(!this.state.data || !this.state.columns) {
        return <p>Waiting for data...</p>
      }
      return (
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
        />
      )
    }

}

export default LoanPayments;
