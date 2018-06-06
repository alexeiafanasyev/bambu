import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';


class VehiclesList extends Component {
    render() {
        const vehiclesItems = this.props.vehiclesTitle.map((currElement, index) =>
            <li key={index}>{currElement}</li>
        );
        return (
            <Row>
                <Col className="title-people-item-list" xs="4">Vehicles</Col>
                <Col className="text-people-item-list" xs="8"><ul>{vehiclesItems}</ul></Col>
            </Row>
        );
    }
}

export default VehiclesList;