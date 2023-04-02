import React from "react";
import { Player } from "../types";
import Avatar from "../ui/Avatar";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Avatar src={player.imageUrl} name={player.name} />
      </div>
      <div className="ml-4">{player.name}</div>
    </div>
  );
};

export default PlayerCard;
