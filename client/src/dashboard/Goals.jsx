import React, { useState } from 'react';

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
    goalList: {
        listStyle: 'none',
        padding: 0,
    },
    goalItem: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    goalTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    goalDetails: {
        fontSize: '14px',
        color: '#666',
    },
    progressBar: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        marginTop: '10px',
    },
    progressFill: {
        height: '10px',
        backgroundColor: '#4CAF50',
        borderRadius: '4px',
        transition: 'width 0.5s ease-in-out',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginLeft: '10px',
    },
    deleteButton: {
        backgroundColor: '#f44336',
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
    filterContainer: {
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
    },
};

export default function GoalManagement() {
    const [goals, setGoals] = useState([
        { id: 1, title: '월 저축 목표', type: 'financial', target: 500000, current: 300000, deadline: '2023-12-31' },
        { id: 2, title: '주간 운동', type: 'task', target: 3, current: 2, deadline: '2023-06-30' },
        { id: 3, title: '가족 여행', type: 'event', target: 1, current: 0, deadline: '2023-08-15' },
    ]);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');

    const handleEditClick = (goal) => {
        setSelectedGoal(goal);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setGoals(goals.map(goal => goal.id === selectedGoal.id ? selectedGoal : goal));
        setIsModalOpen(false);
    };

    const calculateProgress = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    const filteredGoals = filter === 'all' ? goals : goals.filter(goal => goal.type === filter);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>목표 관리</h1>

            <div style={styles.filterContainer}>
                <button style={styles.button} onClick={() => setFilter('all')}>전체</button>
                <button style={styles.button} onClick={() => setFilter('financial')}>재정</button>
                <button style={styles.button} onClick={() => setFilter('task')}>작업</button>
                <button style={styles.button} onClick={() => setFilter('event')}>이벤트</button>
            </div>

            <ul style={styles.goalList}>
                {filteredGoals.map((goal) => (
                    <li key={goal.id} style={styles.goalItem}>
                        <div>
                            <div style={styles.goalTitle}>{goal.title}</div>
                            <div style={styles.goalDetails}>
                                유형: {goal.type === 'financial' ? '재정' : goal.type === 'task' ? '작업' : '이벤트'}
                            </div>
                            <div style={styles.goalDetails}>목표: {goal.target}</div>
                            <div style={styles.goalDetails}>현재: {goal.current}</div>
                            <div style={styles.goalDetails}>마감일: {goal.deadline}</div>
                            <div style={styles.progressBar}>
                                <div
                                    style={{
                                        ...styles.progressFill,
                                        width: `${calculateProgress(goal.current, goal.target)}%`,
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <button style={styles.button} onClick={() => handleEditClick(goal)}>수정</button>
                            <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDeleteClick(goal.id)}>삭제</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <>
                    <div style={styles.overlay} onClick={() => setIsModalOpen(false)} />
                    <div style={styles.modal}>
                        <h2 style={styles.header}>목표 수정</h2>
                        <form onSubmit={handleSaveEdit} style={styles.form}>
                            <input
                                type="text"
                                value={selectedGoal.title}
                                onChange={(e) => setSelectedGoal({ ...selectedGoal, title: e.target.value })}
                                style={styles.input}
                            />
                            <select
                                value={selectedGoal.type}
                                onChange={(e) => setSelectedGoal({ ...selectedGoal, type: e.target.value })}
                                style={styles.select}
                            >
                                <option value="financial">재정</option>
                                <option value="task">작업</option>
                                <option value="event">이벤트</option>
                            </select>
                            <input
                                type="number"
                                value={selectedGoal.target}
                                onChange={(e) => setSelectedGoal({ ...selectedGoal, target: Number(e.target.value) })}
                                style={styles.input}
                            />
                            <input
                                type="number"
                                value={selectedGoal.current}
                                onChange={(e) => setSelectedGoal({ ...selectedGoal, current: Number(e.target.value) })}
                                style={styles.input}
                            />
                            <input
                                type="date"
                                value={selectedGoal.deadline}
                                onChange={(e) => setSelectedGoal({ ...selectedGoal, deadline: e.target.value })}
                                style={styles.input}
                            />
                            <button type="submit" style={styles.button}>저장</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}