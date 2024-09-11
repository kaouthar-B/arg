import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from "components/Headers/Header.js";
import { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Label } from 'reactstrap';

const AjoutNouvelleCategorie = () => {
    const [nouvelleCategorie, setNouvelleCategorie] = useState({
        nomCategorie: '',
        nomEntite: '',
        refEntite: '',
        nomAgence: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [entitesList, setEntitesList] = useState([]);
    const [agencesList, setAgencesList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/entites")
            .then(response => {
                setEntitesList(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des entités :", error);
            });

        axios.get("http://localhost:8080/api/agences")
            .then(response => {
                setAgencesList(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des agences :", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNouvelleCategorie(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/plan-classification/ajouterCategorie", nouvelleCategorie)
            .then(response => {
                console.log("Nouvelle Catégorie ajoutée avec succès:", response.data);
                setSuccessMessage("Nouvelle Catégorie ajoutée avec succès !");
                setNouvelleCategorie({
                    nomCategorie: '',
                    nomEntite: '',
                    refEntite: '',
                    nomAgence: ''
                });
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de la Nouvelle Catégorie:", error);
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
                                        <h3 className="mb-0">Ajouter une Nouvelle Catégorie</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations sur la Catégorie</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-nomCategorie"
                                                    >
                                                        Nom de la Catégorie
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nomCategorie"
                                                        placeholder="Saisir le nom de la catégorie"
                                                        type="text"
                                                        name="nomCategorie"
                                                        value={nouvelleCategorie.nomCategorie}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-nomEntite"
                                                    >
                                                        Entité Rattachée
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nomEntite"
                                                        placeholder="Sélectionner l'entité rattachée"
                                                        type="select"
                                                        name="nomEntite"
                                                        value={nouvelleCategorie.nomEntite}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="" disabled>Sélectionner</option>
                                                        {entitesList.map((entite) => (
                                                            <option key={entite.id} value={entite.nom}>
                                                                {entite.nom}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-refEntite"
                                                    >
                                                        Code de la catégorie
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-refEntite"
                                                        placeholder="Saisir le code de la catégorie"
                                                        type="text"
                                                        name="code"
                                                        value={nouvelleCategorie.code}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-nomAgence"
                                                    >
                                                        Agence
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nomAgence"
                                                        placeholder="Sélectionner l'agence"
                                                        type="select"
                                                        name="nomAgence"
                                                        value={nouvelleCategorie.nomAgence}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="" disabled>Sélectionner</option>
                                                        {agencesList.map((agence) => (
                                                            <option key={agence.id} value={agence.nom}>
                                                                {agence.nom}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit">
                                            Ajouter
                                        </Button>
                                    </div>
                                </Form>
                                {successMessage && (
                                    <Alert color="success" className="mt-3">
                                        <FontAwesomeIcon icon={faCheckCircle} /> {successMessage}
                                    </Alert>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AjoutNouvelleCategorie;
