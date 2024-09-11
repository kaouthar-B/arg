import React, { useState, useEffect } from 'react';
import { Button, Container, FormGroup, Label, Input, Row, Col, Alert } from 'reactstrap';
import axios from 'axios';

const Habilitation = () => {
  const [permissions, setPermissions] = useState({
    canAddArchive: false,
    canGetArchiveById: false,
    canUpdateArchive: false,
    canGetCopieNumerique: false,
    canDownloadCopieNumerique: false,
    canImportArchiveFromExcel: false,
    canExportArchiveToExcel: false,
    canAddConteneur: false,
    canUpdateConteneur: false,
    canDeleteConteneur: false,
    canAffecterProvisoire: false,
    canAffecterDefinitive: false,
    canImportConteneursFromExcel: false,
    canExportConteneursToExcel: false,
    canAddSite: false,
    canUpdateSite: false,
    canDeleteSite: false,
    canImportSiteArchivageFromExcel: false,
    canExportSiteArchivageToExcel: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const utilisateurId = 1; // ID de l'utilisateur dont on veut afficher les habilitations

  useEffect(() => {
    // Récupération des permissions actuelles
    axios.get(`http://localhost:8080/api/permissions/getByUtilisateur?utilisateurId=${utilisateurId}`)
      .then(response => {
        if (response.data) {
          setPermissions(response.data);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des permissions:', error);
      });
  }, [utilisateurId]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [name]: checked
    }));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/permissions/createOrUpdate', permissions)
      .then(response => {
        setSuccessMessage('Permissions mises à jour avec succès.');
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage('Erreur lors de la mise à jour des permissions.');
        console.error('Erreur lors de la mise à jour des permissions:', error);
      });
  };

  return (
    <Container>
      <h3>Gestion des Permissions</h3>
      <Row>
        {Object.entries({
          canAddArchive: "Ajouter une archive",
          canGetArchiveById: "Afficher une archive par ID",
          canUpdateArchive: "Mettre à jour une archive",
          canGetCopieNumerique: "Obtenir une copie numérique",
          canDownloadCopieNumerique: "Télécharger une copie numérique",
          canImportArchiveFromExcel: "Importer des archives depuis Excel",
          canExportArchiveToExcel: "Exporter des archives vers Excel",
          canAddConteneur: "Ajouter un conteneur",
          canUpdateConteneur: "Mettre à jour un conteneur",
          canDeleteConteneur: "Supprimer un conteneur",
          canAffecterProvisoire: "Affecter temporairement un conteneur",
          canAffecterDefinitive: "Affecter définitivement un conteneur",
          canImportConteneursFromExcel: "Importer des conteneurs depuis Excel",
          canExportConteneursToExcel: "Exporter des conteneurs vers Excel",
          canAddSite: "Ajouter un site",
          canUpdateSite: "Mettre à jour un site",
          canDeleteSite: "Supprimer un site",
          canImportSiteArchivageFromExcel: "Importer un site d'archivage depuis Excel",
          canExportSiteArchivageToExcel: "Exporter un site d'archivage vers Excel"
        }).map(([key, label]) => (
          <Col key={key} sm="6" md="4" lg="3">
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name={key}
                  checked={permissions[key]}
                  onChange={handleCheckboxChange}
                />
                {label}
              </Label>
            </FormGroup>
          </Col>
        ))}
      </Row>
      <Button color="primary" onClick={handleSubmit}>Enregistrer les permissions</Button>
      {successMessage && (
        <Alert color="success" className="mt-3">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert color="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default Habilitation;
