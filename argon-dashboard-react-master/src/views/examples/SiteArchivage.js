import { faEdit, faFileExport, faFileImport, faPaperPlane, faTrashAlt, faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

const SiteArchivage = () => {
    const [siteList, setSiteList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [userType, setUserType] = useState(localStorage.getItem('userType') || '');

    useEffect(() => {
        axios.get("http://localhost:8080/api/siteArchivage")
            .then(response => {
                const filteredSiteList = response.data
                    .map(site => ({
                        ...site,
                        dateInsertion: new Date(site.dateInsertion)
                    }))
                    .sort((a, b) => b.dateInsertion - a.dateInsertion)
                    .map(site => ({
                        ...site,
                        dateInsertion: site.dateInsertion.toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }));
                setSiteList(filteredSiteList);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des sites d'archivage :", error);
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
            axios.delete(`http://localhost:8080/api/siteArchivage/sites/${id}`)
                .then(response => {
                    console.log("Site d'archivage supprimé avec succès :", response.data);
                    return id;
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression du site d'archivage :", error);
                    return null;
                })
        ))
            .then(deletedIds => {
                const filteredIds = deletedIds.filter(id => id !== null);
                setSiteList(siteList.filter(site => !filteredIds.includes(site.id)));
            })
            .catch(error => {
                console.error("Erreur lors de la suppression des sites d'archivage :", error);
            });

        setSelectedRows([]);
        toggleConfirmModal();
    };

    const handleImportClick = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post("http://localhost:8080/api/siteArchivage/sites/import", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("Données importées avec succès :", response.data);
                axios.get("http://localhost:8080/api/siteArchivage")
                    .then(response => {
                        const filteredSiteList = response.data
                            .map(site => ({
                                ...site,
                                dateInsertion: new Date(site.dateInsertion)
                            }))
                            .sort((a, b) => b.dateInsertion - a.dateInsertion)
                            .map(site => ({
                                ...site,
                                dateInsertion: site.dateInsertion.toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                            }));
                        setSiteList(filteredSiteList);
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des sites d'archivage :", error);
                    });
            })
            .catch(error => {
                console.error("Erreur lors de l'importation des données :", error);
            });
    };

    const handleExportClick = () => {
        axios.get("http://localhost:8080/api/siteArchivage/sites/export", {
            responseType: 'blob',
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'site_archivage_export.xlsx'); // Nom du fichier exporté
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error("Erreur lors de l'exportation des données :", error);
            });
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">Liste des sites d'archivage</h3>
                                <p className="text-muted">
                                    Cliquez sur le nom d'un site pour voir ses statistiques détaillées.
                                </p>
                                {userType !== 'admin' && (
                                    <div className="d-flex align-items-center">
                                        <input type="file" accept=".csv" onChange={handleImportClick} style={{ display: 'none' }} id="fileInput" />
                                        <label htmlFor="fileInput" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faFileImport} className="mr-2" /> Importer
                                        </label>
                                        <button onClick={handleExportClick} className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faFileExport} className="mr-2" /> Exporter
                                        </button>
                                        <Link to="/admin/AjoutSiteArchivage" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Affecter un site d'archivage
                                        </Link>
                                        <Link
                                            to={`/admin/UpdateSiteArchivage/${selectedRows.length === 1 ? selectedRows[0] : ''}`}
                                            className={`btn btn-secondary mr-2 ${selectedRows.length !== 1 ? 'disabled' : ''}`}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier
                                        </Link>
                                        <button onClick={handleDeleteClick} className="btn btn-secondary mr-2" disabled={selectedRows.length === 0}>
                                            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Supprimer
                                        </button>
                                        <Link to="/admin/RechercheSiteArchivage" className="btn btn-secondary mr-2">
                                            <FontAwesomeIcon icon={faSearch} className="mr-2" /> Recherche
                                        </Link>
                                    </div>
                                )}
                            </CardHeader>
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Adresse</th>
                                        <th scope="col">Surface</th>
                                        <th scope="col">Archiviste</th>
                                        <th scope="col">Personnel</th>
                                        <th scope="col">Nombre d'emplacements</th>
                                        <th scope="col">Nombre d'emplacements chargés</th>
                                        <th scope="col">Nombre d'emplacements vides</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {siteList.map(site => (
                                        <tr
                                            key={site.id}
                                            onClick={() => handleRowClick(site.id)}
                                            style={{ backgroundColor: selectedRows.includes(site.id) ? 'rgba(0, 0, 0, 0.05)' : 'inherit', cursor: 'pointer' }}
                                        >
                                            <td>
                                                <Link to={`/admin/StatistiquesSite?id=${site.id}`} className="text-white">
                                                    {site.nom}
                                                </Link>
                                            </td>
                                            <td>{site.adresse}</td>
                                            <td>{site.surface}</td>
                                            <td>{site.archiviste}</td>
                                            <td>{site.personnel}</td>
                                            <td>{site.nombreEmplacements}</td>
                                            <td>{site.nombreEmplacementsCharges}</td>
                                            <td>{site.nombreEmplacementsVides}</td>
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
                <ModalBody>
                    Êtes-vous sûr de vouloir supprimer les sites sélectionnés ?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleConfirmDelete}>Confirmer</Button>{' '}
                    <Button color="secondary" onClick={toggleConfirmModal}>Annuler</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default SiteArchivage;
