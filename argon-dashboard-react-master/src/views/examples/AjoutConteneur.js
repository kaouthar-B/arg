import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from "components/Headers/Header.js";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Label } from 'reactstrap';

const AjoutConteneur = () => {
    const [nouveauConteneur, setNouveauConteneur] = useState({
        numero: '',
        emplacement: '',
        siteArchivage: '',
        archiviste: '',
        typeAffectation: '',
        dateAffectation: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [sitesList, setSitesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch possible values for the "Site d'archivage" dropdown
    useEffect(() => {
        axios.get("http://localhost:8080/api/sites")
            .then(response => {
                setSitesList(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des sites :", error);
                setErrorMessage("Erreur lors de la récupération des sites.");
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNouveauConteneur(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Determine the appropriate API endpoint based on the type of affectation
        let apiUrl = "http://localhost:8080/api/conteneur/conteneurs";
        if (nouveauConteneur.typeAffectation === "Provisoire") {
            apiUrl = `http://localhost:8080/api/conteneur/conteneurs/${nouveauConteneur.siteArchivage}/affectation-provisoire`;
        } else if (nouveauConteneur.typeAffectation === "Définitive") {
            apiUrl = `http://localhost:8080/api/conteneur/conteneurs/${nouveauConteneur.siteArchivage}/${nouveauConteneur.numero}/affectation-definitive`;
        }

        axios.post(apiUrl, nouveauConteneur)
            .then(response => {
                console.log("Conteneur ajouté avec succès:", response.data);
                setSuccessMessage("Conteneur ajouté avec succès !");
                setNouveauConteneur({
                    numero: '',
                    emplacement: '',
                    siteArchivage: '',
                    archiviste: '',
                    typeAffectation: '',
                    dateAffectation: ''
                });
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du Conteneur:", error);
                setErrorMessage("Erreur lors de l'ajout du conteneur. Veuillez vérifier les permissions et les données saisies.");
            });
    };

    const handleImport = () => {
        // Ajouter la logique d'importation ici
        console.log("Importer bouton cliqué");
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
                                        <h3 className="mb-0">Ajouter un Conteneur</h3>
                                    </Col>
                                    <Col xs="4" className="text-right">
                                        <Button color="primary" onClick={handleImport}>
                                            Importer
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations sur le Conteneur</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-numero">
                                                        Numéro
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-numero"
                                                        placeholder="Saisir le numéro du conteneur"
                                                        type="text"
                                                        name="numero"
                                                        value={nouveauConteneur.numero}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-emplacement">
                                                        Emplacement
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-emplacement"
                                                        placeholder="Saisir l'emplacement du conteneur"
                                                        type="text"
                                                        name="emplacement"
                                                        value={nouveauConteneur.emplacement}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-site-archivage">
                                                        Site d'archivage
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        id="input-site-archivage"
                                                        name="siteArchivage"
                                                        value={nouveauConteneur.siteArchivage}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="">Sélectionner un site d'archivage</option>
                                                        {sitesList.map(site => (
                                                            <option key={site.id} value={site.id}>{site.nom}</option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-archiviste">
                                                        Archiviste
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-archiviste"
                                                        placeholder="Saisir le nom de l'archiviste"
                                                        type="text"
                                                        name="archiviste"
                                                        value={nouveauConteneur.archiviste}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-type-affectation">
                                                        Type d'affectation
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        id="input-type-affectation"
                                                        name="typeAffectation"
                                                        value={nouveauConteneur.typeAffectation}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="">Sélectionner le type d'affectation</option>
                                                        <option value="Provisoire">Provisoire</option>
                                                        <option value="Définitive">Définitive</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-date-affectation">
                                                        Date d'affectation
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-date-affectation"
                                                        placeholder="Saisir la date d'affectation"
                                                        type="date"
                                                        name="dateAffectation"
                                                        value={nouveauConteneur.dateAffectation}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6" className="text-center">
                                                <Button className="mt-4 btn-block" color="dark" type="submit">
                                                    Ajouter
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                                {successMessage && (
                                    <Alert color="success" className="mt-4 text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', color: '#28a745', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
                                        <FontAwesomeIcon icon={faCheckCircle} className="mr-3" style={{ fontSize: '24px' }} />
                                        <span style={{ fontSize: '18px' }}>{successMessage}</span>
                                        <Button tag={Link} to="/admin/Conteneur" color="success" className="ml-3">OK</Button>
                                    </Alert>
                                )}
                                {errorMessage && (
                                    <Alert color="danger" className="mt-4 text-center" style={{ backgroundColor: '#f8d7da', borderRadius: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', color: '#721c24', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
                                        <span style={{ fontSize: '18px' }}>{errorMessage}</span>
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

export default AjoutConteneur;
