import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from "components/Headers/Header.js";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';

const AjouterSiteArchivage = () => {
    const [nouveauSite, setNouveauSite] = useState({
        nom: '',
        adresse: '',
        surface: '',
        archiviste: '',
        personnel: '',
        nombreEmplacements: '',
        nombreEmplacementsCharges: '',
        nombreEmplacementsVides: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNouveauSite(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/siteArchivage/sites", nouveauSite)
            .then(response => {
                console.log("Site d'archivage ajouté avec succès:", response.data);
                setSuccessMessage("Site d'archivage ajouté avec succès !");
                setErrorMessage('');
                // Réinitialiser le formulaire après l'ajout
                setNouveauSite({
                    nom: '',
                    adresse: '',
                    surface: '',
                    archiviste: '',
                    personnel: '',
                    nombreEmplacements: '',
                    nombreEmplacementsCharges: '',
                    nombreEmplacementsVides: ''
                });
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du Site d'archivage:", error);
                setErrorMessage("Erreur lors de l'ajout du site d'archivage. Veuillez réessayer.");
                setSuccessMessage('');
            });
    };

    const handleImport = () => {
        // Ajouter la logique d'importation ici
        console.log("Importer bouton cliqué");
    };

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Ajouter un site d'archivage</h3>
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
                                    <h6 className="heading-small text-muted mb-4">Informations sur le Site d'archivage</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-nom">
                                                        Nom
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nom"
                                                        placeholder="Saisir le nom du Site d'archivage"
                                                        type="text"
                                                        name="nom"
                                                        value={nouveauSite.nom}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-adresse">
                                                        Adresse
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-adresse"
                                                        placeholder="Saisir l'adresse du Site d'archivage"
                                                        type="text"
                                                        name="adresse"
                                                        value={nouveauSite.adresse}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-surface">
                                                        Surface
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-surface"
                                                        placeholder="Saisir la surface du Site d'archivage"
                                                        type="text"
                                                        name="surface"
                                                        value={nouveauSite.surface}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-archiviste">
                                                        Archiviste
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-archiviste"
                                                        placeholder="Saisir le nom de l'archiviste"
                                                        type="text"
                                                        name="archiviste"
                                                        value={nouveauSite.archiviste}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-personnel">
                                                        Personnel
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-personnel"
                                                        placeholder="Saisir le nom du personnel"
                                                        type="text"
                                                        name="personnel"
                                                        value={nouveauSite.personnel}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-nombre-emplacements">
                                                        Nombre d'emplacements
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nombre-emplacements"
                                                        placeholder="Saisir le nombre d'emplacements"
                                                        type="text"
                                                        name="nombreEmplacements"
                                                        value={nouveauSite.nombreEmplacements}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-nombre-emplacements-charges">
                                                        Nombre d'emplacements chargés
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nombre-emplacements-charges"
                                                        placeholder="Saisir le nombre d'emplacements chargés"
                                                        type="text"
                                                        name="nombreEmplacementsCharges"
                                                        value={nouveauSite.nombreEmplacementsCharges}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-nombre-emplacements-vides">
                                                        Nombre d'emplacements vides
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-nombre-emplacements-vides"
                                                        placeholder="Saisir le nombre d'emplacements vides"
                                                        type="text"
                                                        name="nombreEmplacementsVides"
                                                        value={nouveauSite.nombreEmplacementsVides}
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
                                        <Button tag={Link} to="/admin/Tabledevise" color="success" className="ml-3">OK</Button>
                                    </Alert>
                                )}
                                {errorMessage && (
                                    <Alert color="danger" className="mt-4 text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', color: '#dc3545', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
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

export default AjouterSiteArchivage;
