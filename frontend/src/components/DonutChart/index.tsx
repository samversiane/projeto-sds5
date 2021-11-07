import axios from 'axios'
import { SaleSum } from 'type/sale'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { BASE_URL } from 'utils/requests'

type ChartData = {
    labels: string[]
    series: number[]
}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] })

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(response => {
                const data = response.data as SaleSum[]
                const mySeries = data.map(x => x.sum)
                const myLabels = data.map(x => x.seller)

                setChartData({ labels: myLabels, series: mySeries })
            });
    }, [])

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;