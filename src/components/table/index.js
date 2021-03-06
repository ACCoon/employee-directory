import React from "react";
import API from "../../utils/API";
import TableRow from "../TableRow";

class Table extends React.Component {
  state = {
    emps: [],
    filteredEmps: [],
    search: ""
  };

  componentDidMount() {
    this.getEmps();
  }

  getEmps() {
    API()
      .then(res => this.setState({ emps: res }))
      .catch(err => console.log(err));
  }

  sortEmps(event) {
    const unsortEmps = this.state.emps;
    let empsSorted;
    if (event.target.dataset.order === "desc") {
      empsSorted = unsortEmps.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
      event.target.dataset.order = "asc"
    } else if (event.target.dataset.order === "asc") {
      empsSorted = unsortEmps.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1);
      event.target.dataset.order = "desc"
    }

    this.setState({ emps: empsSorted });
  }

  filterEmps = (event) => {
    this.setState({ search: event.target.value.toLowerCase() })
    const unfiltEmps = this.state.emps;
    
    const filtEmps = unfiltEmps.filter(emp => emp.name.toLowerCase().includes(this.state.search));

    console.log(filtEmps);

    this.setState({ filteredEmps: filtEmps });
  }

  render() {
    const { emps, filteredEmps } = this.state;
    return (
      <div>
        <textarea onChange={this.filterEmps} value={this.state.search} />
        <table className="table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th></th>
              <th onClick={(event) => this.sortEmps(event)} data-order="desc">Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmps.length ? filteredEmps.map(emp => <TableRow emp={emp} />)
              : emps.map(emp => <TableRow emp={emp} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;