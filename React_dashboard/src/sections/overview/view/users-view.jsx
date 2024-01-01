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
    const { isAuthenticated, user } = useAuth();
    const { appData } = useData();


    if (!isAuthenticated) {
        console.log("user", user)
        // Redirect to the login page if not logged in
        console.log("Redirecting to login page")
        navigate("/login");
        return null;
    }

    const generateLists = (data, year) => {
        const yearData = data?.[year];
        const totalYearUser = data?.[year]?.total;

        const monthList = Object.keys(yearData || {})
            .filter((key) => key !== "total")
            .map((month) => yearData[month]);

        return { totalYearUser, monthList };
    };

    const filterNonZeroValues = (data) => {
        const { keys, values } = Object.entries(data || {}).reduce(
            (result, [key, value]) => {
                if (value !== 0) {
                    result.keys.push(key);
                    result.values.push(value);
                }
                return result;
            },
            { keys: [], values: [] }
        );

        return { keys, values };
    };

    const activeUsers = appData?.["Active Users"];
    const { monthList: activeUsersLists2023 } = generateLists(activeUsers, "2023");
    const { monthList: activeUsersLists2022 } = generateLists(activeUsers, "2022");

    const newUsers = appData?.["New Users"];
    const { totalYearUser: totalNewUsers2023, monthList: newUsersList2023 } = generateLists(newUsers, "2023");
    const { totalYearUser: totalNewUsers2022, monthList: newUsersList2022 } = generateLists(newUsers, "2022");

    const churnedUsers = appData?.["Churned Users"];
    const { totalYearUser: totalChurnedUsers2023, monthList: churnedUsersList2023 } = generateLists(churnedUsers, "2023");
    const { totalYearUser: totalChurnedUsers2022, monthList: churnedUsersList2022 } = generateLists(churnedUsers, "2022");

    const growthRate = appData?.["Growth Rate"];
    const { totalYearUser: totalGrowthRate2023, monthList: growthRateList2023 } = generateLists(growthRate, "2023");
    const { totalYearUser: totalGrowthRate2022, monthList: growthRateList2022 } = generateLists(growthRate, "2022");

    const churnRate = appData?.["Growth Rate"];
    const { totalYearUser: totalChurnRate2023, monthList: churnRateList2023 } = generateLists(churnRate, "2023");
    const { totalYearUser: totalChurnRate2022, monthList: churnRateList2022 } = generateLists(churnRate, "2022");

    const monthsWithUs = appData?.["Months with Us"]?.["9"];
    const { keys: monthsWithUsKeys, values: monthsWithUsValues } = filterNonZeroValues(monthsWithUs);

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
                            title="Active Users"
                            subheader=""
                            sx={{ width: "100%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: activeUsersLists2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: activeUsersLists2023 || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    {/* Reoccuring Revenue */}
                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="New Users"
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
                                        data: newUsersList2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: newUsersList2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total New Users"
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
                                        data: [totalNewUsers2022, totalNewUsers2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    {/* New Revenue */}
                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Churned Users"
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
                                        data: churnedUsersList2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: churnedUsersList2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Churned Users"
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
                                        data: [totalChurnedUsers2022, totalChurnedUsers2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Growth Rate"
                            subheader=""
                            showDecimal
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: growthRateList2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: growthRateList2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Growth Rate"
                            subheader=""
                            showDecimal
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalGrowthRate2022, totalGrowthRate2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div style={containerStyle}>
                        <BarChart
                            chartType='bar'
                            title="Churn Rate"
                            subheader=""
                            showDecimal
                            sx={{ width: "65%" }}
                            style={chartStyles}
                            chart={{
                                labels: monthNames,
                                series: [
                                    {
                                        name: '2022',
                                        type: 'column',
                                        fill: 'solid',
                                        data: churnRateList2022 || [],
                                    },
                                    {
                                        name: '2023',
                                        type: 'column',
                                        fill: 'solid',
                                        data: churnRateList2023 || [],
                                    },
                                ],
                            }}
                        />
                        <BarChart
                            chartType='bar'
                            title="Total Churn Rate"
                            subheader=""
                            showDecimal
                            sx={{ width: "32%" }}
                            style={totalChartStyle}
                            chart={{
                                labels: yearNames,
                                series: [
                                    {
                                        name: "total",
                                        type: 'column',
                                        fill: 'solid',
                                        data: [totalChurnRate2022, totalChurnRate2023] || [],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <BarChart
                        chartType='bar'
                        title="Months With Us"
                        subheader=""
                        sx={{ width: "100%" }}
                        style={chartStyles}
                        chart={{
                            labels: monthsWithUsKeys,
                            series: [
                                {
                                    name: "Months with us",
                                    type: 'column',
                                    fill: 'solid',
                                    data: monthsWithUsValues || [],
                                },
                            ],
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );

}
