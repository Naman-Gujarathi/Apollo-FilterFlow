import React from 'react';

const formatCount = (num) => {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
};

const ResultsPanel = ({ results, totalCount }) => {
    return (
        <div className="flex flex-col w-full h-full">
            {/* Results count section */}
            <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white">
                <h2 className="text-lg font-semibold">Results</h2>
                <span className="text-sm">Total Count: {formatCount(totalCount)}</span>
            </div>

            {/* Table section */}
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="table-header-bg sticky bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Name</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Title</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Company</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Email</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Phone</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Employees</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Contact Location</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Industry</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50">Keywords</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {results.map((person, index) => (
                            <tr key={index}>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.name ?? 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.title ?? 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.organization?.name ?? 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.email ?? 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.phone ?? 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.employees ?? 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    {`${person?.city ?? 'N/A'}, ${person?.state ?? 'N/A'}, ${person?.country ?? 'N/A'}`}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.industry ?? 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap">{person?.keywords ?? 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ResultsPanel;
