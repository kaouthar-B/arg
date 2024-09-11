import axios from 'axios';
import Header from 'components/Headers/Header'; // Ajustez le chemin d'importation si nécessaire
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [initialUserProfile, setInitialUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/utilisateurs/info`);
        console.log("Profil utilisateur", response.data);
        setUserProfile(response.data);
        setInitialUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur", error.response?.data || "Erreur inconnue");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/utilisateurs/${userId}`, userProfile);
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil utilisateur", error.response?.data || "Erreur inconnue");
    }
  };

  const handleCancel = () => {
    setUserProfile(initialUserProfile);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put(`http://localhost:8080/utilisateurs/changerMotDePasse`, null, {
        params: {
          ancienMotDePasse: currentPassword,
          nouveauMotDePasse: newPassword
        }
      });
      setPasswordChangeError('');
      setCurrentPassword('');
      setNewPassword('');
      alert('Mot de passe changé avec succès');
    } catch (error) {
      if (error.response) {
        setPasswordChangeError(error.response.data);
      } else {
        setPasswordChangeError('Erreur inconnue');
      }
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h3>{`Bienvenue ${userProfile.prenom || 'utilisateur'}`}</h3>
                  <div className="h5 font-weight-300">{userProfile.typeUtilisateur || 'Type utilisateur non défini'}</div>
                  <div>{userProfile.email || 'Email non disponible'}</div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Mon compte</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">Informations utilisateur</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">Adresse e-mail</label>
                          <Input
                            className="form-control-alternative"
                            value={userProfile.email || ''}
                            id="input-email"
                            name="email"
                            type="email"
                            readOnly={!editMode}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">Prénom</label>
                          <Input
                            className="form-control-alternative"
                            value={userProfile.prenom || ''}
                            id="input-first-name"
                            name="prenom"
                            type="text"
                            readOnly={!editMode}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">Nom</label>
                          <Input
                            className="form-control-alternative"
                            value={userProfile.nom || ''}
                            id="input-last-name"
                            name="nom"
                            type="text"
                            readOnly={!editMode}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-type">Type d'utilisateur</label>
                          <Input
                            className="form-control-alternative"
                            value={userProfile.typeUtilisateur || ''}
                            id="input-type"
                            name="typeUtilisateur"
                            type="text"
                            readOnly={!editMode}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {editMode && (
                    <div className="text-center">
                      <Button
                        className="mr-4"
                        color="success"
                        onClick={handleSave}
                      >
                        Enregistrer
                      </Button>
                      <Button
                        color="danger"
                        onClick={handleCancel}
                      >
                        Annuler
                      </Button>
                    </div>
                  )}
                  <hr />
                  <h6 className="heading-small text-muted mb-4">Changer le mot de passe</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label className="form-control-label" htmlFor="input-current-password">Mot de passe actuel</label>
                      <Input
                        className="form-control-alternative"
                        id="input-current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label" htmlFor="input-new-password">Nouveau mot de passe</label>
                      <Input
                        className="form-control-alternative"
                        id="input-new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </FormGroup>
                    {passwordChangeError && (
                      <div className="text-danger">{passwordChangeError}</div>
                    )}
                    <div className="text-center">
                      <Button
                        color="primary"
                        onClick={handlePasswordChange}
                      >
                        Changer le mot de passe
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
