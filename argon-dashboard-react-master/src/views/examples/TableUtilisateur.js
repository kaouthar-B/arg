import { faEdit, faUserShield, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from "components/Headers/Header.js";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Input
} from "reactstrap";

const TableUtilisateur = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedUtilisateur, setSelectedUtilisateur] = useState(null);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        // Fetch all users initially
        const response = await axios.get(`http://localhost:8080/utilisateurs/afficher`);
        setUtilisateurs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };

    fetchUtilisateurs();
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    try {
      // Fetch users by name
      const response = await axios.get(`http://localhost:8080/utilisateurs/nom/${e.target.value}`);
      setUtilisateurs(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Erreur lors de la recherche des utilisateurs:", error);
    }
  };

  const toggleConfirmModal = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const handleDelete = () => {
    if (selectedUtilisateur) {
      axios.delete(`http://localhost:8080/utilisateurs/${selectedUtilisateur.id}`)
        .then(response => {
          console.log("Utilisateur supprimé avec succès :", response.data);
          setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.id !== selectedUtilisateur.id));
          setSelectedUtilisateur(null);
        })
        .catch(error => {
          console.error("Erreur lors de la suppression de l'utilisateur :", error);
        });
    }
    toggleConfirmModal();
  };

  const handleDeleteClick = (utilisateur) => {
    setSelectedUtilisateur(utilisateur);
    toggleConfirmModal();
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Liste des utilisateurs</h3>
                <Button tag={Link} to="/admin/register" className="btn btn-secondary mr-2">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Ajouter Utilisateur
                </Button>
                <Input
                  type="text"
                  placeholder="Rechercher par nom..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="mt-2"
                />
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type utilisateur</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {utilisateurs.map(utilisateur => (
                    <tr key={utilisateur.id}>
                      <td>{utilisateur.nom}</td>
                      <td>{utilisateur.prenom}</td>
                      <td>{utilisateur.email}</td>
                      <td>{utilisateur.typeUtilisateur}</td>
                      <td>
                        <Link to={`/admin/updateutilisateurform/${utilisateur.id}`} className="mr-2">
                          <FontAwesomeIcon icon={faEdit} className="text-info" />
                        </Link>
                        <Link to={`/admin/Habilitation/${utilisateur.id}`} className="mr-2">
                          <FontAwesomeIcon icon={faUserShield} className="text-warning" />
                        </Link>
                        <FontAwesomeIcon icon={faTrashAlt} className="text-danger" onClick={() => handleDeleteClick(utilisateur)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      <Modal isOpen={confirmModalOpen} toggle={toggleConfirmModal}>
        <ModalHeader toggle={toggleConfirmModal}>Confirmation</ModalHeader>
        <ModalBody>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleConfirmModal}>Annuler</Button>
          <Button color="primary" onClick={handleDelete}>Confirmer</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TableUtilisateur;
