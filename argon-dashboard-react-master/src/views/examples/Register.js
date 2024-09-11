import { faEnvelope, faIdBadge, faLock, faUser, faUserTie, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import Header from 'components/Headers/Header';
import { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

const Register = () => {
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    role: ""
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Fonction pour vérifier si le mot de passe est robuste
  const isPasswordStrong = (password) => {
    const passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
    return password.match(passwordPattern);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifie la robustesse du mot de passe avant l'envoi
    if (!isPasswordStrong(user.motDePasse)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, dont des chiffres, des lettres majuscules et minuscules, et des caractères spéciaux.");
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await axios.post("http://localhost:8080/utilisateurs/utilisateur", null, {
        params: {
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          motDePasse: user.motDePasse,
          role: user.role
        }
      });
      console.log("User created:", response.data);
      setSuccessMessage("Compte créé avec succès !");
      setErrorMessage('');
      setUser({
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        role: ""
      });
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Erreur lors de la création du compte. Veuillez vérifier vos informations.");
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Créer un compte</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Informations de l'utilisateur</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-nom">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Nom
                          </label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FontAwesomeIcon icon={faUser} />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Nom"
                              type="text"
                              name="nom"
                              value={user.nom}
                              onChange={handleChange}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-prenom">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Prénom
                          </label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FontAwesomeIcon icon={faUser} />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Prénom"
                              type="text"
                              name="prenom"
                              value={user.prenom}
                              onChange={handleChange}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Email
                          </label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FontAwesomeIcon icon={faEnvelope} />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              name="email"
                              value={user.email}
                              onChange={handleChange}
                              autoComplete="new-email"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-motDePasse">
                            <FontAwesomeIcon icon={faLock} className="mr-2" />
                            Mot de passe
                            <p className="text-muted" style={{ fontSize: '14px' }}>
                              Le mot de passe doit contenir au moins 8 caractères, avec des chiffres, des lettres majuscules et minuscules, et des caractères spéciaux.
                            </p>
                          </label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FontAwesomeIcon icon={faLock} />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Mot de passe"
                              type="password"
                              name="motDePasse"
                              value={user.motDePasse}
                              onChange={handleChange}
                              autoComplete="new-password"
                              required
                            />
                          </InputGroup>
                          {passwordError && (
                            <Alert color="danger" className="mt-2 text-center" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', color: '#dc3545', padding: '10px' }}>
                              <FontAwesomeIcon icon={faTimesCircle} className="mr-2" style={{ fontSize: '16px' }} />
                              <span style={{ fontSize: '14px' }}>{passwordError}</span>
                            </Alert>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-role">
                            <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                            Rôle
                          </label>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FontAwesomeIcon icon={faUserTie} />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="select"
                              name="role"
                              value={user.role}
                              onChange={handleChange}
                              required
                            >
                              <option value="" disabled>Sélectionner un rôle</option>
                              <option value="ADMINISTRATEUR">Administrateur</option>
                              <option value="CHARGE_DE_SAISIE">Chargé de saisie</option>
                              <option value="ARCHIVISTE">Archiviste</option>
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" className="text-center">
                        <Button className="mt-4" color="primary" type="submit">
                          Créer un compte
                        </Button>
                      </Col>
                    </Row>
                    {successMessage && (
                      <Alert color="success" className="mt-4 text-center" style={{ backgroundColor: '#d4edda', borderRadius: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', color: '#155724', padding: '10px' }}>
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" style={{ fontSize: '16px' }} />
                        <span style={{ fontSize: '14px' }}>{successMessage}</span>
                      </Alert>
                    )}
                    {errorMessage && (
                      <Alert color="danger" className="mt-4 text-center" style={{ backgroundColor: '#f8d7da', borderRadius: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', color: '#721c24', padding: '10px' }}>
                        <FontAwesomeIcon icon={faTimesCircle} className="mr-2" style={{ fontSize: '16px' }} />
                        <span style={{ fontSize: '14px' }}>{errorMessage}</span>
                      </Alert>
                    )}
                  </div>
                </Form>
                <Row className="mt-4">
                  <Col className="text-center">
                    <p className="text-muted">Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
