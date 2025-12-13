import React from 'react';
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const PieChart = ({ data }) => {
    return (
        <div className="chart-container">
            <h3>Expense Breakdown</h3>
            <div style={{ width: '100%', height: 300 }}>
                {data.length > 0 ? (
                    <ResponsiveContainer>
                        <RePieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `₹${value}`}
                                contentStyle={{
                                    backgroundColor: 'var(--card-bg)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-color)',
                                    borderRadius: '8px',
                                    boxShadow: 'var(--shadow)'
                                }}
                                itemStyle={{ color: 'var(--text-color)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </RePieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="no-data">No expense data for this period</div>
                )}
            </div>
        </div>
    );
};

export default PieChart;
