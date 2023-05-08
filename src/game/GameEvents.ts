/**
 * A set of events for the game
 */
export const GameEvents = {
    // An event that tells the game level to start. Has data: {}
    LEVEL_START: "LEVEL_START",
    // An event that tells the game level to end. Has data: {}
    LEVEL_END: "LEVEL_END",

    // An event triggered when the player enters an area designated as a "level end" location. Had data: {}
    PLAYER_ENTERED_LEVEL_END: "PLAYER_ENTERED_LEVEL_END",

    /**
     * The event that gets emitted when the player's health changes
     * 
     * Has data: { curhp: number, maxhp: number }
     */
    HEALTH_CHANGE: "HEALTH_CHANGE",

    // The event sent when the player dies. Gets sent after the player's death animation
    PLAYER_DEAD: "PLAYER_DEAD",

    // when particles hit against wall
    GRAPPLE_COLLISION: "GRAPPLE_COLLISION",
    RIFLE_COLLISION: "RIFLE_COLLISION",
    SHOTGUN_COLLISION: "SHOTGUN_COLLISION",

    // when particles hit an enemy
    RIFLE_HIT: "RIFLE_HIT",
    SHOTGUN_HIT: "SHOTGUN_HIT",
    GRAPPLE_HIT: "GRAPPLE_HIT",

    PLAYER_HIT: "PLAYER_HIT",

    START_BOSS_FIGHT: "START_BOSS_FIGHT",

    BOSS_DEAD: "BOSS_DEAD",

    PAUSE: "PAUSE",
    RESUME: "RESUME",
    CONTROLS: "CONTROLS",

    BOSS_HEALTH_CHANGE: "BOSS_HEALTH_CHANGE",
    
} as const;
