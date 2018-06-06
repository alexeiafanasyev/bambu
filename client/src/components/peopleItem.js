import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {Link} from "react-router-dom";

class PeopleItem extends Component {

    render() {
        return (
            <Table hover striped bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Hair color</th>
                    <th>Skin color</th>
                    <th>Eye color</th>
                    <th>Birth year</th>
                    <th>Gender</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {this.props.people.map((currElement, index) => {
                    return (
                        <tr key={index + 1}>
                            <th scope="row">{index + 1}</th>
                            <td>{currElement.name}</td>
                            <td>{currElement.height}</td>
                            <td>{currElement.mass}</td>
                            <td>{currElement.hair_color}</td>
                            <td>{currElement.skin_color}</td>
                            <td>{currElement.eye_color}</td>
                            <td>{currElement.birth_year}</td>
                            <td>{currElement.gender}</td>
                            <td><Link to={`/people/${index+1}`}>Details</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

        );
    }
}

export default PeopleItem;