import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function BarChart({ title, subheader, chart, chartType = "bar", showDecimal = false, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '30%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: "date",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined' && !showDecimal) {
            return `${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    yaxis: {
      labels: {
        formatter(value) {
          return Math.floor(value); // Use Math.floor to remove decimal points
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type={chartType}
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>

  );
}

BarChart.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  showDecimal: PropTypes.bool,
  chartType: PropTypes.string,
};
