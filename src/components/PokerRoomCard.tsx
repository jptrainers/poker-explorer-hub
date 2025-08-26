import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Clock, Users, Star, DollarSign } from "lucide-react";

export interface PokerRoom {
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  stakes: string;
  games: string[];
  hours: string;
  tables: number;
  image?: string;
  featured?: boolean;
}

interface PokerRoomCardProps {
  room: PokerRoom;
  onSelect: (room: PokerRoom) => void;
}

export const PokerRoomCard = ({ room, onSelect }: PokerRoomCardProps) => {
  return (
    <Card 
      className={`
        group cursor-pointer transition-all duration-300 hover:scale-[1.02] 
        bg-card border-border/50 hover:border-primary/50 
        shadow-casino hover:shadow-glow
        ${room.featured ? 'ring-1 ring-primary/30' : ''}
      `}
      onClick={() => onSelect(room)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {room.name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {room.city}, {room.country}
            </div>
          </div>
          
          {room.featured && (
            <Badge variant="secondary" className="bg-gradient-gold text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < room.rating 
                    ? 'text-primary fill-primary' 
                    : 'text-muted-foreground/30'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {room.rating}/5
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="w-4 h-4 mr-2" />
            Stakes: {room.stakes}
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            {room.tables} Tables
          </div>
          
          <div className="flex items-center text-muted-foreground col-span-2">
            <Clock className="w-4 h-4 mr-2" />
            {room.hours}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {room.games.map((game) => (
            <Badge key={game} variant="outline" className="text-xs border-border/50">
              {game}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full group-hover:bg-gradient-gold transition-all duration-300" 
          variant="secondary"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};