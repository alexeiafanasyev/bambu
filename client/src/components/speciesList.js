import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';


class SpeciesList extends Component {
    render() {
        const speciesItems = this.props.speciesTitle.map((currElement, index) =>
            <li key={index}>{currElement}</li>
        );
        return (
            <Row>
                <Col className="title-people-item-list" xs="4">Species</Col>
                <Col className="text-people-item-list" xs="8"><ul>{speciesItems}</ul></Col>
            </Row>
        );
    }
}

export default SpeciesList;