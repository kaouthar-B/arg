import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row
} from 'reactstrap';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/utilisateurs/authentifier", {
        email,
        password,
      });
      console.log("Login successful", response.data);

      const { userId, userType } = response.data;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userType', userType);

      if (userType === 'ADMINISTRATEUR') {
        navigate('/admin/AccueilAdmin');     // Redirect to Admin's homepage
      } else {
        navigate('/admin/AccueilHost');      // Redirect to Host's homepage
      }

    } catch (error) {
      console.error("Login error", error.response?.data || "Unknown error");
      setError("Email ou mot de passe invalide");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Row className="justify-content-center">
        <Col lg="6" md="8">
          <Card className="shadow border-0" style={cardStyle}>
            <CardBody className="px-lg-5 py-lg-5">
              <h2 className="text-center mb-4" style={{ color: "#00963A" }}>Bienvenue</h2>
              <Form role="form" onSubmit={handleLogin}>
                <FormGroup className="mb-3">
                  <div style={inputGroupStyle}>
                    <i className="ni ni-single-02" style={iconStyle}></i>
                    <Input
                      placeholder="Identifiant"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <div style={inputGroupStyle}>
                    <i className="ni ni-lock-circle-open" style={iconStyle}></i>
                    <Input
                      placeholder="Mot de passe"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </FormGroup>
                <FormGroup check className="mb-3 d-flex justify-content-between align-items-center">
                  <label>
                    <Input type="checkbox" style={checkboxStyle} />{' '}
                    Mémoriser mon identifiant
                  </label>
                  <a href="#" style={forgotPasswordStyle}>Mot de passe oublié ?</a>
                </FormGroup>
                {error && <Alert color="danger">{error}</Alert>}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" style={loginButtonStyle}>
                    Se connecter
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// Styles
const cardStyle = {
  border: '5px solid #00963A',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 0 60px rgba(0, 0, 0, 0.1)',
  width: '200%',
  maxWidth: '770px',
  margin: '0 auto'
};

const inputGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #00963A',
  borderRadius: '5px',
  padding: '5px 10px',
  marginBottom: '1rem'
};

const iconStyle = {
  color: '#00963A',
  marginRight: '10px'
};

const inputStyle = {
  border: 'none',
  outline: 'none',
  flex: 1
};

const checkboxStyle = {
  marginRight: '5px'
};

const forgotPasswordStyle = {
  color: '#00963A',
  textDecoration: 'none',
  fontSize: '14px'
};

const loginButtonStyle = {
  backgroundColor: '#00963A',
  border: 'none',
  color: 'white',
  borderRadius: '5px',
  padding: '15px 15px',
  fontSize: '1rem',
  width: '100%'
};

export default Login;
