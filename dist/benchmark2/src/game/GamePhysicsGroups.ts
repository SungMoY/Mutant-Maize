/**
 * An enum with all of the physics groups for the game
 */
export const GamePhysicsGroups = {
    // Physics groups for the player and the player's weapon
    PLAYER: "PLAYER",
    PLAYER_WEAPON: "WEAPON",
    /* 
        Physics groups for the different tilemap layers. Physics groups for tilemaps are
        embedded in the tilemap layer data by a property called "Group". This lets you
        set the physics group for a particular tilemap layer.
    */
    GROUND: "GROUND",
    ENTITY: "ENTITY"
} as const;