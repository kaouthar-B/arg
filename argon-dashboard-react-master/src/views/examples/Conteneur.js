import { faEdit, faFileExport, faFileImport, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

const Conteneur = () => {
    const [conteneursList, setConteneursList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [searchStatus, setSearchStatus] = useState(''); // État pour le filtre de statut

    useEffect(() => {
        fetchConteneurs();
    }, []);

    const fetchConteneurs = (status = '') => {
        const siteId = 1; // Remplacez par l'ID de site approprié
        const url = status ? `http://localhost:8080/api/conteneur/status/${siteId}/${status}` : "http://localhost:8080/api/conteneur/all";
        axios.get(url)
            .then(response => {
                setConteneursList(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des conteneurs:", error);
            });
    };

    const toggleConfirmModal = () => {
        setConfirmModalOpen(!confirmModalOpen);
    };

    const handleRowClick = (id) => {
        const isSelected = selectedRows.includes(id);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleDeleteClick = () => {
        if (selectedRows.length > 0) {
            toggleConfirmModal();
        }
    };

    const handleConfirmDelete = () => {
        Promise.all(selectedRows.map(id =>
            axios.delete(`http://localhost:8080/api/conteneur/conteneurs/${id}`)
                .then(response => {
                    return id;
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression d'un conteneur :", error);
                    return null;
                })
        ))
            .then(deletedIds => {
                const filteredIds = deletedIds.filter(id => id !== null);
                setConteneursList(conteneursList.filter(conteneur => !filteredIds.includes(conteneur.id)));
            })
            .catch(error => {
                console.error("Erreur lors de la suppression des conteneurs :", error);
            });

        setSelectedRows([]);
        toggleConfirmModal();
    };

    const handleImportClick = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post("http://localhost:8080/api/conteneur/conteneurs/import", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("Conteneurs importés avec succès");
                fetchConteneurs(); // Réactualiser la liste des conteneurs après l'import
            })
            .catch(error => {
                console.error("Erreur lors de l'importation des conteneurs :", error);
            });
    };

    const handleExportClick = () => {
        if (selectedRows.length > 0) {
            axios.get(`http://localhost:8080/api/conteneur/conteneurs/export?ids=${selectedRows.join(',')}`, {
                responseType: 'blob'
            })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'conteneurs_export.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                })
                .catch(error => {
                    console.error("Erreur lors de l'exportation des conteneurs :", error);
                });
        }
    };

    const handleSearchChange = (event) => {
        const selectedStatus = event.target.value;
        setSearchStatus(selectedStatus);
        fetchConteneurs(selectedStatus);
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">Liste des conteneurs</h3>
                                <div className="d-flex align-items-center mt-3">
                                    <input type="file" accept=".xlsx" onChange={handleImportClick} style={{ display: 'none' }} id="fileInput" />
                                    <label htmlFor="fileInput" className="btn btn-secondary mr-2">
                                        <FontAwesomeIcon icon={faFileImport} className="mr-2" /> Importer
                                    </label>
                                    <button onClick={handleExportClick} className="btn btn-secondary mr-2" disabled={selectedRows.length === 0}>
                                        <FontAwesomeIcon icon={faFileExport} className="mr-2" /> Exporter
                                    </button>
                                    <Link to="/admin/AjoutConteneur" className="btn btn-secondary mr-2">
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" /> Créer
                                    </Link>
                                    <Link
                                        to={`/admin/UpdateConteneur/${selectedRows.length === 1 ? selectedRows[0] : ''}`}
                                        className={`btn btn-secondary mr-2 ${selectedRows.length !== 1 ? 'disabled' : ''}`}
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier
                                    </Link>
                                    <button onClick={handleDeleteClick} className="btn btn-secondary mr-2" disabled={selectedRows.length === 0}>
                                        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Supprimer
                                    </button>
                                    <select value={searchStatus} onChange={handleSearchChange} className="btn btn-secondary mr-2">
                                        <option value="">Tous les Statuts</option>
                                        <option value="TOTAL_SATURE">Totalement saturés</option>
                                        <option value="QUASI_SATURE">Quasiment saturés</option>
                                        <option value="VIDE">Vides</option>
                                    </select>
                                </div>
                            </CardHeader>
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Numéro</th>
                                        <th scope="col">Site d'Archivage</th>
                                        <th scope="col">Emplacement</th>
                                        <th scope="col">Statut</th>
                                        <th scope="col">Type d'Affectation</th>
                                        <th scope="col">Archives</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {conteneursList.map(conteneur => (
                                        <tr
                                            key={conteneur.id}
                                            onClick={() => handleRowClick(conteneur.id)}
                                            className={selectedRows.includes(conteneur.id) ? 'table-active' : ''}
                                        >
                                            <td>{conteneur.id}</td>
                                            <td>{conteneur.numero}</td>
                                            <td>{conteneur.siteArchivage}</td>
                                            <td>{conteneur.emplacement}</td>
                                            <td>{conteneur.status}</td>
                                            <td>{conteneur.typeAffectation}</td>
                                            <td>
                                                <Link to={`/admin/archives/${conteneur.id}`} className="text-white">
                                                    Voir Archives
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>

            {/* Modal de confirmation pour la suppression */}
            <Modal isOpen={confirmModalOpen} toggle={toggleConfirmModal}>
                <ModalHeader toggle={toggleConfirmModal}>Confirmer la suppression</ModalHeader>
                <ModalBody>
                    Voulez-vous vraiment supprimer les {selectedRows.length} éléments sélectionnés ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleConfirmModal}>Annuler</Button>
                    <Button color="primary" onClick={handleConfirmDelete}>Supprimer</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Conteneur;
