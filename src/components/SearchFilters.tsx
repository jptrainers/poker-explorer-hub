import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

export interface FilterState {
  search: string;
  country: string;
  games: string[];
  stakes: string;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCountries: string[];
  availableGames: string[];
  availableStakes: string[];
}

export const SearchFilters = ({
  filters,
  onFiltersChange,
  availableCountries,
  availableGames,
  availableStakes,
}: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleGame = (game: string) => {
    const newGames = filters.games.includes(game)
      ? filters.games.filter(g => g !== game)
      : [...filters.games, game];
    updateFilters({ games: newGames });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      country: '',
      games: [],
      stakes: ''
    });
  };

  const hasActiveFilters = filters.search || filters.country || filters.games.length > 0 || filters.stakes;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search poker rooms..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10 bg-input border-border/50 focus:border-primary/50"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-border/50 hover:border-primary/50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs bg-primary text-primary-foreground">
              •
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="bg-card/50 border border-border/50 rounded-lg p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) => updateFilters({ country: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border/50 rounded-md text-foreground focus:border-primary/50 focus:outline-none"
            >
              <option value="">All Countries</option>
              {availableCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Stakes
            </label>
            <select
              value={filters.stakes}
              onChange={(e) => updateFilters({ stakes: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border/50 rounded-md text-foreground focus:border-primary/50 focus:outline-none"
            >
              <option value="">All Stakes</option>
              {availableStakes.map(stake => (
                <option key={stake} value={stake}>{stake}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Games
            </label>
            <div className="flex flex-wrap gap-2">
              {availableGames.map(game => (
                <Badge
                  key={game}
                  variant={filters.games.includes(game) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    filters.games.includes(game) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                  onClick={() => toggleGame(game)}
                >
                  {game}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};