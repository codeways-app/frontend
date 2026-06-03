export interface ChatFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  isCollapsed?: boolean;
}
