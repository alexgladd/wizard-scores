import GamesList from "@/components/GamesList";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Club, Diamond, Heart, Spade, SquarePlus } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="p-4 grow overflow-y-auto">
      <section className="mb-10">
        <h1 className="text-xl font-bold tracking-wide text-center">
          Welcome to the Wizard Scorekeeper!
        </h1>
      </section>
      <section className="mb-10 flex gap-8 justify-center items-center">
        <Club className="text-destructive" />
        <Diamond className="text-destructive" />
        <Button className="text-lg" asChild>
          <Link to="/games/new">
            <SquarePlus className="size-6" /> New game
          </Link>
        </Button>
        <Heart className="text-destructive" />
        <Spade className="text-destructive" />
      </section>
      <GamesList />
    </main>
  );
}
