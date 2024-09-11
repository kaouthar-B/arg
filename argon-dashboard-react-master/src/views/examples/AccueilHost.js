import Header from 'components/Headers/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

const AccueilHost = () => {
    const userType = localStorage.getItem('userType');
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    // Définition du style de fond en utilisant une constante
    const bgGradientGray = {
        background: 'linear-gradient(100deg, #f8f9fa 0, #e9ecef 100%)'
    };

    const brownColor = '#8B4513';

    const brownBorderButton = {
        borderColor: brownColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        color: brownColor
    };

    const iconStyle = {
        height: '40px',
        width: '40px',
        color: brownColor
    };

    const textStyle = {
        color: brownColor
    };

    return (
        <>
            <Header />
            <div style={bgGradientGray} className="py-7 py-lg-8">
                <Container className="mt--7" fluid>
                    <Row className="justify-content-center">
                        <Col lg="10" md="12">
                            <Row>
                                {/* Liste Devises */}
                                <Col lg="3" md="6" className="mb-3">
                                    <Card className="card-lift--hover shadow border-0" style={{ padding: '0.5rem', minHeight: '200px' }}>
                                        <CardBody className="py-2">
                                            <div className="icon icon-shape rounded-circle mb-3" style={iconStyle}>
                                                <i className="ni ni-money-coins"></i>
                                            </div>
                                            <h6 className="text-uppercase" style={textStyle}>Gestion des sites d'archivage</h6>
                                            <p className="description mt-2 mb-1" style={textStyle}>Gérer la liste des sites archivage</p>
                                            <Button
                                                tag={Link}
                                                to="/admin/SiteArchivage"
                                                block
                                                className="mt-2"
                                                style={{ fontSize: '0.8rem', padding: '0.5rem', ...brownBorderButton }}
                                            >
                                                Accéder
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>

                                {/* Profil */}
                                <Col lg="3" md="6" className="mb-3">
                                    <Card className="card-lift--hover shadow border-0" style={{ padding: '0.5rem', minHeight: '200px' }}>
                                        <CardBody className="py-2">
                                            <div className="icon icon-shape rounded-circle mb-3" style={iconStyle}>
                                                <i className="ni ni-single-02"></i>
                                            </div>
                                            <h6 className="text-uppercase" style={textStyle}>Profil</h6>
                                            <p className="description mt-2 mb-1" style={textStyle}>Gérer votre profil</p>
                                            <Button
                                                tag={Link}
                                                to="/admin/user-profile"
                                                block
                                                className="mt-2"
                                                style={{ fontSize: '0.8rem', padding: '0.5rem', ...brownBorderButton }}
                                            >
                                                Accéder
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>

                                {/* Boîte Messagerie */}
                                <Col lg="3" md="6" className="mb-3">
                                    <Card className="card-lift--hover shadow border-0" style={{ padding: '0.5rem', minHeight: '200px' }}>
                                        <CardBody className="py-2">
                                            <div className="icon icon-shape rounded-circle mb-3" style={iconStyle}>
                                                <i className="ni ni-email-83"></i>
                                            </div>
                                            <h6 className="text-uppercase" style={textStyle}>Boîte Messagerie</h6>
                                            <p className="description mt-2 mb-1" style={textStyle}>Consultez vos notifications.</p>
                                            <Button
                                                tag={Link}
                                                to="/boite-messagerie"
                                                block
                                                className="mt-2"
                                                style={{ fontSize: '0.8rem', padding: '0.5rem', ...brownBorderButton }}
                                            >
                                                Accéder
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>

                                {/* Tableau de Bord */}
                                <Col lg="3" md="6" className="mb-3">
                                    <Card className="card-lift--hover shadow border-0" style={{ padding: '0.5rem', minHeight: '200px' }}>
                                        <CardBody className="py-2">
                                            <div className="icon icon-shape rounded-circle mb-3" style={iconStyle}>
                                                <i className="ni ni-chart-bar-32"></i>
                                            </div>
                                            <h6 className="text-uppercase" style={textStyle}>Tableau de Bord</h6>
                                            <p className="description mt-2 mb-1" style={textStyle}>Voir le tableau de bord pour les activités récentes</p>
                                            <Button
                                                tag={Link}
                                                to="/admin/index"
                                                block
                                                className="mt-2"
                                                style={{ fontSize: '0.8rem', padding: '0.5rem', ...brownBorderButton }}
                                            >
                                                Accéder
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>

                                {/* Rangée de Cartes Centrées */}
                                <Col lg="6" className="offset-lg-3" md="12">
                                    <Row>
                                        {/* Liste des cours de la journée */}
                                        <Col lg="6" md="6" className="mb-3">
                                            <Card className="card-lift--hover shadow border-0" style={{ padding: '0.5rem', minHeight: '200px' }}>
                                                <CardBody className="py-2">
                                                    <div className="icon icon-shape rounded-circle mb-3" style={iconStyle}>
                                                        <i className="ni ni-calendar-grid-58"></i>
                                                    </div>
                                                    <h6 className="text-uppercase" style={textStyle}>Liste des archives</h6>
                                                    <p className="description mt-2 mb-1" style={textStyle}>Afficher la liste des archives</p>
                                                    <Button
                                                        tag={Link}
                                                        to="/admin/Archive"
                                                        block
                                                        className="mt-2"
                                                        style={{ fontSize: '0.8rem', padding: '0.5rem', ...brownBorderButton }}
                                                    >
                                                        Accéder
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        </Col>

                                        {/* Liste des cours en attente */}
                                        <Col lg="6" md="6" className="mb-3">
                                            <Card className="card-lift--hover shadow border-0" style={{ padding: '0.5rem', minHeight: '200px' }}>
                                                <CardBody className="py-2">
                                                    <div className="icon icon-shape rounded-circle mb-3" style={iconStyle}>
                                                        <i className="ni ni-time-alarm"></i>
                                                    </div>
                                                    <h6 className="text-uppercase" style={textStyle}>Liste des conteneurs</h6>
                                                    <p className="description mt-2 mb-1" style={textStyle}>Afficher La liste des conteneurs.</p>
                                                    <Button
                                                        tag={Link}
                                                        to="/admin/Conteneur"
                                                        block
                                                        className="mt-2"
                                                        style={{ fontSize: '0.8rem', padding: '0.5rem', ...brownBorderButton }}
                                                    >
                                                        Accéder
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default AccueilHost;
