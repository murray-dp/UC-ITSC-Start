import React, { useEffect, useMemo, useState } from 'react';
import { useFilters, useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
import '../../scss/table.scss';

function deleteAssessment(id) {
  console.log(`AssessmentList: Deleting row `, id); // eslint-disable-line no-console
  AssessmentService.delete(id);
  localStorage.setItem(`isDeleteRefresh`, `true`);
  localStorage.setItem(`deleteMessage`, `Assessment [cat id = ${id}] has been deleted!`);
  window.location.reload(true);
}

// console.log(localStorage.getItem(`deleteMessage`)); // eslint-disable-line
if (localStorage.getItem(`isDeleteRefresh`) === `false`) {
  localStorage.setItem(`deleteMessage`, ``);
}
localStorage.setItem(`isDeleteRefresh`, `false`);

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
        // eslint-disable-next-line
        Cell: ({ row }) => <>{row.original.createdAt.substring(0, row.original.createdAt.indexOf(`T`))}</>,
      },
      {
        Header: `Last Updated`,
        // eslint-disable-next-line
        Cell: ({ row }) => <>{row.original.updatedAt.substring(0, row.original.updatedAt.indexOf(`T`))}</>,
      },
      {
        Header: `Delete`,
        // eslint-disable-next-line
        Cell: ({ row }) => <>
          <button onClick={() => { deleteAssessment(row.original.id); }}>Delete Assessment</button>
        </>,
      },
    ],
    []
  );

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    setFilter,
  } = useTable({ columns: cols, data: assessments }, useFilters, useSortBy);

  const [ filterInput, setFilterInput ] = useState(``);

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter(`catName`, value);
    setFilterInput(value);
  };

  return (
    <div>
      {/*
          List goes here
          Please use the library react-table https://www.npmjs.com/package/react-table
      */}
      <h1>Table of Entries</h1>
      <div id="delete-message">{localStorage.getItem(`deleteMessage`)}</div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" id="filter" name="filter" placeholder="Search Table..."
          {...register(`filter`, { required: true }) } />
        <input type="submit" value="Submit" />
      </form> */}
      <input id="filter" name="filter" value={filterInput} onChange={handleFilterChange}
        placeholder="Enter Cat Name..." />
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
