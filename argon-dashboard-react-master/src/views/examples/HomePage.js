import image from 'assets/img/brand/bourse.png';
import logo from 'assets/img/brand/image.png'; // Importez votre image logo
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

const HomePage = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLoginClick = () => {
    navigate('/auth/login'); // Rediriger vers la page de connexion
  };

  return (
    <div className="HomePage" style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={headerStyle}>
        <Container>
          <Row>
            <Col style={logoStyle}>
              <img src={logo} alt="GCAM" style={logoImageStyle} />
            </Col>
            <Col className="text-right" style={loginButtonContainerStyle}>
              <Button style={loginButtonStyle} onClick={handleLoginClick}>Connexion</Button>
            </Col>
          </Row>
        </Container>
      </header>
      <main style={mainContentStyle}>
        <Container>
          <Row className="text-center">
            <Col>
              <h1 style={mainHeadingStyle}>GÉRER VOS <span style={highlightStyle}>ARCHIVES BANCAIRES</span></h1>
              <Button style={ctaButtonStyle}>AVEC SIMPLICITÉ ET EFFICACITÉ</Button>
            </Col>
          </Row>
          <Row style={descriptionSectionStyle}>
            <Col xs="12" md="6">
              <p style={descriptionTextStyle}>
                Bienvenue sur votre plateforme de gestion des archives. Profitez d’une interface facile à utiliser et d’un accès rapide à vos archives.
              </p>
            </Col>
            <Col xs="12" md="6" style={imageSectionStyle}>
              <img src={image} alt="People" style={peopleImageStyle} />
            </Col>
          </Row>
          <Row className="text-center" style={featureSectionStyle}>
            <Col xs="12" md="4">
              <div style={featureBoxStyle}>
                <i className="fas fa-user-friends" style={featureIconStyle}></i>
                <h3 style={featureHeadingStyle}>Facilité d'utilisation</h3>
                <p style={featureTextStyle}>Une interface utilisateur intuitive pour une gestion sans effort.</p>
              </div>
            </Col>
            <Col xs="12" md="4">
              <div style={featureBoxStyle}>
                <i className="fas fa-shield-alt" style={featureIconStyle}></i>
                <h3 style={featureHeadingStyle}>Sécurité</h3>
                <p style={featureTextStyle}>Une organisation sécurisée pour protéger vos informations sensibles.</p>
              </div>
            </Col>
            <Col xs="12" md="4">
              <div style={featureBoxStyle}>
                <i className="fas fa-clock" style={featureIconStyle}></i>
                <h3 style={featureHeadingStyle}>Efficacité</h3>
                <p style={featureTextStyle}>Un accées rapide pour une optimisation de votre temps.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

// Styles
const headerStyle = {
  backgroundColor: 'white',
  padding: '10px 0',
  borderBottom: '1px solid #eaeaea',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center'
};

const logoImageStyle = {
  height: '90px',
  width: '100px',
};

const loginButtonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
};

const loginButtonStyle = {
  backgroundColor: '#00963A',
  border: 'none',
  color: 'white',
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '1rem'
};

const mainContentStyle = {
  textAlign: 'center',
  padding: '50px 0',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const mainHeadingStyle = {
  fontSize: '2.5rem',
  marginBottom: '20px',
  color: '#333'
};

const highlightStyle = {
  color: '#00963A'
};

const ctaButtonStyle = {
  backgroundColor: '#00963A',
  border: 'none',
  color: 'white',
  fontSize: '1.2rem',
  padding: '10px 20px',
  borderRadius: '20px',
  marginTop: '20px'
};

const descriptionSectionStyle = {
  backgroundColor: '#00963A',
  color: 'white',
  padding: '30px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const descriptionTextStyle = {
  fontSize: '1.2rem',
  padding: '20px'
};

const imageSectionStyle = {
  textAlign: 'center'
};

const peopleImageStyle = {
  maxWidth: '100%',
  height: 'auto'
};

const featureSectionStyle = {
  marginTop: '50px',
  padding: '20px 0'
};

const featureBoxStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  margin: '10px 0'
};

const featureIconStyle = {
  fontSize: '2rem',
  color: '#00963A',
  marginBottom: '10px'
};

const featureHeadingStyle = {
  fontSize: '1.5rem',
  marginBottom: '10px',
  color: '#333'
};

const featureTextStyle = {
  fontSize: '1rem',
  color: '#666'
};

export default HomePage;
