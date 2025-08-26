import { useState, useMemo } from "react";
import { PokerRoomGrid } from "@/components/PokerRoomGrid";
import { PokerRoomMap } from "@/components/PokerRoomMap";
import { SearchFilters, FilterState } from "@/components/SearchFilters";
import { PokerRoomModal } from "@/components/PokerRoomModal";
import { PokerRoom } from "@/components/PokerRoomCard";
import { pokerRooms, getUniqueCountries, getUniqueGames, getUniqueStakes } from "@/data/pokerRooms";
import { Spade, Club, Heart, Diamond, Grid3X3, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    country: '',
    games: [],
    stakes: ''
  });
  
  const [selectedRoom, setSelectedRoom] = useState<PokerRoom | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredRooms = useMemo(() => {
    return pokerRooms.filter(room => {
      // Search filter
      if (filters.search && !room.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !room.city.toLowerCase().includes(filters.search.toLowerCase()) &&
          !room.country.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Country filter
      if (filters.country && room.country !== filters.country) {
        return false;
      }
      
      // Stakes filter
      if (filters.stakes && room.stakes !== filters.stakes) {
        return false;
      }
      
      // Games filter
      if (filters.games.length > 0 && !filters.games.some(game => room.games.includes(game))) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  const handleRoomSelect = (room: PokerRoom) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // Sort rooms to show featured ones first
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-casino border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Spade className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                海外ポーカールーム
              </h1>
              <Heart className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              世界各地の最高級ポーカールーム情報を検索・比較できます
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
              <Diamond className="w-5 h-5" />
              <span className="text-sm">
                {pokerRooms.length}のポーカールームを掲載
              </span>
              <Club className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Search and Filters */}
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableCountries={getUniqueCountries()}
            availableGames={getUniqueGames()}
            availableStakes={getUniqueStakes()}
          />

          {/* Results Count and View Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {sortedRooms.length === pokerRooms.length
                ? `${sortedRooms.length}件のポーカールーム`
                : `${sortedRooms.length}件が検索条件に一致 (全${pokerRooms.length}件中)`
              }
            </p>
            
            <div className="flex items-center gap-4">
              {sortedRooms.filter(r => r.featured).length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  注目のポーカールーム
                </div>
              )}
              
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  グリッド
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="h-8 px-3"
                >
                  <Map className="w-4 h-4 mr-1" />
                  マップ
                </Button>
              </div>
            </div>
          </div>

          {/* Poker Room Content */}
          {sortedRooms.length > 0 ? (
            viewMode === 'grid' ? (
              <PokerRoomGrid 
                rooms={sortedRooms}
                onRoomSelect={handleRoomSelect}
              />
            ) : (
              <PokerRoomMap
                rooms={sortedRooms}
                onRoomSelect={handleRoomSelect}
              />
            )
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                <Spade className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                検索条件に一致するポーカールームが見つかりませんでした
              </h3>
              <p className="text-muted-foreground">
                フィルターを調整して再度検索してください
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Room Detail Modal */}
      <PokerRoomModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Index;