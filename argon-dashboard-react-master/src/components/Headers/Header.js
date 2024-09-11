import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Ajoutez votre logique de recherche ici
  };

  return (
    <>
      <div className="header bg-gradient-success" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <Container fluid>
          {/* Barre de recherche */}
          <Row className="mb-4 justify-content-center">
            <Col lg="10" md="12">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header;
