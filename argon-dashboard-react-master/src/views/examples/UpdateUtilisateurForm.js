import { faCalendar, faCheckCircle, faEnvelope, faTimesCircle, faUser, faUserEdit, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label,
  Modal, ModalBody, ModalFooter, ModalHeader, Row
} from 'reactstrap';

const UpdateUtilisateurForm = () => {
  const { id } = useParams(); // Récupération de l'id utilisateur depuis les paramètres de l'URL
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const [utilisateur, setUtilisateur] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Récupérer les détails de l'utilisateur au chargement du composant
  useEffect(() => {
    axios.get(`http://localhost:8080/utilisateurs/utilisateur/${id}`)
      .then(response => {
        setUtilisateur({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          role: response.data.role
        });
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      });
  }, [id]);

  // Fonction pour gérer les changements de champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUtilisateur(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  // Fonction pour confirmer la mise à jour
  const confirmUpdate = () => {
    axios.put(`http://localhost:8080/utilisateurs/utilisateur/${id}`, null, {
      params: {
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    })
      .then(response => {
        console.log("Utilisateur modifié avec succès :", response.data);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setShowConfirmation(false);
          navigate('/path-to-the-user-list'); // Changez ceci en fonction du chemin correct
        }, 3000);
      })
      .catch(error => {
        console.error("Erreur lors de la modification de l'utilisateur :", error);
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
                    <h3 className="mb-0"><FontAwesomeIcon icon={faUserEdit} className="mr-2" />Modifier Utilisateur</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Informations utilisateur</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-nom">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Nom
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom"
                            type="text"
                            name="nom"
                            value={utilisateur.nom}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-prenom">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Prénom
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-prenom"
                            type="text"
                            name="prenom"
                            value={utilisateur.prenom}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-email">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Email
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            type="email"
                            name="email"
                            value={utilisateur.email}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-role">
                            <FontAwesomeIcon icon={faUserTag} className="mr-2" />
                            Rôle utilisateur
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="input-role"
                            type="text"
                            name="role"
                            value={utilisateur.role}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
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
          Confirmer la modification
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            {success && (
              <>
                <FontAwesomeIcon icon={faCheckCircle} size="3x" color="success" className="mb-3" />
                <p className="text-success">Utilisateur modifié avec succès</p>
              </>
            )}
            {error && (
              <>
                <FontAwesomeIcon icon={faTimesCircle} size="3x" color="danger" className="mb-3" />
                <p className="text-danger">Erreur lors de la modification de l'utilisateur</p>
              </>
            )}
            {!success && !error && (
              <>
                <p>Voulez-vous vraiment modifier cet utilisateur ?</p>
                <p>Cette action mettra à jour les informations de l'utilisateur avec les données suivantes : </p>
                <pre>{JSON.stringify(utilisateur, null, 2)}</pre>
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

export default UpdateUtilisateurForm;
