import React, { useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
import '../../scss/table.scss';

function deleteAssessment(id) {
  console.log(`AssessmentList: Deleting row `, id); // eslint-disable-line no-console
  AssessmentService.delete(id);
}

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // console.log(`assessment before: `, assessments); // eslint-disable-line no-console

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

  const cols = useMemo(
    () => [
      {
        Header: `Cat ID`,
        accessor: `id`,
      },
      {
        Header: `Cat Name`,
        accessor: `catName`,
      },
      {
        Header: `Date of Birth`,
        accessor: `catDateOfBirth`,
      },
      {
        Header: `Instrument Type`,
        accessor: `instrumentType`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      },
      {
        Header: `Entry Created At`,
        accessor: `createdAt`,
      },
      {
        Header: `Last Updated`,
        accessor: `updatedAt`,
      },
      {
        Header: `Delete`,
        Cell: ({ row }) => <button onClick={() => { deleteAssessment(row.original.id); }}>Delete Assessment</button>, // eslint-disable-line
      },
    ],
    []
  );

  // console.log(`assessments: `); // eslint-disable-line no-console
  console.log(assessments); // eslint-disable-line no-console

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns: cols, data: assessments }, useSortBy);

  return (
    <div>
      {/*
          List goes here
          Please use the library react-table https://www.npmjs.com/package/react-table
      */}
      <h1>Table of Entries</h1>
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup =>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column =>
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{
                      background: `#bfbfbf`,
                      border: `2px solid #000000`,
                    }}>
                      { column.render(`Header`) }
                      <span>
                        {
                          column.isSorted ?
                            column.isSortedDesc ?
                              ` 🔽` :
                              ` 🔼` :
                            ``
                        }
                      </span>
                    </th>)
                }
              </tr>)
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    // eslint-disable-next-line
                    row.cells.map( cell => 
                      <td {...cell.getCellProps()} style={{ border: `2px solid #000000` }}>
                        { cell.render(`Cell`) }
                      </td>
                    ) // eslint-disable-line
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};
