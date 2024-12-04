import React, { useState } from 'react';
import Chart from './Chart'; // 차트 컴포넌트
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts 라이브러리 import

const styles = {
    container: {
        width : '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    subHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '30px',
        marginBottom: '15px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    select: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#f2f2f2',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default function AssetManagement() {
    const [assets, setAssets] = useState([
        { id: 1, name: '주식', type: 'investment', value: 5000000, date: '2023-01-01' },
        { id: 2, name: '예금', type: 'savings', value: 10000000, date: '2023-01-01' },
        { id: 3, name: '부동산', type: 'real_estate', value: 200000000, date: '2023-01-01' },
    ]);

    const [newAsset, setNewAsset] = useState({ name: '', type: 'investment', value: '', date: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAsset({ ...newAsset, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = assets.length > 0 ? Math.max(...assets.map(a => a.id)) + 1 : 1;
        setAssets([...assets, { ...newAsset, id, value: Number(newAsset.value) }]);
        setNewAsset({ name: '', type: 'investment', value: '', date: '' });
    };

    const handleDelete = (id) => {
        setAssets(assets.filter(asset => asset.id !== id));
    };

    const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);

    const pieChartData = {
        labels: assets.map(asset => asset.name),
        datasets: [
            {
                data: assets.map(asset => asset.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
            },
        ],
    };

    const lineChartData = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
            {
                label: '총 자산 가치',
                data: [210000000, 215000000, 213000000, 220000000, 218000000, 225000000],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>자산 관리</h1>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <h2 style={styles.subHeader}>총 자산 가치</h2>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        ₩{totalAssetValue.toLocaleString()}
                    </p>
                </div>
                <div style={styles.card}>
                    <h2 style={styles.subHeader}>자산 분포</h2>
                </div>
            </div>

            <div style={styles.card}>
                <h2 style={styles.subHeader}>자산 가치 변동</h2>
                <Line data={lineChartData} />
            </div>

            <h2 style={styles.subHeader}>자산 목록</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>이름</th>
                        <th style={styles.th}>유형</th>
                        <th style={styles.th}>가치</th>
                        <th style={styles.th}>날짜</th>
                        <th style={styles.th}>작업</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.id}>
                            <td style={styles.td}>{asset.name}</td>
                            <td style={styles.td}>{asset.type}</td>
                            <td style={styles.td}>₩{asset.value.toLocaleString()}</td>
                            <td style={styles.td}>{asset.date}</td>
                            <td style={styles.td}>
                                <button style={styles.deleteButton} onClick={() => handleDelete(asset.id)}>
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 style={styles.subHeader}>새 자산 추가</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    value={newAsset.name}
                    onChange={handleInputChange}
                    placeholder="자산 이름"
                    required
                    style={styles.input}
                />
                <select
                    name="type"
                    value={newAsset.type}
                    onChange={handleInputChange}
                    style={styles.select}
                >
                    <option value="investment">투자</option>
                    <option value="savings">저축</option>
                    <option value="real_estate">부동산</option>
                    <option value="other">기타</option>
                </select>
                <input
                    type="number"
                    name="value"
                    value={newAsset.value}
                    onChange={handleInputChange}
                    placeholder="자산 가치"
                    required
                    style={styles.input}
                />
                <input
                    type="date"
                    name="date"
                    value={newAsset.date}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>자산 추가</button>
            </form>
        </div>
    );
}