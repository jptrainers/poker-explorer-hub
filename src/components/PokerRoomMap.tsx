import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PokerRoom } from './PokerRoomCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin, AlertCircle } from 'lucide-react';

interface PokerRoomMapProps {
  rooms: PokerRoom[];
  onRoomSelect: (room: PokerRoom) => void;
}

export const PokerRoomMap = ({ rooms, onRoomSelect }: PokerRoomMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenError, setTokenError] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [30, 20],
        zoom: 2,
        projection: 'globe'
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(0, 0, 0)',
          'high-color': 'rgb(20, 20, 30)',
          'horizon-blend': 0.1,
        });
      });

      // Add markers for each poker room
      rooms.forEach((room) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'poker-room-marker';
        markerElement.innerHTML = `
          <div class="w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center">
            <div class="w-2 h-2 bg-background rounded-full ${room.featured ? 'animate-pulse' : ''}"></div>
          </div>
        `;

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([room.longitude, room.latitude])
          .addTo(map.current!);

        // Add popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          className: 'poker-room-popup'
        }).setHTML(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-foreground mb-1">${room.name}</h3>
            <p class="text-sm text-muted-foreground mb-2">${room.city}, ${room.country}</p>
            <div class="flex items-center gap-1 mb-2">
              ${Array.from({ length: room.rating }, () => '⭐').join('')}
              <span class="text-xs text-muted-foreground ml-1">(${room.rating}/5)</span>
            </div>
            <p class="text-xs text-muted-foreground">${room.tables} テーブル • ${room.hours}</p>
          </div>
        `);

        markerElement.addEventListener('click', () => {
          onRoomSelect(room);
        });

        marker.setPopup(popup);
        markersRef.current.push(marker);
      });

      setTokenError(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setTokenError(true);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, [mapboxToken, rooms]);

  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-card rounded-lg border border-border p-8">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Mapboxトークンが必要です</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
          マップを表示するには、Mapboxのパブリックトークンを入力してください。
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline ml-1"
          >
            mapbox.com
          </a>
          でアカウントを作成してトークンを取得できます。
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="pk.eyj... で始まるトークンを入力"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={initializeMap} disabled={!mapboxToken}>
            設定
          </Button>
        </div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-card rounded-lg border border-border p-8">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">マップの読み込みに失敗しました</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          トークンが無効か、ネットワークエラーが発生しました。
        </p>
        <Button 
          onClick={() => {
            setTokenError(false);
            setMapboxToken('');
          }}
          variant="outline"
        >
          再設定
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <p className="text-sm text-foreground font-medium">
          {rooms.length}のポーカールーム
        </p>
        <p className="text-xs text-muted-foreground">
          マーカーをクリックで詳細表示
        </p>
      </div>
    </div>
  );
};