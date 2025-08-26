import { Spade, Heart, Diamond, Club, MapPin, Search, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { pokerRooms } from "@/data/pokerRooms";

const Home = () => {
  const featuredRooms = pokerRooms.filter(room => room.featured).slice(0, 3);
  const topRatedRooms = [...pokerRooms].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-casino border-b border-border/50">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Spade className="w-12 h-12 text-primary animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                海外ポーカールーム
              </h1>
              <Heart className="w-12 h-12 text-secondary animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              世界最高級のポーカールームを発見しよう<br />
              あなたの理想のゲーム体験を見つけてください
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Diamond className="w-4 h-4 mr-2" />
                {pokerRooms.length}の厳選ルーム
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Club className="w-4 h-4 mr-2" />
                リアルタイム情報
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/search">
                  <Search className="w-5 h-5 mr-2" />
                  ポーカールームを探す
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/favorites">
                  <Star className="w-5 h-5 mr-2" />
                  お気に入りを見る
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            注目のポーカールーム
          </h2>
          <p className="text-lg text-muted-foreground">
            世界中から厳選された特別なポーカールーム
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-elegant transition-shadow duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="default" className="mb-2">注目</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{room.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{room.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {room.city}, {room.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">開催ゲーム</p>
                    <div className="flex flex-wrap gap-1">
                      {room.games.slice(0, 3).map((game) => (
                        <Badge key={game} variant="outline" className="text-xs">
                          {game}
                        </Badge>
                      ))}
                      {room.games.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.games.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">テーブル数</span>
                    <span className="font-medium">{room.tables}台</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/search">
              すべてのポーカールームを見る
            </Link>
          </Button>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              高評価ポーカールーム
            </h2>
            <p className="text-lg text-muted-foreground">
              プレイヤーから最も高い評価を受けているルーム
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRatedRooms.map((room, index) => (
              <Card key={room.id} className="hover:shadow-elegant transition-shadow duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-bold text-lg">{room.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <CardDescription>{room.city}, {room.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ステークス</span>
                    <span className="font-medium">{room.stakes}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {pokerRooms.length}
            </div>
            <p className="text-muted-foreground">ポーカールーム</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {new Set(pokerRooms.map(r => r.country)).size}
            </div>
            <p className="text-muted-foreground">国・地域</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {pokerRooms.reduce((sum, room) => sum + room.tables, 0)}
            </div>
            <p className="text-muted-foreground">テーブル数</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {Math.round(pokerRooms.reduce((sum, room) => sum + room.rating, 0) / pokerRooms.length * 10) / 10}
            </div>
            <p className="text-muted-foreground">平均評価</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;