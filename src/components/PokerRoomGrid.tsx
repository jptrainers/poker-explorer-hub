import { PokerRoom, PokerRoomCard } from "./PokerRoomCard";

interface PokerRoomGridProps {
  rooms: PokerRoom[];
  onRoomSelect: (room: PokerRoom) => void;
}

export const PokerRoomGrid = ({ rooms, onRoomSelect }: PokerRoomGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <PokerRoomCard 
          key={room.id} 
          room={room} 
          onSelect={onRoomSelect} 
        />
      ))}
    </div>
  );
};