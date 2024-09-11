import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from "components/Headers/Header.js";
import { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Label } from 'reactstrap';

const AjoutNouvelleAgence = () => {
    const [nouvelleAgence, setNouvelleAgence] = useState({
        nomAgence: '',
        nomEntite: '',
        refEntite: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [proprietairesList, setProprietairesList] = useState([]);
    const [entitesList, setEntitesList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/proprietaires")
            .then(response => {
                setProprietairesList(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des propriétaires d'archives :", error);
            });

        axios.get("http://localhost:8080/api/entites")
            .then(response => {
                setEntitesList(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des entités rattachées :", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNouvelleAgence(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/plan-classification/ajouterAgence", null, {
            params: {
                nomAgence: nouvelleAgence.nomAgence,
                nomEntite: nouvelleAgence.nomEntite,
                refEntite: nouvelleAgence.refEntite
            }
        })
        .then(response => {
            console.log("Nouvelle Agence ajoutée avec succès:", response.data);
            setSuccessMessage("Nouvelle Agence ajoutée avec succès !");
            setNouvelleAgence({
                nomAgence: '',
                nomEntite: '',
                refEntite: ''
            });
        })
        .catch(error => {
            console.error("Erreur lors de l'ajout d'une Nouvelle Agence:", error);
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
                                        <h3 className="mb-0">Ajouter une Nouvelle Agence dans le Plan de Classification</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations sur la Nouvelle Agence</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-nomAgence"
                                                    >
                                                        Nom de l'Agence
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nomAgence"
                                                        placeholder="Saisir le nom de l'agence"
                                                        type="text"
                                                        name="nomAgence"
                                                        value={nouvelleAgence.nomAgence}
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
                                                        Nom de l'Entité
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nomEntite"
                                                        placeholder="Sélectionner l'entité"
                                                        type="select"
                                                        name="nomEntite"
                                                        value={nouvelleAgence.nomEntite}
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
                                                        Référence de l'Entité
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-refEntite"
                                                        placeholder="Saisir la référence de l'entité"
                                                        type="text"
                                                        name="refEntite"
                                                        value={nouvelleAgence.refEntite}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
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

export default AjoutNouvelleAgence;
