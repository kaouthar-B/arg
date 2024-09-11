import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from "components/Headers/Header.js";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

const NotificationBox = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modal, setModal] = useState(false);
    const [confirmAllModal, setConfirmAllModal] = useState(false);
    const [userType, setUserType] = useState(localStorage.getItem('userType')); // Récupération du type d'utilisateur depuis le localStorage
    const navigate = useNavigate();

    const fetchNotifications = () => {
        axios.get("http://localhost:8080/api/cours/notifications")
            .then(response => {
                const filteredNotifications = response.data.filter(notification => {
                    // Ne pas afficher les notifications d'ajout si le cours est validé ou refusé
                    if (notification.type === 'Ajout' && (notification.cours.statut === 'Validé' || notification.cours.statut === 'Refusé')) {
                        return false;
                    }
                    if (userType === 'FrontOffice' || userType === 'admin') {
                        return notification.type === 'Validation' || notification.type === 'Refus';
                    }
                    if (userType === 'MiddleOffice') {
                        return notification.type === 'Ajout';
                    }
                    return false;
                });

                const sortedNotifications = filteredNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setNotifications(sortedNotifications.map(notification => ({
                    ...notification,
                    idCours: notification.cours ? notification.cours.idCours : null,
                    isNew: !notification.read
                })));
            })
            .catch(error => {
                console.error("Error fetching notifications:", error);
            });
    };

    useEffect(() => {
        if (userType) {
            fetchNotifications();
            const intervalId = setInterval(fetchNotifications, 5000); // Refresh every 5 seconds
            return () => clearInterval(intervalId);
        }
    }, [userType]);

    const handleNotificationClick = (notification) => {
        if (notification.idCours) {
            navigate(`/admin/DetailCours/${notification.idCours}`);
        } else {
            console.error('Invalid course ID');
        }
    };

    const toggleModal = () => setModal(!modal);

    const toggleConfirmAllModal = () => setConfirmAllModal(!confirmAllModal);

    const confirmDeleteNotification = (notification) => {
        setSelectedNotification(notification);
        toggleModal();
    };

    const deleteNotification = () => {
        if (selectedNotification) {
            axios.delete(`http://localhost:8080/api/cours/notifications/${selectedNotification.notificationID}`)
                .then(() => {
                    setNotifications(notifications.filter(notification => notification.notificationID !== selectedNotification.notificationID));
                    setSelectedNotification(null);
                    toggleModal();
                })
                .catch(error => {
                    console.error("Error deleting notification:", error);
                });
        }
    };

    const deleteAllNotifications = () => {
        axios.delete(`http://localhost:8080/api/cours/notifications`)
            .then(() => {
                setNotifications([]);
                toggleConfirmAllModal();
            })
            .catch(error => {
                console.error("Error deleting all notifications:", error);
            });
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="justify-content-center">
                    <Card className="shadow w-100">
                        <CardBody>
                            <Button color="primary" onClick={toggleConfirmAllModal}>Dismiss All</Button>
                            <Table className="align-items-center table-flush" style={{marginTop: '20px'}}>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notifications.map((notification, index) => (
                                        <tr key={index} onClick={() => handleNotificationClick(notification)}>
                                            <td><i className={`fas fa-exclamation-triangle text-${notification.type.toLowerCase()}`}></i> {notification.type}</td>
                                            <td>{notification.content}</td>
                                            <td>
                                                <Button color="primary" onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/admin/DetailCours/${notification.idCours}`);
                                                }}>
                                                    Details
                                                </Button>
                                                <Button color="danger" onClick={(e) => {
                                                    e.stopPropagation();
                                                    confirmDeleteNotification(notification);
                                                }}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {notifications.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-center">No notifications at the moment.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Row>
            </Container>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Confirmation de suppression</ModalHeader>
                <ModalBody className="text-center">
                    <FontAwesomeIcon icon={faTrashAlt} size="4x" className="text-danger mb-3" />
                    <p>Êtes-vous sûr de vouloir supprimer cette notification ? Cette action est irréversible.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteNotification}>Supprimer</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Annuler</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={confirmAllModal} toggle={toggleConfirmAllModal}>
                <ModalHeader toggle={toggleConfirmAllModal}>Confirmation de suppression</ModalHeader>
                <ModalBody className="text-center">
                    <FontAwesomeIcon icon={faTrashAlt} size="4x" className="text-danger mb-3" />
                    <p>Êtes-vous sûr de vouloir supprimer toutes les notifications ? Cette action est irréversible.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteAllNotifications}>Supprimer</Button>{' '}
                    <Button color="secondary" onClick={toggleConfirmAllModal}>Annuler</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default NotificationBox;
