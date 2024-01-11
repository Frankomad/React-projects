import { formatter } from "../util/investment"

export default function Result({ result }) {
    const initialInvestment =
        result[0].valueEndOfYear -
        result[0].interest -
        result[0].annualInvestment;
    return (
        <table id="result">
            <thead>
                <tr>
                    <th>
                        Year
                    </th>
                    <th>
                        Investment value
                    </th>
                    <th>
                        Interest (Year)
                    </th>
                    <th>
                        Total Interest
                    </th>
                    <th>
                        Invested Capital
                    </th>
                </tr>
            </thead>
            <tbody>
                {result.map((data, index) => {
                    const totalInterest = data.valueEndOfYear - data.annualInvestment * data.year - initialInvestment;
                    return <tr key={data.year}>
                        <td>{data.year}</td>
                        <td>{formatter.format(data.valueEndOfYear)}</td>
                        <td>{formatter.format(data.interest)}</td>
                        <td>{formatter.format(totalInterest)}</td>
                        <td>{formatter.format(initialInvestment + data.annualInvestment * data.year)}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}