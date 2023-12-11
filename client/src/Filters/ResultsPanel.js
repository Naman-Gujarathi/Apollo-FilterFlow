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
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
                <h2 className="text-lg font-semibold">Results</h2>
                <div>Total Count: {formatCount(totalCount)}</div>
            </div>

            {/* Table section */}
            <div className="flex-grow overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employees</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Location</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Industry</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Keywords</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
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
