import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";
import FilmList from './filmsList'
import SpeciesList from './speciesList'
import VehiclesList from './vehiclesList'
import StarshipsList from './starshipsList'


class PeopleItemDetails extends Component {

    state = {
        person: {},
        filmsTitle: [],
        speciesTitle: [],
        vehiclesTitle: [],
        starshipsTitle: []
    };

    componentDidMount() {
        this.getPeopleItemDetails();
    }

    getPeopleItemDetails = () => {
        let url = window.location.pathname;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({person: response}))
            .then(response => this.getFilms())
            .then(response => this.getSpecies())
            .then(response => this.getVehicles())
            .then(response => this.getStarships())
    };

    getFilms = () => {
        let filmsList = this.state.person.films;
        let filmsTitleList = [];
        filmsList.forEach(item => {
            fetch(item)
                .then(response => response.json())
                .then(response => filmsTitleList.push(response.title))
                .then(response => this.setState({filmsTitle: filmsTitleList}))
        });
    };

    getSpecies = () => {
        let speciesList = this.state.person.species;
        let speciesTitleList = [];
        speciesList.forEach(item => {
            fetch(item)
                .then(response => response.json())
                .then(response => speciesTitleList.push(response.name))
                .then(response => this.setState({speciesTitle: speciesTitleList}))
        });
    };

    getVehicles = () => {
        let vehiclesList = this.state.person.vehicles;
        let vehiclesTitleList = [];
        vehiclesList.forEach(item => {
            fetch(item)
                .then(response => response.json())
                .then(response => vehiclesTitleList.push(response.name))
                .then(response => this.setState({vehiclesTitle: vehiclesTitleList}))
        });
    };

    getStarships = () => {
        let starshipsList = this.state.person.starships;
        let starshipsTitleList = [];
        starshipsList.forEach(item => {
            fetch(item)
                .then(response => response.json())
                .then(response => starshipsTitleList.push(response.name))
                .then(response => this.setState({starshipsTitle: starshipsTitleList}))
        });
    };


    renderStaticDetails = (item, index) => {
        return (
            <Row key={index}>
                <Col className="title-people-item-list" xs="4">{item.title}</Col>
                <Col className="text-people-item-list" xs="8">{item.name}</Col>
            </Row>
        )
    };

    render() {
        let titleList = [
            {title: "Name", name: this.state.person.name},
            {title: "Height", name: this.state.person.height},
            {title: "Mass", name: this.state.person.mass},
            {title: "Hair color", name: this.state.person.hair_color},
            {title: "Skin color", name: this.state.person.skin_color},
            {title: "Eye color", name: this.state.person.eye_color},
            {title: "Birth year", name: this.state.person.birth_year},
            {title: "Gender", name: this.state.person.gender}
        ];
        return (
            <Container className="table-container">
                <Row>
                    <Col><Link to="/">To Persons List</Link></Col>
                </Row>
                {titleList.map((currElement, index) => this.renderStaticDetails(currElement, index))}
                <FilmList filmsTitle={this.state.filmsTitle}/>
                <SpeciesList speciesTitle={this.state.speciesTitle}/>
                <VehiclesList vehiclesTitle={this.state.vehiclesTitle}/>
                <StarshipsList starshipsTitle={this.state.starshipsTitle}/>

                <Row>
                    <Col className="title-people-item-list" xs="4">Created</Col>
                    <Col className="text-people-item-list" xs="8">{this.state.person.created}</Col>
                </Row>
                <Row>
                    <Col className="title-people-item-list" xs="4">Edited</Col>
                    <Col className="text-people-item-list" xs="8">{this.state.person.edited}</Col>
                </Row>
            </Container>
        )
    }
}

export default PeopleItemDetails;