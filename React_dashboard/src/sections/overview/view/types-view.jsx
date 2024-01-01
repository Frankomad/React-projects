import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import BarChart from '../BarChart';
import { useData } from '../../../DataContext';
import { useAuth } from '../../../AuthContext';

// ----------------------------------------------------------------------

export default function RevenueView() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { appData } = useData();


  if (!isAuthenticated) {
    // Redirect to the login page if not logged in
    console.log("Redirecting to login page")
    navigate("/login");
    return null;
  }

    const extractValuesByYear = (data, year) => {
        const values = [];
        let total = 0;

        // Get keys and sort them based on month and year
        const sortedKeys = Object.keys(data)
            .filter((key) => key.endsWith(`${year}`))
            .sort((a, b) => {
                const [monthA, yearA] = a.split('/');
                const [monthB, yearB] = b.split('/');

                // Convert month/year to a comparable format (e.g., YYYYMM)
                const formattedA = parseInt(`${yearA}${monthA}`, 10);
                const formattedB = parseInt(`${yearB}${monthB}`, 10);

                return formattedA - formattedB;
            });
        // Push values in the sorted order and calculate total
        sortedKeys.forEach((key) => {
            const value = data[key];
            if (!key.startsWith('total/')) {
                values.push(value);
            } else {
                total = value;
            }
        });
        return { values, total };
    };

    const extractRevenueTypes = (data) => {
        const { n1, n3, p3, n12, p12 } = data;
        return { n1, n3, p3, n12, p12 };
    };

    const typesRevenue = appData?.["Types Revenue"];
    const types = appData?.Types;

    const { n1: typesRevenuen1, n3: typesRevenuen3, p3: typesRevenuep3, n12: typesRevenuen12, p12: typesRevenuep12 } = extractRevenueTypes(typesRevenue);
    const { n1: typesn1, n3: typesn3, p3: typesp3, n12: typesn12, p12: typesp12 } = extractRevenueTypes(types);

    const { values: typesRevenuen1_2023, total: totalTypesRevenuen1_2023 } = extractValuesByYear(typesRevenuen1, "2023");
    const { values: typesRevenuen1_2022, total: totalTypesRevenuen1_2022 } = extractValuesByYear(typesRevenuen1, "2022");

    const { values: typesRevenuen3_2023, total: totalTypesRevenuen3_2023 } = extractValuesByYear(typesRevenuen3, "2023");
    const { values: typesRevenuen3_2022, total: totalTypesRevenuen3_2022 } = extractValuesByYear(typesRevenuen3, "2022");

    const { values: typesRevenuep3_2023, total: totalTypesRevenuep3_2023 } = extractValuesByYear(typesRevenuep3, "2023");
    const { values: typesRevenuep3_2022, total: totalTypesRevenuep3_2022 } = extractValuesByYear(typesRevenuep3, "2022");

    const { values: typesRevenuen12_2023, total: totalTypesRevenuen12_2023 } = extractValuesByYear(typesRevenuen12, "2023");
    const { values: typesRevenuen12_2022, total: totalTypesRevenuen12_2022 } = extractValuesByYear(typesRevenuen12, "2022");

    const { values: typesRevenuep12_2023, total: totalTypesRevenuep12_2023 } = extractValuesByYear(typesRevenuep12, "2023");
    const { values: typesRevenuep12_2022, total: totalTypesRevenuep12_2022 } = extractValuesByYear(typesRevenuep12, "2022");

    const { values: typesn1_2023, total: totalTypesn1_2023 } = extractValuesByYear(typesn1, "2023");
    const { values: typesn1_2022, total: totalTypesn1_2022 } = extractValuesByYear(typesn1, "2022");

    const { values: typesn3_2023, total: totalTypesn3_2023 } = extractValuesByYear(typesn3, "2023");
    const { values: typesn3_2022, total: totalTypesn3_2022 } = extractValuesByYear(typesn3, "2022");

    const { values: typesp3_2023, total: totalTypesp3_2023 } = extractValuesByYear(typesp3, "2023");
    const { values: typesp3_2022, total: totalTypesp3_2022 } = extractValuesByYear(typesp3, "2022");

    const { values: typesn12_2023, total: totalTypesn12_2023 } = extractValuesByYear(typesn12, "2023");
    const { values: typesn12_2022, total: totalTypesn12_2022 } = extractValuesByYear(typesn12, "2022");

    const { values: typesp12_2023, total: totalTypesp12_2023 } = extractValuesByYear(typesp12, "2023");
    const { values: typesp12_2022, total: totalTypesp12_2022 } = extractValuesByYear(typesp12, "2022");

    const chartStyles = {
        marginBottom: "20px",
    };

    const totalChartStyle = {
        marginLeft: "3%",
        ...chartStyles
    }

    const containerStyle = {
        display: 'flex',
    };

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const yearNames = ["2022", "2023"];


    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back 👋
            </Typography>
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid xs={12} md={6} lg={8} style={{ width: "100%" }}>
                    {/* Revenue */}
                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Revenue Type n1"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuen1_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuen1_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types Revenue n1"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesRevenuen1_2022, totalTypesRevenuen1_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Revenue Type n3"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuen3_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuen3_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types Revenue n3"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesRevenuen3_2022, totalTypesRevenuen3_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Revenue Type p3"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuep3_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuep3_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types Revenue p3"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesRevenuep3_2022, totalTypesRevenuep3_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Revenue Type n12"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuen12_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuen12_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types Revenue n12"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesRevenuen12_2022, totalTypesRevenuen12_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Revenue Type p12"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuep12_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesRevenuep12_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types Revenue p12"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesRevenuep12_2022, totalTypesRevenuep12_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Revenue Type n1"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesn1_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesn1_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types n1"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesn1_2022, totalTypesn1_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Type n3"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesn3_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesn3_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types n3"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesn3_2022, totalTypesn3_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Type p3"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesp3_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesp3_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types p3"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesp3_2022, totalTypesp3_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Type n12"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesn12_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesn12_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types n12"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesn12_2022, totalTypesn12_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Type p12"
                            subheader=""
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesp12_2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: typesp12_2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Types p12"
                            subheader=""
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalTypesp12_2022, totalTypesp12_2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
