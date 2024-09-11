import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const StatistiquesSite = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const siteId = params.get('id');

    const [nombreEmplacements, setNombreEmplacements] = useState(0);
    const [nombreEmplacementsCharges, setNombreEmplacementsCharges] = useState(0);
    const [nombreEmplacementsVides, setNombreEmplacementsVides] = useState(0);
    const [saturatedConteneurs, setSaturatedConteneurs] = useState(0);
    const [nearlySaturatedConteneurs, setNearlySaturatedConteneurs] = useState(0);
    const [emptyConteneurs, setEmptyConteneurs] = useState(0);

    useEffect(() => {
        if (siteId) {
            // Fetch the number of locations (emplacements)
            axios.get(`http://localhost:8080/api/siteArchivage/sites/${siteId}/emplacements`)
                .then(response => setNombreEmplacements(response.data))
                .catch(error => console.error('Error fetching emplacements:', error));

            // Fetch the number of occupied locations (emplacements chargés)
            axios.get(`http://localhost:8080/api/siteArchivage/sites/${siteId}/emplacements-charges`)
                .then(response => setNombreEmplacementsCharges(response.data))
                .catch(error => console.error('Error fetching emplacements chargés:', error));

            // Fetch the number of empty locations (emplacements vides)
            axios.get(`http://localhost:8080/api/siteArchivage/sites/${siteId}/emplacements-vides`)
                .then(response => setNombreEmplacementsVides(response.data))
                .catch(error => console.error('Error fetching emplacements vides:', error));

            // Fetch the number of saturated conteneurs
            axios.get(`http://localhost:8080/api/conteneur/count/${siteId}/SATURATED`)
                .then(response => setSaturatedConteneurs(response.data))
                .catch(error => console.error('Error fetching saturated conteneurs:', error));

            // Fetch the number of nearly saturated conteneurs
            axios.get(`http://localhost:8080/api/conteneur/count/${siteId}/NEARLY_SATURATED`)
                .then(response => setNearlySaturatedConteneurs(response.data))
                .catch(error => console.error('Error fetching nearly saturated conteneurs:', error));

            // Fetch the number of empty conteneurs
            axios.get(`http://localhost:8080/api/conteneur/count/${siteId}/EMPTY`)
                .then(response => setEmptyConteneurs(response.data))
                .catch(error => console.error('Error fetching empty conteneurs:', error));
        }
    }, [siteId]);

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle tag="h5">Nombre d'emplacements</CardTitle>
                            <CardText>{nombreEmplacements}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle tag="h5">Emplacements chargés</CardTitle>
                            <CardText>{nombreEmplacementsCharges}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle tag="h5">Emplacements vides</CardTitle>
                            <CardText>{nombreEmplacementsVides}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={4}>
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle tag="h5">Conteneurs saturés</CardTitle>
                            <CardText>{saturatedConteneurs}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle tag="h5">Conteneurs quasi-saturés</CardTitle>
                            <CardText>{nearlySaturatedConteneurs}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle tag="h5">Conteneurs vides</CardTitle>
                            <CardText>{emptyConteneurs}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StatistiquesSite;
