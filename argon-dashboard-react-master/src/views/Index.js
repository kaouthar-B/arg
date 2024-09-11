import axios from "axios";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Row,
  Table
} from "reactstrap";
import Header from "../components/Headers/Header.js";
import { chartOptions, parseOptions } from "./variables/charts.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [operationsData, setOperationsData] = useState({});
  const [dailySumData, setDailySumData] = useState({});
  const [statusDistributionData, setStatusDistributionData] = useState({});
  const [topDevises, setTopDevises] = useState([]);

  // Ensure Chart.js options are parsed
  if (window.Chart) {
    parseOptions(window.Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
    fetchData(index === 1 ? "month" : "week");
  };

  const fetchData = (period) => {
    axios
      .get(`/api/operations/count/last7days`)
      .then((response) => {
        const data = response.data;
        const labels = Object.keys(data).map((date) =>
          new Date(date).toLocaleDateString()
        );
        const counts = Object.values(data);

        setOperationsData({
          labels: labels,
          datasets: [
            {
              label: "Nombre d'archives",
              data: counts,
              backgroundColor: "rgba(255, 99, 132, 0.2)", // Bar color
              borderColor: "rgba(255, 99, 132, 1)", // Bar border color
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 99, 132, 0.4)", // Hover color
              hoverBorderColor: "rgba(255, 99, 132, 1)", // Hover border color
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });

    axios
      .get(`/api/cours/daily-sum?period=${period}`)
      .then((response) => {
        const data = response.data;
        const labels = Object.keys(data).map((date) =>
          period === "month"
            ? new Date(date).toLocaleString('default', { month: 'long' })
            : new Date(date).toLocaleDateString()
        );
        const sums = Object.values(data);

        setDailySumData({
          labels: labels,
          datasets: [
            {
              label: "Statistiques des espaces vides",
              data: sums,
              fill: false,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
              hoverBorderColor: "rgba(54, 162, 235, 1)",
              pointRadius: 3, // Add points
              pointBackgroundColor: "rgba(54, 162, 235, 1)", // Point color
              pointBorderColor: "rgba(54, 162, 235, 1)", // Point border color
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });

    axios
      .get("/api/cours/status-distribution")
      .then((response) => {
        const data = response.data;
        const labels = Object.keys(data);
        const counts = Object.values(data);

        setStatusDistributionData({
          labels: labels,
          datasets: [
            {
              label: "Distribution des archives",
              data: counts,
              backgroundColor: [
                "#FF6384", // Color for Refusé
                "#36A2EB", // Color for Validé
                "#FFCE56", // Color for En attente
              ],
              borderColor: [
                "#FF6384", // Border color for Refusé
                "#36A2EB", // Border color for Validé
                "#FFCE56", // Border color for En attente
              ],
              borderWidth: 1,
              hoverOffset: 4, // Slightly pull out the segment on hover
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });

    axios
      .get("http://localhost:8080/api/cours/top-devises")
      .then((response) => {
        const data = response.data.map((item) => {
          const key = Object.keys(item)[0];
          return { key, value: item[key] };
        });
        setTopDevises(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  };

  useEffect(() => {
    fetchData("week");
  }, []);

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#6c757d",
          font: {
            size: 14,
          },
          stepSize: 1, // Set the step size for better readability
        },
        title: {
          display: true,
          text: "Nombre des archives",
          color: "#6c757d",
          font: {
            size: 16,
          },
        },
      },
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#6c757d",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#6c757d",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#6c757d",
          font: {
            size: 14,
          },
          usePointStyle: true, // Use points instead of lines in the legend
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%", // Create a donut chart
    layout: {
      padding: {
        bottom: 20,
      },
    },
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Vue d'ensemble
                    </h6>
                    <h2 className="text-white mb-0">
                      Statistiques
                    </h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Mois</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Semaine</span>
                          <span className="d-md-none">S</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={dailySumData}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: "rgba(200, 200, 200, 0.2)",
                          },
                          ticks: {
                            color: "#6c757d",
                            font: {
                              size: 14,
                            },
                            stepSize: 1, // Set the step size for better readability
                          },
                          title: {
                            display: true,
                            text: "Statistiques des espaces vides",
                            color: "#6c757d",
                            font: {
                              size: 16,
                            },
                          },
                        },
                        x: {
                          grid: {
                            color: "rgba(200, 200, 200, 0.2)",
                          },
                          ticks: {
                            color: "#6c757d",
                            font: {
                              size: 14,
                            },
                            callback: function (value, index, values) {
                              if (activeNav === 1) {
                                return new Date(dailySumData.labels[index]).toLocaleString('default', { month: 'long' });
                              } else {
                                return value;
                              }
                            },
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: true,
                          position: "bottom",
                          labels: {
                            color: "#6c757d",
                            font: {
                              size: 14,
                            },
                          },
                        },
                        tooltip: {
                          backgroundColor: "rgba(0,0,0,0.8)",
                          titleFont: {
                            size: 16,
                          },
                          bodyFont: {
                            size: 14,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Site d'archivage</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar data={operationsData} options={barOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Les archives</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Doughnut data={statusDistributionData} options={doughnutOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Nombre des emplacements vides</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">REF</th>
                      <th scope="col">Site d'archivage</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {topDevises.map((devise, index) => {
                      const colors = ["bg-gradient-danger", "bg-gradient-success", "bg-gradient-info", "bg-gradient-warning", "bg-gradient-primary"];
                      return (
                        <tr key={index}>
                          <td>{devise.key}</td>
                          <td>{devise.value}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{devise.value}</span>
                              <div>
                                <Progress
                                  max="100"
                                  value={Math.min((devise.value / topDevises[0].value) * 100, 100)}
                                  barClassName={colors[index % colors.length]}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
