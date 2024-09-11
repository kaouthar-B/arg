import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Card, CardHeader, CardBody, Input, Button, FormGroup, Label } from 'reactstrap';
import Header from 'components/Headers/Header';

const Historique = () => {
    const [historique, setHistorique] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        typeAction: '',
        action: '',
        nomArchive: '',
        numeroConteneur: '',
        nomSiteArchivage: '',
        nomPlanClassification: '',
        nomUtilisateur: '',
        dateAction: '',
        titre: ''
    });

    useEffect(() => {
        // Charger les données initiales lors du montage du composant
        fetchHistorique();
    }, []);

    const fetchHistorique = () => {
        axios.get("http://localhost:8080/api/historique-actions/all")
            .then(response => {
                setHistorique(response.data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement de l'historique:", error);
            });
    };

    const handleSearch = () => {
        // Requête pour rechercher les historiques selon les critères
        axios.get("http://localhost:8080/api/historique-actions/search", { params: searchCriteria })
            .then(response => {
                setHistorique(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la recherche de l'historique:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({
            ...searchCriteria,
            [name]: value
        });
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Historique</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div className="mb-4">
                                    <p>Vous pouvez rechercher dans l'historique selon les critères suivants :</p>
                                    <FormGroup>
                                        <Label for="typeAction">Type d'Action</Label>
                                        <Input
                                            type="text"
                                            name="typeAction"
                                            id="typeAction"
                                            placeholder="Type d'Action"
                                            onChange={handleInputChange}
                                            value={searchCriteria.typeAction}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="action">Action</Label>
                                        <Input
                                            type="text"
                                            name="action"
                                            id="action"
                                            placeholder="Action"
                                            onChange={handleInputChange}
                                            value={searchCriteria.action}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="nomArchive">Nom/REF Archive</Label>
                                        <Input
                                            type="text"
                                            name="nomArchive"
                                            id="nomArchive"
                                            placeholder="Nom/REF Archive"
                                            onChange={handleInputChange}
                                            value={searchCriteria.nomArchive}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="numeroConteneur">Numéro Conteneur</Label>
                                        <Input
                                            type="text"
                                            name="numeroConteneur"
                                            id="numeroConteneur"
                                            placeholder="Numéro Conteneur"
                                            onChange={handleInputChange}
                                            value={searchCriteria.numeroConteneur}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="nomSiteArchivage">Nom Site d'Archivage</Label>
                                        <Input
                                            type="text"
                                            name="nomSiteArchivage"
                                            id="nomSiteArchivage"
                                            placeholder="Nom Site d'Archivage"
                                            onChange={handleInputChange}
                                            value={searchCriteria.nomSiteArchivage}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="nomPlanClassification">Nom Plan Classification</Label>
                                        <Input
                                            type="text"
                                            name="nomPlanClassification"
                                            id="nomPlanClassification"
                                            placeholder="Nom Plan Classification"
                                            onChange={handleInputChange}
                                            value={searchCriteria.nomPlanClassification}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="nomUtilisateur">Nom Utilisateur</Label>
                                        <Input
                                            type="text"
                                            name="nomUtilisateur"
                                            id="nomUtilisateur"
                                            placeholder="Nom Utilisateur"
                                            onChange={handleInputChange}
                                            value={searchCriteria.nomUtilisateur}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="dateAction">Date d'Action</Label>
                                        <Input
                                            type="date"
                                            name="dateAction"
                                            id="dateAction"
                                            onChange={handleInputChange}
                                            value={searchCriteria.dateAction}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="titre">Titre</Label>
                                        <Input
                                            type="text"
                                            name="titre"
                                            id="titre"
                                            placeholder="Titre"
                                            onChange={handleInputChange}
                                            value={searchCriteria.titre}
                                        />
                                    </FormGroup>
                                    <Button color="primary" onClick={handleSearch}>Rechercher</Button>
                                </div>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Titre</th>
                                            <th scope="col">Type d'Action</th>
                                            <th scope="col">Utilisateur</th>
                                            <th scope="col">Date et Heure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historique.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.titre}</td>
                                                <td>{item.typeAction}</td>
                                                <td>{item.utilisateur ? item.utilisateur.nom : 'N/A'}</td>
                                                <td>{new Date(item.dateAction).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Historique;
