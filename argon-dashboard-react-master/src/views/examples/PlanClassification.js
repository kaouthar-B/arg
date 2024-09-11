import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Ajoutez l'import de Link
import axios from 'axios';
import Header from 'components/Headers/Header';
import { Button, Card, CardHeader, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { faEdit, faFileExport, faFileImport, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlanClassification = () => {
    const [coursList, setCoursList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [userType, setUserType] = useState(localStorage.getItem('userType') || '');
    const navigate = useNavigate();  // Utilisation de useNavigate

    useEffect(() => {
        axios.get("http://localhost:8080/plan-classification/table")
            .then(response => {
                const filteredCoursList = response.data
                    .map(cours => ({
                        ...cours,
                        dateInsertion: new Date(cours.dateInsertion)
                    }))
                    .sort((a, b) => b.dateInsertion - a.dateInsertion)
                    .map(cours => ({
                        ...cours,
                        dateInsertion: cours.dateInsertion.toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }));
                setCoursList(filteredCoursList);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du Plan de Classification:", error);
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

    const handleImportClick = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post("http://localhost:8080/plan-classification/import", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("Données importées avec succès :", response.data);
                axios.get("http://localhost:8080/plan-classification/table")
                    .then(response => {
                        const filteredCoursList = response.data
                            .map(cours => ({
                                ...cours,
                                dateInsertion: new Date(cours.dateInsertion)
                            }))
                            .sort((a, b) => b.dateInsertion - a.dateInsertion)
                            .map(cours => ({
                                ...cours,
                                dateInsertion: cours.dateInsertion.toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                            }));
                        setCoursList(filteredCoursList);
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération du Plan de Classification :", error);
                    });
            })
            .catch(error => {
                console.error("Erreur lors de l'importation des données :", error);
            });
    };

    const handleExportClick = () => {
        axios.get("http://localhost:8080/plan-classification/export", {
            responseType: 'blob',
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'planClassification_export.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error("Erreur lors de l'exportation des données :", error);
            });
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/admin/ArchivesSite?categoryId=${categoryId}`);  // Utilisation de navigate
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">Liste du Plan de Classification</h3>
                                {userType !== 'admin' && (
                                    <div className="d-flex align-items-center">
                                        <input type="file" accept=".csv" onChange={handleImportClick} style={{ display: 'none' }} id="fileInput" />
                                        <label htmlFor="fileInput" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faFileImport} className="mr-2" /> Importer
                                        </label>
                                        <button onClick={handleExportClick} className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faFileExport} className="mr-2" /> Exporter
                                        </button>
                                        <Link to="/admin/AjoutPlanClassification" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Créer le Plan de Classification
                                        </Link>
                                        <Link to="/admin/AjoutNouvelleAgence" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Ajouter une Nouvelle Agence
                                        </Link>
                                        <Link to="/admin/AjoutNouvelleCategorie" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Ajouter une Nouvelle Catégorie
                                        </Link>
                                        <Link
                                            to={`/admin/UpdatePlanClassification/${selectedRows.length === 1 ? selectedRows[0] : ''}`}
                                            className={`btn btn-secondary mr-2 ${selectedRows.length !== 1 ? 'disabled' : ''}`}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier
                                        </Link>
                                        <Link to="/admin/RecherchePlanClassification" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faSearch} className="mr-2" /> Recherche
                                        </Link>
                                    </div>
                                )}
                            </CardHeader>
                            <div className="p-3">
                                <p className="text-white">
                                    Cliquez sur une catégorie pour voir le nombre d'archives de cette catégorie par site.
                                </p>
                            </div>
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Propriétaire des archives</th>
                                        <th scope="col">Entités Rattachées</th>
                                        <th scope="col">Ref</th>
                                        <th scope="col">Code Entité</th>
                                        <th scope="col">Agences</th>
                                        <th scope="col">Catégories d'archive</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Date d'insertion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursList.map(cours => (
                                        <tr
                                            key={cours.idCours}
                                            onClick={() => handleRowClick(cours.idCours)}
                                            style={{ backgroundColor: selectedRows.includes(cours.idCours) ? 'rgba(0, 0, 0, 0.05)' : 'inherit', cursor: 'pointer' }}
                                        >
                                            <td>{cours.proprietaireArchives}</td>
                                            <td>{cours.entitesRattachees}</td>
                                            <td>{cours.ref}</td>
                                            <td>{cours.codeEntite}</td>
                                            <td>{cours.agences}</td>
                                            <td
                                                onClick={() => handleCategoryClick(cours.idCategorieArchive)}
                                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                            >
                                                {cours.categoriesArchive}
                                            </td>
                                            <td>{cours.code}</td>
                                            <td>{cours.dateInsertion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
            <Modal isOpen={confirmModalOpen} toggle={toggleConfirmModal}>
                <ModalHeader toggle={toggleConfirmModal}>Confirmer la suppression</ModalHeader>
                <ModalBody>Êtes-vous sûr de vouloir supprimer le Plan de Classification ? Cette action est irréversible.</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleConfirmModal}>Annuler</Button>
                    <Button color="primary" onClick={() => {/* Handle delete action */}}>Supprimer</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default PlanClassification;
