import React from 'react';
import style from './SearchBar.module.css';

class SearchBar extends React.Component {
    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
      }
      
  render() {
    return (
        <div>
            <div className={style.h1}>
                <h1>Bank Search</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-12">
                        <div className={style.dropdown}>
                            <select className="form-control" name="city">
                                <option value="saab">Mumbai</option>
                                <option value="volvo">Bangalore</option>
                                <option value="fiat">Kochi</option>
                                <option value="audi">Chennai</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-8 col-12">
                    <div className={style.search}>
                        <input 
                            onChange={(event) => this.updateQuery(event.target.value)}
                            type="text" 
                            className="input form-control" 
                            placeholder="search..." />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default SearchBar;