import { GameInfo } from "./api/games";
import { GameCard } from "./GameCard";

export function ListOfGames({ games }: { games: GameInfo[]; }) {
    return (
        <>
            {games.map((game) => (
                <GameCard key={game.id} {...game} />
            ))}
        </>
    );
}

