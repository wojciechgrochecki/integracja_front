
import React from "react";
import { Line } from "react-chartjs-2";
import style from './styles.module.css'



function LineChart({ chartData, title }) {
    return (
        <div className={style["chart-container"]}>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                            font: {
                                size: 30
                            }
                        },
                        legend: {
                            display: true
                        }
                    }
                }}
            />
        </div>
    );
}
export default LineChart;