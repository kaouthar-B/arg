import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { app } from '../../firebase-config';
import { getMessaging, onMessage } from 'firebase/messaging';

const AjoutArchive = () => {
    const [archive, setArchive] = useState({
        devise: '',
        refTransfert: '',
        localOrigine: '',
        correspondant: '',
        dateTransfert: '',
        emplacement: '',
        numeroConteneur: '',
        refEnt: '',
        code: '',
        agenceUnite: '',
        nature: '',
        anneeCreation: '',
        mois: '',
        jour: '',
        observations: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [devises, setDevises] = useState([]);
    const [agencesUnites, setAgencesUnites] = useState([]);
    const [natures, setNatures] = useState([]);
    const [userId, setUserId] = useState('1'); // ID utilisateur à définir
    const [entiteRattacheeId, setEntiteRattacheeId] = useState(null); // ID à définir
    const [categorieArchiveId, setCategorieArchiveId] = useState(null); // ID à définir
    const [agenceId, setAgenceId] = useState(null); // ID à définir

    useEffect(() => {
        const messaging = getMessaging(app);

        // Chargement des devises
        axios.get("http://localhost:8080/api/devise/liste")
            .then(response => setDevises(response.data))
            .catch(error => console.error("Erreur lors du chargement des devises:", error));

        // Chargement des agences/unités
        axios.get("http://localhost:8080/api/agenceUnite/liste")
            .then(response => setAgencesUnites(response.data))
            .catch(error => console.error("Erreur lors du chargement des agences/unités:", error));

        // Chargement des natures
        axios.get("http://localhost:8080/api/nature/liste")
            .then(response => setNatures(response.data))
            .catch(error => console.error("Erreur lors du chargement des natures:", error));

        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            alert(`Message reçu: ${payload.notification.title} - ${payload.notification.body}`);
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArchive(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/archives/add", archive, {
            params: {
                userId: userId,
                entiteRattacheeId: entiteRattacheeId,
                categorieArchiveId: categorieArchiveId,
                agenceId: agenceId,
                titreHistorique: "Ajout d'une nouvelle archive" // Exemple de titre pour l'historique
            }
        })
        .then(response => {
            console.log("Archive ajoutée avec succès:", response.data);
            setSuccessMessage("Archive ajoutée avec succès !");
            setErrorMessage('');
            setArchive({
                devise: '',
                refTransfert: '',
                localOrigine: '',
                correspondant: '',
                dateTransfert: '',
                emplacement: '',
                numeroConteneur: '',
                refEnt: '',
                code: '',
                agenceUnite: '',
                nature: '',
                anneeCreation: '',
                mois: '',
                jour: '',
                observations: ''
            });
        })
        .catch(error => {
            console.error("Erreur lors de l'ajout d'archive:", error);
            setErrorMessage("Erreur lors de l'ajout d'archive. Veuillez vérifier les informations.");
            setSuccessMessage('');
        });
    };

    const handleImport = () => {
        // Logique pour gérer l'importation
        alert('La fonction d\'importation n\'est pas encore implémentée.');
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
                                        <h3 className="mb-0">Créer une archive</h3>
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
                                    <h6 className="heading-small text-muted mb-4">Informations sur l'archive</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-devise">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Entité
                                                    </label>
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            id="input-devise"
                                                            name="devise"
                                                            value={archive.devise}
                                                            onChange={handleInputChange}
                                                            required
                                                        >
                                                            <option value="">Sélectionner une entité</option>
                                                            {devises.map(devise => (
                                                                <option key={devise.code_devise} value={devise.code_devise}>
                                                                    {devise.code_devise}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-ref-transfert">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        REF. TRANSFERT
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-ref-transfert"
                                                        placeholder="Saisir la référence de transfert"
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
                                                    <label className="form-control-label" htmlFor="input-local-origine">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Local d'origine
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-local-origine"
                                                        placeholder="Saisir le local d'origine"
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
                                                    <label className="form-control-label" htmlFor="input-correspondant">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Correspondant
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-correspondant"
                                                        placeholder="Saisir le correspondant"
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
                                                    <label className="form-control-label" htmlFor="input-date-transfert">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Date de transfert
                                                    </label>
                                                    <Input
                                                        className="form-control"
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
                                                    <label className="form-control-label" htmlFor="input-emplacement">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Emplacement
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-emplacement"
                                                        placeholder="Saisir l'emplacement"
                                                        type="text"
                                                        name="emplacement"
                                                        value={archive.emplacement}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-numero-conteneur">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Numéro du conteneur
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-numero-conteneur"
                                                        placeholder="Saisir le numéro du conteneur"
                                                        type="text"
                                                        name="numeroConteneur"
                                                        value={archive.numeroConteneur}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-ref-entite">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Référence Entité
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-ref-entite"
                                                        placeholder="Saisir la référence de l'entité"
                                                        type="text"
                                                        name="refEnt"
                                                        value={archive.refEnt}
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
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Code
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-code"
                                                        placeholder="Saisir le code"
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
                                                    <label className="form-control-label" htmlFor="input-agence-unite">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Agence/Unité
                                                    </label>
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            id="input-agence-unite"
                                                            name="agenceUnite"
                                                            value={archive.agenceUnite}
                                                            onChange={handleInputChange}
                                                            required
                                                        >
                                                            <option value="">Sélectionner une agence/unité</option>
                                                            {agencesUnites.map(agence => (
                                                                <option key={agence.id} value={agence.id}>
                                                                    {agence.nom}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-nature">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Nature
                                                    </label>
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            id="input-nature"
                                                            name="nature"
                                                            value={archive.nature}
                                                            onChange={handleInputChange}
                                                            required
                                                        >
                                                            <option value="">Sélectionner une nature</option>
                                                            {natures.map(nature => (
                                                                <option key={nature.id} value={nature.id}>
                                                                    {nature.nom}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-annee-creation">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Année de création
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-annee-creation"
                                                        placeholder="Saisir l'année de création"
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
                                                    <label className="form-control-label" htmlFor="input-mois">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Mois
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-mois"
                                                        placeholder="Saisir le mois"
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
                                                    <label className="form-control-label" htmlFor="input-jour">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Jour
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-jour"
                                                        placeholder="Saisir le jour"
                                                        type="text"
                                                        name="jour"
                                                        value={archive.jour}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-observations">
                                                        <FontAwesomeIcon className="mr-2" />
                                                        Observations
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        id="input-observations"
                                                        placeholder="Ajouter des observations"
                                                        type="text"
                                                        name="observations"
                                                        value={archive.observations}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit">
                                            Ajouter
                                        </Button>
                                    </div>
                                </Form>
                                {successMessage && <Alert color="success">{successMessage}</Alert>}
                                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AjoutArchive;
