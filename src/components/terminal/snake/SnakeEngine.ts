import { SnakeCell, SpawnedCollectible } from '../types';
import { Collectible } from '../types';
import { pickCollectible, SCORE_MILESTONES } from './collectibles';

export const GRID_COLS = 28;
export const GRID_ROWS = 18;
const INITIAL_SPEED_MS = 160;
const BOOST_SPEED_MS = 90;
const BOOST_DURATION_MS = 5000;

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface EngineCallbacks {
  onCollect: (c: Collectible) => void;
  onScoreChange: (score: number) => void;
  onMilestone: (module: string) => void;
  onGameOver: (score: number) => void;
  onVictory: (score: number) => void;
}

function randCell(exclude: SnakeCell[]): SnakeCell {
  const excludeSet = new Set(exclude.map((c) => `${c.x},${c.y}`));
  let cell: SnakeCell;
  do {
    cell = {
      x: Math.floor(Math.random() * GRID_COLS),
      y: Math.floor(Math.random() * GRID_ROWS),
    };
  } while (excludeSet.has(`${cell.x},${cell.y}`));
  return cell;
}

export class SnakeEngine {
  snake: SnakeCell[] = [];
  direction: Direction = 'right';
  private nextDirection: Direction = 'right';
  collectible: SpawnedCollectible | null = null;
  score = 0;
  isRunning = false;
  isGameOver = false;
  isVictory = false;
  private speedMs = INITIAL_SPEED_MS;
  private loopTimer: ReturnType<typeof setTimeout> | null = null;
  private boostTimer: ReturnType<typeof setTimeout> | null = null;
  private milestonesHit = new Set<number>();
  private callbacks: EngineCallbacks;

  constructor(callbacks: EngineCallbacks) {
    this.callbacks = callbacks;
    this.reset();
  }

  reset() {
    this.snake = [
      { x: 6, y: 9 },
      { x: 5, y: 9 },
      { x: 4, y: 9 },
    ];
    this.direction = 'right';
    this.nextDirection = 'right';
    this.score = 0;
    this.isGameOver = false;
    this.isVictory = false;
    this.isRunning = false;
    this.speedMs = INITIAL_SPEED_MS;
    this.milestonesHit.clear();
    this.spawnCollectible();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.scheduleNext();
  }

  stop() {
    this.isRunning = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  setDirection(dir: Direction) {
    const opposites: Record<Direction, Direction> = {
      up: 'down', down: 'up', left: 'right', right: 'left',
    };
    if (opposites[this.direction] !== dir) {
      this.nextDirection = dir;
    }
  }

  private scheduleNext() {
    if (!this.isRunning) return;
    this.loopTimer = setTimeout(() => {
      this.tick();
      this.scheduleNext();
    }, this.speedMs);
  }

  private tick() {
    if (!this.isRunning || this.isGameOver || this.isVictory) return;

    this.direction = this.nextDirection;
    const head = this.snake[0];
    const newHead: SnakeCell = { ...head };

    if (this.direction === 'up') newHead.y -= 1;
    else if (this.direction === 'down') newHead.y += 1;
    else if (this.direction === 'left') newHead.x -= 1;
    else if (this.direction === 'right') newHead.x += 1;

    // Wall collision
    if (
      newHead.x < 0 || newHead.x >= GRID_COLS ||
      newHead.y < 0 || newHead.y >= GRID_ROWS
    ) {
      this.triggerGameOver();
      return;
    }

    // Self collision (ignore tail tip since it moves)
    const selfHit = this.snake.slice(0, -1).some(
      (c) => c.x === newHead.x && c.y === newHead.y
    );
    if (selfHit) {
      this.triggerGameOver();
      return;
    }

    // Check collectible
    const ate = this.collectible &&
      this.collectible.cell.x === newHead.x &&
      this.collectible.cell.y === newHead.y;

    if (ate) {
      this.snake = [newHead, ...this.snake]; // grow
      this.handleCollect(this.collectible!);
    } else {
      this.snake = [newHead, ...this.snake.slice(0, -1)]; // move
    }
  }

  private handleCollect(c: SpawnedCollectible) {
    this.score += 1;
    this.collectible = null;
    this.callbacks.onCollect(c);
    this.callbacks.onScoreChange(this.score);

    // Check milestones
    SCORE_MILESTONES.forEach((m) => {
      if (this.score >= m.score && !this.milestonesHit.has(m.score)) {
        this.milestonesHit.add(m.score);
        setTimeout(() => this.callbacks.onMilestone(m.module), 400);
      }
    });

    // Handle special effects
    if (c.effect === 'speed_boost') {
      this.speedMs = BOOST_SPEED_MS;
      if (this.boostTimer) clearTimeout(this.boostTimer);
      this.boostTimer = setTimeout(() => {
        this.speedMs = INITIAL_SPEED_MS;
      }, BOOST_DURATION_MS);
    }

    if (c.effect === 'victory') {
      this.stop();
      this.isVictory = true;
      setTimeout(() => this.callbacks.onVictory(this.score), 600);
      return;
    }

    // Spawn next collectible
    setTimeout(() => this.spawnCollectible(), 100);
  }

  private spawnCollectible() {
    const c = pickCollectible(this.score);
    const cell = randCell(this.snake);
    this.collectible = { ...c, cell, spawnedAt: Date.now() };
  }

  private triggerGameOver() {
    this.stop();
    this.isGameOver = true;
    this.callbacks.onGameOver(this.score);
  }

  destroy() {
    this.stop();
    if (this.boostTimer) clearTimeout(this.boostTimer);
  }
}
