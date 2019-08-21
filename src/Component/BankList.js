import React from 'react';
import style from './BankList.module.css';
import escapeRegExp from 'escape-string-regexp';

class BankList extends React.Component {
    constructor(){
        super();
        this.state = {
            bank: [],
            currentPage: 1,
            listPerPage: 10,
            query: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    
      updatePagination = (page) => {
        this.setState({ listPerPage: Number(page) })
      }


      componentDidMount() {
        fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI')
        .then(res => res.json())
        .then((data) => {
          this.setState({ bank: data })
        })
        .catch(console.log)
      }
      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }   

  render() {
    let bankList
    if (this.state.query) {
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        bankList = this.state.bank.filter((bank) => 
            match.test(bank.ifsc) || 
            match.test(bank.branch) ||
            match.test(bank.city) ||
            match.test(bank.bank_name) ||
            match.test(bank.address))
            

        console.log(bankList)

      }
    else {
    bankList = this.state.bank
    }

    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(bankList.length / this.state.listPerPage); i++) {
          pageNumbers.push(i);
        }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            onClick={this.handleClick}
            className={`page-item ${this.state.currentPage === number? 'active' : ''}`}
          >
            <button 
                className="page-link"
                onClick={this.handleClick}
                key={number}
                id={number}
             >{number}</button>
          </li>
        );
      });
    const indexOfLastTodo = this.state.currentPage * this.state.listPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.listPerPage;
    const currentList = bankList.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderList = currentList.map((item, index) => {
        return (
            <tr key={item.ifsc}>
                <td key={item.ifsc}>{item.ifsc}</td>
                <td key={item.branch}>{item.branch}</td>
                <td key={item.city}>{item.city}</td>
                <td key={item.bank_name}>{item.bank_name}</td>
                <td key={item.address}>{item.address}</td>
            </tr> 
        );
      });

    return (
        <div>
            <div>
                <div className={style.h1}>
                    <h1>Bank Search</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 col-12">
                            <div className={style.dropdown}>
                                <select className="form-control" name="city">
                                    <option value="saab">Mumbai</option>
                                    <option value="volvo">Bangalore</option>
                                    <option value="fiat">Kochi</option>
                                    <option value="audi">Chennai</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6 col-12">
                        <div className={style.search}>
                            <input 
                                onChange={(event) => this.updateQuery(event.target.value)}
                                type="text" 
                                className="input form-control" 
                                placeholder="search..." />
                        </div>
                        </div>
                        <div className="col-sm-3 col-12">
                        <select 
                            className="form-control" 
                            onChange={(event) => this.updatePagination(event.target.value)}>
                            <option selected disabled>Items per page</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="100">500</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container ${style.tableContent}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>IFSC</th>
                            <th>Branch</th>
                            <th>City</th>
                            <th>Bank Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList}
                    </tbody>
                </table>
            </div>
            <div className={`container ${style.pagination}`}>
                <nav aria-label="Page navigation example">   
                    <ul className="pagination" id={style.pageNumbers}>
                        {renderPageNumbers}
                    </ul>
                </nav>   
            </div>
        </div>
    );
  }
}

export default BankList;