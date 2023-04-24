/**
 * An enum with all of the physics groups for the game
 */
export const GamePhysicsGroups = {
    // Physics groups for the player, player weapons, ground, and mobs/entities
    PLAYER: "PLAYER",
    HAZARD: "HAZARD",
    GROUND: "GROUND",
    ENTITY: "ENTITY",
    RIFLE: "RIFLE",
    SHOTGUN: "SHOTGUN",
    GRAPPLE: "GRAPPLE",
} as const;