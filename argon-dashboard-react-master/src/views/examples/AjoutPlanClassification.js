import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from "components/Headers/Header.js";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Label } from 'reactstrap';

const AjoutPlanClassification = () => {
    const [planClassification, setPlanClassification] = useState({
        proprietaireArchives: '',
        entitesRattachees: '',
        ref: '',
        codeEntite: '',
        agences: '',
        categoriesArchive: '',
        code: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlanClassification(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/plan-classification/create", planClassification)
            .then(response => {
                console.log("Plan de classification créé avec succès:", response.data);
                setSuccessMessage("Plan de classification créé avec succès !");
                setPlanClassification({
                    proprietaireArchives: '',
                    entitesRattachees: '',
                    ref: '',
                    codeEntite: '',
                    agences: '',
                    categoriesArchive: '',
                    code: ''
                });
            })
            .catch(error => {
                console.error("Erreur lors de la création du Plan de Classification:", error);
            });
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8080/api/conteneur/importer', formData)
            .then(response => {
                console.log("Données importées avec succès:", response.data);
                setSuccessMessage("Données importées avec succès !");
            })
            .catch(error => {
                console.error("Erreur lors de l'importation des données :", error);
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
                                        <h3 className="mb-0">Ajouter une ligne dans le Plan de Classification</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <input
                                            type="file"
                                            id="import-file"
                                            style={{ display: 'none' }}
                                            onChange={handleImport}
                                        />
                                        <Button color="primary" onClick={() => document.getElementById('import-file').click()}>
                                            Importer
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations sur le Plan de Classification</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-proprietaireArchives"
                                                    >
                                                        Propriétaire des archives
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-proprietaireArchives"
                                                        placeholder="Saisir le propriétaire des archives"
                                                        type="text"
                                                        name="proprietaireArchives"
                                                        value={planClassification.proprietaireArchives}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-entitesRattachees"
                                                    >
                                                        Entités Rattachées
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-entitesRattachees"
                                                        placeholder="Saisir les entités rattachées"
                                                        type="text"
                                                        name="entitesRattachees"
                                                        value={planClassification.entitesRattachees}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-ref"
                                                    >
                                                        Référence
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-ref"
                                                        placeholder="Saisir la référence"
                                                        type="text"
                                                        name="ref"
                                                        value={planClassification.ref}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-codeEntite"
                                                    >
                                                        Code Entité
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-codeEntite"
                                                        placeholder="Saisir le code entité"
                                                        type="text"
                                                        name="codeEntite"
                                                        value={planClassification.codeEntite}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-agences"
                                                    >
                                                        Agences
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-agences"
                                                        placeholder="Saisir les agences (optionnel)"
                                                        type="text"
                                                        name="agences"
                                                        value={planClassification.agences}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-categoriesArchive"
                                                    >
                                                        Catégories d'archive
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-categoriesArchive"
                                                        placeholder="Saisir les catégories d'archive"
                                                        type="text"
                                                        name="categoriesArchive"
                                                        value={planClassification.categoriesArchive}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-code"
                                                    >
                                                        Code
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-code"
                                                        placeholder="Saisir le code"
                                                        type="text"
                                                        name="code"
                                                        value={planClassification.code}
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
                                <Link to="/admin/conteneurs">
                                    <Button color="secondary" className="mt-3">
                                        Retour à la liste du Plan de Classification
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AjoutPlanClassification;
