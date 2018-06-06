import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';


class StarshipsList extends Component {
    render() {
        const starshipsItems = this.props.starshipsTitle.map((currElement, index) =>
            <li key={index}>{currElement}</li>
        );
        return (
            <Row>
                <Col className="title-people-item-list" xs="4">Starships</Col>
                <Col className="text-people-item-list" xs="8"><ul>{starshipsItems}</ul></Col>
            </Row>
        );
    }
}

export default StarshipsList;