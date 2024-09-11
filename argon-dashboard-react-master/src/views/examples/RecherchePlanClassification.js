import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { Container, Card, CardHeader, Row, Table, Input, FormGroup } from 'reactstrap';

const RecherchePlanClassification = () => {
    const [resultats, setResultats] = useState([]);
    const [searchQueries, setSearchQueries] = useState({
        typeRecherche: 'proprietaireArchives', // Exemple de typeRecherche, modifiez selon vos besoins
        searchQuery: ''
    });

    useEffect(() => {
        fetchResultats();
    }, [searchQueries]);

    const fetchResultats = () => {
        axios.get('http://localhost:8080/plan-classification/filtre', {
            params: {
                typeRecherche: searchQueries.typeRecherche,
                searchQuery: searchQueries.searchQuery
            }
        })
        .then(response => {
            setResultats(response.data);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des résultats :", error);
        });
    };

    const handleSearchChange = (e) => {
        setSearchQueries({
            ...searchQueries,
            [e.target.name]: e.target.value
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
                                <h3 className="text-white mb-0">Recherche dans le Plan de Classification</h3>
                                <p className="text-white mb-0">
                                    Vous pouvez rechercher selon les critères suivants :
                                </p>
                                <FormGroup>
                                    <Row>
                                        <div className="col">
                                            <Input
                                                type="select"
                                                name="typeRecherche"
                                                value={searchQueries.typeRecherche}
                                                onChange={handleSearchChange}
                                                className="mb-3"
                                            >
                                                <option value="proprietaireArchives">Propriétaire des archives</option>
                                                <option value="entitesRattachees">Entités Rattachées</option>
                                                <option value="ref">Référence</option>
                                                <option value="codeEntite">Code Entité</option>
                                                <option value="agences">Agences</option>
                                                <option value="categoriesArchive">Catégories d'archive</option>
                                                <option value="code">Code</option>
                                            </Input>
                                        </div>
                                        <div className="col">
                                            <Input
                                                type="text"
                                                name="searchQuery"
                                                value={searchQueries.searchQuery}
                                                onChange={handleSearchChange}
                                                placeholder="Rechercher..."
                                                className="mb-3"
                                            />
                                        </div>
                                    </Row>
                                </FormGroup>
                            </CardHeader>
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Propriétaire des archives</th>
                                        <th scope="col">Entités Rattachées</th>
                                        <th scope="col">Référence</th>
                                        <th scope="col">Code Entité</th>
                                        <th scope="col">Agences</th>
                                        <th scope="col">Catégories d'archive</th>
                                        <th scope="col">Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultats.map(resultat => (
                                        <tr key={resultat.id}>
                                            <td>{resultat.proprietaireArchives}</td>
                                            <td>{resultat.entitesRattachees}</td>
                                            <td>{resultat.ref}</td>
                                            <td>{resultat.codeEntite}</td>
                                            <td>{resultat.agences}</td>
                                            <td>{resultat.categoriesArchive}</td>
                                            <td>{resultat.code}</td>
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

export default RecherchePlanClassification;
