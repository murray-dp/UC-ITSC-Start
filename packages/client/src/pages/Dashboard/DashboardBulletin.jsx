import React from 'react';
import '../../scss/dashboard.scss';

export const DashboardBulletin = () =>
  <div className="dashboard">
    <h1>OCAT Dashboard</h1>
    <hr />
    <nav>
      <ul>
        <li><a href="/assessment/new">New Assessment</a></li>
        <li><a href="/assessment/list">View Assessments</a></li>
      </ul>
    </nav>
  </div>;
