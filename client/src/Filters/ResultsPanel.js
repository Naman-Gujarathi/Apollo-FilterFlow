// ResultsPanel.js
import React from 'react';

const ResultsPanel = ({ results, totalCount }) => {
  return (
    <div className="results-panel">
      <div>Total Count: {totalCount}</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Company</th>
            <th>Quick Actions</th>
            <th>Contact Location</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {results.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.title}</td>
              <td>{person.company}</td>
              <td>{/* Render quick actions for person */}</td>
              <td>{person.location}</td>
              {/* Add other cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPanel;
