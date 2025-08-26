import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PokerRoom } from "./PokerRoomCard";
import { MapPin, Clock, Users, Star, DollarSign, Phone, Globe, Mail } from "lucide-react";

interface PokerRoomModalProps {
  room: PokerRoom | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokerRoomModal = ({ room, isOpen, onClose }: PokerRoomModalProps) => {
  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            {room.name}
            {room.featured && (
              <Badge variant="secondary" className="bg-gradient-gold text-primary-foreground">
                Featured
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location & Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{room.city}, {room.country}</span>
            </div>
            
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < room.rating 
                      ? 'text-primary fill-primary' 
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
              <span className="ml-2 text-lg font-medium text-foreground">
                {room.rating}/5
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/20 rounded-lg p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Stakes</div>
              <div className="font-medium text-foreground">{room.stakes}</div>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Tables</div>
              <div className="font-medium text-foreground">{room.tables}</div>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Hours</div>
              <div className="font-medium text-foreground">{room.hours}</div>
            </div>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Available Games</h3>
            <div className="flex flex-wrap gap-2">
              {room.games.map((game) => (
                <Badge 
                  key={game} 
                  variant="secondary" 
                  className="bg-secondary/50 text-secondary-foreground px-3 py-1"
                >
                  {game}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact Info (Mock data) */}
          <div className="border-t border-border/50 pt-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">Contact Information</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span>info@{room.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-3" />
                <span>www.{room.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1 bg-gradient-gold hover:opacity-90 transition-opacity">
              Visit Website
            </Button>
            <Button variant="outline" className="flex-1 border-border/50">
              Get Directions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};