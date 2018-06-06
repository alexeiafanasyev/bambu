import React, {Component} from 'react';

import PeopleItem from './peopleItem'


class PeopleList extends Component {
    state = {
        people: [],
        countOfPeople: 0,
        countOfPage: 0
    };

    componentDidMount() {
        this.getCountOfPeopleAndPeopleList();
        // this.getPeopleList(1);
    }

    getCountOfPeopleAndPeopleList = () => {
        fetch('/people')
            .then(response => response.json())
            .then(response => this.setState({countOfPeople: response.count}))
            .then(response => this.setState({countOfPage: this.calculatePageCount()}))
            .then(response => this.getPeopleList(1))
    };

    calculatePageCount = () => {
        let pageCount = 0;
        const {countOfPeople} = this.state;
        if ((countOfPeople / 10 - Math.floor(countOfPeople / 10)) === 0) {
            pageCount = Math.trunc(countOfPeople / 10)
            return pageCount
        } else {
            pageCount = Math.trunc(countOfPeople / 10) + 1;
            return pageCount
        }
    };

    getPeopleList = (page) => {
        const {people} = this.state;
        const {countOfPage} = this.state;

        fetch('people/?page=' + page)
            .then(response => response.json())
            .then(response => {
                Array.prototype.splice.apply(people, [people.length, 0].concat(response.results));
                this.setState({people: people});
                page++;
            })
            .then(() => {
                if (page <= countOfPage) {
                    this.getPeopleList(page)
                }
            })
    };

    render() {
        return (
            <div className="App">
                <PeopleItem people={this.state.people}/>
            </div>
        );
    }
}

export default PeopleList;