import { faCheckCircle, faDollarSign, faExchangeAlt, faMoneyBillAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

const UpdateArchive = () => {
    const { id } = useParams();
    const [archive, setArchive] = useState({
        entite: '',
        refTransfert: '',
        localOrigine: '',
        correspondant: '',
        dateTransfert: '',
        numConteneur: '',
        emplacement: '',
        refEntite: '',
        code: '',
        agenceUnite: '',
        nature: '',
        anneeCreation: '',
        mois: '',
        jour: '',
        observations: ''
    });
    const [entites, setEntites] = useState([]);
    const [agencesUnites, setAgencesUnites] = useState([]);
    const [natures, setNatures] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetching the archive data
        axios.get(`http://localhost:8080/api/archives/${id}`)
            .then(response => {
                setArchive(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de l'archive:", error);
            });

        // Fetching options for dropdowns
        axios.get('http://localhost:8080/api/entites')
            .then(response => {
                setEntites(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des entités:", error);
            });

        axios.get('http://localhost:8080/api/agences-unites')
            .then(response => {
                setAgencesUnites(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des agences/unites:", error);
            });

        axios.get('http://localhost:8080/api/natures')
            .then(response => {
                setNatures(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des natures:", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArchive(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setArchive(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmUpdate = () => {
        axios.put(`http://localhost:8080/api/archives/update/${id}`, archive)
            .then(response => {
                console.log("Archive mise à jour avec succès :", response.data);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setShowConfirmation(false);
                }, 3000);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'archive :", error);
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
                                        <h3 className="mb-0">Modifier un archive</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations de l'archive</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-entite">
                                                        Entité
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        id="input-entite"
                                                        name="entite"
                                                        value={archive.entite}
                                                        onChange={handleSelectChange}
                                                        required
                                                    >
                                                        <option value="">Sélectionner une entité</option>
                                                        {entites.map(entite => (
                                                            <option key={entite.id} value={entite.id}>{entite.nom}</option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-ref-transfert">
                                                        Réf. Transfert
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-ref-transfert"
                                                        placeholder="Réf. Transfert"
                                                        type="text"
                                                        name="refTransfert"
                                                        value={archive.refTransfert}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-local-origine">
                                                        Local d'origine
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-local-origine"
                                                        placeholder="Local d'origine"
                                                        type="text"
                                                        name="localOrigine"
                                                        value={archive.localOrigine}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-correspondant">
                                                        Correspondant
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-correspondant"
                                                        placeholder="Correspondant"
                                                        type="text"
                                                        name="correspondant"
                                                        value={archive.correspondant}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-date-transfert">
                                                        Date de transfert
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-date-transfert"
                                                        type="date"
                                                        name="dateTransfert"
                                                        value={archive.dateTransfert}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-num-conteneur">
                                                        N° Conteneur
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-num-conteneur"
                                                        placeholder="N° Conteneur"
                                                        type="text"
                                                        name="numConteneur"
                                                        value={archive.numConteneur}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-emplacement">
                                                        Emplacement
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-emplacement"
                                                        placeholder="Emplacement"
                                                        type="text"
                                                        name="emplacement"
                                                        value={archive.emplacement}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-ref-entite">
                                                        REF Entité
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-ref-entite"
                                                        placeholder="REF Entité"
                                                        type="text"
                                                        name="refEntite"
                                                        value={archive.refEntite}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-code">
                                                        Code
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-code"
                                                        placeholder="Code"
                                                        type="text"
                                                        name="code"
                                                        value={archive.code}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-agence-unite">
                                                        Agence/Unité
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        id="input-agence-unite"
                                                        name="agenceUnite"
                                                        value={archive.agenceUnite}
                                                        onChange={handleSelectChange}
                                                        required
                                                    >
                                                        <option value="">Sélectionner une agence/unité</option>
                                                        {agencesUnites.map(agence => (
                                                            <option key={agence.id} value={agence.id}>{agence.nom}</option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-nature">
                                                        Nature
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        id="input-nature"
                                                        name="nature"
                                                        value={archive.nature}
                                                        onChange={handleSelectChange}
                                                        required
                                                    >
                                                        <option value="">Sélectionner une nature</option>
                                                        {natures.map(nature => (
                                                            <option key={nature.id} value={nature.id}>{nature.nom}</option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-annee-creation">
                                                        Année de création
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-annee-creation"
                                                        placeholder="Année de création"
                                                        type="text"
                                                        name="anneeCreation"
                                                        value={archive.anneeCreation}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-mois">
                                                        Mois
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-mois"
                                                        placeholder="Mois"
                                                        type="text"
                                                        name="mois"
                                                        value={archive.mois}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-jour">
                                                        Jour
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-jour"
                                                        placeholder="Jour"
                                                        type="text"
                                                        name="jour"
                                                        value={archive.jour}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <Label className="form-control-label" htmlFor="input-observations">
                                                        Observations
                                                    </Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-observations"
                                                        placeholder="Observations"
                                                        type="textarea"
                                                        name="observations"
                                                        value={archive.observations}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Button color="primary" type="submit">
                                        Mettre à jour
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Confirmation Modal */}
            <Modal isOpen={showConfirmation} toggle={() => setShowConfirmation(false)}>
                <ModalHeader toggle={() => setShowConfirmation(false)}>
                    Confirmation de mise à jour
                </ModalHeader>
                <ModalBody>
                    Êtes-vous sûr de vouloir mettre à jour l'archive ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={confirmUpdate}>
                        Confirmer
                    </Button>
                    <Button color="secondary" onClick={() => setShowConfirmation(false)}>
                        Annuler
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Success Modal */}
            <Modal isOpen={success} toggle={() => setSuccess(false)}>
                <ModalHeader>
                    Succès
                </ModalHeader>
                <ModalBody>
                    L'archive a été mise à jour avec succès.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setSuccess(false)}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Error Modal */}
            <Modal isOpen={error} toggle={() => setError(false)}>
                <ModalHeader>
                    Erreur
                </ModalHeader>
                <ModalBody>
                    Une erreur est survenue lors de la mise à jour de l'archive.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setError(false)}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UpdateArchive;
