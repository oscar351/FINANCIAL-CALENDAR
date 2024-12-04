import React, { useState } from 'react';
import Chart from './Chart'; // 차트 컴포넌트
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts 라이브러리 import

const styles = {
    container: {
        width:'100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressBar: {
        width: '100%',
        height: '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4caf50',
        transition: 'width 0.5s ease-in-out',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        textAlign: 'left',
        padding: '10px',
        borderBottom: '2px solid #e0e0e0',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #e0e0e0',
    },
    button: {
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
};

export default function BudgetManagement() {
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newBudget, setNewBudget] = useState('');

    // 실제 애플리케이션에서는 이 데이터를 상태로 관리해야 합니다
    const budgetData = [
        { category: '식비', budget: 500000, spent: 320000 },
        { category: '주거비', budget: 700000, spent: 700000 },
        { category: '교통비', budget: 200000, spent: 150000 },
        { category: '문화생활', budget: 300000, spent: 280000 },
        { category: '기타', budget: 200000, spent: 100000 },
    ];

    const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
    const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);

    const chartData = {
        labels: budgetData.map(item => item.category),
        datasets: [
            {
                data: budgetData.map(item => item.budget),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
            },
        ],
    };

    const handleAddCategory = () => {
        // 여기에 새 카테고리 추가 로직을 구현합니다
        console.log('New category:', newCategory, 'Budget:', newBudget);
        setIsAddCategoryModalOpen(false);
        setNewCategory('');
        setNewBudget('');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>예산 관리</h1>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>전체 예산 개요</h2>
                    <div style={styles.flexBetween}>
                        <span>총 예산</span>
                        <span style={{ fontWeight: 'bold' }}>₩{totalBudget.toLocaleString()}</span>
                    </div>
                    <div style={styles.flexBetween}>
                        <span>총 지출</span>
                        <span style={{ fontWeight: 'bold' }}>₩{totalSpent.toLocaleString()}</span>
                    </div>
                    <div style={styles.progressBar}>
                        <div
                            style={{
                                ...styles.progressFill,
                                width: `${(totalSpent / totalBudget) * 100}%`,
                            }}
                        />
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                        예산의 {((totalSpent / totalBudget) * 100).toFixed(1)}% 사용됨
                    </p>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>카테고리별 예산 분배</h2>
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.flexBetween}>
                    <h2 style={styles.cardTitle}>카테고리별 예산 관리</h2>
                    <button
                        style={styles.button}
                        onClick={() => setIsAddCategoryModalOpen(true)}
                    >
                        새 카테고리 추가
                    </button>
                </div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>카테고리</th>
                            <th style={styles.th}>예산</th>
                            <th style={styles.th}>지출</th>
                            <th style={styles.th}>남은 금액</th>
                            <th style={styles.th}>진행률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgetData.map((item, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{item.category}</td>
                                <td style={styles.td}>₩{item.budget.toLocaleString()}</td>
                                <td style={styles.td}>₩{item.spent.toLocaleString()}</td>
                                <td style={styles.td}>₩{(item.budget - item.spent).toLocaleString()}</td>
                                <td style={styles.td}>
                                    <div style={styles.progressBar}>
                                        <div
                                            style={{
                                                ...styles.progressFill,
                                                width: `${(item.spent / item.budget) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span style={{ fontSize: '12px' }}>
                                        {((item.spent / item.budget) * 100).toFixed(1)}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ ...styles.card, marginTop: '20px' }}>
                <h2 style={styles.cardTitle}>알림 설정</h2>
                <div style={styles.flexBetween}>
                    <span>예산 초과 시 알림</span>
                    <button style={styles.button}>설정</button>
                </div>
            </div>

            {isAddCategoryModalOpen && (
                <>
                    <div style={styles.overlay} onClick={() => setIsAddCategoryModalOpen(false)} />
                    <div style={styles.modal}>
                        <h2 style={styles.cardTitle}>새 예산 카테고리 추가</h2>
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="카테고리 이름"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <input
                            style={styles.input}
                            type="number"
                            placeholder="예산 금액"
                            value={newBudget}
                            onChange={(e) => setNewBudget(e.target.value)}
                        />
                        <button style={styles.button} onClick={handleAddCategory}>
                            추가
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}