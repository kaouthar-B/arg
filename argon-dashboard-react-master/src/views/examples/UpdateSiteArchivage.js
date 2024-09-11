import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

const UpdateSiteArchivage = () => {
    const { id } = useParams();
    const [siteArchivage, setSiteArchivage] = useState({
        nom: '',
        adresse: '',
        surface: '',
        archiviste: '',
        personnel: '',
        nombreEmplacements: '',
        nombreEmplacementsCharges: '',
        nombreEmplacementsVides: ''
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetch the site details when the component mounts or id changes
        axios.get(`http://localhost:8080/api/siteArchivage/${id}`)
            .then(response => {
                setSiteArchivage(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du site d'archivage:", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSiteArchivage(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmUpdate = () => {
        axios.put(`http://localhost:8080/api/siteArchivage/sites/${id}`, siteArchivage)
            .then(response => {
                console.log("Site d'archivage mis à jour avec succès :", response.data);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setShowConfirmation(false);
                }, 3000);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du site d'archivage :", error);
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setShowConfirmation(false);
                }, 3000);
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
                                        <h3 className="mb-0">Modifier un site d'archivage</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations sur le site d'archivage</h6>
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
                                                        placeholder="Nom"
                                                        type="text"
                                                        name="nom"
                                                        value={siteArchivage.nom}
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
                                                        placeholder="Adresse"
                                                        type="text"
                                                        name="adresse"
                                                        value={siteArchivage.adresse}
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
                                                        placeholder="Surface"
                                                        type="text"
                                                        name="surface"
                                                        value={siteArchivage.surface}
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
                                                        placeholder="Archiviste"
                                                        type="text"
                                                        name="archiviste"
                                                        value={siteArchivage.archiviste}
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
                                                        placeholder="Personnel"
                                                        type="text"
                                                        name="personnel"
                                                        value={siteArchivage.personnel}
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
                                                        placeholder="Nombre d'emplacements"
                                                        type="number"
                                                        name="nombreEmplacements"
                                                        value={siteArchivage.nombreEmplacements}
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
                                                        placeholder="Nombre d'emplacements chargés"
                                                        type="number"
                                                        name="nombreEmplacementsCharges"
                                                        value={siteArchivage.nombreEmplacementsCharges}
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
                                                        placeholder="Nombre d'emplacements vides"
                                                        type="number"
                                                        name="nombreEmplacementsVides"
                                                        value={siteArchivage.nombreEmplacementsVides}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6" className="text-center">
                                                <Button className="mt-4 btn-block" color="dark" type="submit">
                                                    Enregistrer les modifications
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/* Confirmation Modal */}
            <Modal isOpen={showConfirmation} toggle={() => setShowConfirmation(!showConfirmation)}>
                <ModalHeader toggle={() => setShowConfirmation(!showConfirmation)}>
                    Confirmation de la modification
                </ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        {success && (
                            <>
                                <FontAwesomeIcon icon={faCheckCircle} size="3x" color="success" className="mb-3" />
                                <p className="text-success">Site d'archivage mis à jour avec succès</p>
                            </>
                        )}
                        {error && (
                            <>
                                <FontAwesomeIcon icon={faTimesCircle} size="3x" color="danger" className="mb-3" />
                                <p className="text-danger">Erreur lors de la mise à jour du site d'archivage</p>
                            </>
                        )}
                        {!success && !error && (
                            <>
                                <p>Êtes-vous sûr de vouloir modifier ce site d'archivage ?</p>
                                <p>Cette action met à jour les informations du site d'archivage avec les données suivantes :</p>
                                <ul className="text-left">
                                    <li><strong>Nom :</strong> {siteArchivage.nom}</li>
                                    <li><strong>Adresse :</strong> {siteArchivage.adresse}</li>
                                    <li><strong>Surface :</strong> {siteArchivage.surface}</li>
                                    <li><strong>Archiviste :</strong> {siteArchivage.archiviste}</li>
                                    <li><strong>Personnel :</strong> {siteArchivage.personnel}</li>
                                    <li><strong>Nombre d'emplacements :</strong> {siteArchivage.nombreEmplacements}</li>
                                    <li><strong>Nombre d'emplacements chargés :</strong> {siteArchivage.nombreEmplacementsCharges}</li>
                                    <li><strong>Nombre d'emplacements vides :</strong> {siteArchivage.nombreEmplacementsVides}</li>
                                </ul>
                            </>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {!success && !error && (
                        <>
                            <Button color="primary" onClick={confirmUpdate}>
                                Confirmer
                            </Button>
                            <Button color="secondary" onClick={() => setShowConfirmation(false)}>
                                Annuler
                            </Button>
                        </>
                    )}
                    {(success || error) && (
                        <Button color="secondary" onClick={() => setShowConfirmation(false)}>
                            Fermer
                        </Button>
                    )}
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UpdateSiteArchivage;
