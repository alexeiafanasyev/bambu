import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';


class FilmList extends Component {
    render() {
        const filmsItems = this.props.filmsTitle.map((currElement, index) =>
            <li key={index}>{currElement}</li>
        );
        return (
            <Row>
                <Col className="title-people-item-list" xs="4">Films</Col>
                <Col className="text-people-item-list" xs="8"><ul>{filmsItems}</ul></Col>
            </Row>
        );
    }
}

export default FilmList;