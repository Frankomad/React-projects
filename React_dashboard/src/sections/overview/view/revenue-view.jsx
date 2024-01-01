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
    const totalYearRevenue = data?.[year]?.total;

    const monthList = Object.keys(yearData || {})
      .filter((key) => key !== "total")
      .map((month) => yearData[month]);

    return { totalYearRevenue, monthList };
  };

  const revenue = appData?.Revenue;
  const { totalYearRevenue: totalRevenue2023, monthList: revenueList2023 } = generateLists(revenue, "2023");
  const { totalYearRevenue: totalRevenue2022, monthList: revenueList2022 } = generateLists(revenue, "2022");

  const reoccuringRevenue = appData?.["Reoccuring Revenue"];
  const { totalYearRevenue: totalReoccuringRevenue2023, monthList: reoccuringRevenueList2023 } = generateLists(reoccuringRevenue, "2023");
  const { totalYearRevenue: totalReoccuringRevenue2022, monthList: reoccuringRevenueList2022 } = generateLists(reoccuringRevenue, "2022");

  const newRevenue = appData?.["New Revenue"];
  const { totalYearRevenue: totalNewRevenue2023, monthList: newRevenueList2023 } = generateLists(newRevenue, "2023");
  const { totalYearRevenue: totalNewRevenue2022, monthList: newRevenueList2022 } = generateLists(newRevenue, "2022");


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
              title="Revenue"
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
                    data: revenueList2022 || [],
                  },
                  {
                    name: '2023',
                    type: 'column',
                    fill: 'solid',
                    data: revenueList2023 || [],
                  },
                ],
              }}
            />
            <BarChart
              chartType='bar'
              title="Total Revenue"
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
                    data: [totalRevenue2022, totalRevenue2023] || [],
                  },
                ],
              }}
            />
          </div>

          {/* Reoccuring Revenue */}
          <div style={containerStyle}>
            <BarChart
              chartType='bar'
              title="Reoccuring Revenue"
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
                    data: reoccuringRevenueList2022 || [],
                  },
                  {
                    name: '2023',
                    type: 'column',
                    fill: 'solid',
                    data: reoccuringRevenueList2023 || [],
                  },
                ],
              }}
            />
            <BarChart
              chartType='bar'
              title="Total Reoccuring Revenue"
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
                    data: [totalReoccuringRevenue2022, totalReoccuringRevenue2023] || [],
                  },
                ],
              }}
            />
          </div>

          {/* New Revenue */}
          <div style={containerStyle}>
            <BarChart
              chartType='bar'
              title="New Revenue"
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
                    data: newRevenueList2022 || [],
                  },
                  {
                    name: '2023',
                    type: 'column',
                    fill: 'solid',
                    data: newRevenueList2023 || [],
                  },
                ],
              }}
            />
            <BarChart
              chartType='bar'
              title="Total New Revenue"
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
                    data: [totalNewRevenue2022, totalNewRevenue2023] || [],
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
