import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Header from 'components/Headers/Header';
import { useEffect, useState } from 'react';
import { Container, Row, Table, Input, FormGroup, Col, Card, CardHeader } from 'reactstrap';

const RechercheArchive = () => {
    const [archivesList, setArchivesList] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        entite: '',
        refTransfert: '',
        localOrigine: '',
        correspondant: '',
        dateTransfert: '',
        numeroConteneur: '',
        emplacement: '',
        refEnt: '',
        code: '',
        agenceUnite: '',
        nature: '',
        anneeCreation: '',
        mois: '',
        jour: '',
        observations: ''
    });

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearchClick = () => {
        // Appel à l'API pour rechercher les archives avec les critères
        axios.get('http://localhost:8080/api/archives/search', {
            params: searchCriteria
        })
        .then(response => {
            setArchivesList(response.data);
        })
        .catch(error => {
            console.error("Erreur lors de la recherche des archives:", error);
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
                                <h3 className="text-white mb-0">Recherche des archives</h3>
                                <Row className="mt-3">
                                    {Object.keys(searchCriteria).map((key, index) => (
                                        <Col md="3" key={index}>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name={key}
                                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                                    value={searchCriteria[key]}
                                                    onChange={handleSearchChange}
                                                    className="bg-white text-dark"
                                                />
                                            </FormGroup>
                                        </Col>
                                    ))}
                                    <Col md="3">
                                        <FormGroup>
                                            <button onClick={handleSearchClick} className="btn btn-primary">
                                                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Rechercher
                                            </button>
                                        </FormGroup>
                                    </Col>
                                </Row>
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
                                        <tr key={archive.id}>
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

export default RechercheArchive;
