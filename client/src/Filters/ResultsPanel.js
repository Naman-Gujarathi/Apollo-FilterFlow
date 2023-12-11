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
            <th>Email</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {results.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.title}</td>
              <td>{person.organization.name}</td>
              <td>Email, Call</td> {/* Assuming these are the quick actions */}
              <td>{`${person.city}, ${person.state}, ${person.country}`}</td>
              <td>{person.email}</td> {/* Assuming you have permission to display email */}
              {/* Add other cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPanel;
