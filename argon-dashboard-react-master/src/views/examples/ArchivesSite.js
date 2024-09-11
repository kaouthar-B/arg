import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, Row, Card, CardHeader, Table } from 'reactstrap';

const ArchivesSite = () => {
    const [sites, setSites] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState([]);
    const location = useLocation();

    // Extraction du categoryId des paramètres de l'URL
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');

    useEffect(() => {
        // Récupérer tous les sites d'archivage
        axios.get('/api/siteArchivage')
            .then(response => {
                setSites(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des sites d\'archivage :', error);
            });

        // Récupérer le nombre d'archives pour la catégorie spécifiée dans chaque site
        axios.get(`/api/siteArchivage/categories-count?categoryId=${categoryId}`)
            .then(response => {
                setCategoryCounts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des comptes de catégories :', error);
            });
    }, [categoryId]);

    // Calculer le total des archives dans la catégorie sélectionnée
    const totalArchivesInCategory = categoryCounts.reduce((total, count) => total + (count.count || 0), 0);

    return (
        <Container className="mt-5">
            <Row>
                <div className="col">
                    <Card className="bg-default shadow">
                        <CardHeader className="bg-transparent border-0">
                            <h3 className="text-white mb-0">Liste des Sites d'Archivage</h3>
                        </CardHeader>
                        <Table className="align-items-center table-dark table-flush" responsive>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Nom du Site</th>
                                    <th scope="col">Adresse</th>
                                    <th scope="col">Localisation</th>
                                    <th scope="col">Nombre d'archives dans la catégorie sélectionnée</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sites.map(site => {
                                    const categoryCount = categoryCounts.find(count => count.siteId === site.id) || {};
                                    return (
                                        <tr key={site.id}>
                                            <td>{site.nom}</td>
                                            <td>{site.adresse}</td>
                                            <td>{site.localisation}</td>
                                            <td>{categoryCount.count || 0}</td>
                                        </tr>
                                    );
                                })}
                                {/* Ligne pour afficher le total */}
                                <tr>
                                    <td colSpan="3" className="text-right"><strong>Total</strong></td>
                                    <td><strong>{totalArchivesInCategory}</strong></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </Row>
        </Container>
    );
};

export default ArchivesSite;
