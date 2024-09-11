import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { Container, Row, Card, CardHeader, Table, Input, Button } from 'reactstrap';

const RechercheSiteArchivage = () => {
    const [siteList, setSiteList] = useState([]);
    const [searchParams, setSearchParams] = useState({
        nom: '',
        adresse: '',
        localisation: '',
        surface: '',
        archiviste: '',
        personnel: '',
        referenceArchive: '',
        referenceConteneur: ''
    });

    useEffect(() => {
        fetchSites();
    }, [searchParams]);

    const fetchSites = () => {
        axios.get("http://localhost:8080/api/siteArchivage/search", { params: searchParams })
            .then(response => {
                const filteredSitesList = response.data
                    .map(site => ({
                        ...site,
                        dateInsertion: new Date(site.dateInsertion)
                    }))
                    .sort((a, b) => b.dateInsertion - a.dateInsertion) // Trier par date d'insertion
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
                setSiteList(filteredSitesList);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des sites d'archivage :", error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = () => {
        fetchSites();
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">Recherche des sites d'archivage</h3>
                                <p className="text-white">Vous pouvez chercher selon les critères suivants : Nom, Adresse, Localisation, Surface, Archiviste, Personnel, Référence Archive, Référence Conteneur.</p>
                                <Input
                                    type="text"
                                    name="nom"
                                    placeholder="Nom"
                                    value={searchParams.nom}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Input
                                    type="text"
                                    name="adresse"
                                    placeholder="Adresse"
                                    value={searchParams.adresse}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Input
                                    type="text"
                                    name="localisation"
                                    placeholder="Localisation"
                                    value={searchParams.localisation}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Input
                                    type="text"
                                    name="surface"
                                    placeholder="Surface"
                                    value={searchParams.surface}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Input
                                    type="text"
                                    name="archiviste"
                                    placeholder="Archiviste"
                                    value={searchParams.archiviste}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Input
                                    type="text"
                                    name="personnel"
                                    placeholder="Personnel"
                                    value={searchParams.personnel}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Input
                                    type="text"
                                    name="referenceArchive"
                                    placeholder="Référence Archive"
                                    value={searchParams.referenceArchive}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Input
                                    type="text"
                                    name="referenceConteneur"
                                    placeholder="Référence Conteneur"
                                    value={searchParams.referenceConteneur}
                                    onChange={handleSearchChange}
                                    className="mb-2"
                                />
                                <Button color="primary" onClick={handleSearch}>
                                    Rechercher
                                </Button>
                            </CardHeader>
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Adresse</th>
                                        <th scope="col">Localisation</th>
                                        <th scope="col">Surface</th>
                                        <th scope="col">Archiviste</th>
                                        <th scope="col">Personnel</th>
                                        <th scope="col">Référence Archive</th>
                                        <th scope="col">Référence Conteneur</th>
                                        <th scope="col">Date d'Insertion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {siteList.map(site => (
                                        <tr key={site.id}>
                                            <td>{site.nom}</td>
                                            <td>{site.adresse}</td>
                                            <td>{site.localisation}</td>
                                            <td>{site.surface}</td>
                                            <td>{site.archiviste}</td>
                                            <td>{site.personnel}</td>
                                            <td>{site.referenceArchive}</td>
                                            <td>{site.referenceConteneur}</td>
                                            <td>{site.dateInsertion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default RechercheSiteArchivage;
