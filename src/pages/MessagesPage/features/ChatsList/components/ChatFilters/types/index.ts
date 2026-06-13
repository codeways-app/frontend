export interface ChatFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isCollapsed?: boolean;
  onExpand?: () => void;
}
