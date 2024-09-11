import { faEdit, faFileExport, faFileImport, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

const Archive = () => {
    const [archivesList, setArchivesList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [userType, setUserType] = useState(localStorage.getItem('userType') || '');

    useEffect(() => {
        axios.get("http://localhost:8080/api/archives")
            .then(response => {
                setArchivesList(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des archives:", error);
            });
    }, []);

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
            axios.delete(`http://localhost:8080/api/archives/${id}`)
                .then(response => {
                    return id;
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression d'archive :", error);
                    return null;
                })
        ))
            .then(deletedIds => {
                const filteredIds = deletedIds.filter(id => id !== null);
                setArchivesList(archivesList.filter(archive => !filteredIds.includes(archive.id)));
            })
            .catch(error => {
                console.error("Erreur lors de la suppression d'archive :", error);
            });

        setSelectedRows([]);
        toggleConfirmModal();
    };

    const handleImportClick = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post("http://localhost:8080/api/archives/import", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("Données importées avec succès :", response.data);
                axios.get("http://localhost:8080/api/archives")
                    .then(response => {
                        setArchivesList(response.data);
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des archives:", error);
                    });
            })
            .catch(error => {
                console.error("Erreur lors de l'importation des données :", error);
            });
    };

    const handleExportClick = () => {
        if (selectedRows.length > 0) {
            axios.get(`http://localhost:8080/api/archives/export?ids=${selectedRows.join(',')}`, {
                responseType: 'blob'
            })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'archives_export.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                })
                .catch(error => {
                    console.error("Erreur lors de l'exportation des données :", error);
                });
        }
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">Liste des archives</h3>
                                {userType !== 'admin' && (
                                    <div className="d-flex align-items-center mt-3">
                                        <input type="file" accept=".csv" onChange={handleImportClick} style={{ display: 'none' }} id="fileInput" />
                                        <label htmlFor="fileInput" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faFileImport} className="mr-2" /> Importer
                                        </label>
                                        <button onClick={handleExportClick} className="btn btn-secondary mr-2" disabled={selectedRows.length === 0}>
                                            <FontAwesomeIcon icon={faFileExport} className="mr-2" /> Exporter
                                        </button>
                                        <Link to="/admin/AjoutArchive" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Créer
                                        </Link>
                                        <Link
                                            to={`/admin/UpdateArchive/${selectedRows.length === 1 ? selectedRows[0] : ''}`}
                                            className={`btn btn-secondary mr-2 ${selectedRows.length !== 1 ? 'disabled' : ''}`}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier
                                        </Link>
                                        <button onClick={handleDeleteClick} className="btn btn-secondary mr-2" disabled={selectedRows.length === 0}>
                                            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Supprimer
                                        </button>
                                        <Link to="/admin/RechercheArchive" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faSearch} className="mr-2" /> Recherche
                                        </Link>
                                    </div>
                                )}
                            </CardHeader>
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Entité</th>
                                        <th scope="col">Ref.Transfert</th>
                                        <th scope="col">Local d'origine</th>
                                        <th scope="col">Correspondant</th>
                                        <th scope="col">Date de transfert</th>
                                        <th scope="col">N° Conteneur</th>
                                        <th scope="col">Emplacement</th>
                                        <th scope="col">REF entité</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Agence/Unité</th>
                                        <th scope="col">Nature</th>
                                        <th scope="col">Année de création</th>
                                        <th scope="col">Mois</th>
                                        <th scope="col">Jour</th>
                                        <th scope="col">Observations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {archivesList.map(archive => (
                                        <tr
                                            key={archive.id}
                                            onClick={() => handleRowClick(archive.id)}
                                            className={selectedRows.includes(archive.id) ? 'table-active' : ''}
                                        >
                                            <td>{archive.entite}</td>
                                            <td>{archive.refTransfert}</td>
                                            <td>{archive.localOrigine}</td>
                                            <td>{archive.correspondant}</td>
                                            <td>{archive.dateTransfert}</td>
                                            <td>{archive.numeroConteneur}</td>
                                            <td>{archive.emplacement}</td>
                                            <td>{archive.refEnt}</td>
                                            <td>{archive.code}</td>
                                            <td>{archive.agenceUnite}</td>
                                            <td>{archive.nature}</td>
                                            <td>{archive.anneeCreation}</td>
                                            <td>{archive.mois}</td>
                                            <td>{archive.jour}</td>
                                            <td>{archive.observations}</td>
                                            <td>
                                                <Link to={`/admin/AfficherArchiveForm/${archive.id}`}>
                                                    <FontAwesomeIcon icon={faEdit} />
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
                <ModalHeader toggle={toggleConfirmModal}>Confirmation</ModalHeader>
                <ModalBody>
                    Êtes-vous sûr de vouloir supprimer les archives sélectionnées ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleConfirmModal}>Annuler</Button>
                    <Button color="danger" onClick={handleConfirmDelete}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Archive;
