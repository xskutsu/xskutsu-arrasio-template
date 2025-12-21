// LENGTH WIDTH ASPECT X Y ANGLE DELAY
export type GunPosition = [number, number, number, number, number, number, number];

// SIZE X Y ANGLE ARC LAYER
export type TurretPosition = [number, number, number, number, number, number];

// RELOAD RECOIL SHUDDER SIZE HEALTH DAMAGE PENETRATION SPEED MAX_SPEED RANGE DENSITY SPRAY RESIST
export type GunStatArray = [number, number, number, number, number, number, number, number, number, number, number, number, number];

// varies
export type SkillArray = [number, number, number, number, number, number, number, number, number, number];

export interface GunStats {
	reload: number;
	recoil: number;
	shudder: number;
	size: number;
	health: number;
	damage: number;
	pen: number;
	speed: number;
	maxSpeed: number;
	range: number;
	density: number;
	spray: number;
	resist: number;
}

export interface GunDefinition {
	POSITION: GunPosition;
	PROPERTIES?: {
		SHOOT_SETTINGS?: any;
		TYPE?: string | EntityDefinition | EntityDefinition[];
		LABEL?: string;
		AUTOFIRE?: boolean;
		ALT_FIRE?: boolean;
		STAT_CALCULATOR?: string | number;
		WAIT_TO_CYCLE?: boolean;
		BULLET_STATS?: "master" | SkillArray;
		MAX_CHILDREN?: number;
		SYNCS_SKILLS?: boolean;
		NEGATIVE_RECOIL?: boolean;
		GUN_CONTROLLERS?: string[];
	};
}

export interface TurretDefinition {
	POSITION: TurretPosition;
	TYPE: string | EntityDefinition | EntityDefinition[];
}

export interface EntityBodyDefinition {
	ACCELERATION?: number;
	SPEED?: number;
	HEALTH?: number;
	DAMAGE?: number;
	PENETRATION?: number;
	SHIELD?: number;
	REGEN?: number;
	FOV?: number;
	RANGE?: number;
	DENSITY?: number;
	STEALTH?: number;
	PUSHABILITY?: number;
	HETERO?: number;
	SHOCK_ABSORB?: number;
}

export interface EntityFoodDefinition {
	LEVEL: number;
}

export interface EntityAIDefinition {
	BLIND?: boolean;
	FARMER?: boolean;
	SKYNET?: boolean;
	FULL_VIEW?: boolean;
	LIKES_SHAPES?: boolean;
	NO_LEAD?: boolean;
	STRAFE?: boolean;
	chase?: boolean;
}

export interface EntityMockupDefinition {
	body: any;
	position: any;
}

export interface EntityDefinition {
	PARENT?: EntityDefinition[];
	NAME?: string;
	LABEL?: string;
	TYPE?: string;
	SHAPE?: number;
	COLOR?: number;
	SIZE?: number;
	VALUE?: number;
	DANGER?: number;
	LEVEL?: number;
	BODY?: EntityBodyDefinition;
	FOOD?: EntityFoodDefinition;
	SKILL?: SkillArray;
	SKILL_CAP?: SkillArray;
	GUNS?: GunDefinition[];
	TURRETS?: TurretDefinition[];
	MAX_CHILDREN?: number;
	CONTROLLERS?: string[];
	AI?: EntityAIDefinition;
	RESET_UPGRADES?: boolean;
	UPGRADES_TIER_1?: EntityDefinition[];
	UPGRADES_TIER_2?: EntityDefinition[];
	UPGRADES_TIER_3?: EntityDefinition[];
	AUTO_UPGRADE?: "none" | "random" | string;
	DRAW_HEALTH?: boolean;
	DRAW_SELF?: boolean;
	DAMAGE_EFFECTS?: boolean;
	RATEFFECTS?: boolean;
	MOTION_EFFECTS?: boolean;
	BROADCAST_MESSAGE?: string;
	DAMAGE_CLASS?: number;
	CAN_GO_OUTSIDE_ROOM?: boolean;
	HITS_OWN_TYPE?: "normal" | "hard" | "repel" | "never" | "hardWithBuffer" | "push";
	DIE_AT_LOW_SPEED?: boolean;
	DIE_AT_RANGE?: boolean;
	INDEPENDENT?: boolean;
	PERSISTS_AFTER_DEATH?: boolean;
	CLEAR_ON_MASTER_UPGRADE?: boolean;
	HEALTH_WITH_LEVEL?: boolean;
	CAN_BE_ON_LEADERBOARD?: boolean;
	HAS_NO_RECOIL?: boolean;
	BUFF_VS_FOOD?: boolean;
	OBSTACLE?: boolean;
	CRAVES_ATTENTION?: boolean;
	NECRO?: boolean;
	INTANGIBLE?: boolean;
	IS_SMASHER?: boolean;
	VARIES_IN_SIZE?: boolean;
	STAT_NAMES?: number;
	MOTION_TYPE?: "glide" | "motor" | "swarm" | "chase" | "drift" | "bound";
	FACING_TYPE?: "autospin" | "turnWithSpeed" | "withMotion" | "looseWithMotion" | "toTarget" | "looseToTarget" | "smoothToTarget" | "locksFacing" | "bound" | "smoothWithMotion";
	mockup?: EntityMockupDefinition;
}
