import React, { Component } from 'react'
import { Link } from 'gatsby'

// Search component
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ``,
            results: [],
        }
    }

    render() {
        return (
            <div>
                <input className="search-input" type="text" value={this.state.query} onChange={this.search}
                    placeholder={'Search'} />
                <ul className='search__list'>{this.state.results.map(page =>
                    <li key={page.url}>
                        <Link className='search__list_white search__list_non-decoration'
                            to={page.url}>
                            {page.title}
                        </Link>
                    </li>)}</ul>
            </div>
        )
    }

    getSearchResults(query) {
        if (!query || !window.__LUNR__) return []
        const lunrIndex = window.__LUNR__[this.props.lng]
        const results = lunrIndex.index.search(query) // you can  customize your search , see https://lunrjs.com/guides/searching.html
        return results.map(({ ref }) => lunrIndex.store[ref])
    }

    search = event => {
        const query = event.target.value
        const results = this.getSearchResults(query)
        this.setState(s => {
            return {
                results,
                query,
            }
        })
    }
}
