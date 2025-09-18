// Helper to build query string for API
const buildQuery = ({ page, pageSize, sorting, globalFilter }) => {
  return new URLSearchParams({
    ...(page ? { page } : {}),
    pageSize,
    ...(sorting?.[0]?.id
      ? {
          sortBy: sorting[0].id,
          sortOrder: sorting[0].desc ? 'DESC' : 'ASC',
        }
      : {}),
    ...(globalFilter ? { searchTerm: globalFilter } : {}),
  }).toString();
};

export { buildQuery };
