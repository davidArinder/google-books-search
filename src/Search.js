import React, { Component } from 'react'

class Search extends Component {
    state = {
        searchValue: '',
        bookResults: []
    }

    handleOnChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSearch = () => {
        this.makeApiCall(this.state.searchValue)
    }

    makeApiCall = (searchInput) => {
        const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
        
        fetch(searchUrl)
        .then((res) => {
            return res.json()
        })
        .then((jsonData) => {
            //console.log(jsonData.items[0].volumeInfo)
            this.setState({ bookResults: jsonData.items })
        })
    }

    render() {
        return (
            <div>
                <h1>Books Search</h1>
                <input 
                    name="text"   
                    type="text" 
                    placeholder="Search"
                    onChange={(e) => this.handleOnChange(e)}
                    value={this.state.searchValue}    
                />
                <button onClick={this.handleSearch}>Submit</button>
                {this.state.bookResults ? (
                    <div>
                        {this.state.bookResults.map((book) => (
                            <div>
                                <h4>{book.volumeInfo.title}</h4>
                                <p>{book.volumeInfo.authors}</p>
                            </div>
                        ))}                       
                    </div>
                ) : (
                    <div>
                        <p>Try searching for a book</p>
                    </div>
                )}
            </div>
        )
    }
}

export default Search


