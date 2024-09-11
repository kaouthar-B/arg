import { faCheckCircle, faDollarSign, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

const UpdateConteneur = () => {
    const { id } = useParams();
    const [conteneur, setConteneur] = useState({
        numero: '',
        emplacement: '',
        siteArchivage: '',
        archiviste: '',
        typeAffectation: 'Provisoire', // Valeur par défaut
        dateAffectation: ''
    });
    const [sitesArchivage, setSitesArchivage] = useState([]); // Liste des sites d'archivage pour le menu déroulant
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/conteneur/${id}`)
            .then(response => {
                setConteneur(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du conteneur :", error);
            });

        // Récupération des sites d'archivage pour le menu déroulant
        axios.get('http://localhost:8080/api/sitesArchivage')
            .then(response => {
                setSitesArchivage(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des sites d'archivage :", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConteneur(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setConteneur(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmUpdate = () => {
        axios.put(`http://localhost:8080/api/conteneur/${id}`, conteneur)
            .then(response => {
                console.log("Conteneur mis à jour avec succès :", response.data);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setShowConfirmation(false);
                }, 3000);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du conteneur :", error);
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
                                        <h3 className="mb-0">Modifier un conteneur</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations sur le conteneur</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-numero">
                                                        Numéro
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-numero"
                                                        placeholder="Numéro"
                                                        type="text"
                                                        name="numero"
                                                        value={conteneur.numero}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-emplacement">
                                                        Emplacement
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-emplacement"
                                                        placeholder="Emplacement"
                                                        type="text"
                                                        name="emplacement"
                                                        value={conteneur.emplacement}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-site-archivage">
                                                        Site d'archivage
                                                    </label>
                                                    <Input
                                                        type="select"
                                                        id="input-site-archivage"
                                                        name="siteArchivage"
                                                        value={conteneur.siteArchivage}
                                                        onChange={handleSelectChange}
                                                        required
                                                    >
                                                        <option value="">Sélectionner un site d'archivage</option>
                                                        {sitesArchivage.map(site => (
                                                            <option key={site.id} value={site.id}>{site.nom}</option>
                                                        ))}
                                                    </Input>
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
                                                        value={conteneur.archiviste}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-type-affectation">
                                                        Type d'affectation
                                                    </label>
                                                    <Input
                                                        type="select"
                                                        id="input-type-affectation"
                                                        name="typeAffectation"
                                                        value={conteneur.typeAffectation}
                                                        onChange={handleSelectChange}
                                                        required
                                                    >
                                                        <option value="Provisoire">Provisoire</option>
                                                        <option value="Définitive">Définitive</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-date-affectation">
                                                        Date d'affectation
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-date-affectation"
                                                        placeholder="Date d'affectation"
                                                        type="date"
                                                        name="dateAffectation"
                                                        value={conteneur.dateAffectation}
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
                                <p className="text-success">Conteneur mis à jour avec succès</p>
                            </>
                        )}
                        {error && (
                            <>
                                <FontAwesomeIcon icon={faTimesCircle} size="3x" color="danger" className="mb-3" />
                                <p className="text-danger">Erreur lors de la mise à jour du conteneur</p>
                            </>
                        )}
                        {!success && !error && (
                            <>
                                <p>Êtes-vous sûr de vouloir modifier ce conteneur ?</p>
                                <p>Cette action met à jour les informations du conteneur avec les données suivantes :</p>
                                <pre>{JSON.stringify(conteneur, null, 2)}</pre>
                            </>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {!success && !error && (
                        <>
                            <Button color="primary" onClick={confirmUpdate}>Confirmer</Button>
                            <Button color="secondary" onClick={() => setShowConfirmation(!showConfirmation)}>Annuler</Button>
                        </>
                    )}
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UpdateConteneur;