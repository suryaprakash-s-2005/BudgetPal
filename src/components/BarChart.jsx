import React from 'react';
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const BarChart = ({ data }) => {
    return (
        <div className="chart-container">
            <h3>Monthly Income vs Expenses</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <ReBarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" stroke="var(--text-color)" />
                        <YAxis stroke="var(--text-color)" tickFormatter={(value) => `₹${value}`} />
                        <Tooltip
                            formatter={(value) => [`₹${value}`, undefined]}
                            contentStyle={{
                                backgroundColor: 'var(--card-bg)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-color)',
                                borderRadius: '8px',
                                boxShadow: 'var(--shadow)'
                            }}
                            itemStyle={{ color: 'var(--text-color)' }}
                            labelStyle={{ color: 'var(--text-muted)' }}
                        />
                        <Legend />
                        <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChart;
