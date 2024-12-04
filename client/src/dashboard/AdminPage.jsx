import React, { useState, useEffect, useRef } from 'react';
import { CpuIcon, HardDriveIcon, MemoryStickIcon } from 'lucide-react';
import { getSystemPerformance } from '../apis/api/systemManage';
import Highcharts from 'highcharts';
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from 'highcharts/highcharts-more';
import '../css/AdminPage.css';

HighchartsMore(Highcharts);
solidGauge(Highcharts);

function SystemPerformancePage() {
    const [performanceData, setPerformanceData] = useState({
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: [{ device: 'C', usagePercent: 0 }, { device: 'D', usagePercent: 0 }, { device : 'N', usagePercent : 0}],
        logs: [],
    });
    const [loading, setLoading] = useState(false);
    const chartRefs = useRef([]);


    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const data = await getSystemPerformance();
                console.log(data);
                setPerformanceData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        //fetchPerformanceData();
        const intervalId = setInterval(() => {
            fetchPerformanceData();
        }, 1000); // 1000ms = 1초

        // 컴포넌트가 언마운트 될 때 interval을 정리
        return () => clearInterval(intervalId);
    }, []);

    // 데이터만 업데이트하는 함수
    useEffect(() => {
        if (chartRefs.current.length) {
            performanceData.diskUsage.forEach((disk, index) => {
                if (chartRefs.current[index]) {
                    chartRefs.current[index].chart.series[0].setData([disk.value]);
                }
            });
        }
    }, [performanceData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const gaugeOptions = {
        chart: {
            type: 'solidgauge',
            backgroundColor:'#f5f5f5'
        },
        title: null,
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderWidth: 0,
                outerRadius: '100%',
            }],
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '사용량 (%)',
                y: 20
            },
            stops: [
                [0.2, '#55BF3B'], // Green
                [0.5, '#DDDF0D'], // Yellow
                [0.9, '#DF5353'], // Red
            ],
        },
        series: [{
            name: '사용량',
            data: [performanceData.cpuUsage], // CPU 사용량
            tooltip: {
                valueSuffix: ' %',
            },
            dataLabels: {
                enabled: true,
                format: '{y}%', // 데이터 표시 형식
                y: -18, // 이 값을 음수로 하면 위로 이동 (예: -20px)
                style: {
                    fontSize: '24px', // 글씨 크기 설정
                    fontWeight: 'bold',
                    color: '#000', // 글씨 색상 설정 (필요 시)
                },
                borderWidth: 0,
            }
        }],
    };

    return (
        <div>
            <h1>시스템 성능</h1>
            <div className='systemPerformance'>
                <div className='systemItem'>
                    <div className='systemSeries'>
                        <h2 className='systemName'><span>CPU 사용량</span><CpuIcon /></h2>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{ ...gaugeOptions, series: [{ ...gaugeOptions.series[0], data: [performanceData.cpuUsage] }]}}
                        />
                    </div>
                    <div className='systemSeries'>
                        <h2 className='systemName'><span>메모리</span><MemoryStickIcon /></h2>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{ ...gaugeOptions, series: [{ ...gaugeOptions.series[0], data: [performanceData.memoryUsage] }] }}
                        />
                    </div>
                </div>
                <div className='systemItem'>
                    {performanceData.diskUsage.map((disk, index) => (
                        <div className='systemSeries' key={index}>
                            <h2 className='systemName'><span>{disk.device}드라이브</span><HardDriveIcon /></h2>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={{ ...gaugeOptions, series: [{ ...gaugeOptions.series[0], data: [disk.usagePercent] }] }}
                                ref={(el) => (chartRefs.current[index] = el)} // 차트 객체 저장
                            />
                        </div>
                    ))}
                </div>
            </div>
            <h3>Logs:</h3>
            {/* <ul>
                {performanceData.logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default SystemPerformancePage;