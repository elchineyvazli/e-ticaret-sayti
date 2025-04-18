export const logEvent = (event, data) => {
    const logs = JSON.parse(localStorage.getItem('logEvents')) || [];
    logs.push({ event, data, time: new Date().toISOString() });
    localStorage.setItem('logEvents', JSON.stringify(logs));
};
