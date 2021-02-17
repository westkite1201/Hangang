import React from 'react';
import Search from './Search';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table';
import styled from 'styled-components';
const St = {
  Table: styled.table`
    width: 100%;
    /* text-align: left; */
    /* border-radius: 3px 3px 0 0; */
    border-collapse: separate;
    border-spacing: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #666;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum', 'tnum';
    position: relative;
    font-size: 13px;
    background: #fff;
    border-radius: 3px;
  `,
  Th: styled.th`
    border-bottom: 1px solid #f4f4f4;
    transition: background 0.3s;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    text-align: center;
    background: #fafafa;
    border-bottom: 1px solid #f4f4f4;

    transition: background 0.3s ease;
}
  `,

  Tr: styled.tr`
    border-bottom: 1px solid #f4f4f4;
    transition: background 0.3s;
  `,
  Td: styled.td`
    border-bottom: 1px solid #f4f4f4;
    transition: background 0.3s;
    position: relative;
    padding: 16px 16px;
    overflow-wrap: break-word;
    text-align: center;
  `,
  Tag: styled.span`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #666;
    font-size: 13px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum', 'tnum';
    display: inline-block;
    height: auto;
    margin-right: 8px;
    padding: 0 7px;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    background: #fafafa;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    opacity: 1;
    transition: all 0.3s;
  `
};

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    rows,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    { columns, data, initialState: { pageIndex: 1 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <Search onSubmit={setGlobalFilter} />
      <St.Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <St.Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <St.Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                </St.Th>
              ))}
            </St.Tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <St.Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log(cell);
                  if (cell.column['Header'] === 'Status') {
                    return (
                      <St.Td {...cell.getCellProps()}>
                        {cell.value ? (
                          <St.Tag>ACCECPTED</St.Tag>
                        ) : (
                          <St.Tag>REJECT</St.Tag>
                        )}
                      </St.Td>
                    );
                  } else {
                    return (
                      <St.Td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </St.Td>
                    );
                  }
                })}
              </St.Tr>
            );
          })}
        </tbody>
      </St.Table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Table;
