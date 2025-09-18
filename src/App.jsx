import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import AvatarCell from './components/Avatar';
import FlagCell from './components/Flag';
import { buildQuery } from './utils/api';
import styles from './styles';

const PAGE_SIZE = 15;

const App = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch contacts from API
  const fetchContacts = useCallback(
    ({
      page = pageIndex + 1,
      sorting: sort = sorting,
      globalFilter: filter = globalFilter,
    } = {}) => {
      const query = buildQuery({
        page,
        pageSize: PAGE_SIZE,
        sorting: sort,
        globalFilter: filter,
      });
      fetch(`/contacts?${query}`)
        .then((res) => res.json())
        .then((data) => {
          setTotal(data.total);
          setData(data.contacts);
        })
        .catch(() => setData([]));
    },
    [pageIndex, sorting, globalFilter]
  );

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Date/Time',
        accessorKey: 'createdAt',
        accessorFn: (row) => [row.time, row.date],
        cell: (info) => {
          const [time, date] = info.getValue();
          return (
            <span style={{ fontSize: '0.92em' }}>
              <span style={{ fontWeight: 500 }}>{time}</span>{' '}
              <span style={{ color: '#888' }}>{date}</span>
            </span>
          );
        },
        size: 140,
      },
      {
        accessorKey: 'myName',
        accessorFn: (row) => row.myProfilePic,
        header: 'From',
        cell: (info) => (
          <AvatarCell
            url={info.getValue()}
            alt={info.row.original.myName || info.row.original.myCallSign}
          />
        ),
        size: 48,
      },
      { accessorKey: 'myCallSign', header: '', size: 90, enableSorting: false },
      {
        accessorKey: 'myCountry',
        header: '',
        cell: (info) => <FlagCell country={info.getValue()} />,
        size: 60,
        enableSorting: false,
      },
      { accessorKey: 'myState', header: '', size: 60, enableSorting: false },
      {
        accessorKey: 'theirName',
        accessorFn: (row) => row.theirProfilePic,
        header: 'To',
        cell: (info) => (
          <AvatarCell
            url={info.getValue()}
            alt={info.row.original.theirName || info.row.original.theirCallSign}
          />
        ),
        size: 48,
      },
      {
        accessorKey: 'theirCallSign',
        header: '',
        size: 90,
        enableSorting: false,
      },
      {
        accessorKey: 'theirCountry',
        header: '',
        cell: (info) => <FlagCell country={info.getValue()} />,
        size: 60,
        enableSorting: false,
      },
      { accessorKey: 'theirState', header: '', size: 60, enableSorting: false },
      { accessorKey: 'frequency', header: 'Frequency', size: 90 },
      { accessorKey: 'mode', header: 'Mode', size: 70 },
      { accessorKey: 'band', header: 'Band', size: 70 },
      {
        accessorKey: 'distance',
        header: 'Distance',
        cell: (info) => `${Number(info.getValue()).toFixed(2)} mi`,
        size: 90,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: (filter) => {
      setGlobalFilter(filter);
      setPageIndex(0);
      fetchContacts({ page: 1, sorting, globalFilter: filter });
    },
    onSortingChange: (updater) => {
      const newSorting = updater(sorting);
      setSorting(newSorting);
      setPageIndex(0);
      fetchContacts({ page: 1, sorting: newSorting, globalFilter });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Pagination logic
  const pageCount = Math.ceil(total / PAGE_SIZE);
  const pagedRows = table.getRowModel().rows;

  const handlePrev = () => {
    if (pageIndex === 0) return;
    const newIndex = Math.max(pageIndex - 1, 0);
    setPageIndex(newIndex);
    fetchContacts({ page: newIndex + 1, sorting, globalFilter });
  };

  const handleNext = () => {
    if (pageIndex >= pageCount - 1) return;
    const newIndex = Math.min(pageIndex + 1, pageCount - 1);
    setPageIndex(newIndex);
    fetchContacts({ page: newIndex + 1, sorting, globalFilter });
  };

  // Reset page index when filter or sorting changes
  useEffect(() => {
    setPageIndex(0);
  }, [globalFilter, sorting]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Most Recent Contacts</h1>
      <input
        value={globalFilter ?? ''}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        placeholder="Search..."
        style={styles.searchInput}
      />
      <table style={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={styles.theadRow}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    ...styles.th,
                    ...(header.column.getCanSort() ? {} : styles.thNoSort),
                  }}
                  onClick={() =>
                    header.column.getCanSort() && header.column.toggleSorting()
                  }
                >
                  {header.column.columnDef.header}
                  {header.column.getIsSorted() === 'asc' ? ' 🔼' : ''}
                  {header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {pagedRows.map((row, idx) => (
            <tr
              key={row.id}
              style={{
                ...styles.tbodyRow,
                background: idx % 2 === 0 ? '#fff' : '#f9f9f9',
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={styles.td}>
                  {cell.column.columnDef.cell
                    ? cell.column.columnDef.cell(cell)
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button
          onClick={handlePrev}
          disabled={pageIndex === 0}
          style={{
            ...styles.button,
            ...(pageIndex === 0 ? styles.buttonDisabled : {}),
          }}
        >
          Previous
        </button>
        <span style={styles.pageInfo}>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={handleNext}
          disabled={pageIndex >= pageCount - 1}
          style={{
            ...styles.button,
            ...(pageIndex >= pageCount - 1 ? styles.buttonDisabled : {}),
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
