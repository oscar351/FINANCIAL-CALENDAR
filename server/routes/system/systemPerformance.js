const client = require('../../client');
const { getDiskInfo } = require('node-disk-info');
const os = require('os');

const getSystemPerformance = async (req, res, next) => {
    if (req.role === 'ADMIN') {
        try {
            const cpuUsage = getCpuUsage();
            const memoryUsage = getMemoryUsage();
            const diskUsage = await getDiskUsage();
            //const logs = getLogs();

            res.send({
                cpuUsage: cpuUsage,
                memoryUsage: memoryUsage,
                diskUsage: diskUsage
            });
        } catch (error) {
            console.error(error);
            res.send({
                code: 400,
                message: "Failed to get system performance data",
                value: null
            });
        }
    } else {
        res.send({
            code: 400,
            message: "관리자 권한이 아닙니다.",
            value: null
        });
    }
}

const getCpuUsage = () => {
    const cpus = os.cpus();
    const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
    const totalTick = cpus.reduce((acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);

    return Math.floor((1 - totalIdle / totalTick) * 100); // CPU 사용량 퍼센트 계산
};

const getMemoryUsage = () => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    return Math.floor(((totalMemory - freeMemory) / totalMemory) * 100); // 메모리 사용량 퍼센트 계산
};

const getDiskUsage = async () => {
    const diskInfo = await getDiskInfo();
    const diskUsages = diskInfo.map(disk => {
        const usedSpace = disk.used; // 사용된 공간
        const totalSpace = disk.blocks; // 총 공간
        return {
            device: disk.mounted, // 디스크 장치 경로 (예: "C:\", "D:\")
            usagePercent: Math.floor((usedSpace / totalSpace) * 100) // 디스크 사용량 퍼센트 계산
        };
    });
    return diskUsages; // 디스크 사용량 퍼센트 계산
};


module.exports = {
    getSystemPerformance
};
