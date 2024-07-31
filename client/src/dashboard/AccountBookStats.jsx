import React, { useState, useEffect } from 'react';
import '../css/AccountBook.css';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts 라이브러리 import

function AccountBookStats() {
    const [data, setData] = useState([]); // 가계부 데이터
    const [barData, setBarData] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        // TODO: 실제 데이터 가져오는 로직 구현
        setData([
            { date: '2024-05-01', 수입: 500000, 지출: 150000, category: '식비' },
            { date: '2024-05-05', 수입: 0, 지출: 50000, category: '교통비' },
            { date: '2024-05-10', 수입: 200000, 지출: 80000, category: '문화생활' },
            { date: '2024-05-15', 수입: 0, 지출: 30000, category: '쇼핑' },
            { date: '2024-05-20', 수입: 100000, 지출: 60000, category: '식비' },
            { date: '2024-05-25', 수입: 0, 지출: 20000, category: '기타' },
            { date: '2024-05-30', 수입: 300000, 지출: 100000, category: '쇼핑' },
        ]);
    }, []);

    useEffect(() => {
        const categorySums = data.reduce((acc, cur) => {
            acc[cur.category] = (acc[cur.category] || 0) + cur.지출;
            console.log(acc);
            return acc;
        }, {});
        setBarData(Object.entries(categorySums).map(([name, value]) => ({ name, value })));
    }, [data]); // data 상태를 의존성 배열에 추가

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    const totalIncome = data.reduce((sum, item) => sum + item.수입, 0);
    const totalExpense = data.reduce((sum, item) => sum + item.지출, 0);

    const handlePieChartClick = (_, index) => {
        const selectedCategory = barData[index].name;
        console.log(selectedCategory);
        const filtered = data.filter(item => item.category === selectedCategory);
        const filteredWithAmount = filtered.map(item => ({
            ...item,
            amount: item.지출, // 지출 값을 amount로 설정
            type: "pie"
        }));

        setFilteredTransactions(filteredWithAmount);
    };

    const handleLineChartClick = ({ activePayload }) => {
        if (activePayload) {
            const clickedDate = activePayload[0].payload.date;
            const filtered = data.filter(item => item.date === clickedDate);
            console.log(filtered);
            const filteredWithAmount = filtered.map(item => ({
                ...item,
                type: "line"
            }));
            setFilteredTransactions(filtered);
            console.log(filteredTransactions);
        }
    };
    return (
        <div>
            <div className="summary-section">
                <div className='summary-card'>
                    <h3>잔액</h3>
                    <p>0원</p>
                </div>
                <div className="summary-card">
                    <h3>이번 달 수입</h3>
                    <p>{totalIncome.toLocaleString()}원</p>
                </div>
                <div className="summary-card">
                    <h3>이번 달 지출</h3>
                    <p>{totalExpense.toLocaleString()}원</p>
                </div>
            </div>
            <div className="accountbook-stats-container">
                <div className="chart-container">
                    <ResponsiveContainer>
                        {barData.length > 0 ? (
                            <PieChart>
                                <Pie
                                    data={barData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    paddingAngle={5} /* 조각 간 간격 추가 */
                                    dataKey="value"
                                    nameKey="name" // nameKey 속성 추가
                                    labelLine={false} // labelLine 속성 추가
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    onClick={handlePieChartClick}
                                >
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        ) : (
                            <p>데이터를 불러오는 중입니다...</p> // 로딩 메시지 표시
                        )}
                    </ResponsiveContainer>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer>
                        {data.length > 0 ? (
                            <LineChart data={data} onClick={handleLineChartClick}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" allowDuplicatedCategory={false} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="수입" stroke="#8884d8" />
                                <Line type="monotone" dataKey="지출" stroke="#82ca9d" />
                            </LineChart>
                        ) : (
                            <p>데이터를 불러오는 중입니다...</p> // 로딩 메시지 표시
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="detail-section">
                <h3>상세 내역</h3>
                <ul className="transaction-list">
                    {filteredTransactions.map((transaction, index) => (
                        <li key={index} className={`transaction-item ${transaction.type}`}>
                            {transaction.type == "pie" ? (
                                <div>
                                    <span className="date">{transaction.date} </span>
                                    <span className="category">{transaction.category} </span>
                                    {/* amount가 undefined일 경우 0으로 처리 */}
                                    <span className="amount">{(transaction.amount || 0).toLocaleString()}원</span>
                                    {/* ... (메모 등 추가 정보) ... */}
                                </div>
                            ) : (
                                <div>
                                    <span className="date">{transaction.date} </span>
                                    <span className="category">{transaction.category} </span>
                                    {/* amount가 undefined일 경우 0으로 처리 */}
                                    <span className="amount">수입 : {(transaction.수입 || 0).toLocaleString()}원 ㅇ</span>
                                    <span className="amount">지출 : {(transaction.지출 || 0).toLocaleString()}원</span>
                                    {/* ... (메모 등 추가 정보) ... */}
                                </div>
                            )}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AccountBookStats;