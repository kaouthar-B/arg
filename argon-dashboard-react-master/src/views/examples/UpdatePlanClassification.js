import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useRef } from 'react';
import * as XLSX from 'xlsx';

const UpdatePlanClassification = () => {
    const { id } = useParams();
    const [planClassification, setPlanClassification] = useState({
        proprietaire: '',
        entitesRattachees: '',
        ref: '',
        codeEntite: '',
        agences: '',
        categoriesArchive: '',
        code: ''
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/planClassification/${id}`)
            .then(response => {
                setPlanClassification(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du Plan de Classification :", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlanClassification(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmUpdate = () => {
        const url = `http://localhost:8080/api/planClassification/update`;

        const params = {
            oldNomProprietaire: 'ancienProprietaire', // Remplacez par les valeurs appropriées
            newNomProprietaire: planClassification.proprietaire,
            oldNomEntite: 'ancienneEntite', // Remplacez par les valeurs appropriées
            newNomEntite: planClassification.entitesRattachees,
            newRef: planClassification.ref,
            newCodeEntite: planClassification.codeEntite,
            oldNomAgence: 'ancienneAgence', // Remplacez par les valeurs appropriées
            newNomAgence: planClassification.agences,
            oldNomCategorie: 'ancienneCategorie', // Remplacez par les valeurs appropriées
            newNomCategorie: planClassification.categoriesArchive,
            newCodeCategorie: planClassification.code
        };

        axios.put(url, planClassification, { params })
            .then(response => {
                console.log("Plan de Classification mis à jour avec succès :", response.data);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setShowConfirmation(false);
                }, 3000);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du Plan de Classification :", error);
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setShowConfirmation(false);
                }, 3000);
            });
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const importedData = {
                proprietaire: data[1][0] || '',
                entitesRattachees: data[1][1] || '',
                ref: data[1][2] || '',
                codeEntite: data[1][3] || '',
                agences: data[1][4] || '',
                categoriesArchive: data[1][5] || '',
                code: data[1][6] || ''
            };

            setPlanClassification(importedData);
        };
        reader.readAsBinaryString(file);
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
                                        <h3 className="mb-0">Modifier le Plan de Classification</h3>
                                    </Col>
                                    <Col className="text-right">
                                        <Button
                                            color="primary"
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            Importer
                                        </Button>
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleImport}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h6 className="heading-small text-muted mb-4">Informations du Plan de Classification</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-proprietaire">
                                                        Propriétaire des archives
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-proprietaire"
                                                        placeholder="Propriétaire des archives"
                                                        type="text"
                                                        name="proprietaire"
                                                        value={planClassification.proprietaire}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-entitesRattachees">
                                                        Entités Rattachées
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-entitesRattachees"
                                                        placeholder="Entités Rattachées"
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
                                                    <label className="form-control-label" htmlFor="input-ref">
                                                        Référence
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-ref"
                                                        placeholder="Référence"
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
                                                    <label className="form-control-label" htmlFor="input-codeEntite">
                                                        Code Entité
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-codeEntite"
                                                        placeholder="Code Entité"
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
                                                    <label className="form-control-label" htmlFor="input-agences">
                                                        Agences (optionnel)
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-agences"
                                                        placeholder="Agences"
                                                        type="text"
                                                        name="agences"
                                                        value={planClassification.agences}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-categoriesArchive">
                                                        Catégories d'archive
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-categoriesArchive"
                                                        placeholder="Catégories d'archive"
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
                                                    <label className="form-control-label" htmlFor="input-code">
                                                        Code
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-code"
                                                        placeholder="Code"
                                                        type="text"
                                                        name="code"
                                                        value={planClassification.code}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Button color="primary" type="submit">Mettre à jour</Button>
                                </Form>
                                {showConfirmation && (
                                    <Modal isOpen={showConfirmation} toggle={() => setShowConfirmation(false)}>
                                        <ModalHeader toggle={() => setShowConfirmation(false)}>Confirmation</ModalHeader>
                                        <ModalBody>Voulez-vous vraiment mettre à jour ce Plan de Classification ?</ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={confirmUpdate}>Confirmer</Button>{' '}
                                            <Button color="secondary" onClick={() => setShowConfirmation(false)}>Annuler</Button>
                                        </ModalFooter>
                                    </Modal>
                                )}
                                {success && (
                                    <div className="alert alert-success mt-3">
                                        <FontAwesomeIcon icon={faCheckCircle} /> Plan de Classification mis à jour avec succès !
                                    </div>
                                )}
                                {error && (
                                    <div className="alert alert-danger mt-3">
                                        <FontAwesomeIcon icon={faTimesCircle} /> Erreur lors de la mise à jour du Plan de Classification.
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UpdatePlanClassification;
