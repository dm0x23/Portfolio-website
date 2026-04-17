import React, { useState, useEffect } from 'react';

const GitHubCalendar = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://github-contributions-api.jogruber.de/v4/dm0x23?y=last');
                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub data');
                }
                const json = await response.json();
                if (json.contributions) {
                    setData(json.contributions);
                } else {
                    setData([]);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Purple Theme
    const getThemeColor = (level) => {
        // 0: darkest (bg), 4: brightest (highlight)
        if (level === 0) return '#1f1f22'; // Very dark grey/black for empty
        if (level === 1) return '#5b21b6'; // Deep Purple
        if (level === 2) return '#7c3aed'; // Purple
        if (level === 3) return '#a78bfa'; // Light Purple
        if (level === 4) return '#e9d5ff'; // Very Light Purple
        return '#1f1f22';
    };

    if (loading) return <div className="text-white text-center animate-pulse">Loading contributions...</div>;
    if (error) return <div className="text-red-400 text-center">Unable to load data</div>;

    // Process data into weeks
    const weeks = [];
    let currentWeek = [];

    // Pad the beginning if necessary to start on Sunday/appropriate day
    // For simplicity, we'll just chunk into 7s, but real calendar aligns to days.
    // The API returns a year of data. Let's just create 7-day chunks.

    data.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7 || index === data.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    // Month labels
    const monthLabels = [];
    let currentMonthIndex = -1;

    weeks.forEach((week) => {
        const firstDay = week[0];
        if (!firstDay) return;
        const date = new Date(firstDay.date);
        const month = date.getMonth();

        if (month !== currentMonthIndex) {
            monthLabels.push({ name: date.toLocaleString('default', { month: 'short' }), weekCount: 1 });
            currentMonthIndex = month;
        } else {
            monthLabels[monthLabels.length - 1].weekCount++;
        }
    });

    const totalContributions = data.reduce((acc, curr) => acc + curr.count, 0);
    const startYear = data.length > 0 ? new Date(data[0].date).getFullYear() : '';
    const endYear = data.length > 0 ? new Date(data[data.length - 1].date).getFullYear() : '';
    const yearLabel = startYear === endYear ? startYear : `${startYear} - ${endYear}`;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar flex justify-center">
                <div className="min-w-fit">
                    {/* Header: Months */}
                    <div className="flex text-xs text-white/40 mb-2">
                        {monthLabels.map((month, i) => (
                            <div
                                key={i}
                                style={{
                                    width: `${month.weekCount * 16}px`, // 12px box + 4px gap
                                    textAlign: 'left',
                                    flexShrink: 0
                                }}
                            >
                                {month.name}
                            </div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="flex gap-1">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {week.map((day) => (
                                    <div
                                        key={day.date}
                                        className="w-3 h-3 rounded-[2px] transition-colors duration-300"
                                        style={{ backgroundColor: getThemeColor(day.level) }}
                                        title={`${day.count} contributions on ${day.date}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full max-w-[900px] mt-4 text-xs text-white/50 px-2">
                <span>{yearLabel}</span>
                <span>{totalContributions} Contributions</span>
            </div>
        </div>
    );
};

export default GitHubCalendar;
