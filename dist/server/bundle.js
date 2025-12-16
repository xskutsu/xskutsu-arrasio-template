This code is licensed under the GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007.

"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/server/src/config.json
var require_config = __commonJS({
  "src/server/src/config.json"(exports2, module2) {
    module2.exports = {
      host: "0.0.0.0",
      servesStatic: true,
      port: 3e3,
      logpath: "logger.php",
      networkUpdateFactor: 24,
      socketWarningLimit: 5,
      networkFrontlog: 1,
      networkFallbackTime: 150,
      visibleListInterval: 1e3,
      gameSpeed: 1,
      runSpeed: 1.5,
      maxHeartbeatInterval: 3e4,
      sqlinfo: {
        connectionLimit: 50,
        host: "DEFAULT",
        user: "root",
        password: "DEFAULT",
        database: "DEFAULT",
        debug: false
      },
      verbose: true,
      WIDTH: 2e3,
      HEIGHT: 2e3,
      MODE: "tdm",
      RANDOM_COLORS: false,
      BANNED_CHARACTER_REGEX: "/[\uFDFD\u200E\0]/gi",
      ROOM_SETUP: [
        [
          "roid",
          "norm",
          "norm",
          "roid"
        ],
        [
          "norm",
          "nest",
          "roid",
          "norm"
        ],
        [
          "norm",
          "roid",
          "nest",
          "norm"
        ],
        [
          "roid",
          "norm",
          "norm",
          "roid"
        ]
      ],
      X_GRID: 4,
      Y_GRID: 4,
      DAMAGE_CONSTANT: 0.6,
      KNOCKBACK_CONSTANT: 1,
      ROOM_BOUND_FORCE: 0.01,
      FOOD: [
        0,
        0.75,
        0.22,
        0.1,
        5e-3,
        0,
        0
      ],
      FOOD_NEST: [
        0,
        0,
        0,
        0.75,
        0.23,
        0.02,
        0
      ],
      MAX_SKILL: 9,
      SOFT_MAX_SKILL: 0.59,
      TIER_1: 10,
      TIER_2: 25,
      TIER_3: 45,
      SKILL_CAP: 45,
      SKILL_SOFT_CAP: 0,
      SKILL_CHEAT_CAP: 45,
      SKILL_LEAK: 0,
      STEALTH: 4,
      MIN_SPEED: 1e-3,
      FOOD_AMOUNT: 2,
      SKILL_BOOST: 5,
      BOTS: 0,
      GLASS_HEALTH_FACTOR: 2,
      TOKEN_REQUIRED: false
    };
  }
});

// src/server/src/lib/util.js
var require_util = __commonJS({
  "src/server/src/lib/util.js"(exports2) {
    "use strict";
    var cfg = require_config();
    exports2.addArticle = function(string) {
      return /[aeiouAEIOU]/.test(string[0]) ? "an " + string : "a " + string;
    };
    exports2.getDistance = function(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };
    exports2.getDirection = function(p1, p2) {
      return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };
    exports2.clamp = function(value, min, max) {
      return Math.min(Math.max(value, min), max);
    };
    exports2.angleDifference = /* @__PURE__ */ (() => {
      let mod = function(a, n) {
        return (a % n + n) % n;
      };
      return (sourceA, targetA) => {
        let a = targetA - sourceA;
        return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
      };
    })();
    exports2.loopSmooth = (angle, desired, slowness) => {
      return exports2.angleDifference(angle, desired) / slowness;
    };
    exports2.averageArray = (arr) => {
      if (!arr.length) return 0;
      var sum = arr.reduce((a, b) => {
        return a + b;
      });
      return sum / arr.length;
    };
    exports2.sumArray = (arr) => {
      if (!arr.length) return 0;
      var sum = arr.reduce((a, b) => {
        return a + b;
      });
      return sum;
    };
    exports2.getJackpot = (x) => {
      return x > 26300 * 1.5 ? Math.pow(x - 26300, 0.85) + 26300 : x / 1.5;
    };
    exports2.serverStartTime = Date.now();
    exports2.time = () => {
      return Date.now() - exports2.serverStartTime;
    };
    var log = console.log;
    exports2.log = (text) => {
      log("[" + (exports2.time() / 1e3).toFixed(3) + "]: " + text);
    };
    exports2.warn = (text) => {
      log("[" + (exports2.time() / 1e3).toFixed(3) + "]: [WARNING] " + text);
    };
    exports2.error = (text) => {
      log(text);
    };
    exports2.remove = (array, index) => {
      if (index === array.length - 1) {
        return array.pop();
      } else {
        let o = array[index];
        array[index] = array.pop();
        return o;
      }
    };
  }
});

// src/server/src/lib/random.js
var require_random = __commonJS({
  "src/server/src/lib/random.js"(exports2) {
    "use strict";
    function cyrb128(text) {
      let h1 = 1779033703;
      let h2 = 3144134277;
      let h3 = 1013904242;
      let h4 = 2773480762;
      for (let i = 0, k; i < text.length; i++) {
        k = text.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
      }
      h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
      h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
      h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
      h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
      return [
        (h1 ^ h2 ^ h3 ^ h4) >>> 0,
        (h2 ^ h1) >>> 0,
        (h3 ^ h1) >>> 0,
        (h4 ^ h1) >>> 0
      ];
    }
    function* sfc32(seed) {
      let [a, b, c2, d] = cyrb128(seed);
      while (true) {
        a |= 0;
        b |= 0;
        c2 |= 0;
        d |= 0;
        let t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c2 + (c2 << 3) | 0;
        c2 = c2 << 21 | c2 >>> 11;
        c2 = c2 + t | 0;
        yield (t >>> 0) / 4294967296;
      }
    }
    var seededRandom = sfc32("" + Date.now());
    exports2.random = (x) => {
      return x * seededRandom.next().value;
    };
    exports2.randomAngle = () => {
      return Math.PI * 2 * seededRandom.next().value;
    };
    exports2.randomRange = (min, max) => {
      return seededRandom.next().value * (max - min) + min;
    };
    exports2.irandom = (i) => {
      let max = Math.floor(i);
      return Math.floor(seededRandom.next().value * (max + 1));
    };
    exports2.gauss = (mean, deviation) => {
      let x1, x2, w;
      do {
        x1 = 2 * seededRandom.next().value - 1;
        x2 = 2 * seededRandom.next().value - 1;
        w = x1 * x1 + x2 * x2;
      } while (0 == w || w >= 1);
      w = Math.sqrt(-2 * Math.log(w) / w);
      return mean + deviation * x1 * w;
    };
    exports2.gaussInverse = (min, max, clustering) => {
      let range = max - min;
      let output = exports2.gauss(0, range / clustering);
      while (output < 0) {
        output += range;
      }
      while (output > range) {
        output -= range;
      }
      return output + min;
    };
    exports2.gaussRing = (radius, clustering) => {
      let r = exports2.random(Math.PI * 2);
      let d = exports2.gauss(radius, radius * clustering);
      return {
        x: d * Math.cos(r),
        y: d * Math.sin(r)
      };
    };
    exports2.chance = (prob) => {
      return exports2.random(1) < prob;
    };
    exports2.dice = (sides) => {
      return exports2.random(sides) < 1;
    };
    exports2.choose = (arr) => {
      return arr[exports2.irandom(arr.length - 1)];
    };
    exports2.chooseN = (arr, n) => {
      let o = [];
      for (let i = 0; i < n; i++) {
        o.push(arr.splice(exports2.irandom(arr.length - 1), 1)[0]);
      }
      return o;
    };
    exports2.chooseChance = (...arg) => {
      let totalProb = 0;
      arg.forEach(function(value) {
        totalProb += value;
      });
      let answer = exports2.random(totalProb);
      for (let i = 0; i < arg.length; i++) {
        if (answer < arg[i]) return i;
        answer -= arg[i];
      }
    };
    exports2.chooseBotName = () => {
      return exports2.choose([
        "Alice",
        "Bob",
        "Carmen",
        "David",
        "Edith",
        "Freddy",
        "Gustav",
        "Helga",
        "Janet",
        "Lorenzo",
        "Mary",
        "Nora",
        "Olivia",
        "Peter",
        "Queen",
        "Roger",
        "Suzanne",
        "Tommy",
        "Ursula",
        "Vincent",
        "Wilhelm",
        "Xerxes",
        "Yvonne",
        "Zachary",
        "Alpha",
        "Bravo",
        "Charlie",
        "Delta",
        "Echo",
        "Foxtrot",
        "Hotel",
        "India",
        "Juliet",
        "Kilo",
        "Lima",
        "Mike",
        "November",
        "Oscar",
        "Papa",
        "Quebec",
        "Romeo",
        "Sierra",
        "Tango",
        "Uniform",
        "Victor",
        "Whiskey",
        "X-Ray",
        "Yankee",
        "Zulu"
      ]);
    };
    exports2.chooseBossName = (code, n) => {
      switch (code) {
        case "a":
          return exports2.chooseN([
            "Archimedes",
            "Akilina",
            "Anastasios",
            "Athena",
            "Alkaios",
            "Amyntas",
            "Aniketos",
            "Artemis",
            "Anaxagoras",
            "Apollon"
          ], n);
        case "castle":
          return exports2.chooseN([
            "Berezhany",
            "Lutsk",
            "Dobromyl",
            "Akkerman",
            "Palanok",
            "Zolochiv",
            "Palanok",
            "Mangup",
            "Olseko",
            "Brody",
            "Isiaslav",
            "Kaffa",
            "Bilhorod"
          ], n);
        default:
          return "God";
      }
    };
  }
});

// src/server/src/lib/hshg.js
var require_hshg = __commonJS({
  "src/server/src/lib/hshg.js"(exports2) {
    "use strict";
    (function(root, undefined2) {
      function update_RECOMPUTE() {
        var i, obj, grid2, meta, objAABB, newObjHash;
        for (i = 0; i < this._globalObjects.length; i++) {
          obj = this._globalObjects[i];
          meta = obj.HSHG;
          grid2 = meta.grid;
          objAABB = obj.getAABB();
          newObjHash = grid2.toHash(objAABB.min[0], objAABB.min[1]);
          if (newObjHash !== meta.hash) {
            grid2.removeObject(obj);
            grid2.addObject(obj, newObjHash);
          }
        }
      }
      function update_REMOVEALL() {
      }
      function testAABBOverlap(objA, objB) {
        var a = objA.getAABB(), b = objB.getAABB();
        if (!a.active && !b.active) return false;
        if (a.min[0] > b.max[0] || a.min[1] > b.max[1] || a.max[0] < b.min[0] || a.max[1] < b.min[1]) {
          return false;
        } else {
          return true;
        }
      }
      function getLongestAABBEdge(min, max) {
        return Math.max(
          Math.abs(max[0] - min[0]),
          Math.abs(max[1] - min[1])
          //,Math.abs(max[2] - min[2])
        );
      }
      function HSHG() {
        this.MAX_OBJECT_CELL_DENSITY = 1 / 8;
        this.INITIAL_GRID_LENGTH = 256;
        this.HIERARCHY_FACTOR = 2;
        this.HIERARCHY_FACTOR_SQRT = Math.SQRT2;
        this.UPDATE_METHOD = update_RECOMPUTE;
        this._grids = [];
        this._globalObjects = [];
      }
      HSHG.prototype.addObject = function(obj) {
        var x, i, cellSize, objAABB = obj.getAABB(), objSize = getLongestAABBEdge(objAABB.min, objAABB.max), oneGrid, newGrid;
        obj.HSHG = {
          globalObjectsIndex: this._globalObjects.length
        };
        this._globalObjects.push(obj);
        if (this._grids.length == 0) {
          cellSize = objSize * this.HIERARCHY_FACTOR_SQRT;
          newGrid = new Grid(cellSize, this.INITIAL_GRID_LENGTH, this);
          newGrid.initCells();
          newGrid.addObject(obj);
          this._grids.push(newGrid);
        } else {
          x = 0;
          for (i = 0; i < this._grids.length; i++) {
            oneGrid = this._grids[i];
            x = oneGrid.cellSize;
            if (objSize < x) {
              x = x / this.HIERARCHY_FACTOR;
              if (objSize < x) {
                while (objSize < x) {
                  x = x / this.HIERARCHY_FACTOR;
                }
                newGrid = new Grid(x * this.HIERARCHY_FACTOR, this.INITIAL_GRID_LENGTH, this);
                newGrid.initCells();
                newGrid.addObject(obj);
                this._grids.splice(i, 0, newGrid);
              } else {
                oneGrid.addObject(obj);
              }
              return;
            }
          }
          while (objSize >= x) {
            x = x * this.HIERARCHY_FACTOR;
          }
          newGrid = new Grid(x, this.INITIAL_GRID_LENGTH, this);
          newGrid.initCells();
          newGrid.addObject(obj);
          this._grids.push(newGrid);
        }
      };
      HSHG.prototype.checkIfInHSHG = function(obj) {
        var meta = obj.HSHG, globalObjectsIndex, replacementObj;
        if (meta === undefined2) return false;
        return true;
      };
      HSHG.prototype.removeObject = function(obj) {
        var meta = obj.HSHG, globalObjectsIndex, replacementObj;
        if (meta === undefined2) {
          throw Error(obj + " was not in the HSHG.");
          return;
        }
        globalObjectsIndex = meta.globalObjectsIndex;
        if (globalObjectsIndex === this._globalObjects.length - 1) {
          this._globalObjects.pop();
        } else {
          replacementObj = this._globalObjects.pop();
          replacementObj.HSHG.globalObjectsIndex = globalObjectsIndex;
          this._globalObjects[globalObjectsIndex] = replacementObj;
        }
        meta.grid.removeObject(obj);
        delete obj.HSHG;
      };
      HSHG.prototype.update = function() {
        this.UPDATE_METHOD.call(this);
      };
      HSHG.prototype.queryForCollisionPairs = function(broadOverlapTestCallback) {
        var i, j, k, l, c2, grid2, cell, objA, objB, offset, adjacentCell, biggerGrid, objAAABB, objAHashInBiggerGrid, possibleCollisions = [];
        broadOverlapTest = broadOverlapTestCallback || testAABBOverlap;
        for (i = 0; i < this._grids.length; i++) {
          grid2 = this._grids[i];
          for (j = 0; j < grid2.occupiedCells.length; j++) {
            cell = grid2.occupiedCells[j];
            for (k = 0; k < cell.objectContainer.length; k++) {
              objA = cell.objectContainer[k];
              if (!objA.getAABB().active) continue;
              for (l = k + 1; l < cell.objectContainer.length; l++) {
                objB = cell.objectContainer[l];
                if (!objB.getAABB().active) continue;
                if (broadOverlapTest(objA, objB) === true) {
                  possibleCollisions.push([objA, objB]);
                }
              }
            }
            for (c2 = 0; c2 < 4; c2++) {
              offset = cell.neighborOffsetArray[c2];
              adjacentCell = grid2.allCells[cell.allCellsIndex + offset];
              for (k = 0; k < cell.objectContainer.length; k++) {
                objA = cell.objectContainer[k];
                if (!objA.getAABB().active) continue;
                for (l = 0; l < adjacentCell.objectContainer.length; l++) {
                  objB = adjacentCell.objectContainer[l];
                  if (!objB.getAABB().active) continue;
                  if (broadOverlapTest(objA, objB) === true) {
                    possibleCollisions.push([objA, objB]);
                  }
                }
              }
            }
          }
          for (j = 0; j < grid2.allObjects.length; j++) {
            objA = grid2.allObjects[j];
            objAAABB = objA.getAABB();
            if (!objAAABB.active) continue;
            for (k = i + 1; k < this._grids.length; k++) {
              biggerGrid = this._grids[k];
              objAHashInBiggerGrid = biggerGrid.toHash(objAAABB.min[0], objAAABB.min[1]);
              cell = biggerGrid.allCells[objAHashInBiggerGrid];
              for (c2 = 0; c2 < cell.neighborOffsetArray.length; c2++) {
                offset = cell.neighborOffsetArray[c2];
                adjacentCell = biggerGrid.allCells[cell.allCellsIndex + offset];
                for (l = 0; l < adjacentCell.objectContainer.length; l++) {
                  objB = adjacentCell.objectContainer[l];
                  if (!objB.getAABB().active) continue;
                  if (broadOverlapTest(objA, objB) === true) {
                    possibleCollisions.push([objA, objB]);
                  }
                }
              }
            }
          }
        }
        return possibleCollisions;
      };
      HSHG.update_RECOMPUTE = update_RECOMPUTE;
      HSHG.update_REMOVEALL = update_REMOVEALL;
      function Grid(cellSize, cellCount, parentHierarchy) {
        this.cellSize = cellSize;
        this.inverseCellSize = 1 / cellSize;
        this.rowColumnCount = ~~Math.sqrt(cellCount);
        this.xyHashMask = this.rowColumnCount - 1;
        this.occupiedCells = [];
        this.allCells = Array(this.rowColumnCount * this.rowColumnCount);
        this.allObjects = [];
        this.sharedInnerOffsets = [];
        this._parentHierarchy = parentHierarchy || null;
      }
      Grid.prototype.initCells = function() {
        var i, gridLength = this.allCells.length, x, y, wh = this.rowColumnCount, isOnRightEdge, isOnLeftEdge, isOnTopEdge, isOnBottomEdge, innerOffsets = [
          // y+ down offsets
          //-1 + -wh, -wh, -wh + 1,
          //-1, 0, 1,
          //wh - 1, wh, wh + 1
          // y+ up offsets
          wh - 1,
          wh,
          wh + 1,
          -1,
          0,
          1,
          -1 + -wh,
          -wh,
          -wh + 1
        ], leftOffset, rightOffset, topOffset, bottomOffset, uniqueOffsets = [], cell;
        this.sharedInnerOffsets = innerOffsets;
        for (i = 0; i < gridLength; i++) {
          cell = new Cell();
          y = ~~(i / this.rowColumnCount);
          x = ~~(i - y * this.rowColumnCount);
          isOnRightEdge = false;
          isOnLeftEdge = false;
          isOnTopEdge = false;
          isOnBottomEdge = false;
          if ((x + 1) % this.rowColumnCount == 0) {
            isOnRightEdge = true;
          } else if (x % this.rowColumnCount == 0) {
            isOnLeftEdge = true;
          }
          if ((y + 1) % this.rowColumnCount == 0) {
            isOnTopEdge = true;
          } else if (y % this.rowColumnCount == 0) {
            isOnBottomEdge = true;
          }
          if (isOnRightEdge || isOnLeftEdge || isOnTopEdge || isOnBottomEdge) {
            rightOffset = isOnRightEdge === true ? -wh + 1 : 1;
            leftOffset = isOnLeftEdge === true ? wh - 1 : -1;
            topOffset = isOnTopEdge === true ? -gridLength + wh : wh;
            bottomOffset = isOnBottomEdge === true ? gridLength - wh : -wh;
            uniqueOffsets = [
              // y+ down offset
              //leftOffset + bottomOffset, bottomOffset, rightOffset + bottomOffset,
              //leftOffset, 0, rightOffset,
              //leftOffset + topOffset, topOffset, rightOffset + topOffset
              // y+ up offset
              leftOffset + topOffset,
              topOffset,
              rightOffset + topOffset,
              leftOffset,
              0,
              rightOffset,
              leftOffset + bottomOffset,
              bottomOffset,
              rightOffset + bottomOffset
            ];
            cell.neighborOffsetArray = uniqueOffsets;
          } else {
            cell.neighborOffsetArray = this.sharedInnerOffsets;
          }
          cell.allCellsIndex = i;
          this.allCells[i] = cell;
        }
      };
      Grid.prototype.toHash = function(x, y, z) {
        var i, xHash, yHash, zHash;
        if (x < 0) {
          i = -x * this.inverseCellSize;
          xHash = this.rowColumnCount - 1 - (~~i & this.xyHashMask);
        } else {
          i = x * this.inverseCellSize;
          xHash = ~~i & this.xyHashMask;
        }
        if (y < 0) {
          i = -y * this.inverseCellSize;
          yHash = this.rowColumnCount - 1 - (~~i & this.xyHashMask);
        } else {
          i = y * this.inverseCellSize;
          yHash = ~~i & this.xyHashMask;
        }
        return xHash + yHash * this.rowColumnCount;
      };
      Grid.prototype.addObject = function(obj, hash) {
        var objAABB, objHash, targetCell;
        if (hash !== undefined2) {
          objHash = hash;
        } else {
          objAABB = obj.getAABB();
          objHash = this.toHash(objAABB.min[0], objAABB.min[1]);
        }
        targetCell = this.allCells[objHash];
        if (targetCell.objectContainer.length === 0) {
          targetCell.occupiedCellsIndex = this.occupiedCells.length;
          this.occupiedCells.push(targetCell);
        }
        obj.HSHG.objectContainerIndex = targetCell.objectContainer.length;
        obj.HSHG.hash = objHash;
        obj.HSHG.grid = this;
        obj.HSHG.allGridObjectsIndex = this.allObjects.length;
        targetCell.objectContainer.push(obj);
        this.allObjects.push(obj);
        if (this.allObjects.length / this.allCells.length > this._parentHierarchy.MAX_OBJECT_CELL_DENSITY) {
          this.expandGrid();
        }
      };
      Grid.prototype.removeObject = function(obj) {
        var meta = obj.HSHG, hash, containerIndex, allGridObjectsIndex, cell, replacementCell, replacementObj;
        hash = meta.hash;
        containerIndex = meta.objectContainerIndex;
        allGridObjectsIndex = meta.allGridObjectsIndex;
        cell = this.allCells[hash];
        if (cell.objectContainer.length === 1) {
          cell.objectContainer.length = 0;
          if (cell.occupiedCellsIndex === this.occupiedCells.length - 1) {
            this.occupiedCells.pop();
          } else {
            replacementCell = this.occupiedCells.pop();
            replacementCell.occupiedCellsIndex = cell.occupiedCellsIndex;
            this.occupiedCells[cell.occupiedCellsIndex] = replacementCell;
          }
          cell.occupiedCellsIndex = null;
        } else {
          if (containerIndex === cell.objectContainer.length - 1) {
            cell.objectContainer.pop();
          } else {
            replacementObj = cell.objectContainer.pop();
            replacementObj.HSHG.objectContainerIndex = containerIndex;
            cell.objectContainer[containerIndex] = replacementObj;
          }
        }
        if (allGridObjectsIndex === this.allObjects.length - 1) {
          this.allObjects.pop();
        } else {
          replacementObj = this.allObjects.pop();
          replacementObj.HSHG.allGridObjectsIndex = allGridObjectsIndex;
          this.allObjects[allGridObjectsIndex] = replacementObj;
        }
      };
      Grid.prototype.expandGrid = function() {
        var i, j, currentCellCount = this.allCells.length, currentRowColumnCount = this.rowColumnCount, currentXYHashMask = this.xyHashMask, newCellCount = currentCellCount * 4, newRowColumnCount = ~~Math.sqrt(newCellCount), newXYHashMask = newRowColumnCount - 1, allObjects = this.allObjects.slice(0), aCell, push = Array.prototype.push;
        for (i = 0; i < allObjects.length; i++) {
          this.removeObject(allObjects[i]);
        }
        this.rowColumnCount = newRowColumnCount;
        this.allCells = Array(this.rowColumnCount * this.rowColumnCount);
        this.xyHashMask = newXYHashMask;
        this.initCells();
        for (i = 0; i < allObjects.length; i++) {
          this.addObject(allObjects[i]);
        }
      };
      function Cell() {
        this.objectContainer = [];
        this.neighborOffsetArray;
        this.occupiedCellsIndex = null;
        this.allCellsIndex = null;
      }
      root["HSHG"] = HSHG;
      HSHG._private = {
        Grid,
        Cell,
        testAABBOverlap,
        getLongestAABBEdge
      };
    })(exports2);
  }
});

// src/server/src/lib/definitions.js
var require_definitions = __commonJS({
  "src/server/src/lib/definitions.js"(exports2) {
    "use strict";
    var combineStats = function(arr) {
      try {
        let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        arr.forEach(function(component) {
          for (let i = 0; i < data.length; i++) {
            data[i] = data[i] * component[i];
          }
        });
        return {
          reload: data[0],
          recoil: data[1],
          shudder: data[2],
          size: data[3],
          health: data[4],
          damage: data[5],
          pen: data[6],
          speed: data[7],
          maxSpeed: data[8],
          range: data[9],
          density: data[10],
          spray: data[11],
          resist: data[12]
        };
      } catch (err) {
        console.log(err);
        console.log(JSON.stringify(arr));
      }
    };
    var skillSet = (() => {
      let config = require_config();
      let skcnv2 = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9
      };
      return (args) => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
          if (!args.hasOwnProperty(s)) continue;
          skills[skcnv2[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
      };
    })();
    var g = {
      // Gun info here
      trap: [36, 1, 0.25, 0.6, 1, 0.75, 1, 5, 1, 1, 1, 15, 3],
      swarm: [18, 0.25, 0.05, 0.4, 1, 0.75, 1, 4, 1, 1, 1, 5, 1],
      drone: [50, 0.25, 0.1, 0.6, 1, 1, 1, 2, 1, 1, 1, 0.1, 1],
      factory: [60, 1, 0.1, 0.7, 1, 0.75, 1, 3, 1, 1, 1, 0.1, 1],
      basic: [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 15, 1],
      /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
      blank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      spam: [1.1, 1, 1, 1.05, 1, 1.1, 1, 0.9, 0.7, 1, 1, 1, 1.05],
      minion: [1, 1, 2, 1, 0.4, 0.4, 1.2, 1, 1, 0.75, 1, 2, 1],
      single: [1.05, 1, 1, 1, 1, 1, 1, 1.05, 1, 1, 1, 1, 1],
      sniper: [1.35, 1, 0.25, 1, 1, 0.8, 1.1, 1.5, 1.5, 1, 1.5, 0.2, 1.15],
      rifle: [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1],
      assass: [1.65, 1, 0.25, 1, 1.15, 1, 1.1, 1.18, 1.18, 1, 3, 1, 1.3],
      hunter: [1.5, 0.7, 1, 0.95, 1, 0.9, 1, 1.1, 0.8, 1, 1.2, 1, 1.15],
      hunter2: [1, 1, 1, 0.9, 2, 0.5, 1.5, 1, 1, 1, 1.2, 1, 1.1],
      preda: [1.4, 1, 1, 0.8, 1.5, 0.9, 1.2, 0.9, 0.9, 1, 1, 1, 1],
      snake: [0.4, 1, 4, 1, 1.5, 0.9, 1.2, 0.2, 0.35, 1, 3, 6, 0.5],
      sidewind: [1.5, 2, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
      snakeskin: [0.6, 1, 2, 1, 0.5, 0.5, 1, 1, 0.2, 0.4, 1, 5, 1],
      mach: [0.5, 0.8, 1.7, 1, 0.7, 0.7, 1, 1, 0.8, 1, 1, 2.5, 1],
      blaster: [1, 1.2, 1.25, 1.1, 1.5, 1, 0.6, 0.8, 0.33, 0.6, 0.5, 1.5, 0.8],
      chain: [1.25, 1.33, 0.8, 1, 0.8, 1, 1.1, 1.25, 1.25, 1.1, 1.25, 0.5, 1.1],
      mini: [1.25, 0.6, 1, 0.8, 0.55, 0.45, 1.25, 1.33, 1, 1, 1.25, 0.5, 1.1],
      stream: [1.1, 0.6, 1, 1, 1, 0.65, 1, 1.24, 1, 1, 1, 1, 1],
      shotgun: [8, 0.4, 1, 1.5, 1, 0.4, 0.8, 1.8, 0.6, 1, 1.2, 1.2, 1],
      flank: [1, 1.2, 1, 1, 1.02, 0.81, 0.9, 1, 0.85, 1, 1.2, 1, 1],
      tri: [1, 0.9, 1, 1, 0.9, 1, 1, 0.8, 0.8, 0.6, 1, 1, 1],
      trifront: [1, 0.2, 1, 1, 1, 1, 1, 1.3, 1.1, 1.5, 1, 1, 1],
      thruster: [1, 1.5, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
      auto: (
        /*pure*/
        [1.8, 0.75, 0.5, 0.8, 0.9, 0.6, 1.2, 1.1, 1, 0.8, 1.3, 1, 1.25]
      ),
      five: [1.15, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1.1, 2, 1, 1],
      autosnipe: [1, 1, 1, 1.4, 2, 1, 1, 1, 1, 1, 1, 1, 1],
      /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
      pound: [2, 1.6, 1, 1, 1, 2, 1, 0.85, 0.8, 1, 1.5, 1, 1.15],
      destroy: [2.2, 1.8, 0.5, 1, 2, 2, 1.2, 0.65, 0.5, 1, 2, 1, 3],
      anni: [0.8, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      hive: [1.5, 0.8, 1, 0.8, 0.7, 0.3, 1, 1, 0.6, 1, 1, 1, 1],
      arty: [1.2, 0.7, 1, 0.9, 1, 1, 1, 1.15, 1.1, 1, 1.5, 1, 1],
      mortar: [1.2, 1, 1, 1, 1.1, 1, 1, 0.8, 0.8, 1, 1, 1, 1],
      spreadmain: [0.78125, 0.25, 0.5, 1, 0.5, 1, 1, 1.5 / 0.78, 0.9 / 0.78, 1, 1, 1, 1],
      spread: [1.5, 1, 0.25, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 0.25, 1],
      skim: [1, 0.8, 0.8, 0.9, 1.35, 0.8, 2, 0.3, 0.3, 1, 1, 1, 1.1],
      twin: [1, 0.5, 0.9, 1, 0.9, 0.7, 1, 1, 1, 1, 1, 1.2, 1],
      bent: [1.1, 1, 0.8, 1, 0.9, 1, 0.8, 1, 1, 1, 0.8, 0.5, 1],
      triple: [1.2, 0.667, 0.9, 1, 0.85, 0.85, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
      quint: [1.5, 0.667, 0.9, 1, 1, 1, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
      dual: [2, 1, 0.8, 1, 1.5, 1, 1, 1.3, 1.1, 1, 1, 1, 1.25],
      double: [1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1, 1, 1, 1],
      hewn: [1.25, 1.5, 1, 1, 0.9, 0.85, 1, 1, 0.9, 1, 1, 1, 1],
      puregunner: [1, 0.25, 1.5, 1.2, 1.35, 0.25, 1.25, 0.8, 0.65, 1, 1.5, 1.5, 1.2],
      machgun: [0.66, 0.8, 2, 1, 1, 0.75, 1, 1.2, 0.8, 1, 1, 2.5, 1],
      gunner: [1.25, 0.25, 1.5, 1.1, 1, 0.35, 1.35, 0.9, 0.8, 1, 1.5, 1.5, 1.2],
      power: [1, 1, 0.6, 1.2, 1, 1, 1.25, 2, 1.7, 1, 2, 0.5, 1.5],
      nail: [0.85, 2.5, 1, 0.8, 1, 0.7, 1, 1, 1, 1, 2, 1, 1],
      fast: [1, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1, 1, 1],
      turret: [2, 1, 1, 1, 0.8, 0.6, 0.7, 1, 1, 1, 0.1, 1, 1],
      /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
      battle: [1, 1, 1, 1, 1.25, 1.15, 1, 1, 0.85, 1, 1, 1, 1.1],
      bees: [1.3, 1, 1, 1.4, 1, 1.5, 0.5, 3, 1.5, 1, 0.25, 1, 1],
      carrier: [1.5, 1, 1, 1, 1, 0.8, 1, 1.3, 1.2, 1.2, 1, 1, 1],
      hexatrap: [1.3, 1, 1.25, 1, 1, 1, 1, 0.8, 1, 0.5, 1, 1, 1],
      block: [1.1, 2, 0.1, 1.5, 2, 1, 1.25, 1.5, 2.5, 1.25, 1, 1, 1.25],
      construct: [1.3, 1, 1, 0.9, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
      boomerang: [0.8, 1, 1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.333, 1, 1, 1],
      over: [1.25, 1, 1, 0.85, 0.7, 0.8, 1, 1, 0.9, 1, 2, 1, 1],
      meta: [1.333, 1, 1, 1, 1, 0.667, 1, 1, 1, 1, 1, 1, 1],
      weak: [2, 1, 1, 1, 0.6, 0.6, 0.8, 0.5, 0.7, 0.25, 0.3, 1, 1],
      master: [3, 1, 1, 0.7, 0.4, 0.7, 1, 1, 1, 0.1, 0.5, 1, 1],
      sunchip: [5, 1, 1, 1.4, 0.5, 0.4, 0.6, 1, 1, 1, 0.8, 1, 1],
      babyfactory: [1.5, 1, 1, 1, 1, 1, 1, 1, 1.35, 1, 1, 1, 1],
      lowpower: [1, 1, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
      halfrecoil: [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      morerecoil: [1, 1.15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      muchmorerecoil: [1, 1.35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      lotsmorrecoil: [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      tonsmorrecoil: [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      doublereload: [0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      morereload: [0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      halfreload: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      lessreload: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      threequartersrof: [1.333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      morespeed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
      bitlessspeed: [1, 1, 1, 1, 1, 1, 1, 0.93, 0.93, 1, 1, 1, 1],
      slow: [1, 1, 1, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 1, 1],
      halfspeed: [1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1],
      notdense: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1, 1],
      halfrange: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1],
      fake: [1, 1, 1, 1e-5, 1e-4, 1, 1, 1e-5, 2, 0, 1, 1, 1],
      /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
      op: [0.5, 1.3, 1, 1, 4, 4, 4, 3, 2, 1, 5, 2, 1],
      protectorswarm: [5, 1e-6, 1, 1, 100, 1, 1, 1, 1, 0.5, 5, 1, 10]
    };
    var dfltskl = 9;
    var statnames = {
      smasher: 1,
      drone: 2,
      necro: 3,
      swarm: 4,
      trap: 5,
      generic: 6
    };
    var gunCalcNames = {
      default: 0,
      bullet: 1,
      drone: 2,
      swarm: 3,
      fixedReload: 4,
      thruster: 5,
      sustained: 6,
      necro: 7,
      trap: 8
    };
    exports2.genericEntity = {
      NAME: "",
      LABEL: "Unknown Entity",
      TYPE: "unknown",
      DAMAGE_CLASS: 0,
      // 0: def, 1: food, 2: tanks, 3: obstacles
      DANGER: 0,
      VALUE: 0,
      SHAPE: 0,
      COLOR: 16,
      INDEPENDENT: false,
      CONTROLLERS: ["doNothing"],
      HAS_NO_MASTER: false,
      MOTION_TYPE: "glide",
      // motor, swarm, chase
      FACING_TYPE: "toTarget",
      // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
      DRAW_HEALTH: false,
      DRAW_SELF: true,
      DAMAGE_EFFECTS: true,
      RATEFFECTS: true,
      MOTION_EFFECTS: true,
      INTANGIBLE: false,
      ACCEPTS_SCORE: true,
      GIVE_KILL_MESSAGE: false,
      CAN_GO_OUTSIDE_ROOM: false,
      HITS_OWN_TYPE: "normal",
      // hard, repel, never, hardWithBuffer
      DIE_AT_LOW_SPEED: false,
      DIE_AT_RANGE: false,
      CLEAR_ON_MASTER_UPGRADE: false,
      PERSISTS_AFTER_DEATH: false,
      VARIES_IN_SIZE: false,
      HEALTH_WITH_LEVEL: true,
      CAN_BE_ON_LEADERBOARD: true,
      HAS_NO_RECOIL: false,
      AUTO_UPGRADE: "none",
      BUFF_VS_FOOD: false,
      OBSTACLE: false,
      CRAVES_ATTENTION: false,
      NECRO: false,
      UPGRADES_TIER_1: [],
      UPGRADES_TIER_2: [],
      UPGRADES_TIER_3: [],
      SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      LEVEL: 0,
      SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
      GUNS: [],
      MAX_CHILDREN: 0,
      BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,
        HETERO: 2
      },
      FOOD: {
        LEVEL: -1
      }
    };
    exports2.food = {
      TYPE: "food",
      DAMAGE_CLASS: 1,
      CONTROLLERS: ["moveInCircles"],
      HITS_OWN_TYPE: "repel",
      MOTION_TYPE: "drift",
      FACING_TYPE: "turnWithSpeed",
      VARIES_IN_SIZE: true,
      BODY: {
        STEALTH: 30,
        PUSHABILITY: 1
      },
      DAMAGE_EFFECTS: false,
      RATEFFECTS: false,
      HEALTH_WITH_LEVEL: false
    };
    var basePolygonDamage = 1;
    var basePolygonHealth = 2;
    exports2.hugePentagon = {
      PARENT: [exports2.food],
      FOOD: {
        LEVEL: 5
      },
      LABEL: "Alpha Pentagon",
      VALUE: 15e3,
      SHAPE: -5,
      SIZE: 58,
      COLOR: 14,
      BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6
      },
      DRAW_HEALTH: true,
      GIVE_KILL_MESSAGE: true
    };
    exports2.bigPentagon = {
      PARENT: [exports2.food],
      FOOD: {
        LEVEL: 4
      },
      LABEL: "Beta Pentagon",
      VALUE: 2500,
      SHAPE: 5,
      SIZE: 30,
      COLOR: 14,
      BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2
      },
      DRAW_HEALTH: true,
      GIVE_KILL_MESSAGE: true
    };
    exports2.pentagon = {
      PARENT: [exports2.food],
      FOOD: {
        LEVEL: 3
      },
      LABEL: "Pentagon",
      VALUE: 400,
      SHAPE: 5,
      SIZE: 16,
      COLOR: 14,
      BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1
      },
      DRAW_HEALTH: true
    };
    exports2.triangle = {
      PARENT: [exports2.food],
      FOOD: {
        LEVEL: 2
      },
      LABEL: "Triangle",
      VALUE: 120,
      SHAPE: 3,
      SIZE: 9,
      COLOR: 2,
      BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5
      },
      DRAW_HEALTH: true
    };
    exports2.square = {
      PARENT: [exports2.food],
      FOOD: {
        LEVEL: 1
      },
      LABEL: "Square",
      VALUE: 30,
      SHAPE: 4,
      SIZE: 10,
      COLOR: 13,
      BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2
      },
      DRAW_HEALTH: true,
      INTANGIBLE: false
    };
    exports2.egg = {
      PARENT: [exports2.food],
      FOOD: {
        LEVEL: 0
      },
      LABEL: "Egg",
      VALUE: 10,
      SHAPE: 0,
      SIZE: 5,
      COLOR: 6,
      INTANGIBLE: true,
      BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 11e-4,
        PUSHABILITY: 0
      },
      DRAW_HEALTH: false
    };
    exports2.greenpentagon = {
      PARENT: [exports2.food],
      LABEL: "Pentagon",
      VALUE: 3e4,
      SHAPE: 5,
      SIZE: 16,
      COLOR: 1,
      BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1
      },
      DRAW_HEALTH: true
    };
    exports2.greentriangle = {
      PARENT: [exports2.food],
      LABEL: "Triangle",
      VALUE: 7e3,
      SHAPE: 3,
      SIZE: 9,
      COLOR: 1,
      BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5
      },
      DRAW_HEALTH: true
    };
    exports2.greensquare = {
      PARENT: [exports2.food],
      LABEL: "Square",
      VALUE: 2e3,
      SHAPE: 4,
      SIZE: 10,
      COLOR: 1,
      BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2
      },
      DRAW_HEALTH: true,
      INTANGIBLE: false
    };
    exports2.gem = {
      PARENT: [exports2.food],
      LABEL: "Gem",
      VALUE: 2e3,
      SHAPE: 6,
      SIZE: 5,
      COLOR: 0,
      BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25
      },
      DRAW_HEALTH: true,
      INTANGIBLE: false
    };
    exports2.obstacle = {
      TYPE: "wall",
      DAMAGE_CLASS: 1,
      LABEL: "Rock",
      FACING_TYPE: "turnWithSpeed",
      SHAPE: -9,
      BODY: {
        PUSHABILITY: 0,
        HEALTH: 1e4,
        SHIELD: 1e4,
        REGEN: 1e3,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1
      },
      VALUE: 0,
      SIZE: 60,
      COLOR: 16,
      VARIES_IN_SIZE: true,
      GIVE_KILL_MESSAGE: true,
      ACCEPTS_SCORE: false
    };
    exports2.babyObstacle = {
      PARENT: [exports2.obstacle],
      SIZE: 25,
      SHAPE: -7,
      LABEL: "Gravel"
    };
    var wepHealthFactor = 0.5;
    var wepDamageFactor = 1.5;
    exports2.bullet = {
      LABEL: "Bullet",
      TYPE: "bullet",
      ACCEPTS_SCORE: false,
      BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3
      },
      FACING_TYPE: "smoothWithMotion",
      CAN_GO_OUTSIDE_ROOM: true,
      HITS_OWN_TYPE: "never",
      // DIE_AT_LOW_SPEED: true,
      DIE_AT_RANGE: true
    };
    exports2.casing = {
      PARENT: [exports2.bullet],
      LABEL: "Shell",
      TYPE: "swarm"
    };
    exports2.swarm = {
      LABEL: "Swarm Drone",
      TYPE: "swarm",
      ACCEPTS_SCORE: false,
      SHAPE: 3,
      MOTION_TYPE: "swarm",
      FACING_TYPE: "smoothWithMotion",
      CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
      CRAVES_ATTENTION: true,
      BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5
      },
      DIE_AT_RANGE: true,
      BUFF_VS_FOOD: true
    };
    exports2.bee = {
      PARENT: [exports2.swarm],
      PERSISTS_AFTER_DEATH: true,
      SHAPE: 4,
      LABEL: "Drone",
      HITS_OWN_TYPE: "hardWithBuffer"
    };
    exports2.autoswarm = {
      PARENT: [exports2.swarm],
      AI: { FARMER: true },
      INDEPENDENT: true
    };
    exports2.trap = {
      LABEL: "Thrown Trap",
      TYPE: "trap",
      ACCEPTS_SCORE: false,
      SHAPE: -3,
      MOTION_TYPE: "glide",
      // def
      FACING_TYPE: "turnWithSpeed",
      HITS_OWN_TYPE: "push",
      DIE_AT_RANGE: true,
      BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0
      }
    };
    exports2.block = {
      LABEL: "Set Trap",
      PARENT: [exports2.trap],
      SHAPE: -4,
      MOTION_TYPE: "motor",
      CONTROLLERS: ["goToMasterTarget"],
      BODY: {
        SPEED: 1,
        DENSITY: 5
      }
    };
    exports2.boomerang = {
      LABEL: "Boomerang",
      PARENT: [exports2.trap],
      CONTROLLERS: ["boomerang"],
      MOTION_TYPE: "motor",
      HITS_OWN_TYPE: "never",
      SHAPE: -5,
      BODY: {
        SPEED: 1.25,
        RANGE: 120
      }
    };
    exports2.drone = {
      LABEL: "Drone",
      TYPE: "drone",
      ACCEPTS_SCORE: false,
      DANGER: 2,
      CONTROL_RANGE: 0,
      SHAPE: 3,
      MOTION_TYPE: "chase",
      FACING_TYPE: "smoothToTarget",
      CONTROLLERS: [
        "nearestDifferentMaster",
        "canRepel",
        "mapTargetToGoal",
        "hangOutNearMaster"
      ],
      AI: { BLIND: true },
      BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8
      },
      HITS_OWN_TYPE: "hard",
      DRAW_HEALTH: false,
      CLEAR_ON_MASTER_UPGRADE: true,
      BUFF_VS_FOOD: true
    };
    exports2.sunchip = {
      PARENT: [exports2.drone],
      SHAPE: 4,
      NECRO: true,
      HITS_OWN_TYPE: "hard",
      BODY: {
        FOV: 0.5
      },
      AI: {
        BLIND: true,
        FARMER: true
      },
      DRAW_HEALTH: false
    };
    exports2.autosunchip = {
      PARENT: [exports2.sunchip],
      AI: {
        BLIND: true,
        FARMER: true
      },
      INDEPENDENT: true
    };
    exports2.gunchip = {
      PARENT: [exports2.drone],
      SHAPE: -2,
      NECRO: true,
      HITS_OWN_TYPE: "hard",
      BODY: {
        FOV: 0.5
      },
      AI: {
        BLIND: true,
        FARMER: true
      },
      DRAW_HEALTH: false
    };
    exports2.missile = {
      PARENT: [exports2.bullet],
      LABEL: "Missile",
      INDEPENDENT: true,
      BODY: {
        RANGE: 120
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 6, 1, 0, -2, 130, 0],
          PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }],
            STAT_CALCULATOR: gunCalcNames.thruster
          }
        },
        {
          POSITION: [14, 6, 1, 0, 2, 230, 0],
          PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }],
            STAT_CALCULATOR: gunCalcNames.thruster
          }
        }
      ]
    };
    exports2.hypermissile = {
      PARENT: [exports2.missile],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 6, 1, 0, -2, 150, 0],
          PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }],
            STAT_CALCULATOR: gunCalcNames.thruster
          }
        },
        {
          POSITION: [14, 6, 1, 0, 2, 210, 0],
          PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }],
            STAT_CALCULATOR: gunCalcNames.thruster
          }
        },
        {
          POSITION: [14, 6, 1, 0, -2, 90, 0.5],
          PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }]
          }
        },
        {
          POSITION: [14, 6, 1, 0, 2, 270, 0.5],
          PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }]
          }
        }
      ]
    };
    exports2.snake = {
      PARENT: [exports2.bullet],
      LABEL: "Snake",
      INDEPENDENT: true,
      BODY: {
        RANGE: 120
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 12, 1.4, 8, 0, 180, 0],
          PROPERTIES: {
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([
              g.basic,
              g.sniper,
              g.hunter,
              g.hunter2,
              g.snake,
              g.snakeskin
            ]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }]
          }
        },
        {
          POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
          PROPERTIES: {
            AUTOFIRE: true,
            NEGATIVE_RECOIL: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([
              g.basic,
              g.sniper,
              g.hunter,
              g.hunter2,
              g.snake
            ]),
            TYPE: [exports2.bullet, { PERSISTS_AFTER_DEATH: true }]
          }
        }
      ]
    };
    exports2.hive = {
      PARENT: [exports2.bullet],
      LABEL: "Hive",
      BODY: {
        RANGE: 90,
        FOV: 0.5
      },
      FACING_TYPE: "turnWithSpeed",
      INDEPENDENT: true,
      CONTROLLERS: ["alwaysFire", "nearestDifferentMaster", "targetSelf"],
      AI: { NO_LEAD: true },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports2.bee,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports2.bee,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports2.bee,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports2.bee,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports2.bee,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        }
      ]
    };
    var base = {
      ACCEL: 1.6,
      SPEED: 5.25,
      HEALTH: 20,
      DAMAGE: 3,
      RESIST: 1,
      PENETRATION: 1.05,
      SHIELD: 8,
      REGEN: 0.025,
      FOV: 1,
      DENSITY: 0.5
    };
    exports2.genericTank = {
      LABEL: "Unknown Class",
      TYPE: "tank",
      DAMAGE_CLASS: 2,
      DANGER: 5,
      MOTION_TYPE: "motor",
      FACING_TYPE: "toTarget",
      SIZE: 12,
      MAX_CHILDREN: 0,
      DAMAGE_EFFECTS: false,
      BODY: {
        // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH,
        DAMAGE: base.DAMAGE,
        PENETRATION: base.PENETRATION,
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3
      },
      GUNS: [],
      TURRETS: [],
      GIVE_KILL_MESSAGE: true,
      DRAW_HEALTH: true
    };
    exports2.autoTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "Turret",
      BODY: {
        FOV: 0.8
      },
      COLOR: 16,
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [22, 10, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.machineAutoTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "Turret",
      COLOR: 16,
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 11, 1.3, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.autoSmasherTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "Turret",
      COLOR: 16,
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 6, 1, 0, 5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
            TYPE: exports2.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload
          }
        },
        {
          POSITION: [20, 6, 1, 0, -5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
            TYPE: exports2.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload
          }
        }
      ]
    };
    exports2.oldAutoSmasherTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "Turret",
      COLOR: 16,
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 7, 1, 0, -5.75, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
            TYPE: exports2.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload
          }
        },
        {
          POSITION: [20, 7, 1, 0, 5.75, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
            TYPE: exports2.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload
          }
        }
      ]
    };
    exports2.auto3gun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      BODY: {
        FOV: 3
      },
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [22, 10, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.auto5gun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      BODY: {
        FOV: 3
      },
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [24, 11, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.heavy3gun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      BODY: {
        FOV: 2,
        SPEED: 0.9
      },
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [22, 14, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.masterGun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      BODY: {
        FOV: 3
      },
      CONTROLLERS: ["nearestDifferentMaster"],
      COLOR: 16,
      MAX_CHILDREN: 6,
      AI: {
        NO_LEAD: true,
        SKYNET: true,
        FULL_VIEW: true
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [8, 14, 1.3, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.master]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone
          }
        }
      ]
    };
    exports2.sniper3gun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      BODY: {
        FOV: 5
      },
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [27, 9, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [5, 9, -1.5, 8, 0, 0, 0]
        }
      ]
    };
    exports2.bansheegun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      COLOR: 16,
      INDEPENDENT: true,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [26, 10, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.auto4gun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      BODY: {
        FOV: 2
      },
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [16, 4, 1, 0, -3.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.bigauto4gun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 5, 1, 0, -4.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [14, 5, 1, 0, 4.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [16, 5, 1, 0, 0, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.tritrapgun = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 16, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [2, 16, 1.1, 20, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
            TYPE: exports2.block
          }
        }
      ]
    };
    exports2.smasherBody = {
      LABEL: "",
      CONTROLLERS: ["spin"],
      COLOR: 9,
      SHAPE: 6,
      INDEPENDENT: true
    };
    exports2.spikeBody = {
      LABEL: "",
      CONTROLLERS: ["spin"],
      COLOR: 9,
      SHAPE: -4,
      INDEPENDENT: true
    };
    exports2.spikeBody1 = {
      LABEL: "",
      CONTROLLERS: ["fastspin"],
      COLOR: 9,
      SHAPE: 3,
      INDEPENDENT: true
    };
    exports2.spikeBody2 = {
      LABEL: "",
      CONTROLLERS: ["reversespin"],
      COLOR: 9,
      SHAPE: 3,
      INDEPENDENT: true
    };
    exports2.megasmashBody = {
      LABEL: "",
      CONTROLLERS: ["spin"],
      COLOR: 9,
      SHAPE: -6,
      INDEPENDENT: true
    };
    exports2.dominationBody = {
      LABEL: "",
      CONTROLLERS: ["dontTurn"],
      COLOR: 9,
      SHAPE: 8,
      INDEPENDENT: true
    };
    exports2.baseSwarmTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "Protector",
      COLOR: 16,
      BODY: {
        FOV: 2
      },
      CONTROLLERS: ["nearestDifferentMaster"],
      AI: {
        NO_LEAD: true,
        LIKES_SHAPES: true
      },
      INDEPENDENT: true,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
            TYPE: [exports2.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true } }],
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        }
      ]
    };
    exports2.baseGunTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "Protector",
      BODY: {
        FOV: 5
      },
      ACCEPTS_SCORE: false,
      CONTROLLERS: ["nearestDifferentMaster"],
      INDEPENDENT: true,
      COLOR: 16,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [12, 12, 1, 6, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [11, 13, 1, 6, 0, 0, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [7, 13, -1.3, 6, 0, 0, 0]
        }
      ]
    };
    exports2.baseProtector = {
      PARENT: [exports2.genericTank],
      LABEL: "Base",
      SIZE: 64,
      DAMAGE_CLASS: 0,
      ACCEPTS_SCORE: false,
      SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        spd: 1,
        str: 1
      }),
      BODY: {
        // def
        SPEED: 0,
        HEALTH: 1e4,
        DAMAGE: 10,
        PENETRATION: 0.25,
        SHIELD: 1e3,
        REGEN: 100,
        FOV: 1,
        PUSHABILITY: 0,
        HETERO: 0
      },
      //CONTROLLERS: ['nearestDifferentMaster'],
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [25, 0, 0, 0, 360, 0],
          TYPE: exports2.dominationBody
        },
        {
          POSITION: [12, 7, 0, 45, 100, 0],
          TYPE: exports2.baseSwarmTurret
        },
        {
          POSITION: [12, 7, 0, 135, 100, 0],
          TYPE: exports2.baseSwarmTurret
        },
        {
          POSITION: [12, 7, 0, 225, 100, 0],
          TYPE: exports2.baseSwarmTurret
        },
        {
          POSITION: [12, 7, 0, 315, 100, 0],
          TYPE: exports2.baseSwarmTurret
        }
      ],
      GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        {
          POSITION: [4.5, 11.5, -1.3, 6, 0, 45, 0]
        },
        {
          POSITION: [4.5, 11.5, -1.3, 6, 0, 135, 0]
        },
        {
          POSITION: [4.5, 11.5, -1.3, 6, 0, 225, 0]
        },
        {
          POSITION: [4.5, 11.5, -1.3, 6, 0, 315, 0]
        },
        {
          POSITION: [4.5, 8.5, -1.5, 7, 0, 45, 0]
        },
        {
          POSITION: [4.5, 8.5, -1.5, 7, 0, 135, 0]
        },
        {
          POSITION: [4.5, 8.5, -1.5, 7, 0, 225, 0]
        },
        {
          POSITION: [4.5, 8.5, -1.5, 7, 0, 315, 0]
        }
      ]
    };
    exports2.minion = {
      PARENT: [exports2.genericTank],
      LABEL: "Minion",
      TYPE: "minion",
      DAMAGE_CLASS: 0,
      HITS_OWN_TYPE: "hardWithBuffer",
      FACING_TYPE: "smoothToTarget",
      BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4
      },
      AI: {
        BLIND: true
      },
      DRAW_HEALTH: false,
      CLEAR_ON_MASTER_UPGRADE: true,
      GIVE_KILL_MESSAGE: false,
      CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster"
      ],
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [17, 9, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.pillboxTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      COLOR: 16,
      BODY: {
        FOV: 2
      },
      HAS_NO_RECOIL: true,
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [22, 11, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.pillbox = {
      LABEL: "Pillbox",
      PARENT: [exports2.trap],
      SHAPE: -4,
      MOTION_TYPE: "motor",
      CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
      INDEPENDENT: true,
      BODY: {
        SPEED: 1,
        DENSITY: 5
      },
      DIE_AT_RANGE: true,
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [11, 0, 0, 0, 360, 1],
          TYPE: exports2.pillboxTurret
        }
      ]
    };
    exports2.skimturret = {
      PARENT: [exports2.genericTank],
      BODY: {
        FOV: base.FOV * 2
      },
      COLOR: 2,
      CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
      LABEL: "",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [10, 14, -0.5, 9, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports2.hypermissile
          }
        },
        {
          POSITION: [17, 15, 1, 0, 0, 0, 0]
        }
      ]
    };
    exports2.skimboss = {
      PARENT: [exports2.genericTank],
      BODY: {
        HEALTH: 300,
        DAMAGE: 2,
        SHIELD: 200
      },
      SHAPE: 3,
      COLOR: 2,
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [15, 5, 0, 60, 170, 0],
          TYPE: exports2.skimturret
        },
        {
          POSITION: [15, 5, 0, 180, 170, 0],
          TYPE: exports2.skimturret
        },
        {
          POSITION: [15, 5, 0, 300, 170, 0],
          TYPE: exports2.skimturret
        }
      ]
    };
    function makeAuto(type, name = -1, options = {}) {
      let turret = { type: exports2.autoTurret, size: 10, independent: true };
      if (options.type != null) {
        turret.type = options.type;
      }
      if (options.size != null) {
        turret.size = options.size;
      }
      if (options.independent != null) {
        turret.independent = options.independent;
      }
      let output = JSON.parse(JSON.stringify(type));
      let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [turret.size, 0, 0, 180, 360, 1],
        TYPE: [turret.type, { CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: turret.independent }]
      };
      if (type.GUNS != null) {
        output.GUNS = type.GUNS;
      }
      if (type.TURRETS == null) {
        output.TURRETS = [autogun];
      } else {
        output.TURRETS = [...type.TURRETS, autogun];
      }
      if (name == -1) {
        output.LABEL = "Auto-" + type.LABEL;
      } else {
        output.LABEL = name;
      }
      output.DANGER = type.DANGER + 1;
      return output;
    }
    function makeHybrid(type, name = -1) {
      let output = JSON.parse(JSON.stringify(type));
      let spawner = {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
          TYPE: [exports2.drone, { INDEPENDENT: true }],
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: gunCalcNames.drone,
          WAIT_TO_CYCLE: false,
          MAX_CHILDREN: 3
        }
      };
      if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
      }
      if (type.GUNS == null) {
        output.GUNS = [spawner];
      } else {
        output.GUNS = [...type.GUNS, spawner];
      }
      if (name == -1) {
        output.LABEL = "Hybrid " + type.LABEL;
      } else {
        output.LABEL = name;
      }
      return output;
    }
    exports2.basic = {
      PARENT: [exports2.genericTank],
      LABEL: "Basic",
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports2.bullet,
            LABEL: "",
            // def
            STAT_CALCULATOR: 0,
            // def
            WAIT_TO_CYCLE: false,
            // def
            AUTOFIRE: false,
            // def
            SYNCS_SKILLS: false,
            // def
            MAX_CHILDREN: 0,
            // def
            ALT_FIRE: false,
            // def
            NEGATIVE_RECOIL: false
            // def
          }
        }
      ]
    };
    exports2.testbed = {
      PARENT: [exports2.genericTank],
      LABEL: "TESTBED",
      RESET_UPGRADES: true,
      SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      LEVEL: -1,
      BODY: {
        // def
        SHIELD: 1e3,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2
      },
      TURRETS: [],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 10, -1.4, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: [exports2.bullet, { SHAPE: 5 }]
          }
        }
      ]
    };
    exports2.single = {
      PARENT: [exports2.genericTank],
      LABEL: "Single",
      //CONTROLLERS: ['nearestDifferentMaster'],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [19, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }
      ]
    };
    var smshskl = 12;
    exports2.smash = {
      PARENT: [exports2.genericTank],
      LABEL: "Smasher",
      DANGER: 6,
      BODY: {
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2
      },
      TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: exports2.smasherBody
      }],
      IS_SMASHER: true,
      SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
      STAT_NAMES: statnames.smasher
    };
    exports2.megasmash = {
      PARENT: [exports2.genericTank],
      LABEL: "Mega-Smasher",
      DANGER: 7,
      BODY: {
        SPEED: base.speed * 1.05,
        FOV: base.FOV * 1.1,
        DENSITY: base.DENSITY * 4
      },
      IS_SMASHER: true,
      SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
      STAT_NAMES: statnames.smasher,
      TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [24, 0, 0, 0, 360, 0],
        TYPE: exports2.megasmashBody
      }]
    };
    exports2.spike = {
      PARENT: [exports2.genericTank],
      LABEL: "Spike",
      DANGER: 7,
      BODY: {
        SPEED: base.speed * 0.9,
        DAMAGE: base.DAMAGE * 1.1,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2
      },
      IS_SMASHER: true,
      SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
      STAT_NAMES: statnames.smasher,
      TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [20.5, 0, 0, 0, 360, 0],
        TYPE: exports2.spikeBody
      }, {
        POSITION: [20.5, 0, 0, 120, 360, 0],
        TYPE: exports2.spikeBody
      }, {
        POSITION: [20.5, 0, 0, 240, 360, 0],
        TYPE: exports2.spikeBody
      }]
    };
    exports2.weirdspike = {
      PARENT: [exports2.genericTank],
      LABEL: "Spike",
      DANGER: 7,
      BODY: {
        DAMAGE: base.DAMAGE * 1.15,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 1.5
      },
      IS_SMASHER: true,
      SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
      STAT_NAMES: statnames.smasher,
      TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [20.5, 0, 0, 0, 360, 0],
        TYPE: exports2.spikeBody1
      }, {
        POSITION: [20.5, 0, 0, 180, 360, 0],
        TYPE: exports2.spikeBody2
      }]
    };
    exports2.autosmash = makeAuto(exports2.smash, "Auto-Smasher", { type: exports2.autoSmasherTurret, size: 11 });
    exports2.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl];
    exports2.twin = {
      PARENT: [exports2.genericTank],
      LABEL: "Twin",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 8, 1, 0, 5.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports2.bullet
          }
        },
        {
          /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.gunner = {
      PARENT: [exports2.genericTank],
      LABEL: "Gunner",
      DANGER: 6,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.machinegunner = {
      PARENT: [exports2.genericTank],
      LABEL: "Machine Gunner",
      DANGER: 6,
      BODY: {
        SPEED: base.SPEED * 0.9
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 3, 4, -3, 5, 0, 0.6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [14, 3, 4, -3, -5, 0, 0.8],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [14, 3, 4, 0, 2.5, 0, 0.4],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [14, 3, 4, 0, -2.5, 0, 0.2],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [14, 3, 4, 3, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.autogunner = makeAuto(exports2.gunner);
    exports2.nailgun = {
      PARENT: [exports2.genericTank],
      LABEL: "Nailgun",
      DANGER: 7,
      BODY: {
        FOV: base.FOV * 1.1,
        SPEED: base.SPEED * 0.9
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 2, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }
      ]
    };
    exports2.double = {
      PARENT: [exports2.genericTank],
      LABEL: "Double Twin",
      DANGER: 6,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 8, 1, 0, 5.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, 5.5, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.tripletwin = {
      PARENT: [exports2.genericTank],
      LABEL: "Triple Twin",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 8, 1, 0, 5.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, 5.5, 120, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, 5.5, 240, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.autodouble = makeAuto(exports2.double, "Auto-Double");
    exports2.split = {
      PARENT: [exports2.genericTank],
      LABEL: "Hewn Double",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, -5.5, -25, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, 5.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, 5.5, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.bent = {
      PARENT: [exports2.genericTank],
      LABEL: "Triple Shot",
      DANGER: 6,
      BODY: {
        SPEED: base.SPEED * 0.9
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [19, 8, 1, 0, -2, -20, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, 2, 20, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [22, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.bentdouble = {
      PARENT: [exports2.genericTank],
      LABEL: "Bent Double",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [19, 8, 1, 0, -1, -25, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, 1, 25, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [22, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, -1, 155, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, 1, -155, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [22, 8, 1, 0, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.penta = {
      PARENT: [exports2.genericTank],
      LABEL: "Penta Shot",
      DANGER: 7,
      BODY: {
        SPEED: base.SPEED * 0.85
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [16, 8, 1, 0, -3, -30, 0.667],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [16, 8, 1, 0, 3, 30, 0.667],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, -2, -15, 0.333],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, 2, 15, 0.333],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [22, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.benthybrid = makeHybrid(exports2.bent, "Bent Hybrid");
    exports2.triple = {
      PARENT: [exports2.genericTank],
      DANGER: 6,
      BODY: {
        FOV: base.FOV * 1.05
      },
      LABEL: "Triplet",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 10, 1, 0, 5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 10, 1, 0, -5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [21, 10, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.quint = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      BODY: {
        FOV: base.FOV * 1.1
      },
      LABEL: "Quintuplet",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [16, 10, 1, 0, -5, 0, 0.667],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [16, 10, 1, 0, 5, 0, 0.667],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 10, 1, 0, -3, 0, 0.333],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 10, 1, 0, 3, 0, 0.333],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [22, 10, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.dual = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      BODY: {
        ACCEL: base.ACCEL * 0.8,
        FOV: base.FOV * 1.1
      },
      LABEL: "",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 7, 1, 0, 5.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
            TYPE: exports2.bullet,
            LABEL: "Small"
          }
        },
        {
          POSITION: [18, 7, 1, 0, -5.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
            TYPE: exports2.bullet,
            LABEL: "Small"
          }
        },
        {
          POSITION: [16, 8.5, 1, 0, 5.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [16, 8.5, 1, 0, -5.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.sniper = {
      PARENT: [exports2.genericTank],
      LABEL: "Sniper",
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [24, 8.5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.rifle = {
      PARENT: [exports2.genericTank],
      LABEL: "Rifle",
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.225
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 10.5, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [24, 7, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.assassin = {
      PARENT: [exports2.genericTank],
      DANGER: 6,
      LABEL: "Assassin",
      BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.4
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [27, 8.5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
        }
      ]
    };
    exports2.ranger = {
      PARENT: [exports2.genericTank],
      LABEL: "Ranger",
      DANGER: 7,
      BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.5
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [32, 8.5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
        }
      ]
    };
    exports2.autoass = makeAuto(exports2.assassin, "");
    exports2.hunter = {
      PARENT: [exports2.genericTank],
      LABEL: "Hunter",
      DANGER: 6,
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [24, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [21, 12, 1, 0, 0, 0, 0.25],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.preda = {
      PARENT: [exports2.genericTank],
      LABEL: "Predator",
      DANGER: 7,
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.3
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [24, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [21, 12, 1, 0, 0, 0, 0.15],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 16, 1, 0, 0, 0, 0.3],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.poach = makeHybrid(exports2.hunter, "Poacher");
    exports2.sidewind = {
      PARENT: [exports2.genericTank],
      LABEL: "Sidewinder",
      DANGER: 7,
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.3
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [10, 11, -0.5, 14, 0, 0, 0]
        },
        {
          POSITION: [21, 12, -1.1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
            TYPE: exports2.snake,
            STAT_CALCULATOR: gunCalcNames.sustained
          }
        }
      ]
    };
    exports2.director = {
      PARENT: [exports2.genericTank],
      LABEL: "Director",
      STAT_NAMES: statnames.drone,
      DANGER: 5,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1
      },
      MAX_CHILDREN: 5,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 12, 1.2, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone
          }
        }
      ]
    };
    exports2.master = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      STAT_NAMES: statnames.drone,
      DANGER: 7,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.15
      },
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [16, 1, 0, 0, 0, 0],
          TYPE: exports2.masterGun
        },
        {
          POSITION: [16, 1, 0, 120, 0, 0],
          TYPE: [exports2.masterGun, { INDEPENDENT: true }]
        },
        {
          POSITION: [16, 1, 0, 240, 0, 0],
          TYPE: [exports2.masterGun, { INDEPENDENT: true }]
        }
      ]
    };
    exports2.overseer = {
      PARENT: [exports2.genericTank],
      LABEL: "Overseer",
      DANGER: 6,
      STAT_NAMES: statnames.drone,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1
      },
      MAX_CHILDREN: 8,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 12, 1.2, 8, 0, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
          }
        },
        {
          POSITION: [6, 12, 1.2, 8, 0, 270, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
          }
        }
      ]
    };
    exports2.overlord = {
      PARENT: [exports2.genericTank],
      LABEL: "Overlord",
      DANGER: 7,
      STAT_NAMES: statnames.drone,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1
      },
      MAX_CHILDREN: 8,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 12, 1.2, 8, 0, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
          }
        },
        {
          POSITION: [6, 12, 1.2, 8, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
          }
        },
        {
          POSITION: [6, 12, 1.2, 8, 0, 270, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
          }
        },
        {
          POSITION: [6, 12, 1.2, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
          }
        }
      ]
    };
    exports2.overtrap = {
      PARENT: [exports2.genericTank],
      LABEL: "Overtrapper",
      DANGER: 7,
      STAT_NAMES: statnames.generic,
      BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 11, 1.2, 8, 0, 125, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
          }
        },
        {
          POSITION: [6, 11, 1.2, 8, 0, 235, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
          }
        },
        {
          POSITION: [14, 8, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [4, 8, 1.5, 14, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.banshee = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      DANGER: 7,
      BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1
      },
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [10, 8, 0, 0, 80, 0],
          TYPE: exports2.bansheegun
        },
        {
          POSITION: [10, 8, 0, 120, 80, 0],
          TYPE: exports2.bansheegun
        },
        {
          POSITION: [10, 8, 0, 240, 80, 0],
          TYPE: exports2.bansheegun
        }
      ],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 11, 1.2, 8, 0, 60, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
          }
        },
        {
          POSITION: [6, 11, 1.2, 8, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
          }
        },
        {
          POSITION: [6, 11, 1.2, 8, 0, 300, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
          }
        }
      ]
    };
    exports2.autoover = makeAuto(exports2.overseer, "");
    exports2.overgunner = {
      PARENT: [exports2.genericTank],
      LABEL: "Overgunner",
      DANGER: 7,
      STAT_NAMES: statnames.generic,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 11, 1.2, 8, 0, 125, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
          }
        },
        {
          POSITION: [6, 11, 1.2, 8, 0, 235, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports2.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3
          }
        },
        {
          POSITION: [19, 2, 1, 0, -2.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [12, 11, 1, 0, 0, 0, 0]
        }
      ]
    };
    function makeSwarmSpawner(guntype) {
      return {
        PARENT: [exports2.genericTank],
        LABEL: "",
        BODY: {
          FOV: 2
        },
        CONTROLLERS: ["nearestDifferentMaster"],
        COLOR: 16,
        AI: {
          NO_LEAD: true,
          SKYNET: true,
          FULL_VIEW: true
        },
        GUNS: [
          {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 15, 0.6, 14, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: guntype,
              TYPE: exports2.swarm,
              STAT_CALCULATOR: gunCalcNames.swarm
            }
          }
        ]
      };
    }
    exports2.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
    exports2.cruiser = {
      PARENT: [exports2.genericTank],
      LABEL: "Cruiser",
      DANGER: 6,
      FACING_TYPE: "locksFacing",
      STAT_NAMES: statnames.swarm,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        }
      ]
    };
    exports2.battleship = {
      PARENT: [exports2.genericTank],
      LABEL: "Battleship",
      DANGER: 7,
      STAT_NAMES: statnames.swarm,
      FACING_TYPE: "locksFacing",
      BODY: {
        ACCELERATION: base.ACCEL,
        FOV: base.FOV * 1.2
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: "Guided"
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports2.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: "Autonomous"
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports2.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: "Autonomous"
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: "Guided"
          }
        }
      ]
    };
    exports2.carrier = {
      PARENT: [exports2.genericTank],
      LABEL: "Carrier",
      DANGER: 7,
      STAT_NAMES: statnames.swarm,
      FACING_TYPE: "locksFacing",
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, 2, 40, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, -2, -40, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        }
      ]
    };
    exports2.autocruiser = makeAuto(exports2.cruiser, "");
    exports2.fortress = {
      PARENT: [exports2.genericTank],
      LABEL: "Fortress",
      //'Palisade',
      DANGER: 7,
      STAT_NAMES: statnames.generic,
      BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports2.swarm, { CONTROLLERS: ["canRepel"] }],
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, 0, 120, 1 / 3],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports2.swarm, { CONTROLLERS: ["canRepel"] }],
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, 0, 240, 2 / 3],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports2.swarm, { CONTROLLERS: ["canRepel"] }],
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [14, 9, 1, 0, 0, 60, 0]
        },
        {
          POSITION: [4, 9, 1.5, 14, 0, 60, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [14, 9, 1, 0, 0, 180, 0]
        },
        {
          POSITION: [4, 9, 1.5, 14, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [14, 9, 1, 0, 0, 300, 0]
        },
        {
          POSITION: [4, 9, 1.5, 14, 0, 300, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.underseer = {
      PARENT: [exports2.genericTank],
      LABEL: "Underseer",
      DANGER: 6,
      STAT_NAMES: statnames.drone,
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1
      },
      SHAPE: 4,
      MAX_CHILDREN: 14,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [5, 12, 1.2, 8, 0, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports2.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
          }
        },
        {
          POSITION: [5, 12, 1.2, 8, 0, 270, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports2.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
          }
        }
      ]
    };
    exports2.necromancer = {
      PARENT: [exports2.genericTank],
      LABEL: "Necromancer",
      DANGER: 7,
      STAT_NAMES: statnames.necro,
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15
      },
      SHAPE: 4,
      FACING_TYPE: "autospin",
      MAX_CHILDREN: 14,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [5, 12, 1.2, 8, 0, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports2.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
          }
        },
        {
          POSITION: [5, 12, 1.2, 8, 0, 270, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports2.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
          }
        },
        {
          POSITION: [5, 12, 1.2, 8, 0, 0, 0.25],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: exports2.autosunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 4,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: "Guard"
          }
        },
        {
          POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: exports2.autosunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 4,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: "Guard"
          }
        }
      ]
    };
    exports2.lilfact = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      DANGER: 6,
      STAT_NAMES: statnames.drone,
      BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1
      },
      GUNS: [
        {
          /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [4.5, 10, 1, 10.5, 0, 0, 0]
        },
        {
          POSITION: [1, 12, 1, 15, 0, 0, 0],
          PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
            TYPE: exports2.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
          }
        },
        {
          POSITION: [3.5, 12, 1, 8, 0, 0, 0]
        }
      ]
    };
    exports2.factory = {
      PARENT: [exports2.genericTank],
      LABEL: "Factory",
      DANGER: 7,
      STAT_NAMES: statnames.drone,
      BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1
      },
      MAX_CHILDREN: 6,
      GUNS: [
        {
          /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [5, 11, 1, 10.5, 0, 0, 0]
        },
        {
          POSITION: [2, 14, 1, 15.5, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports2.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
          }
        },
        {
          POSITION: [4, 14, 1, 8, 0, 0, 0]
        }
      ]
    };
    exports2.machine = {
      PARENT: [exports2.genericTank],
      LABEL: "Machine Gun",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [12, 10, 1.4, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.spray = {
      PARENT: [exports2.genericTank],
      LABEL: "Sprayer",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [23, 7, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [12, 10, 1.4, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.mini = {
      PARENT: [exports2.genericTank],
      LABEL: "Minigun",
      DANGER: 6,
      BODY: {
        FOV: 1.2
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [22, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [20, 8, 1, 0, 0, 0, 0.333],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 0, 0.667],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.stream = {
      PARENT: [exports2.genericTank],
      LABEL: "Streamliner",
      DANGER: 7,
      BODY: {
        FOV: 1.3
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [25, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [23, 8, 1, 0, 0, 0, 0.2],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [21, 8, 1, 0, 0, 0, 0.4],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 8, 1, 0, 0, 0, 0.6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [17, 8, 1, 0, 0, 0, 0.8],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.hybridmini = makeHybrid(exports2.mini, "");
    exports2.minitrap = {
      PARENT: [exports2.genericTank],
      DANGER: 6,
      LABEL: "",
      STAT_NAMES: statnames.trap,
      BODY: {
        FOV: 1.15
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [24, 8, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [4, 8, 1.3, 22, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [4, 8, 1.3, 18, 0, 0, 0.333],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [4, 8, 1.3, 14, 0, 0, 0.667],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.pound = {
      PARENT: [exports2.genericTank],
      DANGER: 5,
      BODY: {
        ACCELERATION: base.ACCEL * 0.8
      },
      LABEL: "Pounder",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 12, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.destroy = {
      PARENT: [exports2.genericTank],
      DANGER: 6,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75
      },
      LABEL: "Destroyer",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [21, 14, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.anni = {
      PARENT: [exports2.genericTank],
      BODY: {
        ACCELERATION: base.ACCEL * 0.75
      },
      LABEL: "Annihilator",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.hiveshooter = {
      PARENT: [exports2.genericTank],
      DANGER: 6,
      BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.speed * 0.8
      },
      LABEL: "",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 14, -1.2, 5, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
            TYPE: exports2.hive
          }
        },
        {
          POSITION: [15, 12, 1, 5, 0, 0, 0]
        }
      ]
    };
    exports2.hybrid = makeHybrid(exports2.destroy, "Hybrid");
    exports2.shotgun2 = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      LABEL: "Shotgun",
      BODY: {
        ACCELERATION: base.ACCEL * 0.7
      },
      GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        {
          POSITION: [4, 3, 1, 11, -3, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [4, 3, 1, 11, 3, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [4, 4, 1, 13, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.casing
          }
        },
        {
          POSITION: [1, 4, 1, 12, -1, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.casing
          }
        },
        {
          POSITION: [1, 4, 1, 11, 1, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.casing
          }
        },
        {
          POSITION: [1, 3, 1, 13, -1, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [1, 3, 1, 13, 1, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [1, 2, 1, 13, 2, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.casing
          }
        },
        {
          POSITION: [1, 2, 1, 13, -2, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports2.casing
          }
        },
        {
          POSITION: [15, 14, 1, 6, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports2.casing
          }
        },
        {
          POSITION: [8, 14, -1.3, 4, 0, 0, 0]
        }
      ]
    };
    exports2.builder = {
      PARENT: [exports2.genericTank],
      DANGER: 6,
      LABEL: "Trapper",
      STAT_NAMES: statnames.trap,
      BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 12, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [2, 12, 1.1, 18, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports2.block
          }
        }
      ]
    };
    exports2.engineer = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      LABEL: "Engineer",
      STAT_NAMES: statnames.trap,
      BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: base.FOV * 1.15
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [5, 11, 1, 10.5, 0, 0, 0]
        },
        {
          POSITION: [3, 14, 1, 15.5, 0, 0, 0]
        },
        {
          POSITION: [2, 14, 1.3, 18, 0, 0, 0],
          PROPERTIES: {
            MAX_CHILDREN: 6,
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports2.pillbox,
            SYNCS_SKILLS: true
          }
        },
        {
          POSITION: [4, 14, 1, 8, 0, 0, 0]
        }
      ]
    };
    exports2.construct = {
      PARENT: [exports2.genericTank],
      LABEL: "Mega Trapper",
      STAT_NAMES: statnames.trap,
      DANGER: 7,
      BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.7,
        FOV: base.FOV * 1.15
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 18, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [2, 18, 1.2, 18, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
            TYPE: exports2.block
          }
        }
      ]
    };
    exports2.autobuilder = makeAuto(exports2.builder);
    exports2.conq = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      LABEL: "",
      STAT_NAMES: statnames.trap,
      BODY: {
        SPEED: base.SPEED * 0.8
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [21, 14, 1, 0, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 14, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [2, 14, 1.1, 18, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports2.block
          }
        }
      ]
    };
    exports2.bentboomer = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      LABEL: "Boomer",
      STAT_NAMES: statnames.trap,
      BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [8, 10, 1, 8, -2, -35, 0]
        },
        {
          POSITION: [8, 10, 1, 8, 2, 35, 0]
        },
        {
          POSITION: [2, 10, 1.3, 16, -2, -35, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
            TYPE: exports2.boomerang
          }
        },
        {
          POSITION: [2, 10, 1.3, 16, 2, 35, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
            TYPE: exports2.boomerang
          }
        }
      ]
    };
    exports2.boomer = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      LABEL: "Boomer",
      STAT_NAMES: statnames.trap,
      FACING_TYPE: "locksFacing",
      BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [5, 10, 1, 14, 0, 0, 0]
        },
        {
          POSITION: [6, 10, -1.5, 7, 0, 0, 0]
        },
        {
          //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
          //    }, {
          POSITION: [2, 10, 1.3, 18, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
            TYPE: exports2.boomerang
          }
        }
      ]
    };
    exports2.quadtrapper = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      LABEL: "",
      STAT_NAMES: statnames.trap,
      BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 6, 1, 0, 0, 45, 0]
        },
        {
          POSITION: [2, 6, 1.1, 14, 0, 45, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports2.block
          }
        },
        {
          POSITION: [14, 6, 1, 0, 0, 135, 0]
        },
        {
          POSITION: [2, 6, 1.1, 14, 0, 135, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports2.block
          }
        },
        {
          POSITION: [14, 6, 1, 0, 0, 225, 0]
        },
        {
          POSITION: [2, 6, 1.1, 14, 0, 225, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports2.block
          }
        },
        {
          POSITION: [14, 6, 1, 0, 0, 315, 0]
        },
        {
          POSITION: [2, 6, 1.1, 14, 0, 315, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports2.block
          }
        }
      ]
    };
    exports2.artillery = {
      PARENT: [exports2.genericTank],
      DANGER: 6,
      LABEL: "Artillery",
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [17, 3, 1, 0, -6, -7, 0.25],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports2.bullet,
            LABEL: "Secondary"
          }
        },
        {
          POSITION: [17, 3, 1, 0, 6, 7, 0.75],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports2.bullet,
            LABEL: "Secondary"
          }
        },
        {
          POSITION: [19, 12, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
            TYPE: exports2.bullet,
            LABEL: "Heavy"
          }
        }
      ]
    };
    exports2.mortar = {
      PARENT: [exports2.genericTank],
      LABEL: "Mortar",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [13, 3, 1, 0, -8, -7, 0.6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports2.bullet,
            LABEL: "Secondary"
          }
        },
        {
          POSITION: [13, 3, 1, 0, 8, 7, 0.8],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports2.bullet,
            LABEL: "Secondary"
          }
        },
        {
          POSITION: [17, 3, 1, 0, -6, -7, 0.2],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports2.bullet,
            LABEL: "Secondary"
          }
        },
        {
          POSITION: [17, 3, 1, 0, 6, 7, 0.4],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports2.bullet,
            LABEL: "Secondary"
          }
        },
        {
          POSITION: [19, 12, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
            TYPE: exports2.bullet,
            LABEL: "Heavy"
          }
        }
      ]
    };
    exports2.skimmer = {
      PARENT: [exports2.genericTank],
      BODY: {
        FOV: base.FOV * 1.15
      },
      LABEL: "Skimmer",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [10, 14, -0.5, 9, 0, 0, 0]
        },
        {
          POSITION: [17, 15, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports2.missile,
            STAT_CALCULATOR: gunCalcNames.sustained
          }
        }
      ]
    };
    exports2.spread = {
      PARENT: [exports2.genericTank],
      LABEL: "Spreadshot",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [13, 4, 1, 0, -0.8, -75, 5 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [14.5, 4, 1, 0, -1, -60, 4 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [16, 4, 1, 0, -1.6, -45, 3 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [17.5, 4, 1, 0, -2.4, -30, 2 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [19, 4, 1, 0, -3, -15, 1 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [13, 4, 1, 0, 0.8, 75, 5 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [14.5, 4, 1, 0, 1, 60, 4 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [16, 4, 1, 0, 1.6, 45, 3 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [17.5, 4, 1, 0, 2.4, 30, 2 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [19, 4, 1, 0, 3, 15, 1 / 6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Spread"
          }
        },
        {
          POSITION: [13, 10, 1.3, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
            TYPE: exports2.bullet,
            LABEL: "Pounder"
          }
        }
      ]
    };
    exports2.flank = {
      PARENT: [exports2.genericTank],
      LABEL: "Flank Guard",
      BODY: {
        SPEED: base.SPEED * 1.1
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 120, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 240, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.hexa = {
      PARENT: [exports2.genericTank],
      LABEL: "Hexa Tank",
      DANGER: 6,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 120, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 240, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 60, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 180, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 300, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.octo = {
      PARENT: [exports2.genericTank],
      LABEL: "Octo Tank",
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 270, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 45, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 135, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 225, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 315, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports2.bullet
          }
        }
      ]
    };
    exports2.heptatrap = (() => {
      let a = 360 / 7, d = 1 / 7;
      return {
        PARENT: [exports2.genericTank],
        LABEL: "Hepta-Trapper",
        DANGER: 7,
        BODY: {
          SPEED: base.SPEED * 0.8
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
          {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0]
          },
          {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
              TYPE: exports2.trap,
              STAT_CALCULATOR: gunCalcNames.trap
            }
          },
          {
            POSITION: [15, 7, 1, 0, 0, a, 4 * d]
          },
          {
            POSITION: [3, 7, 1.7, 15, 0, a, 4 * d],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
              TYPE: exports2.trap,
              STAT_CALCULATOR: gunCalcNames.trap
            }
          },
          {
            POSITION: [15, 7, 1, 0, 0, 2 * a, 1 * d]
          },
          {
            POSITION: [3, 7, 1.7, 15, 0, 2 * a, 1 * d],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
              TYPE: exports2.trap,
              STAT_CALCULATOR: gunCalcNames.trap
            }
          },
          {
            POSITION: [15, 7, 1, 0, 0, 3 * a, 5 * d]
          },
          {
            POSITION: [3, 7, 1.7, 15, 0, 3 * a, 5 * d],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
              TYPE: exports2.trap,
              STAT_CALCULATOR: gunCalcNames.trap
            }
          },
          {
            POSITION: [15, 7, 1, 0, 0, 4 * a, 2 * d]
          },
          {
            POSITION: [3, 7, 1.7, 15, 0, 4 * a, 2 * d],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
              TYPE: exports2.trap,
              STAT_CALCULATOR: gunCalcNames.trap
            }
          },
          {
            POSITION: [15, 7, 1, 0, 0, 5 * a, 6 * d]
          },
          {
            POSITION: [3, 7, 1.7, 15, 0, 5 * a, 6 * d],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
              TYPE: exports2.trap,
              STAT_CALCULATOR: gunCalcNames.trap
            }
          },
          {
            POSITION: [15, 7, 1, 0, 0, 6 * a, 3 * d]
          },
          {
            POSITION: [3, 7, 1.7, 15, 0, 6 * a, 3 * d],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
              TYPE: exports2.trap,
              STAT_CALCULATOR: gunCalcNames.trap
            }
          }
        ]
      };
    })();
    exports2.hexatrap = makeAuto({
      PARENT: [exports2.genericTank],
      LABEL: "Hexa-Trapper",
      DANGER: 7,
      BODY: {
        SPEED: base.SPEED * 0.8
      },
      STAT_NAMES: statnames.trap,
      HAS_NO_RECOIL: true,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [15, 7, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [3, 7, 1.7, 15, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [15, 7, 1, 0, 0, 60, 0.5]
        },
        {
          POSITION: [3, 7, 1.7, 15, 0, 60, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [15, 7, 1, 0, 0, 120, 0]
        },
        {
          POSITION: [3, 7, 1.7, 15, 0, 120, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [15, 7, 1, 0, 0, 180, 0.5]
        },
        {
          POSITION: [3, 7, 1.7, 15, 0, 180, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [15, 7, 1, 0, 0, 240, 0]
        },
        {
          POSITION: [3, 7, 1.7, 15, 0, 240, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        },
        {
          POSITION: [15, 7, 1, 0, 0, 300, 0.5]
        },
        {
          POSITION: [3, 7, 1.7, 15, 0, 300, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    }, "Hexa-Trapper");
    exports2.tri = {
      PARENT: [exports2.genericTank],
      LABEL: "Tri-Angle",
      BODY: {
        HEALTH: base.HEALTH * 0.8,
        SHIELD: base.SHIELD * 0.8,
        DENSITY: base.DENSITY * 0.6
      },
      DANGER: 6,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
            TYPE: exports2.bullet,
            LABEL: "Front"
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 150, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 210, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        }
      ]
    };
    exports2.booster = {
      PARENT: [exports2.genericTank],
      LABEL: "Booster",
      BODY: {
        HEALTH: base.HEALTH * 0.6,
        SHIELD: base.SHIELD * 0.6,
        DENSITY: base.DENSITY * 0.2
      },
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
            TYPE: exports2.bullet,
            LABEL: "Front"
          }
        },
        {
          POSITION: [13, 8, 1, 0, -1, 135, 0.6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [13, 8, 1, 0, 1, 225, 0.6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 145, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 215, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        }
      ]
    };
    exports2.fighter = {
      PARENT: [exports2.genericTank],
      LABEL: "Fighter",
      BODY: {
        DENSITY: base.DENSITY * 0.6
      },
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports2.bullet,
            LABEL: "Front"
          }
        },
        {
          POSITION: [16, 8, 1, 0, -1, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports2.bullet,
            LABEL: "Side"
          }
        },
        {
          POSITION: [16, 8, 1, 0, 1, -90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports2.bullet,
            LABEL: "Side"
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 150, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 210, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        }
      ]
    };
    exports2.brutalizer = {
      PARENT: [exports2.genericTank],
      LABEL: "",
      BODY: {
        DENSITY: base.DENSITY * 0.6
      },
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports2.bullet,
            LABEL: "Front"
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, -1, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports2.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [7, 7.5, 0.6, 7, 1, -90, 9],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports2.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 150, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 210, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        }
      ]
    };
    exports2.bomber = {
      PARENT: [exports2.genericTank],
      LABEL: "Bomber",
      BODY: {
        DENSITY: base.DENSITY * 0.6
      },
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports2.bullet,
            LABEL: "Front"
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 130, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
            TYPE: exports2.bullet,
            LABEL: "Wing"
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 230, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
            TYPE: exports2.bullet,
            LABEL: "Wing"
          }
        },
        {
          POSITION: [14, 8, 1, 0, 0, 180, 0]
        },
        {
          POSITION: [4, 8, 1.5, 14, 0, 180, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.autotri = makeAuto(exports2.tri);
    exports2.autotri.BODY = {
      SPEED: base.SPEED
    };
    exports2.falcon = {
      PARENT: [exports2.genericTank],
      LABEL: "Falcon",
      DANGER: 7,
      BODY: {
        ACCELERATION: base.ACCEL * 0.8,
        FOV: base.FOV * 1.2
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [27, 8.5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
            TYPE: exports2.bullet,
            LABEL: "Assassin",
            ALT_FIRE: true
          }
        },
        {
          POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
        },
        {
          POSITION: [16, 8, 1, 0, 0, 150, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [16, 8, 1, 0, 0, 210, 0.1],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        },
        {
          POSITION: [18, 8, 1, 0, 0, 180, 0.6],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports2.bullet,
            LABEL: gunCalcNames.thruster
          }
        }
      ]
    };
    exports2.auto3 = {
      PARENT: [exports2.genericTank],
      LABEL: "Auto-3",
      DANGER: 6,
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [11, 8, 0, 0, 190, 0],
          TYPE: exports2.auto3gun
        },
        {
          POSITION: [11, 8, 0, 120, 190, 0],
          TYPE: exports2.auto3gun
        },
        {
          POSITION: [11, 8, 0, 240, 190, 0],
          TYPE: exports2.auto3gun
        }
      ]
    };
    exports2.auto5 = {
      PARENT: [exports2.genericTank],
      LABEL: "Auto-5",
      DANGER: 7,
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [11, 8, 0, 0, 190, 0],
          TYPE: exports2.auto5gun
        },
        {
          POSITION: [11, 8, 0, 72, 190, 0],
          TYPE: exports2.auto5gun
        },
        {
          POSITION: [11, 8, 0, 144, 190, 0],
          TYPE: exports2.auto5gun
        },
        {
          POSITION: [11, 8, 0, 216, 190, 0],
          TYPE: exports2.auto5gun
        },
        {
          POSITION: [11, 8, 0, 288, 190, 0],
          TYPE: exports2.auto5gun
        }
      ]
    };
    exports2.heavy3 = {
      BODY: {
        SPEED: base.SPEED * 0.95
      },
      PARENT: [exports2.genericTank],
      LABEL: "Mega-3",
      DANGER: 7,
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [14, 8, 0, 0, 190, 0],
          TYPE: exports2.heavy3gun
        },
        {
          POSITION: [14, 8, 0, 120, 190, 0],
          TYPE: exports2.heavy3gun
        },
        {
          POSITION: [14, 8, 0, 240, 190, 0],
          TYPE: exports2.heavy3gun
        }
      ]
    };
    exports2.tritrap = {
      LABEL: "",
      BODY: {
        SPEED: base.SPEED * 1.1
      },
      PARENT: [exports2.genericTank],
      DANGER: 6,
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [12, 8, 0, 0, 190, 0],
          TYPE: exports2.tritrapgun
        },
        {
          POSITION: [12, 8, 0, 120, 190, 0],
          TYPE: exports2.tritrapgun
        },
        {
          POSITION: [12, 8, 0, 240, 190, 0],
          TYPE: exports2.tritrapgun
        }
      ]
    };
    exports2.sniper3 = {
      PARENT: [exports2.genericTank],
      DANGER: 7,
      LABEL: "",
      BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.25
      },
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [13, 8, 0, 0, 170, 0],
          TYPE: exports2.sniper3gun
        },
        {
          POSITION: [13, 8, 0, 120, 170, 0],
          TYPE: exports2.sniper3gun
        },
        {
          POSITION: [13, 8, 0, 240, 170, 0],
          TYPE: exports2.sniper3gun
        }
      ]
    };
    exports2.auto4 = {
      PARENT: [exports2.genericTank],
      DANGER: 5,
      LABEL: "Auto-4",
      FACING_TYPE: "autospin",
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [13, 6, 0, 45, 160, 0],
          TYPE: exports2.auto4gun
        },
        {
          POSITION: [13, 6, 0, 135, 160, 0],
          TYPE: exports2.auto4gun
        },
        {
          POSITION: [13, 6, 0, 225, 160, 0],
          TYPE: exports2.auto4gun
        },
        {
          POSITION: [13, 6, 0, 315, 160, 0],
          TYPE: exports2.auto4gun
        }
      ]
    };
    exports2.flanktrap = {
      PARENT: [exports2.genericTank],
      LABEL: "Trap Guard",
      STAT_NAMES: statnames.generic,
      DANGER: 6,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [20, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [13, 8, 1, 0, 0, 180, 0]
        },
        {
          POSITION: [4, 8, 1.7, 13, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.guntrap = {
      PARENT: [exports2.genericTank],
      LABEL: "Gunner Trapper",
      DANGER: 7,
      STAT_NAMES: statnames.generic,
      BODY: {
        FOV: base.FOV * 1.25
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [19, 2, 1, 0, -2.5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [12, 11, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [13, 11, 1, 0, 0, 180, 0]
        },
        {
          POSITION: [4, 11, 1.7, 13, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.bushwhack = {
      PARENT: [exports2.genericTank],
      LABEL: "Snipe Guard",
      BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2
      },
      DANGER: 7,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [24, 8.5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
            TYPE: exports2.bullet
          }
        },
        {
          POSITION: [13, 8.5, 1, 0, 0, 180, 0]
        },
        {
          POSITION: [4, 8.5, 1.7, 13, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.testbed.UPGRADES_TIER_1 = [
      exports2.autocruiser,
      exports2.master,
      exports2.dual,
      exports2.hiveshooter,
      exports2.brutalizer,
      exports2.shotgun2,
      exports2.hybridmini
    ];
    exports2.basic.UPGRADES_TIER_1 = [exports2.twin, exports2.sniper, exports2.machine, exports2.flank, exports2.director];
    exports2.basic.UPGRADES_TIER_3 = [exports2.single];
    exports2.basic.UPGRADES_TIER_2 = [exports2.smash];
    exports2.smash.UPGRADES_TIER_3 = [exports2.megasmash, exports2.spike, exports2.autosmash];
    exports2.twin.UPGRADES_TIER_2 = [exports2.double, exports2.bent, exports2.gunner, exports2.hexa];
    exports2.twin.UPGRADES_TIER_3 = [exports2.triple];
    exports2.double.UPGRADES_TIER_3 = [exports2.tripletwin, exports2.split, exports2.autodouble, exports2.bentdouble];
    exports2.bent.UPGRADES_TIER_3 = [exports2.penta, exports2.spread, exports2.benthybrid, exports2.bentdouble, exports2.triple];
    exports2.gunner.UPGRADES_TIER_3 = [exports2.autogunner, exports2.nailgun, exports2.auto4, exports2.machinegunner];
    exports2.sniper.UPGRADES_TIER_2 = [exports2.assassin, exports2.hunter, exports2.mini, exports2.builder];
    exports2.sniper.UPGRADES_TIER_3 = [exports2.bushwhack];
    exports2.assassin.UPGRADES_TIER_3 = [exports2.ranger, exports2.falcon];
    exports2.hunter.UPGRADES_TIER_3 = [exports2.preda, exports2.poach, exports2.sidewind];
    exports2.builder.UPGRADES_TIER_3 = [exports2.construct, exports2.autobuilder, exports2.engineer, exports2.boomer];
    exports2.machine.UPGRADES_TIER_2 = [exports2.destroy, exports2.artillery, exports2.mini, exports2.gunner];
    exports2.machine.UPGRADES_TIER_3 = [exports2.spray];
    exports2.destroy.UPGRADES_TIER_3 = [exports2.anni, exports2.hybrid, exports2.construct, exports2.shotgun2];
    exports2.artillery.UPGRADES_TIER_3 = [exports2.mortar, exports2.spread, exports2.skimmer];
    exports2.mini.UPGRADES_TIER_3 = [exports2.stream, exports2.nailgun];
    exports2.flank.UPGRADES_TIER_2 = [exports2.hexa, exports2.tri, exports2.auto3, exports2.flanktrap];
    exports2.flank.UPGRADES_TIER_3 = [];
    exports2.tri.UPGRADES_TIER_3 = [exports2.fighter, exports2.booster, exports2.falcon, exports2.bomber, exports2.autotri];
    exports2.hexa.UPGRADES_TIER_3 = [exports2.octo, exports2.hexatrap];
    exports2.auto3.UPGRADES_TIER_3 = [exports2.auto5, exports2.heavy3, exports2.auto4];
    exports2.flanktrap.UPGRADES_TIER_3 = [exports2.bushwhack, exports2.guntrap, exports2.fortress, exports2.bomber];
    exports2.director.UPGRADES_TIER_2 = [exports2.overseer, exports2.cruiser, exports2.underseer];
    exports2.director.UPGRADES_TIER_3 = [exports2.factory];
    exports2.overseer.UPGRADES_TIER_3 = [exports2.overlord, exports2.overtrap, exports2.overgunner];
    exports2.underseer.UPGRADES_TIER_3 = [exports2.necromancer];
    exports2.cruiser.UPGRADES_TIER_3 = [exports2.carrier, exports2.battleship, exports2.fortress];
    exports2.crasher = {
      TYPE: "crasher",
      LABEL: "Crasher",
      COLOR: 5,
      SHAPE: 3,
      SIZE: 5,
      VARIES_IN_SIZE: true,
      CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
      AI: { NO_LEAD: true },
      BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2
      },
      MOTION_TYPE: "motor",
      FACING_TYPE: "smoothWithMotion",
      HITS_OWN_TYPE: "hard",
      HAS_NO_MASTER: true,
      DRAW_HEALTH: true
    };
    exports2.sentry = {
      PARENT: [exports2.genericTank],
      TYPE: "crasher",
      LABEL: "Sentry",
      DANGER: 3,
      COLOR: 5,
      SHAPE: 3,
      SIZE: 10,
      SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0
      }),
      VALUE: 1500,
      VARIES_IN_SIZE: true,
      CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
      AI: { NO_LEAD: true },
      BODY: {
        FOV: 0.5,
        ACCEL: 6e-3,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5
      },
      MOTION_TYPE: "motor",
      FACING_TYPE: "smoothToTarget",
      HITS_OWN_TYPE: "hard",
      HAS_NO_MASTER: true,
      DRAW_HEALTH: true,
      GIVE_KILL_MESSAGE: true
    };
    exports2.trapTurret = {
      PARENT: [exports2.genericTank],
      LABEL: "Turret",
      BODY: {
        FOV: 0.5
      },
      INDEPENDENT: true,
      CONTROLLERS: ["nearestDifferentMaster"],
      COLOR: 16,
      AI: {
        SKYNET: true,
        FULL_VIEW: true
      },
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [16, 14, 1, 0, 0, 0, 0]
        },
        {
          POSITION: [4, 14, 1.8, 16, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
            TYPE: exports2.trap,
            STAT_CALCULATOR: gunCalcNames.trap
          }
        }
      ]
    };
    exports2.sentrySwarm = {
      PARENT: [exports2.sentry],
      DANGER: 3,
      GUNS: [
        {
          POSITION: [7, 14, 0.6, 7, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports2.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
          }
        }
      ]
    };
    exports2.sentryGun = makeAuto(exports2.sentry, "Sentry", { type: exports2.heavy3gun, size: 12 });
    exports2.sentryTrap = makeAuto(exports2.sentry, "Sentry", { type: exports2.trapTurret, size: 12 });
    exports2.miniboss = {
      PARENT: [exports2.genericTank],
      TYPE: "miniboss",
      DANGER: 6,
      SKILL: skillSet({
        rld: 0.7,
        dam: 0.5,
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0
      }),
      LEVEL: 45,
      CONTROLLERS: ["nearestDifferentMaster", "minion", "canRepel"],
      AI: { NO_LEAD: true },
      FACING_TYPE: "autospin",
      HITS_OWN_TYPE: "hard",
      BROADCAST_MESSAGE: "A visitor has left!"
    };
    exports2.crasherSpawner = {
      PARENT: [exports2.genericTank],
      LABEL: "Spawned",
      STAT_NAMES: statnames.drone,
      CONTROLLERS: ["nearestDifferentMaster"],
      COLOR: 5,
      INDEPENDENT: true,
      AI: { chase: true },
      MAX_CHILDREN: 4,
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [6, 12, 1.2, 8, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
            TYPE: [exports2.drone, { LABEL: "Crasher", VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
            SYNCS_SKILLS: true,
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.drone
          }
        }
      ]
    };
    exports2.elite = {
      PARENT: [exports2.miniboss],
      LABEL: "Elite Crasher",
      COLOR: 5,
      SHAPE: 3,
      SIZE: 20,
      VARIES_IN_SIZE: true,
      VALUE: 15e4,
      BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 1.5,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5
      }
    };
    exports2.elite_destroyer = {
      PARENT: [exports2.elite],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [5, 16, 1, 6, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports2.bullet,
            LABEL: "Devastator"
          }
        },
        {
          POSITION: [5, 16, 1, 6, 0, 60, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports2.bullet,
            LABEL: "Devastator"
          }
        },
        {
          POSITION: [5, 16, 1, 6, 0, -60, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports2.bullet,
            LABEL: "Devastator"
          }
        }
      ],
      TURRETS: [
        {
          /*********  SIZE     X       Y     ANGLE    ARC */
          POSITION: [11, 0, 0, 180, 360, 0],
          TYPE: [exports2.crasherSpawner]
        },
        {
          POSITION: [11, 0, 0, 60, 360, 0],
          TYPE: [exports2.crasherSpawner]
        },
        {
          POSITION: [11, 0, 0, -60, 360, 0],
          TYPE: [exports2.crasherSpawner]
        },
        {
          POSITION: [11, 0, 0, 0, 360, 1],
          TYPE: [exports2.bigauto4gun, { INDEPENDENT: true, COLOR: 5 }]
        }
      ]
    };
    exports2.elite_gunner = {
      PARENT: [exports2.elite],
      GUNS: [
        {
          /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14, 16, 1, 0, 0, 180, 0]
        },
        {
          POSITION: [4, 16, 1.5, 14, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports2.pillbox, { INDEPENDENT: true }]
          }
        },
        {
          POSITION: [6, 14, -2, 2, 0, 60, 0]
        },
        {
          POSITION: [6, 14, -2, 2, 0, 300, 0]
        }
      ],
      AI: { NO_LEAD: false },
      TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 8, 0, 60, 180, 0],
        TYPE: [exports2.auto4gun]
      }, {
        POSITION: [14, 8, 0, 300, 180, 0],
        TYPE: [exports2.auto4gun]
      }]
    };
    exports2.elite_sprayer = {
      PARENT: [exports2.elite],
      AI: { NO_LEAD: false },
      TURRETS: [
        {
          /*  SIZE     X       Y     ANGLE    ARC */
          POSITION: [14, 6, 0, 180, 190, 0],
          TYPE: [exports2.spray, { COLOR: 5 }]
        },
        {
          POSITION: [14, 6, 0, 60, 190, 0],
          TYPE: [exports2.spray, { COLOR: 5 }]
        },
        {
          POSITION: [14, 6, 0, -60, 190, 0],
          TYPE: [exports2.spray, { COLOR: 5 }]
        }
      ]
    };
    exports2.palisade = (() => {
      let props = {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
        TYPE: exports2.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        MAX_CHILDREN: 1,
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true
      };
      return {
        PARENT: [exports2.miniboss],
        LABEL: "Rogue Palisade",
        COLOR: 17,
        SHAPE: 6,
        SIZE: 28,
        VALUE: 5e5,
        BODY: {
          FOV: 1.3,
          SPEED: base.SPEED * 0.1,
          HEALTH: base.HEALTH * 2,
          SHIELD: base.SHIELD * 2,
          REGEN: base.REGEN,
          DAMAGE: base.DAMAGE * 3
        },
        GUNS: [
          {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4, 6, -1.6, 8, 0, 0, 0],
            PROPERTIES: props
          },
          {
            POSITION: [4, 6, -1.6, 8, 0, 60, 0],
            PROPERTIES: props
          },
          {
            POSITION: [4, 6, -1.6, 8, 0, 120, 0],
            PROPERTIES: props
          },
          {
            POSITION: [4, 6, -1.6, 8, 0, 180, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
              TYPE: exports2.minion,
              STAT_CALCULATOR: gunCalcNames.drone,
              AUTOFIRE: true,
              MAX_CHILDREN: 1,
              SYNCS_SKILLS: true,
              WAIT_TO_CYCLE: true
            }
          },
          {
            POSITION: [4, 6, -1.6, 8, 0, 240, 0],
            PROPERTIES: props
          },
          {
            POSITION: [4, 6, -1.6, 8, 0, 300, 0],
            PROPERTIES: props
          }
        ],
        TURRETS: [
          {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [5, 10, 0, 30, 110, 0],
            TYPE: exports2.trapTurret
          },
          {
            POSITION: [5, 10, 0, 90, 110, 0],
            TYPE: exports2.trapTurret
          },
          {
            POSITION: [5, 10, 0, 150, 110, 0],
            TYPE: exports2.trapTurret
          },
          {
            POSITION: [5, 10, 0, 210, 110, 0],
            TYPE: exports2.trapTurret
          },
          {
            POSITION: [5, 10, 0, 270, 110, 0],
            TYPE: exports2.trapTurret
          },
          {
            POSITION: [5, 10, 0, 330, 110, 0],
            TYPE: exports2.trapTurret
          }
        ]
      };
    })();
    exports2.bot = {
      AUTO_UPGRADE: "random",
      FACING_TYPE: "looseToTarget",
      BODY: {
        SIZE: 10
      },
      //COLOR: 17,
      NAME: "ai_",
      CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "fleeAtLowHealth"
      ],
      AI: { STRAFE: true }
    };
    exports2.testbed.UPGRADES_TIER_1.push(exports2.elite_sprayer);
  }
});

// src/server/src/lib/fasttalk.js
var require_fasttalk = __commonJS({
  "src/server/src/lib/fasttalk.js"(exports2) {
    "use strict";
    exports2.encode = (() => {
      var arrUint8 = new Uint8Array(1);
      var arrUint16 = new Uint16Array(1);
      var charUint16 = new Uint8Array(arrUint16.buffer);
      var arrUint32 = new Uint32Array(1);
      var charUint32 = new Uint8Array(arrUint32.buffer);
      var arrFloat32 = new Float32Array(1);
      var charFloat32 = new Uint8Array(arrFloat32.buffer);
      var typeEncoder = (type, number) => {
        let output = "";
        switch (type) {
          case "RawUint8":
            arrUint8[0] = number;
            return String.fromCharCode(arrUint8[0]);
          case "RawUint16":
            arrUint16[0] = number;
            return String.fromCharCode(charUint16[0], charUint16[1]);
          case "Uint8":
            arrUint8[0] = number;
            return "0" + String.fromCharCode(arrUint8[0]);
          case "Uint16":
            arrUint16[0] = number;
            return "1" + String.fromCharCode(charUint16[0], charUint16[1]);
          case "Uint32":
            arrUint32[0] = number;
            return "2" + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);
          case "Sint8":
            arrUint8[0] = -1 - number;
            return "3" + String.fromCharCode(arrUint8[0]);
          case "Sint16":
            arrUint16[0] = -1 - number;
            return "4" + String.fromCharCode(charUint16[0], charUint16[1]);
          case "Sint32":
            arrUint32[0] = -1 - number;
            return "5" + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);
          case "Float32":
            arrFloat32[0] = number;
            return "6" + String.fromCharCode(charFloat32[0], charFloat32[1], charFloat32[2], charFloat32[3]);
          case "String8":
            return "7" + typeEncoder("RawUint16", number.length) + number;
          case "String16":
            for (let i = 0, strLen = number.length; i < strLen; i++) {
              output += typeEncoder("RawUint16", number.charCodeAt(i));
            }
            return "8" + typeEncoder("RawUint16", output.length) + output;
          default:
            throw new Error("Unknown encoding type.");
        }
      };
      var findType = (value) => {
        if (typeof value === "string") {
          for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 255) return "String16";
          }
          return "String8";
        }
        if (typeof value === "boolean") return "Uint8";
        if (typeof value !== "number") {
          console.log(value);
          throw new Error("Unencodable data type");
        }
        if (value != Math.round(value)) return "Float32";
        if (value < 0) {
          if (value >= -256) return "Sint8";
          if (value >= -65535) return "Sint16";
          if (value >= -4294967295) return "Sint32";
        } else {
          if (value < 256) return "Uint8";
          if (value < 65535) return "Uint16";
          if (value < 4294967295) return "Uint32";
        }
        return "Float32";
      };
      return (arr, verbose = false) => {
        let output = arr.splice(0, 1)[0];
        if (typeof output !== "string") throw new Error("No identification code!");
        arr.forEach((value) => {
          output += typeEncoder(findType(value), value);
        });
        let len = output.length;
        let buffer = new ArrayBuffer(len);
        let integerView = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
          integerView[i] = output.charCodeAt(i);
        }
        if (verbose) {
          console.log("OUTPUT: " + integerView);
          console.log("RAW OUTPUT: " + output);
          console.log("SIZE: " + len);
        }
        return buffer;
      };
    })();
    exports2.decode = (() => {
      var arrUint16 = new Uint16Array(1);
      var charUint16 = new Uint8Array(arrUint16.buffer);
      var arrUint32 = new Uint32Array(1);
      var charUint32 = new Uint8Array(arrUint32.buffer);
      var arrFloat32 = new Float32Array(1);
      var charFloat32 = new Uint8Array(arrFloat32.buffer);
      var typeDecoder = (str, type, offset) => {
        switch (type) {
          case "Uint8":
            return str.charCodeAt(offset++);
          case "Uint16":
            for (let i = 0; i < 2; i++) {
              charUint16[i] = str.charCodeAt(offset++);
            }
            return arrUint16[0];
          case "Uint32":
            for (let i = 0; i < 4; i++) {
              charUint32[i] = str.charCodeAt(offset++);
            }
            return arrUint32[0];
          case "Sint8":
            return -1 - str.charCodeAt(offset++);
          case "Sint16":
            for (let i = 0; i < 2; i++) {
              charUint16[i] = str.charCodeAt(offset++);
            }
            return -1 - arrUint16[0];
          case "Sint32":
            for (let i = 0; i < 4; i++) {
              charUint32[i] = str.charCodeAt(offset++);
            }
            return -1 - arrUint32[0];
          case "Float32":
            for (let i = 0; i < 4; i++) {
              charFloat32[i] = str.charCodeAt(offset++);
            }
            return arrFloat32[0];
          default:
            throw new Error("Unknown decoding type.");
        }
      };
      return (raw) => {
        try {
          let intView = new Uint8Array(raw);
          let str = "";
          for (let i = 0, len = intView.length; i < len; i++) {
            str += String.fromCharCode(intView[i]);
          }
          let offset = 1;
          let output = [str.charAt(0)];
          while (offset < str.length) {
            switch (str[offset++]) {
              case "0":
                output.push(typeDecoder(str, "Uint8", offset));
                offset++;
                break;
              case "1":
                output.push(typeDecoder(str, "Uint16", offset));
                offset += 2;
                break;
              case "2":
                output.push(typeDecoder(str, "Uint32", offset));
                offset += 4;
                break;
              case "3":
                output.push(typeDecoder(str, "Sint8", offset));
                offset++;
                break;
              case "4":
                output.push(typeDecoder(str, "Sint16", offset));
                offset += 2;
                break;
              case "5":
                output.push(typeDecoder(str, "Sint32", offset));
                offset += 4;
                break;
              case "6":
                output.push(typeDecoder(str, "Float32", offset));
                offset += 4;
                break;
              case "7":
                {
                  let len = typeDecoder(str, "Uint16", offset);
                  offset += 2;
                  output.push(str.slice(offset, offset + len));
                  offset += len;
                }
                break;
              case "8":
                {
                  let len = typeDecoder(str, "Uint16", offset);
                  offset += 2;
                  let arr = str.slice(offset, offset + len);
                  let buf = new Uint16Array(len / 2);
                  for (let i = 0; i < len; i += 2) {
                    buf[i / 2] = typeDecoder(arr, "Uint16", i);
                  }
                  output.push(String.fromCharCode.apply(null, buf));
                  offset += len;
                }
                break;
              default:
                offset = str.length;
                throw new Error("Unknown decoding command. Decoding exited.");
            }
          }
          return output;
        } catch (err) {
          console.log(err);
          return -1;
        }
      };
    })();
  }
});

// src/server/src/index.js
var require_index = __commonJS({
  "src/server/src/index.js"(exports, module) {
    var c = require_config();
    var util = require_util();
    var ran = require_random();
    var hshg = require_hshg();
    Array.prototype.remove = (index) => {
      if (index === exports.length - 1) {
        return exports.pop();
      } else {
        let r = exports[index];
        exports[index] = exports.pop();
        return r;
      }
    };
    var keys = [
      "k",
      "l",
      "testk",
      "testl",
      // Focus Group
      "ZNr3GBQOhD2CDDYpZD3JZkZ6hmhoF4wGiTYTikZlSLr1Z66yWKuVMitRkpUbPy6s",
      // Mine
      "HKib09Ep3hIcwFXpiCj5iEkpLBN88HQ22hiFqg5alcxn4AYl6VcsPFTqMvllLt1D",
      // Parodia
      "n9hx8iQH8453dWQpdDvJcAvPzQej80xQz86TxuYaJ8CaOr4hEH2zHPlSeayVPjFZ",
      // SGM
      "5piWwi06VXdEuOsz1rbcHiglurbaYIPtslIgE0NNMGQgNcqErdJ4kUVYpDJsRlVC",
      // Aznaft
      "q80UgWYIQVM2oZW5iQO6VRdLcOTuHkSgUx4U7NN8z76Ltgj7gVc6tSWvmpPkRUGH",
      // Licht
      "9zcVcKxiv60ZoBr6CaO9ecjR3i0Mj9yx4Qgt9IGwzxps8Q5ge1GQJiYe59GBxKip",
      // Tenderlicious
      "M67ZAZIgboiBcUtcKoHOuwXlQJWN9DEwhr0CIqR9xjiwpDyb4cUrwUIynKnuQmrU",
      // ManticoreKiller
      "iBKZrtZEP6Gq1m1y4hpbIH2htBKegkaj6eyO70L9FMAEydiV4gA4ufiLWFx0R5C2",
      // JB Columbia
      "zbH5Myv66HmR9Mda39xlLXa9TyBGzXnKZV7xpN5NCDTXorn52123eHY4kcZmPNLx",
      // Teal Knight
      "pee4OZmPo9yrINv30kIMMVviEr1PRfiuIYQEOGXTK6lnLZumy9O942NabE8BiEce",
      // unnamed
      "08IhobFLBYah8Mk8MKqqG6W576iS4jznjK4WnIsSzcFC0OhkIY51DQV0DWWsgfbg",
      // Pie
      "36spA3cA2FNDamjM4SaiNNfNMkUMSERgduUvAL3Ms8bsioX4uoMyQteMWx1dRpdp",
      // Sergio
      "i3tpmHTC2ty8CCzjhISDKO1MrkZOwmoWZ08XZLOg3IfCqbtAsdC8QPKPMhbPHQmV",
      // Corrupt X
      "gQHpJkeGoxknxqkiX9msLhwS1NzikXa1RiOKOJD2o2zf15XL35P1YWZeMcivXLNB",
      // Jorjito Gamer
      "kKWsRf0OdLWzipECohr5FqjuyecPZYOGxl1zAXabtllaWx2OVKfLTKBiit8KVg5j",
      // warrior
      "77L1QgQgsTQrZHhTSuv1iK1NyvpBL9AYyvmkF21Sjp4T7ldxGodQnC9dM1YtvZzG",
      // TTTank
      "M6I9vmmRiitxg07rBG2IuC7aNpp7LHQGVPtwGfkk3hIBR0jhlWwaqzpzPXqU2awM",
      // CX
      "5AxKhPIu5jF3B3cIxjA2BHUy30ccYgEUXJmK16ksJotp9D9WVlY6QqPLDPGim1MK",
      // Faxaro
      "kcrJTPqvhraysgCNrFZORGNR4UTMRvbQ2zuhI3iXpGyMg6wDtU5QMgcV8vNdLLHQ",
      // Mipha
      "EXoiZYDuwSwmp7Zg0m7hdaLyv2PMbQgQorkwRznC0NC3saubVNtxVUGtOWZ2xdcz",
      // svorlds
      "G0t2lQYeaTHHU8sp5ibNjFCCLMr41cPCOJRKUC5eUGfkUKDxpVwo5azomBSznZuR",
      // FTM
      "kf2VcjtzpMvVwhlgIjq4MX6LWbIoNzcvfsxARS0qWiuVWf6BPPsQ2p1FgBVvNoB1",
      // pnvv / Cannon Man
      "3hO6R7AOR0aiiFuRyGaHKrgJHjTEpsD2LZ866bhvlz2Ru9AT8QmiBNf5PZuXCFIA",
      // wowie's friend
      "z272UlNODnYVK79jva6pybRpwtp1h0FdJh8F8JRQJ5VY9lPrcugp6nd403Op4voC",
      "eOb4DCk81Hzay8Kgjcu6tbbpIUCveloxahmnkmg3aU6FlvdWjJd2Uui5cFQdsnby",
      "9qGqNv5iYTSIhkCaMmZpvYhSpaLnHQJnj6m2gdoVWIXgLaFgIrbcFYHM8bcBsGYS",
      "qqWz1E1uVtErG4N80YDVQJywzOk6PJFDrC6uzqoQ9XL2nNrCCr1KvY8XUEyCroHT",
      "r0KXqfIifiavtqP3v0b5gqb5ArQY5sJWO7fjG4P6AFE5MRyfjDGK7sO7nXg23Tkv",
      "nUzNolF4Yys4ua6x78GiVH0Fparcm8GyD60IZzVHji0b2gQL3citWEEi3b1J9iRT",
      "XSxFurVLlc7o99nnakK5EPA2Z16tqBxP3xKcq5y4XOjRyfFRqaSxbBNRUtab71FH",
      "uYLfr6k6wEmgMtGVna366Gujor3gUWhWUHgbsz2uUNhQ8OKkwzb1IpDehnz7dfFL",
      "TVA4eYx29geFN6kb2Osyt5veaih0OOJG2MzB4qBBlUQr5CpRJqIhrTModxcT5NXI",
      "eyQqQE0h0l6x7XpkXpnZdYPsRJgvdl6L8xAoEzF0ZGlTV8HH0wUePj03LuULDhSN",
      "ZuOzwoZw4lCWwekTMh9bEAw4Tv92uLhzGN0DMDV2Rk7Sfn3Hsbf87ssHcvxTbDek",
      // Public
      "PUBLICRSUZbhCMu2ocDrhtje1ev6ff3eM6IxsCPUBLIC",
      "PUBLICb7HbKa0zFp5PzJVkcu17GIbp56JeHxZlPUBLIC",
      "PUBLICwxTybWuUrYfEA84kVunN5btV4vROYCW0PUBLIC",
      "PUBLICfOKBjTZzW1VvoEfJTY3G7U2TcwT8iREyPUBLIC",
      "PUBLICKKRLO0lpLy2IDHUdqzE0MBsZUhrBnYRpPUBLIC",
      "PUBLICsC7wKFQ6CXPB241uA5RzORP2Z14CSO86PUBLIC",
      "PUBLIC6criSrXdLBoTtIWQHCmcOPfzqgDZcGOiPUBLIC",
      "PUBLIC3QdiZpPEAtB4gif0TEU3822qJz3W23J2PUBLIC",
      "PUBLICEDZLxLjRRfa8tS5EqRIExtHpWq0MJSVZPUBLIC",
      "PUBLIC5vmCtP1IjDnglKJk7AmWg3hAuZ4ZGGnVPUBLIC",
      "PUBLICe1r6NsdjhOnpNuPqnskTzLvJoaXn3dsqPUBLIC",
      "PUBLICTbfzA0MB2H6hRataGEQENmu1o9eOpytkPUBLIC",
      "PUBLICpJlxtdn2iplYuIWXznUX3f6RHHPC3uFrPUBLIC",
      "PUBLICadVvUN4mp0MTSAnsc3BKIJ6l40Y5sV00PUBLIC",
      "TRUSTED5vmCtP1IjDnglKJk7sAmWg3hAuZ4ZGGnVTRUSTED",
      "TRUSTEDe1r6NsdjhOnpNuPqnskTfzLvJoaXn3dsqTRUSTED",
      "TRUSTEDTbfzA0MB2H6hRataGE3QENmu1o9eOpytkTRUSTED",
      "TRUSTEDpJlxtdn2iplYuIWXsznUX3f6RHHPC3uFrTRUSTED",
      "TRUSTEDadVvUN4mp0MTSAnsc3BKfIJ6l40Y5sV00TRUSTED",
      "TRUSTED3nYR28Kwhnx1n6JvP4Tm r2dxLhrTvrcNTRUSTED",
      "TRUSTEDNwHIdUtjLSmITUVNg5B6c4uVWiB7IFq2STRUSTED",
      "TRUSTEDDIIocNBJS9mYstVFSuiwNxbQeEXOFlrPhTRUSTED",
      "TRUSTED17rtKXqQ7wzek6Ejf9rGCfOdRr5vrm5AxTRUSTED",
      "TRUSTEDWJkuJFZ2Wljq2WXasxHrM0Vsbra5iyb6vTRUSTED",
      "TRUSTEDzxVdPsuU1yGRQrkbADH6rBaE8TKdAvJabTRUSTED",
      "TRUSTED7nAZ3NBi9ZB07KfLV0cnGO0YEXoSGf1lLTRUSTED",
      "TRUSTEDFyJTLBCrokyoFICQFi4hAGJd09jkCDqOJTRUSTED",
      "TRUSTEDPBHbBZkW9foaXPDfGe6xq9Y6XvJhrwowqTRUSTED",
      "TRUSTEDtTZe5CYcmmCQBLj0WztAHn5MnI0dhqNrXTRUSTED",
      "GUDPOSTERNwR7FWcY1eeNkyiCrzGfuo3wGWhETFmbGUDPOSTER",
      "GUDPOSTERR2gdw10L7u4auP3yr1G1EC59TnRA3H31GUDPOSTER",
      "GUDPOSTERVLX8LwHtMrLIMFx0XdzTdauVAmSKV9SZGUDPOSTER",
      "GUDPOSTER8Uk4cGa2ut3vFfaPmjbmRBtAXpFHXsBNGUDPOSTER",
      "GUDPOSTERdHHy9pqMejwGZJ7nUZMRw0Mnc1g8UJ8oGUDPOSTER",
      "GUDPOSTERrgZPXqFSJXdChEMvgQjjxjGZfsObOArCGUDPOSTER",
      "GUDPOSTERysJI3BfzB2cRCDDdFkAaFWxZk5TNHwfvGUDPOSTER",
      "GUDPOSTERlFps80nCJ6cnFGjyH9QoKqgETwGX1sIQGUDPOSTER",
      "GUDPOSTERmED6CZg213gXoCYyDqxMLGFtuuCPn8NmGUDPOSTER",
      "GUDPOSTERlSL92YPpoqh48GuQwydpGuocJAH6Vx5VGUDPOSTER",
      "GIVEAWAYZ1yVvobK3MWgCBxYjFheJd3UrWW2ULJuGIVEAWAY",
      "GIVEAWAYaVGcMBm3LwxmLkxxGSt6NNg9AUDsj5v5GIVEAWAY",
      "GIVEAWAYAMkJmX3xKv3tiieS5oAfEsJbni4xInIwGIVEAWAY",
      "GIVEAWAYi3AbdptFr9m2fGGqY9p6Vvi3uRX6ALHRGIVEAWAY",
      "GIVEAWAYxwABlNSPU4291UJICWyeXQB4ET0ZyA0uGIVEAWAY",
      "GIVEAWAYczPSwYnpHDGKaimREjN1e86N6CmSH0NWGIVEAWAY",
      "GIVEAWAYDx3U7MOBNyDmjv6Rz6Le6wgG4Xk0cwilGIVEAWAY",
      "GIVEAWAYCOr2yK7od6RRch52ToBO5s0xxizBVVajGIVEAWAY",
      "GIVEAWAYV7fiIzckU8xQ57i3Bu8ngWetPOzS9ktvGIVEAWAY",
      "GIVEAWAYpbo21yNoMcvwhbIeMOsqMIjzYKOLZyEgGIVEAWAY",
      // Twitter
      "500kBomberContestTokenVUBefeRUMQsLShjas4dhfSF",
      "500kBomberContestTokenNSEefeRUMQsLShjbs4dhfSF",
      // TnT
      "500kBomberContestTokenWDWefeRUMQsLShjcs4dhfSF",
      // crnz
      "500kPoacherContestTokenZZb1FkYER7B0ZV7bs9df8s",
      "500kAutoDoubleContestTokenKBSj41qloynOGws87X2",
      // JeShAn
      "500kFortressContestTokenl2fd42tL7C6ZynSDF33ox",
      // Lucario
      // Youtube
      "SGMTokenGiveaway51NP3JOh9NKvsnVh6PDRGI1wALGXWLzE2jZXztWKxlyPN00w",
      "SGMTokenGiveaway2puyw4VGFTTSqgxeFvvvqxMTzZ5S3XPtVQXLCSIOpW7Rxv8m",
      "SGMTokenGiveawayYAu4abk9oLMaBqOXfx2QvSqznNqw7mTFv7lBFk5LJ7ksPd7W",
      "SGMTokenGiveawaybgSA5xNNpo4Vhsfg8lOlop8f4FOPWk9VXcMvjl62JYWhKOWF",
      "SGMTokenGiveawaya7C7vBTBPxgWEgg1g3UbYttE30A33aFVqEEd2pdV3PfbxvA0",
      "SGMTokenGiveawayBFu7eKC22KxKYuFiUTOyjmMCpBhr1HseP7pNo4yl5xOZt9IS",
      "SGMTokenGiveawayAHVq7eEAUWZzCtK4vcHslWIDMPykPAfsnq4jdsHYE3HIhlBO",
      "SGMTokenGiveawayS0wxtOYFcnBirWbbP9EePvgo8rPVrhatpixkaH78CdKdtorr",
      "SGMTokenGiveaway7p8JwRnATdS3H10gIKy5dKQXlbj93WplkC9NpfjNTREG9IQn",
      "SGMTokenGiveawaynM1ffqsEM31Vv6KMmlxhs6Ug0s65FiyN3w9eP6QM7FmpbS2i",
      "SGMTokenAa05Q1oDwf0Mxaw57vBTBPX3M25gjitRD0daHTObk796GqSJ3KUhKf5p",
      "SGMTokenxg3Kw7jPUoxFOXbO4POF19iovCUnNzqoQ9XL2rTAoXoAtyHDZR5YFgAk",
      "SGMToken7KteCaOERDa8TkfzIQIm54rhewlKL2lWIDMPykPAfsnq41MGxgogphB9",
      "OMTokenIGnPS8RSGiP8lvTQDdve9ANPfSOyTgvPQMYdFlcn7IVcJg8oeGreEBYs",
      "OMTokenLTARU3UJldlHUf8215Wg4AbdThRvA3j0wG2FbwyZCTixkaH78CdK8BnV",
      "OMToken7sOXlNs9Qu58TmaCu9TpD4JkzRuGrKKOS74tZimimR8Iu5du7v6GRbRH",
      "JBColombiaTokenwZXpYskkovgQL4jZlqS42xaqgVAvHZPZgVcccsBkHhsXhq69",
      "JBColombiaToken8WwiA5demyL1gQZ9D5kvFMOwkJRc3STikct22cMoPmjfli69",
      "JBColombiaTokenPDuZydKLePKQ9TyOMqiquI0YVHcCJBJb3pORyzfo42nHhT69",
      "JBColombiaTokeniC0Eh8jMoncX4bAKbslR174tZimimBXoUGhvaKY0dBwbLI69",
      "JBColombiaTokenWWqX44i7VqxtQB3qsViJHbJnK3FryxqgAAFerRFxYO2wJc69",
      "JBColombiaTokenlzgPyfwuto7KY8BqxDserADmpeuMR31wxgD0dWpNWvHZv969",
      "SMTokenlSrBG8RTazOHzZ6zeyBPFI1tOSiuDSJNcfozraRKb8votLtwmNFC964KG",
      "SMTokennrNg7MzqzJe2xz11cKDETqCBKVhDiOS6x1gyTMV8EHLkRGGFXAHLUVUjk",
      "SMTokenfjlzipOhA8Lfp38kt9FnzGKRg6g79hujlFVPbEyzsbEqbYOD2ohveMSh8",
      "SMTokenNHPtbYKUDrR8MBQoQIymCwdbFSoHHNTuBMPvS4iugQigBMvfrGurB3qM4",
      "SMTokenI33BqYnppCCVAMOkykIeOWIsmetgkymFK1A7XgeZGGW52xVq1xRKv38vC",
      "SMTokenHxNBGJGRf6SqXAOIhgMEOuPUp4X4LszwBEeco3Wrw2IuOe3jxoWyLKdR0",
      "SMTokennjophXq0WC3jzDpPrDbfXLE2eoFOMvQWKucR0ZwECIlXDBTQnF33uyDXd",
      // Patreon / rewards
      "tokenlordkarma88tokenlordkarma88tokenlordkarma88tokenlordkarma88",
      "hereIsUrTokenBuddyThxForTheOverGunnerLmao",
      "DukeonkledDukeonkleThankYouSoMuch123e911DukeonkledDukeonkledDuke",
      "FireNationFireNationThanksATon018s380280FireNationFireNationFire",
      "rewardTokenJSdf323H0Cj85aVOG3SPlgp7Y9BuBoFcwpmNFjfLEDQhOFTIpukdr",
      // Call
      "rewardTokenDg2JDTp0rxDKXIPE8PHcmdHqWyH2CqPqpcAf6QcT8m2hgBZnJ7KHE",
      "rewardTokenad3JTsTwuVLkQvfmVH2d2Ukbf8WbFuPBqTpYFdFx9AuZEnmv9EW8U",
      "rewardTokenJsa43Tthn1M5Ey9oDRODzzrazqRxL28cTchgInjVCrSfnWEATdYeP",
      "rewardTokensdfsJTyz2YMS3GLDfD2NvqXK46p1ScsmdLxI1owBkjHw983lwkR8Z",
      // Wiki
      "WIKIREWARDV7V0bZRP8lM3fUvwuAX7DC5FpZCU1AyJByaulkH9YHZ7WIKIREWARD",
      "WIKIREWARDDOE8Iqg5K124sNXSR51WWycmCnFtCLjyF7uole5sgQgoWIKIREWARD",
      "WIKIREWARD5z5xXA0flzxeRgGu6EjSWlOq23gdGoYALClfsUT143Y9WIKIREWARD",
      "WIKIREWARD4DTEvdwSBKPBRCAJxeS9surL09uzxx33gAHmMYFldRsMWIKIREWARD",
      "WIKIREWARDqGXxMucMJcSeqWFcAfCLVNStnmOezkzOUot8xbfpCuk1WIKIREWARD",
      "EDITOR1eKAAURvtnHYFuUz6dzPqOwPt6SFWbacEucDnm8KroabolnzLZrdEDITOR",
      "EDITOR38Gi67EFmLdh6nXuKqtRc79HKk34c6bQl08tbUeZlGcxBS2c350yEDITOR",
      "EDITOR7mAKjd6XYprdtvbWqqUjEEfCqomx67aLSyG70eiFuvRVv2Eest27EDITOR",
      "EDITORoNzv0DxKzLYY7YCYdIsRHdNz8DNNiuqI2I9mBM2blBpWZ39chumsEDITOR",
      "EDITOR399V1FLGtsne5BMg5QfeeHdR63bxkV51Av0ET3F5y92q7EMhI8R3EDITOR",
      "EDITORmUJbmoFVshllWIUb11kyXxQfyESa4t3SYcGRHSlWzLrzfwkHCIVUEDITOR",
      // Themes
      "YouAreTheCreatorOfBadlands",
      "WowYouMadeADopeFishyTheme",
      "ThanksForHelpingPlantAForest",
      "MidnightIsSuperCoolNotYouTheTheme",
      "DrinkBleachPlz",
      "FrostyAndBeautifulJustLikeYourColdHeart"
    ];
    if (!c.TOKEN_REQUIRED) {
      keys.push("");
    }
    global.fps = "Unknown";
    var roomSpeed = c.gameSpeed;
    var room = {
      lastCycle: void 0,
      cycleSpeed: 1e3 / roomSpeed / 30,
      width: c.WIDTH,
      height: c.HEIGHT,
      setup: c.ROOM_SETUP,
      xgrid: c.X_GRID,
      ygrid: c.Y_GRID,
      gameMode: c.MODE,
      skillBoost: c.SKILL_BOOST,
      scale: {
        square: c.WIDTH * c.HEIGHT / 1e8,
        linear: Math.sqrt(c.WIDTH * c.HEIGHT / 1e8)
      },
      maxFood: c.WIDTH * c.HEIGHT / 1e5 * c.FOOD_AMOUNT,
      isInRoom: (location) => {
        return location.x < 0 || location.x > c.WIDTH || location.y < 0 || location.y > c.HEIGHT ? false : true;
      },
      topPlayerID: -1
    };
    room.findType = (type) => {
      let output = [];
      let j = 0;
      room.setup.forEach((row) => {
        let i = 0;
        row.forEach((cell) => {
          if (cell === type) {
            output.push({ x: (i + 0.5) * room.width / room.xgrid, y: (j + 0.5) * room.height / room.ygrid });
          }
          i++;
        });
        j++;
      });
      room[type] = output;
    };
    room.findType("nest");
    room.findType("norm");
    room.findType("bas1");
    room.findType("bas2");
    room.findType("bas3");
    room.findType("bas4");
    room.findType("roid");
    room.findType("rock");
    room.nestFoodAmount = 1.5 * Math.sqrt(room.nest.length) / room.xgrid / room.ygrid;
    room.random = () => {
      return {
        x: ran.irandom(room.width),
        y: ran.irandom(room.height)
      };
    };
    room.randomType = (type) => {
      let selection = room[type][ran.irandom(room[type].length - 1)];
      return {
        x: ran.irandom(0.5 * room.width / room.xgrid) * ran.choose([-1, 1]) + selection.x,
        y: ran.irandom(0.5 * room.height / room.ygrid) * ran.choose([-1, 1]) + selection.y
      };
    };
    room.gauss = (clustering) => {
      let output;
      do {
        output = {
          x: ran.gauss(room.width / 2, room.height / clustering),
          y: ran.gauss(room.width / 2, room.height / clustering)
        };
      } while (!room.isInRoom(output));
    };
    room.gaussInverse = (clustering) => {
      let output;
      do {
        output = {
          x: ran.gaussInverse(0, room.width, clustering),
          y: ran.gaussInverse(0, room.height, clustering)
        };
      } while (!room.isInRoom(output));
      return output;
    };
    room.gaussRing = (radius, clustering) => {
      let output;
      do {
        output = ran.gaussRing(room.width * radius, clustering);
        output = {
          x: output.x + room.width / 2,
          y: output.y + room.height / 2
        };
      } while (!room.isInRoom(output));
      return output;
    };
    room.isIn = (type, location) => {
      if (location.x == null || location.y == null || isNaN(location.x) || isNaN(location.y)) {
        throw "InvalidPositionError";
      }
      if (room.isInRoom(location)) {
        let a = Math.floor(location.y * room.ygrid / room.height);
        let b = Math.floor(location.x * room.xgrid / room.width);
        return type === room.setup[a][b];
      } else {
        return false;
      }
    };
    room.isInNorm = (location) => {
      if (room.isInRoom(location)) {
        let a = Math.floor(location.y * room.ygrid / room.height);
        let b = Math.floor(location.x * room.xgrid / room.width);
        let v = room.setup[a][b];
        return v !== "nest";
      } else {
        return false;
      }
    };
    room.gaussType = (type, clustering) => {
      let selection = room[type][ran.irandom(room[type].length - 1)];
      let location = {};
      do {
        location = {
          x: ran.gauss(selection.x, room.width / room.xgrid / clustering),
          y: ran.gauss(selection.y, room.height / room.ygrid / clustering)
        };
      } while (!room.isIn(type, location));
      return location;
    };
    util.log(room.width + " x " + room.height + " room initalized.  Max food: " + room.maxFood + ", max nest food: " + room.maxFood * room.nestFoodAmount + ".");
    var Vector = class {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      update() {
        this.len = this.length;
        this.dir = this.direction;
      }
      get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
      }
      get direction() {
        return Math.atan2(this.y, this.x);
      }
    };
    function nullVector(v) {
      v.x = 0;
      v.y = 0;
    }
    var Class = (() => {
      let def = require_definitions(), i = 0;
      for (let k in def) {
        if (!def.hasOwnProperty(k)) continue;
        def[k].index = i++;
      }
      return def;
    })();
    function nearest(array, location, test = () => {
      return true;
    }) {
      let list = [];
      let d;
      if (!array.length) {
        return void 0;
      }
      array.forEach(function(instance) {
        d = Math.pow(instance.x - location.x, 2) + Math.pow(instance.y - location.y, 2);
        if (test(instance, d)) {
          list.push({ p: d, v: instance });
        }
      });
      list.sort((a, b) => a.p - b.p);
      return list.length ? list[0].v : void 0;
    }
    function timeOfImpact(p, v, s) {
      let a = s * s - (v.x * v.x + v.y * v.y);
      let b = p.x * v.x + p.y * v.y;
      let c2 = p.x * p.x + p.y * p.y;
      let d = b * b + a * c2;
      let t = 0;
      if (d >= 0) {
        t = Math.max(0, (b + Math.sqrt(d)) / a);
      }
      return t * 0.9;
    }
    var IO = class {
      constructor(body2) {
        this.body = body2;
        this.acceptsFromTop = true;
      }
      think() {
        return {
          target: null,
          goal: null,
          fire: null,
          main: null,
          alt: null,
          power: null
        };
      }
    };
    var io_doNothing = class extends IO {
      constructor(body2) {
        super(body2);
        this.acceptsFromTop = false;
      }
      think() {
        return {
          goal: {
            x: this.body.x,
            y: this.body.y
          },
          main: false,
          alt: false,
          fire: false
        };
      }
    };
    var io_moveInCircles = class extends IO {
      constructor(body2) {
        super(body2);
        this.acceptsFromTop = false;
        this.timer = ran.irandom(10) + 3;
        this.goal = {
          x: this.body.x + 10 * Math.cos(-this.body.facing),
          y: this.body.y + 10 * Math.sin(-this.body.facing)
        };
      }
      think() {
        if (!this.timer--) {
          this.timer = 10;
          this.goal = {
            x: this.body.x + 10 * Math.cos(-this.body.facing),
            y: this.body.y + 10 * Math.sin(-this.body.facing)
          };
        }
        return { goal: this.goal };
      }
    };
    var io_listenToPlayer = class extends IO {
      constructor(b, p) {
        super(b);
        this.player = p;
        this.acceptsFromTop = false;
      }
      // THE PLAYER MUST HAVE A VALID COMMAND AND TARGET OBJECT
      think() {
        let targ = {
          x: this.player.target.x,
          y: this.player.target.y
        };
        if (this.player.command.autospin) {
          let kk = Math.atan2(this.body.control.target.y, this.body.control.target.x) + 0.02;
          targ = {
            x: 100 * Math.cos(kk),
            y: 100 * Math.sin(kk)
          };
        }
        if (this.body.invuln) {
          if (this.player.command.right || this.player.command.left || this.player.command.up || this.player.command.down || this.player.command.lmb) {
            this.body.invuln = false;
          }
        }
        this.body.autoOverride = this.player.command.override;
        return {
          target: targ,
          goal: {
            x: this.body.x + this.player.command.right - this.player.command.left,
            y: this.body.y + this.player.command.down - this.player.command.up
          },
          fire: this.player.command.lmb || this.player.command.autofire,
          main: this.player.command.lmb || this.player.command.autospin || this.player.command.autofire,
          alt: this.player.command.rmb
        };
      }
    };
    var io_mapTargetToGoal = class extends IO {
      constructor(b) {
        super(b);
      }
      think(input) {
        if (input.main || input.alt) {
          return {
            goal: {
              x: input.target.x + this.body.x,
              y: input.target.y + this.body.y
            },
            power: 1
          };
        }
      }
    };
    var io_boomerang = class extends IO {
      constructor(b) {
        super(b);
        this.r = 0;
        this.b = b;
        this.m = b.master;
        this.turnover = false;
        let len = 10 * util.getDistance({ x: 0, y: 0 }, b.master.control.target);
        this.myGoal = {
          x: 3 * b.master.control.target.x + b.master.x,
          y: 3 * b.master.control.target.y + b.master.y
        };
      }
      think(input) {
        if (this.b.range > this.r) this.r = this.b.range;
        let t = 1;
        if (!this.turnover) {
          if (this.r && this.b.range < this.r * 0.5) {
            this.turnover = true;
          }
          return {
            goal: this.myGoal,
            power: t
          };
        } else {
          return {
            goal: {
              x: this.m.x,
              y: this.m.y
            },
            power: t
          };
        }
      }
    };
    var io_goToMasterTarget = class extends IO {
      constructor(body2) {
        super(body2);
        this.myGoal = {
          x: body2.master.control.target.x + body2.master.x,
          y: body2.master.control.target.y + body2.master.y
        };
        this.countdown = 5;
      }
      think() {
        if (this.countdown) {
          if (util.getDistance(this.body, this.myGoal) < 1) {
            this.countdown--;
          }
          return {
            goal: {
              x: this.myGoal.x,
              y: this.myGoal.y
            }
          };
        }
      }
    };
    var io_canRepel = class extends IO {
      constructor(b) {
        super(b);
      }
      think(input) {
        if (input.alt && input.target) {
          return {
            target: {
              x: -input.target.x,
              y: -input.target.y
            },
            main: true
          };
        }
      }
    };
    var io_alwaysFire = class extends IO {
      constructor(body2) {
        super(body2);
      }
      think() {
        return {
          fire: true
        };
      }
    };
    var io_targetSelf = class extends IO {
      constructor(body2) {
        super(body2);
      }
      think() {
        return {
          main: true,
          target: { x: 0, y: 0 }
        };
      }
    };
    var io_mapAltToFire = class extends IO {
      constructor(body2) {
        super(body2);
      }
      think(input) {
        if (input.alt) {
          return {
            fire: true
          };
        }
      }
    };
    var io_onlyAcceptInArc = class extends IO {
      constructor(body2) {
        super(body2);
      }
      think(input) {
        if (input.target && this.body.firingArc != null) {
          if (Math.abs(util.angleDifference(Math.atan2(input.target.y, input.target.x), this.body.firingArc[0])) >= this.body.firingArc[1]) {
            return {
              fire: false,
              alt: false,
              main: false
            };
          }
        }
      }
    };
    var io_nearestDifferentMaster = class extends IO {
      constructor(body2) {
        super(body2);
        this.targetLock = void 0;
        this.tick = ran.irandom(30);
        this.lead = 0;
        this.validTargets = this.buildList(body2.fov);
        this.oldHealth = body2.health.display();
      }
      buildList(range) {
        let m = { x: this.body.x, y: this.body.y }, mm = { x: this.body.master.master.x, y: this.body.master.master.y }, mostDangerous = 0, sqrRange = range * range, keepTarget = false;
        let out = entities.map((e) => {
          if (e.health.amount > 0) {
            if (!e.invuln) {
              if (e.master.master.team !== this.body.master.master.team) {
                if (e.master.master.team !== -101) {
                  if (e.type === "tank" || e.type === "crasher" || !this.body.aiSettings.shapefriend && e.type === "food") {
                    if (Math.abs(e.x - m.x) < range && Math.abs(e.y - m.y) < range) {
                      if (!this.body.aiSettings.blind || Math.abs(e.x - mm.x) < range && Math.abs(e.y - mm.y) < range) return e;
                    }
                  }
                }
              }
            }
          }
        }).filter((e) => {
          return e;
        });
        if (!out.length) return [];
        out = out.map((e) => {
          let yaboi = false;
          if (Math.pow(this.body.x - e.x, 2) + Math.pow(this.body.y - e.y, 2) < sqrRange) {
            if (this.body.firingArc == null || this.body.aiSettings.view360) {
              yaboi = true;
            } else if (Math.abs(util.angleDifference(util.getDirection(this.body, e), this.body.firingArc[0])) < this.body.firingArc[1]) yaboi = true;
          }
          if (yaboi) {
            mostDangerous = Math.max(e.dangerValue, mostDangerous);
            return e;
          }
        }).filter((e) => {
          if (e != null) {
            if (this.body.aiSettings.farm || e.dangerValue === mostDangerous) {
              if (this.targetLock) {
                if (e.id === this.targetLock.id) keepTarget = true;
              }
              return e;
            }
          }
        });
        if (!keepTarget) this.targetLock = void 0;
        return out;
      }
      think(input) {
        if (input.main || input.alt || this.body.master.autoOverride) {
          this.targetLock = void 0;
          return {};
        }
        let tracking = this.body.topSpeed, range = this.body.fov;
        for (let i = 0; i < this.body.guns.length; i++) {
          if (this.body.guns[i].canShoot && !this.body.aiSettings.skynet) {
            let v = this.body.guns[i].getTracking();
            tracking = v.speed;
            range = Math.min(range, v.speed * v.range);
            break;
          }
        }
        if (this.targetLock) {
          if (this.targetLock.health.amount <= 0) {
            this.targetLock = void 0;
            this.tick = 100;
          }
        }
        if (this.tick++ > 15 * roomSpeed) {
          this.tick = 0;
          this.validTargets = this.buildList(range);
          if (this.targetLock && this.validTargets.indexOf(this.targetLock) === -1) {
            this.targetLock = void 0;
          }
          if (this.targetLock == null && this.validTargets.length) {
            this.targetLock = this.validTargets.length === 1 ? this.validTargets[0] : nearest(this.validTargets, { x: this.body.x, y: this.body.y });
            this.tick = -90;
          }
        }
        if (this.targetLock != null) {
          let radial = this.targetLock.velocity;
          let diff = {
            x: this.targetLock.x - this.body.x,
            y: this.targetLock.y - this.body.y
          };
          if (this.tick % 4 === 0) {
            this.lead = 0;
            if (!this.body.aiSettings.chase) {
              let toi = timeOfImpact(diff, radial, tracking);
              this.lead = toi;
            }
          }
          return {
            target: {
              x: diff.x + this.lead * radial.x,
              y: diff.y + this.lead * radial.y
            },
            fire: true,
            main: true
          };
        }
        return {};
      }
    };
    var io_avoid = class extends IO {
      constructor(body2) {
        super(body2);
      }
      think(input) {
        let masterId = this.body.master.id;
        let range = this.body.size * this.body.size * 100;
        this.avoid = nearest(
          entities,
          { x: this.body.x, y: this.body.y },
          function(test, sqrdst) {
            return test.master.id !== masterId && (test.type === "bullet" || test.type === "drone" || test.type === "swarm" || test.type === "trap" || test.type === "block") && sqrdst < range;
          }
        );
        if (this.avoid != null) {
          let delt = new Vector(this.body.velocity.x - this.avoid.velocity.x, this.body.velocity.y - this.avoid.velocity.y);
          let diff = new Vector(this.avoid.x - this.body.x, this.avoid.y - this.body.y);
          let comp = (delt.x * diff.x + delt.y * diff.y) / delt.length / diff.length;
          let goal = {};
          if (comp > 0) {
            if (input.goal) {
              let goalDist = Math.sqrt(range / (input.goal.x * input.goal.x + input.goal.y * input.goal.y));
              goal = {
                x: input.goal.x * goalDist - diff.x * comp,
                y: input.goal.y * goalDist - diff.y * comp
              };
            } else {
              goal = {
                x: -diff.x * comp,
                y: -diff.y * comp
              };
            }
            return goal;
          }
        }
      }
    };
    var io_minion = class extends IO {
      constructor(body2) {
        super(body2);
        this.turnwise = 1;
      }
      think(input) {
        if (this.body.aiSettings.reverseDirection && ran.chance(5e-3)) {
          this.turnwise = -1 * this.turnwise;
        }
        if (input.target != null && (input.alt || input.main)) {
          let sizeFactor = Math.sqrt(this.body.master.size / this.body.master.SIZE);
          let leash = 60 * sizeFactor;
          let orbit = 120 * sizeFactor;
          let repel = 135 * sizeFactor;
          let goal;
          let power = 1;
          let target = new Vector(input.target.x, input.target.y);
          if (input.alt) {
            if (target.length < leash) {
              goal = {
                x: this.body.x + target.x,
                y: this.body.y + target.y
              };
            } else if (target.length < repel) {
              let dir = -this.turnwise * target.direction + Math.PI / 5;
              goal = {
                x: this.body.x + Math.cos(dir),
                y: this.body.y + Math.sin(dir)
              };
            } else {
              goal = {
                x: this.body.x - target.x,
                y: this.body.y - target.y
              };
            }
          } else if (input.main) {
            let dir = this.turnwise * target.direction + 0.01;
            goal = {
              x: this.body.x + target.x - orbit * Math.cos(dir),
              y: this.body.y + target.y - orbit * Math.sin(dir)
            };
            if (Math.abs(target.length - orbit) < this.body.size * 2) {
              power = 0.7;
            }
          }
          return {
            goal,
            power
          };
        }
      }
    };
    var io_hangOutNearMaster = class extends IO {
      constructor(body2) {
        super(body2);
        this.acceptsFromTop = false;
        this.orbit = 30;
        this.currentGoal = { x: this.body.source.x, y: this.body.source.y };
        this.timer = 0;
      }
      think(input) {
        if (this.body.source != this.body) {
          let bound1 = this.orbit * 0.8 + this.body.source.size + this.body.size;
          let bound2 = this.orbit * 1.5 + this.body.source.size + this.body.size;
          let dist = util.getDistance(this.body, this.body.source) + Math.PI / 8;
          let output = {
            target: {
              x: this.body.velocity.x,
              y: this.body.velocity.y
            },
            goal: this.currentGoal,
            power: void 0
          };
          if (dist > bound2 || this.timer > 30) {
            this.timer = 0;
            let dir = util.getDirection(this.body, this.body.source) + Math.PI * ran.random(0.5);
            let len = ran.randomRange(bound1, bound2);
            let x = this.body.source.x - len * Math.cos(dir);
            let y = this.body.source.y - len * Math.sin(dir);
            this.currentGoal = {
              x,
              y
            };
          }
          if (dist < bound2) {
            output.power = 0.15;
            if (ran.chance(0.3)) {
              this.timer++;
            }
          }
          return output;
        }
      }
    };
    var io_spin = class extends IO {
      constructor(b) {
        super(b);
        this.a = 0;
      }
      think(input) {
        this.a += 0.05;
        let offset = 0;
        if (this.body.bond != null) {
          offset = this.body.bound.angle;
        }
        return {
          target: {
            x: Math.cos(this.a + offset),
            y: Math.sin(this.a + offset)
          },
          main: true
        };
      }
    };
    var io_fastspin = class extends IO {
      constructor(b) {
        super(b);
        this.a = 0;
      }
      think(input) {
        this.a += 0.072;
        let offset = 0;
        if (this.body.bond != null) {
          offset = this.body.bound.angle;
        }
        return {
          target: {
            x: Math.cos(this.a + offset),
            y: Math.sin(this.a + offset)
          },
          main: true
        };
      }
    };
    var io_reversespin = class extends IO {
      constructor(b) {
        super(b);
        this.a = 0;
      }
      think(input) {
        this.a -= 0.05;
        let offset = 0;
        if (this.body.bond != null) {
          offset = this.body.bound.angle;
        }
        return {
          target: {
            x: Math.cos(this.a + offset),
            y: Math.sin(this.a + offset)
          },
          main: true
        };
      }
    };
    var io_dontTurn = class extends IO {
      constructor(b) {
        super(b);
      }
      think(input) {
        return {
          target: {
            x: 1,
            y: 0
          },
          main: true
        };
      }
    };
    var io_fleeAtLowHealth = class extends IO {
      constructor(b) {
        super(b);
        this.fear = util.clamp(ran.gauss(0.7, 0.15), 0.1, 0.9);
      }
      think(input) {
        if (input.fire && input.target != null && this.body.health.amount < this.body.health.max * this.fear) {
          return {
            goal: {
              x: this.body.x - input.target.x,
              y: this.body.y - input.target.y
            }
          };
        }
      }
    };
    var skcnv = {
      rld: 0,
      pen: 1,
      str: 2,
      dam: 3,
      spd: 4,
      shi: 5,
      atk: 6,
      hlt: 7,
      rgn: 8,
      mob: 9
    };
    var levelers = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      38,
      40,
      42,
      44
    ];
    var Skill = class {
      constructor(inital = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
        this.raw = inital;
        this.caps = [];
        this.setCaps([
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL,
          c.MAX_SKILL
        ]);
        this.name = [
          "Reload",
          "Bullet Penetration",
          "Bullet Health",
          "Bullet Damage",
          "Bullet Speed",
          "Shield Capacity",
          "Body Damage",
          "Max Health",
          "Shield Regeneration",
          "Movement Speed"
        ];
        this.atk = 0;
        this.hlt = 0;
        this.spd = 0;
        this.str = 0;
        this.pen = 0;
        this.dam = 0;
        this.rld = 0;
        this.mob = 0;
        this.rgn = 0;
        this.shi = 0;
        this.rst = 0;
        this.brst = 0;
        this.ghost = 0;
        this.acl = 0;
        this.reset();
      }
      reset() {
        this.points = 0;
        this.score = 0;
        this.deduction = 0;
        this.level = 0;
        this.canUpgrade = false;
        this.update();
        this.maintain();
      }
      update() {
        let curve = (() => {
          function make(x) {
            return Math.log(4 * x + 1) / Math.log(5);
          }
          let a = [];
          for (let i = 0; i < c.MAX_SKILL * 2; i++) {
            a.push(make(i / c.MAX_SKILL));
          }
          return (x) => {
            return a[x * c.MAX_SKILL];
          };
        })();
        function apply(f, x) {
          return x < 0 ? 1 / (1 - x * f) : f * x + 1;
        }
        for (let i = 0; i < 10; i++) {
          if (this.raw[i] > this.caps[i]) {
            this.points += this.raw[i] - this.caps[i];
            this.raw[i] = this.caps[i];
          }
        }
        let attrib = [];
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 2; j += 1) {
            attrib[i + 5 * j] = curve(
              (this.raw[i + 5 * j] + this.bleed(i, j)) / c.MAX_SKILL
            );
          }
        }
        this.rld = Math.pow(0.5, attrib[skcnv.rld]);
        this.pen = apply(2.5, attrib[skcnv.pen]);
        this.str = apply(2, attrib[skcnv.str]);
        this.dam = apply(3, attrib[skcnv.dam]);
        this.spd = 0.5 + apply(1.5, attrib[skcnv.spd]);
        this.acl = apply(0.5, attrib[skcnv.rld]);
        this.rst = 0.5 * attrib[skcnv.str] + 2.5 * attrib[skcnv.pen];
        this.ghost = attrib[skcnv.pen];
        this.shi = c.GLASS_HEALTH_FACTOR * apply(3 / c.GLASS_HEALTH_FACTOR - 1, attrib[skcnv.shi]);
        this.atk = apply(1, attrib[skcnv.atk]);
        this.hlt = c.GLASS_HEALTH_FACTOR * apply(2 / c.GLASS_HEALTH_FACTOR - 1, attrib[skcnv.hlt]);
        this.mob = apply(0.8, attrib[skcnv.mob]);
        this.rgn = apply(25, attrib[skcnv.rgn]);
        this.brst = 0.3 * (0.5 * attrib[skcnv.atk] + 0.5 * attrib[skcnv.hlt] + attrib[skcnv.rgn]);
      }
      set(thing) {
        this.raw[0] = thing[0];
        this.raw[1] = thing[1];
        this.raw[2] = thing[2];
        this.raw[3] = thing[3];
        this.raw[4] = thing[4];
        this.raw[5] = thing[5];
        this.raw[6] = thing[6];
        this.raw[7] = thing[7];
        this.raw[8] = thing[8];
        this.raw[9] = thing[9];
        this.update();
      }
      setCaps(thing) {
        this.caps[0] = thing[0];
        this.caps[1] = thing[1];
        this.caps[2] = thing[2];
        this.caps[3] = thing[3];
        this.caps[4] = thing[4];
        this.caps[5] = thing[5];
        this.caps[6] = thing[6];
        this.caps[7] = thing[7];
        this.caps[8] = thing[8];
        this.caps[9] = thing[9];
        this.update();
      }
      maintain() {
        if (this.level < c.SKILL_CAP) {
          if (this.score - this.deduction >= this.levelScore) {
            this.deduction += this.levelScore;
            this.level += 1;
            this.points += this.levelPoints;
            if (this.level == c.TIER_1 || this.level == c.TIER_2 || this.level == c.TIER_3) {
              this.canUpgrade = true;
            }
            this.update();
            return true;
          }
        }
        return false;
      }
      get levelScore() {
        return Math.ceil(1.8 * Math.pow(this.level + 1, 1.8) - 2 * this.level + 1);
      }
      get progress() {
        return this.levelScore ? (this.score - this.deduction) / this.levelScore : 0;
      }
      get levelPoints() {
        if (levelers.findIndex((e) => {
          return e === this.level;
        }) != -1) {
          return 1;
        }
        return 0;
      }
      cap(skill, real = false) {
        if (!real && this.level < c.SKILL_SOFT_CAP) {
          return Math.round(this.caps[skcnv[skill]] * c.SOFT_MAX_SKILL);
        }
        return this.caps[skcnv[skill]];
      }
      bleed(i, j) {
        let a = (i + 2) % 5 + 5 * j, b = (i + (j === 1 ? 1 : 4)) % 5 + 5 * j;
        let value = 0;
        let denom = Math.max(c.MAX_SKILL, this.caps[i + 5 * j]);
        value += (1 - Math.pow(this.raw[a] / denom - 1, 2)) * this.raw[a] * c.SKILL_LEAK;
        value -= Math.pow(this.raw[b] / denom, 2) * this.raw[b] * c.SKILL_LEAK;
        return value;
      }
      upgrade(stat) {
        if (this.points && this.amount(stat) < this.cap(stat)) {
          this.change(stat, 1);
          this.points -= 1;
          return true;
        }
        return false;
      }
      title(stat) {
        return this.name[skcnv[stat]];
      }
      /*
      	let i = skcnv[skill] % 5,
      	    j = (skcnv[skill] - i) / 5;
      	let roundvalue = Math.round(this.bleed(i, j) * 10);
      	let string = '';
      	if (roundvalue > 0) { string += '+' + roundvalue + '%'; }
      	if (roundvalue < 0) { string += '-' + roundvalue + '%'; }
      
      	return string;
      	*/
      amount(skill) {
        return this.raw[skcnv[skill]];
      }
      change(skill, levels) {
        this.raw[skcnv[skill]] += levels;
        this.update();
      }
    };
    var lazyRealSizes = (() => {
      let o = [1, 1, 1];
      for (var i = 3; i < 16; i++) {
        o.push(
          Math.sqrt(2 * Math.PI / i * (1 / Math.sin(2 * Math.PI / i)))
        );
      }
      return o;
    })();
    var Gun = class {
      constructor(body, info) {
        this.lastShot = {
          time: 0,
          power: 0
        };
        this.body = body;
        this.master = body.source;
        this.label = "";
        this.controllers = [];
        this.children = [];
        this.control = {
          target: new Vector(0, 0),
          goal: new Vector(0, 0),
          main: false,
          alt: false,
          fire: false
        };
        this.canShoot = false;
        if (info.PROPERTIES != null && info.PROPERTIES.TYPE != null) {
          this.canShoot = true;
          this.label = info.PROPERTIES.LABEL == null ? "" : info.PROPERTIES.LABEL;
          if (Array.isArray(info.PROPERTIES.TYPE)) {
            this.bulletTypes = info.PROPERTIES.TYPE;
            this.natural = info.PROPERTIES.TYPE.BODY;
          } else {
            this.bulletTypes = [info.PROPERTIES.TYPE];
          }
          let natural = {};
          this.bulletTypes.forEach(function setNatural(type) {
            if (type.PARENT != null) {
              for (let i = 0; i < type.PARENT.length; i++) {
                setNatural(type.PARENT[i]);
              }
            }
            if (type.BODY != null) {
              for (let index in type.BODY) {
                natural[index] = type.BODY[index];
              }
            }
          });
          this.natural = natural;
          if (info.PROPERTIES.GUN_CONTROLLERS != null) {
            let toAdd = [];
            let self = this;
            info.PROPERTIES.GUN_CONTROLLERS.forEach(function(ioName) {
              toAdd.push(eval("new " + ioName + "(self)"));
            });
            this.controllers = toAdd.concat(this.controllers);
          }
          this.autofire = info.PROPERTIES.AUTOFIRE == null ? false : info.PROPERTIES.AUTOFIRE;
          this.altFire = info.PROPERTIES.ALT_FIRE == null ? false : info.PROPERTIES.ALT_FIRE;
          this.settings = info.PROPERTIES.SHOOT_SETTINGS == null ? [] : info.PROPERTIES.SHOOT_SETTINGS;
          this.calculator = info.PROPERTIES.STAT_CALCULATOR == null ? "default" : info.PROPERTIES.STAT_CALCULATOR;
          this.waitToCycle = info.PROPERTIES.WAIT_TO_CYCLE == null ? false : info.PROPERTIES.WAIT_TO_CYCLE;
          this.bulletStats = info.PROPERTIES.BULLET_STATS == null || info.PROPERTIES.BULLET_STATS == "master" ? "master" : new Skill(info.PROPERTIES.BULLET_STATS);
          this.settings = info.PROPERTIES.SHOOT_SETTINGS == null ? [] : info.PROPERTIES.SHOOT_SETTINGS;
          this.countsOwnKids = info.PROPERTIES.MAX_CHILDREN == null ? false : info.PROPERTIES.MAX_CHILDREN;
          this.syncsSkills = info.PROPERTIES.SYNCS_SKILLS == null ? false : info.PROPERTIES.SYNCS_SKILLS;
          this.negRecoil = info.PROPERTIES.NEGATIVE_RECOIL == null ? false : info.PROPERTIES.NEGATIVE_RECOIL;
        }
        let position = info.POSITION;
        this.length = position[0] / 10;
        this.width = position[1] / 10;
        this.aspect = position[2];
        let _off = new Vector(position[3], position[4]);
        this.angle = position[5] * Math.PI / 180;
        this.direction = _off.direction;
        this.offset = _off.length / 10;
        this.delay = position[6];
        this.position = 0;
        this.motion = 0;
        if (this.canShoot) {
          this.cycle = !this.waitToCycle - this.delay;
          this.trueRecoil = this.settings.recoil;
        }
      }
      recoil() {
        if (this.motion || this.position) {
          this.motion -= 0.25 * this.position / roomSpeed;
          this.position += this.motion;
          if (this.position < 0) {
            this.position = 0;
            this.motion = -this.motion;
          }
          if (this.motion > 0) {
            this.motion *= 0.75;
          }
        }
        if (this.canShoot && !this.body.settings.hasNoRecoil) {
          if (this.motion > 0) {
            let recoilForce = -this.position * this.trueRecoil * 0.045 / roomSpeed;
            this.body.accel.x += recoilForce * Math.cos(this.body.facing + this.angle);
            this.body.accel.y += recoilForce * Math.sin(this.body.facing + this.angle);
          }
        }
      }
      getSkillRaw() {
        if (this.bulletStats === "master") {
          return [
            this.body.skill.raw[0],
            this.body.skill.raw[1],
            this.body.skill.raw[2],
            this.body.skill.raw[3],
            this.body.skill.raw[4],
            0,
            0,
            0,
            0,
            0
          ];
        }
        return this.bulletStats.raw;
      }
      getLastShot() {
        return this.lastShot;
      }
      live() {
        this.recoil();
        if (this.canShoot) {
          let sk = this.bulletStats === "master" ? this.body.skill : this.bulletStats;
          let shootPermission = this.countsOwnKids ? this.countsOwnKids > this.children.length * (this.calculator == "necro" ? sk.rld : 1) : this.body.maxChildren ? this.body.maxChildren > this.body.children.length * (this.calculator == "necro" ? sk.rld : 1) : true;
          if (this.body.master.invuln) {
            shootPermission = false;
          }
          if (shootPermission || !this.waitToCycle) {
            if (this.cycle < 1) {
              this.cycle += 1 / this.settings.reload / roomSpeed / (this.calculator == "necro" || this.calculator == "fixed reload" ? 1 : sk.rld);
            }
          }
          if (shootPermission && (this.autofire || (this.altFire ? this.body.control.alt : this.body.control.fire))) {
            if (this.cycle >= 1) {
              let gx = this.offset * Math.cos(this.direction + this.angle + this.body.facing) + (1.5 * this.length - this.width * this.settings.size / 2) * Math.cos(this.angle + this.body.facing);
              let gy = this.offset * Math.sin(this.direction + this.angle + this.body.facing) + (1.5 * this.length - this.width * this.settings.size / 2) * Math.sin(this.angle + this.body.facing);
              while (shootPermission && this.cycle >= 1) {
                this.fire(gx, gy, sk);
                shootPermission = this.countsOwnKids ? this.countsOwnKids > this.children.length : this.body.maxChildren ? this.body.maxChildren > this.body.children.length : true;
                this.cycle -= 1;
              }
            }
          } else if (this.cycle > !this.waitToCycle - this.delay) {
            this.cycle = !this.waitToCycle - this.delay;
          }
        }
      }
      syncChildren() {
        if (this.syncsSkills) {
          let self2 = this;
          this.children.forEach(function(o) {
            o.define({
              BODY: self2.interpret(),
              SKILL: self2.getSkillRaw()
            });
            o.refreshBodyAttributes();
          });
        }
      }
      fire(gx, gy, sk) {
        this.lastShot.time = util.time();
        this.lastShot.power = 3 * Math.log(Math.sqrt(sk.spd) + this.trueRecoil + 1) + 1;
        this.motion += this.lastShot.power;
        let ss, sd;
        do {
          ss = ran.gauss(0, Math.sqrt(this.settings.shudder));
        } while (Math.abs(ss) >= this.settings.shudder * 2);
        do {
          sd = ran.gauss(0, this.settings.spray * this.settings.shudder);
        } while (Math.abs(sd) >= this.settings.spray / 2);
        sd *= Math.PI / 180;
        let s = new Vector(
          (this.negRecoil ? -1 : 1) * this.settings.speed * c.runSpeed * sk.spd * (1 + ss) * Math.cos(this.angle + this.body.facing + sd),
          (this.negRecoil ? -1 : 1) * this.settings.speed * c.runSpeed * sk.spd * (1 + ss) * Math.sin(this.angle + this.body.facing + sd)
        );
        if (this.body.velocity.length) {
          let extraBoost = Math.max(0, s.x * this.body.velocity.x + s.y * this.body.velocity.y) / this.body.velocity.length / s.length;
          if (extraBoost) {
            let len = s.length;
            s.x += this.body.velocity.length * extraBoost * s.x / len;
            s.y += this.body.velocity.length * extraBoost * s.y / len;
          }
        }
        var o = new Entity({
          x: this.body.x + this.body.size * gx - s.x,
          y: this.body.y + this.body.size * gy - s.y
        }, this.master.master);
        o.velocity = s;
        this.bulletInit(o);
        o.coreSize = o.SIZE;
      }
      bulletInit(o) {
        this.bulletTypes.forEach((type) => o.define(type));
        o.define({
          BODY: this.interpret(),
          SKILL: this.getSkillRaw(),
          SIZE: this.body.size * this.width * this.settings.size / 2,
          LABEL: this.master.label + (this.label ? " " + this.label : "") + " " + o.label
        });
        o.color = this.body.master.color;
        if (this.countsOwnKids) {
          o.parent = this;
          this.children.push(o);
        } else if (this.body.maxChildren) {
          o.parent = this.body;
          this.body.children.push(o);
          this.children.push(o);
        }
        o.source = this.body;
        o.facing = o.velocity.direction;
        if (this.calculator == 7) {
          let oo = o;
          o.necro = (host) => {
            let shootPermission = this.countsOwnKids ? this.countsOwnKids > this.children.length * (this.bulletStats === "master" ? this.body.skill.rld : this.bulletStats.rld) : this.body.maxChildren ? this.body.maxChildren > this.body.children.length * (this.bulletStats === "master" ? this.body.skill.rld : this.bulletStats.rld) : true;
            if (shootPermission) {
              let save = {
                facing: host.facing,
                size: host.SIZE
              };
              host.define(Class.genericEntity);
              this.bulletInit(host);
              host.team = oo.master.master.team;
              host.master = oo.master;
              host.color = oo.color;
              host.facing = save.facing;
              host.SIZE = save.size;
              host.health.amount = host.health.max;
              return true;
            }
            return false;
          };
        }
        o.refreshBodyAttributes();
        o.life();
      }
      getTracking() {
        return {
          speed: c.runSpeed * (this.bulletStats == "master" ? this.body.skill.spd : this.bulletStats.spd) * this.settings.maxSpeed * this.natural.SPEED,
          range: Math.sqrt(this.bulletStats == "master" ? this.body.skill.spd : this.bulletStats.spd) * this.settings.range * this.natural.RANGE
        };
      }
      interpret() {
        let sizeFactor = this.master.size / this.master.SIZE;
        let shoot = this.settings;
        let sk = this.bulletStats == "master" ? this.body.skill : this.bulletStats;
        let out = {
          SPEED: shoot.maxSpeed * sk.spd,
          HEALTH: shoot.health * sk.str,
          RESIST: shoot.resist + sk.rst,
          DAMAGE: shoot.damage * sk.dam,
          PENETRATION: Math.max(1, shoot.pen * sk.pen),
          RANGE: shoot.range / Math.sqrt(sk.spd),
          DENSITY: shoot.density * sk.pen * sk.pen / sizeFactor,
          PUSHABILITY: 1 / sk.pen,
          HETERO: 3 - 2.8 * sk.ghost
        };
        switch (this.calculator) {
          case "thruster":
            this.trueRecoil = this.settings.recoil * Math.sqrt(sk.rld * sk.spd);
            break;
          case "sustained":
            out.RANGE = shoot.range;
            break;
          case "swarm":
            out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
            out.HEALTH /= shoot.pen * sk.pen;
            break;
          case "trap":
          case "block":
            out.PUSHABILITY = 1 / Math.pow(sk.pen, 0.5);
            out.RANGE = shoot.range;
            break;
          case "necro":
          case "drone":
            out.PUSHABILITY = 1;
            out.PENETRATION = Math.max(1, shoot.pen * (0.5 * (sk.pen - 1) + 1));
            out.HEALTH = (shoot.health * sk.str + sizeFactor) / Math.pow(sk.pen, 0.8);
            out.DAMAGE = shoot.damage * sk.dam * Math.sqrt(sizeFactor) * shoot.pen * sk.pen;
            out.RANGE = shoot.range * Math.sqrt(sizeFactor);
            break;
        }
        for (let property in out) {
          if (this.natural[property] == null || !out.hasOwnProperty(property)) continue;
          out[property] *= this.natural[property];
        }
        return out;
      }
    };
    var minimap = [];
    var views = [];
    var entitiesToAvoid = [];
    var dirtyCheck = (p, r) => {
      return entitiesToAvoid.some((e) => {
        return Math.abs(p.x - e.x) < r + e.size && Math.abs(p.y - e.y) < r + e.size;
      });
    };
    var grid = new hshg.HSHG();
    var entitiesIdLog = 0;
    var entities = [];
    var purgeEntities = () => {
      entities = entities.filter((e) => {
        return !e.isGhost;
      });
    };
    var bringToLife = /* @__PURE__ */ (() => {
      let remapTarget = (i, ref, self2) => {
        if (i.target == null || !i.main && !i.alt) return void 0;
        return {
          x: i.target.x + ref.x - self2.x,
          y: i.target.y + ref.y - self2.y
        };
      };
      let passer = (a, b, acceptsFromTop) => {
        return (index) => {
          if (a != null && a[index] != null && (b[index] == null || acceptsFromTop)) {
            b[index] = a[index];
          }
        };
      };
      return (my) => {
        if (my.SIZE - my.coreSize) my.coreSize += (my.SIZE - my.coreSize) / 100;
        let faucet = my.settings.independent || my.source == null || my.source === my ? {} : my.source.control;
        let b = {
          target: remapTarget(faucet, my.source, my),
          goal: void 0,
          fire: faucet.fire,
          main: faucet.main,
          alt: faucet.alt,
          power: void 0
        };
        if (my.settings.attentionCraver && !faucet.main && my.range) {
          my.range -= 1;
        }
        my.controllers.forEach((AI) => {
          let a = AI.think(b);
          let passValue = passer(a, b, AI.acceptsFromTop);
          passValue("target");
          passValue("goal");
          passValue("fire");
          passValue("main");
          passValue("alt");
          passValue("power");
        });
        my.control.target = b.target == null ? my.control.target : b.target;
        my.control.goal = b.goal;
        my.control.fire = b.fire;
        my.control.main = b.main;
        my.control.alt = b.alt;
        my.control.power = b.power == null ? 1 : b.power;
        my.move();
        my.face();
        my.guns.forEach((gun) => gun.live());
        my.turrets.forEach((turret) => turret.life());
        if (my.skill.maintain()) my.refreshBodyAttributes();
      };
    })();
    var HealthType = class {
      constructor(health, type, resist = 0) {
        this.max = health;
        this.amount = health;
        this.type = type;
        this.resist = resist;
        this.regen = 0;
      }
      set(health, regen = 0) {
        this.amount = this.max ? this.amount / this.max * health : health;
        this.max = health;
        this.regen = regen;
      }
      display() {
        return this.amount / this.max;
      }
      getDamage(amount, capped = true) {
        switch (this.type) {
          case "dynamic":
            return capped ? Math.min(amount * this.permeability, this.amount) : amount * this.permeability;
          case "static":
            return capped ? Math.min(amount, this.amount) : amount;
        }
      }
      regenerate(boost = false) {
        boost /= 2;
        let cons = 5;
        switch (this.type) {
          case "static":
            if (this.amount >= this.max || !this.amount) break;
            this.amount += cons * (this.max / 10 / 60 / 2.5 + boost);
            break;
          case "dynamic":
            let r = util.clamp(this.amount / this.max, 0, 1);
            if (!r) {
              this.amount = 1e-4;
            }
            if (r === 1) {
              this.amount = this.max;
            } else {
              this.amount += cons * (this.regen * Math.exp(-50 * Math.pow(Math.sqrt(0.5 * r) - 0.4, 2)) / 3 + r * this.max / 10 / 15 + boost);
            }
            break;
        }
        this.amount = util.clamp(this.amount, 0, this.max);
      }
      get permeability() {
        switch (this.type) {
          case "static":
            return 1;
          case "dynamic":
            return this.max ? util.clamp(this.amount / this.max, 0, 1) : 0;
        }
      }
      get ratio() {
        return this.max ? util.clamp(1 - Math.pow(this.amount / this.max - 1, 4), 0, 1) : 0;
      }
    };
    var Entity = class _Entity {
      constructor(position2, master = this) {
        this.isGhost = false;
        this.killCount = { solo: 0, assists: 0, bosses: 0, killers: [] };
        this.creationTime = (/* @__PURE__ */ new Date()).getTime();
        this.master = master;
        this.source = this;
        this.parent = this;
        this.control = {
          target: new Vector(0, 0),
          goal: new Vector(0, 0),
          main: false,
          alt: false,
          fire: false,
          power: 0
        };
        this.isInGrid = false;
        this.removeFromGrid = () => {
          if (this.isInGrid) {
            grid.removeObject(this);
            this.isInGrid = false;
          }
        };
        this.addToGrid = () => {
          if (!this.isInGrid && this.bond == null) {
            grid.addObject(this);
            this.isInGrid = true;
          }
        };
        this.activation = (() => {
          let active = true;
          let timer = ran.irandom(15);
          return {
            update: () => {
              if (this.isDead()) return 0;
              if (!active) {
                this.removeFromGrid();
                if (this.settings.diesAtRange) this.kill();
                if (!timer--) active = true;
              } else {
                this.addToGrid();
                timer = 15;
                active = views.some((v) => v.check(this, 0.6));
              }
            },
            check: () => {
              return active;
            }
          };
        })();
        this.autoOverride = false;
        this.controllers = [];
        this.blend = {
          color: "#FFFFFF",
          amount: 0
        };
        this.skill = new Skill();
        this.health = new HealthType(1, "static", 0);
        this.shield = new HealthType(0, "dynamic");
        this.guns = [];
        this.turrets = [];
        this.upgrades = [];
        this.settings = {};
        this.aiSettings = {};
        this.children = [];
        this.SIZE = 1;
        this.define(Class.genericEntity);
        this.maxSpeed = 0;
        this.facing = 0;
        this.vfacing = 0;
        this.range = 0;
        this.damageRecieved = 0;
        this.stepRemaining = 1;
        this.x = position2.x;
        this.y = position2.y;
        this.velocity = new Vector(0, 0);
        this.accel = new Vector(0, 0);
        this.damp = 0.05;
        this.collisionArray = [];
        this.invuln = false;
        this.id = entitiesIdLog++;
        this.team = this.id;
        this.team = master.team;
        this.updateAABB = () => {
        };
        this.getAABB = (() => {
          let data = {}, savedSize = 0;
          let getLongestEdge = (x1, y1, x2, y2) => {
            return Math.max(
              Math.abs(x2 - x1),
              Math.abs(y2 - y1)
            );
          };
          this.updateAABB = (active) => {
            if (this.bond != null) return 0;
            if (!active) {
              data.active = false;
              return 0;
            }
            let x1 = Math.min(this.x, this.x + this.velocity.x + this.accel.x) - this.realSize - 5;
            let y1 = Math.min(this.y, this.y + this.velocity.y + this.accel.y) - this.realSize - 5;
            let x2 = Math.max(this.x, this.x + this.velocity.x + this.accel.x) + this.realSize + 5;
            let y2 = Math.max(this.y, this.y + this.velocity.y + this.accel.y) + this.realSize + 5;
            let size = getLongestEdge(x1, y1, x2, y1);
            let sizeDiff = savedSize / size;
            data = {
              min: [x1, y1],
              max: [x2, y2],
              active: true,
              size
            };
            if (sizeDiff > Math.SQRT2 || sizeDiff < Math.SQRT1_2) {
              this.removeFromGrid();
              this.addToGrid();
              savedSize = data.size;
            }
          };
          return () => {
            return data;
          };
        })();
        this.updateAABB(true);
        entities.push(this);
        views.forEach((v) => v.add(this));
      }
      life() {
        bringToLife(this);
      }
      addController(newIO) {
        if (Array.isArray(newIO)) {
          this.controllers = newIO.concat(this.controllers);
        } else {
          this.controllers.unshift(newIO);
        }
      }
      define(set) {
        if (set.PARENT != null) {
          for (let i = 0; i < set.PARENT.length; i++) {
            this.define(set.PARENT[i]);
          }
        }
        if (set.index != null) {
          this.index = set.index;
        }
        if (set.NAME != null) {
          this.name = set.NAME;
        }
        if (set.LABEL != null) {
          this.label = set.LABEL;
        }
        if (set.TYPE != null) {
          this.type = set.TYPE;
        }
        if (set.SHAPE != null) {
          this.shape = set.SHAPE;
        }
        if (set.COLOR != null) {
          this.color = set.COLOR;
        }
        if (set.CONTROLLERS != null) {
          let toAdd = [];
          set.CONTROLLERS.forEach((ioName) => {
            toAdd.push(eval("new io_" + ioName + "(this)"));
          });
          this.addController(toAdd);
        }
        if (set.MOTION_TYPE != null) {
          this.motionType = set.MOTION_TYPE;
        }
        if (set.FACING_TYPE != null) {
          this.facingType = set.FACING_TYPE;
        }
        if (set.DRAW_HEALTH != null) {
          this.settings.drawHealth = set.DRAW_HEALTH;
        }
        if (set.DRAW_SELF != null) {
          this.settings.drawShape = set.DRAW_SELF;
        }
        if (set.DAMAGE_EFFECTS != null) {
          this.settings.damageEffects = set.DAMAGE_EFFECTS;
        }
        if (set.RATIO_EFFECTS != null) {
          this.settings.ratioEffects = set.RATIO_EFFECTS;
        }
        if (set.MOTION_EFFECTS != null) {
          this.settings.motionEffects = set.MOTION_EFFECTS;
        }
        if (set.ACCEPTS_SCORE != null) {
          this.settings.acceptsScore = set.ACCEPTS_SCORE;
        }
        if (set.GIVE_KILL_MESSAGE != null) {
          this.settings.givesKillMessage = set.GIVE_KILL_MESSAGE;
        }
        if (set.CAN_GO_OUTSIDE_ROOM != null) {
          this.settings.canGoOutsideRoom = set.CAN_GO_OUTSIDE_ROOM;
        }
        if (set.HITS_OWN_TYPE != null) {
          this.settings.hitsOwnType = set.HITS_OWN_TYPE;
        }
        if (set.DIE_AT_LOW_SPEED != null) {
          this.settings.diesAtLowSpeed = set.DIE_AT_LOW_SPEED;
        }
        if (set.DIE_AT_RANGE != null) {
          this.settings.diesAtRange = set.DIE_AT_RANGE;
        }
        if (set.INDEPENDENT != null) {
          this.settings.independent = set.INDEPENDENT;
        }
        if (set.PERSISTS_AFTER_DEATH != null) {
          this.settings.persistsAfterDeath = set.PERSISTS_AFTER_DEATH;
        }
        if (set.CLEAR_ON_MASTER_UPGRADE != null) {
          this.settings.clearOnMasterUpgrade = set.CLEAR_ON_MASTER_UPGRADE;
        }
        if (set.HEALTH_WITH_LEVEL != null) {
          this.settings.healthWithLevel = set.HEALTH_WITH_LEVEL;
        }
        if (set.ACCEPTS_SCORE != null) {
          this.settings.acceptsScore = set.ACCEPTS_SCORE;
        }
        if (set.OBSTACLE != null) {
          this.settings.obstacle = set.OBSTACLE;
        }
        if (set.NECRO != null) {
          this.settings.isNecromancer = set.NECRO;
        }
        if (set.AUTO_UPGRADE != null) {
          this.settings.upgrading = set.AUTO_UPGRADE;
        }
        if (set.HAS_NO_RECOIL != null) {
          this.settings.hasNoRecoil = set.HAS_NO_RECOIL;
        }
        if (set.CRAVES_ATTENTION != null) {
          this.settings.attentionCraver = set.CRAVES_ATTENTION;
        }
        if (set.BROADCAST_MESSAGE != null) {
          this.settings.broadcastMessage = set.BROADCAST_MESSAGE === "" ? void 0 : set.BROADCAST_MESSAGE;
        }
        if (set.DAMAGE_CLASS != null) {
          this.settings.damageClass = set.DAMAGE_CLASS;
        }
        if (set.BUFF_VS_FOOD != null) {
          this.settings.buffVsFood = set.BUFF_VS_FOOD;
        }
        if (set.CAN_BE_ON_LEADERBOARD != null) {
          this.settings.leaderboardable = set.CAN_BE_ON_LEADERBOARD;
        }
        if (set.INTANGIBLE != null) {
          this.intangibility = set.INTANGIBLE;
        }
        if (set.IS_SMASHER != null) {
          this.settings.reloadToAcceleration = set.IS_SMASHER;
        }
        if (set.STAT_NAMES != null) {
          this.settings.skillNames = set.STAT_NAMES;
        }
        if (set.AI != null) {
          this.aiSettings = set.AI;
        }
        if (set.DANGER != null) {
          this.dangerValue = set.DANGER;
        }
        if (set.VARIES_IN_SIZE != null) {
          this.settings.variesInSize = set.VARIES_IN_SIZE;
          this.squiggle = this.settings.variesInSize ? ran.randomRange(0.8, 1.2) : 1;
        }
        if (set.RESET_UPGRADES) {
          this.upgrades = [];
        }
        if (set.UPGRADES_TIER_1 != null) {
          set.UPGRADES_TIER_1.forEach((e) => {
            this.upgrades.push({ class: e, level: c.TIER_1, index: e.index });
          });
        }
        if (set.UPGRADES_TIER_2 != null) {
          set.UPGRADES_TIER_2.forEach((e) => {
            this.upgrades.push({ class: e, level: c.TIER_2, index: e.index });
          });
        }
        if (set.UPGRADES_TIER_3 != null) {
          set.UPGRADES_TIER_3.forEach((e) => {
            this.upgrades.push({ class: e, level: c.TIER_3, index: e.index });
          });
        }
        if (set.SIZE != null) {
          this.SIZE = set.SIZE * this.squiggle;
          if (this.coreSize == null) {
            this.coreSize = this.SIZE;
          }
        }
        if (set.SKILL != null && set.SKILL != []) {
          if (set.SKILL.length != 10) {
            throw "Inappropiate skill raws.";
          }
          this.skill.set(set.SKILL);
        }
        if (set.LEVEL != null) {
          if (set.LEVEL === -1) {
            this.skill.reset();
          }
          while (this.skill.level < c.SKILL_CHEAT_CAP && this.skill.level < set.LEVEL) {
            this.skill.score += this.skill.levelScore;
            this.skill.maintain();
          }
          this.refreshBodyAttributes();
        }
        if (set.SKILL_CAP != null && set.SKILL_CAP != []) {
          if (set.SKILL_CAP.length != 10) {
            throw "Inappropiate skill caps.";
          }
          this.skill.setCaps(set.SKILL_CAP);
        }
        if (set.VALUE != null) {
          this.skill.score = Math.max(this.skill.score, set.VALUE * this.squiggle);
        }
        if (set.ALT_ABILITIES != null) {
          this.abilities = set.ALT_ABILITIES;
        }
        if (set.GUNS != null) {
          let newGuns = [];
          set.GUNS.forEach((gundef) => {
            newGuns.push(new Gun(this, gundef));
          });
          this.guns = newGuns;
        }
        if (set.MAX_CHILDREN != null) {
          this.maxChildren = set.MAX_CHILDREN;
        }
        if (set.FOOD != null) {
          if (set.FOOD.LEVEL != null) {
            this.foodLevel = set.FOOD.LEVEL;
            this.foodCountup = 0;
          }
        }
        if (set.BODY != null) {
          if (set.BODY.ACCELERATION != null) {
            this.ACCELERATION = set.BODY.ACCELERATION;
          }
          if (set.BODY.SPEED != null) {
            this.SPEED = set.BODY.SPEED;
          }
          if (set.BODY.HEALTH != null) {
            this.HEALTH = set.BODY.HEALTH;
          }
          if (set.BODY.RESIST != null) {
            this.RESIST = set.BODY.RESIST;
          }
          if (set.BODY.SHIELD != null) {
            this.SHIELD = set.BODY.SHIELD;
          }
          if (set.BODY.REGEN != null) {
            this.REGEN = set.BODY.REGEN;
          }
          if (set.BODY.DAMAGE != null) {
            this.DAMAGE = set.BODY.DAMAGE;
          }
          if (set.BODY.PENETRATION != null) {
            this.PENETRATION = set.BODY.PENETRATION;
          }
          if (set.BODY.FOV != null) {
            this.FOV = set.BODY.FOV;
          }
          if (set.BODY.RANGE != null) {
            this.RANGE = set.BODY.RANGE;
          }
          if (set.BODY.SHOCK_ABSORB != null) {
            this.SHOCK_ABSORB = set.BODY.SHOCK_ABSORB;
          }
          if (set.BODY.DENSITY != null) {
            this.DENSITY = set.BODY.DENSITY;
          }
          if (set.BODY.STEALTH != null) {
            this.STEALTH = set.BODY.STEALTH;
          }
          if (set.BODY.PUSHABILITY != null) {
            this.PUSHABILITY = set.BODY.PUSHABILITY;
          }
          if (set.BODY.HETERO != null) {
            this.heteroMultiplier = set.BODY.HETERO;
          }
          this.refreshBodyAttributes();
        }
        if (set.TURRETS != null) {
          let o;
          this.turrets.forEach((o2) => o2.destroy());
          this.turrets = [];
          set.TURRETS.forEach((def) => {
            o = new _Entity(this, this.master);
            (Array.isArray(def.TYPE) ? def.TYPE : [def.TYPE]).forEach((type) => o.define(type));
            o.bindToMaster(def.POSITION, this);
          });
        }
        if (set.mockup != null) {
          this.mockup = set.mockup;
        }
      }
      refreshBodyAttributes() {
        let speedReduce = Math.pow(this.size / (this.coreSize || this.SIZE), 1);
        this.acceleration = c.runSpeed * this.ACCELERATION / speedReduce;
        if (this.settings.reloadToAcceleration) this.acceleration *= this.skill.acl;
        this.topSpeed = c.runSpeed * this.SPEED * this.skill.mob / speedReduce;
        if (this.settings.reloadToAcceleration) this.topSpeed /= Math.sqrt(this.skill.acl);
        this.health.set(
          ((this.settings.healthWithLevel ? 2 * this.skill.level : 0) + this.HEALTH) * this.skill.hlt
        );
        this.health.resist = 1 - 1 / Math.max(1, this.RESIST + this.skill.brst);
        this.shield.set(
          ((this.settings.healthWithLevel ? 0.6 * this.skill.level : 0) + this.SHIELD) * this.skill.shi,
          Math.max(0, ((this.settings.healthWithLevel ? 6e-3 * this.skill.level : 0) + 1) * this.REGEN * this.skill.rgn)
        );
        this.damage = this.DAMAGE * this.skill.atk;
        this.penetration = this.PENETRATION + 1.5 * (this.skill.brst + 0.8 * (this.skill.atk - 1));
        if (!this.settings.dieAtRange || !this.range) {
          this.range = this.RANGE;
        }
        this.fov = this.FOV * 250 * Math.sqrt(this.size) * (1 + 3e-3 * this.skill.level);
        this.density = (1 + 0.08 * this.skill.level) * this.DENSITY;
        this.stealth = this.STEALTH;
        this.pushability = this.PUSHABILITY;
      }
      bindToMaster(position2, bond) {
        this.bond = bond;
        this.source = bond;
        this.bond.turrets.push(this);
        this.skill = this.bond.skill;
        this.label = this.bond.label + " " + this.label;
        this.removeFromGrid();
        this.settings.drawShape = false;
        this.bound = {};
        this.bound.size = position2[0] / 20;
        let _off2 = new Vector(position2[1], position2[2]);
        this.bound.angle = position2[3] * Math.PI / 180;
        this.bound.direction = _off2.direction;
        this.bound.offset = _off2.length / 10;
        this.bound.arc = position2[4] * Math.PI / 180;
        this.bound.layer = position2[5];
        this.facing = this.bond.facing + this.bound.angle;
        this.facingType = "bound";
        this.motionType = "bound";
        this.move();
      }
      get size() {
        if (this.bond == null) return (this.coreSize || this.SIZE) * (1 + this.skill.level / 45);
        return this.bond.size * this.bound.size;
      }
      get mass() {
        return this.density * (this.size * this.size + 1);
      }
      get realSize() {
        return this.size * (Math.abs(this.shape) > lazyRealSizes.length ? 1 : lazyRealSizes[Math.abs(this.shape)]);
      }
      get m_x() {
        return (this.velocity.x + this.accel.x) / roomSpeed;
      }
      get m_y() {
        return (this.velocity.y + this.accel.y) / roomSpeed;
      }
      camera(tur = false) {
        return {
          type: 0 + tur * 1 + this.settings.drawHealth * 2 + (this.type === "tank") * 4,
          id: this.id,
          index: this.index,
          x: this.x,
          y: this.y,
          vx: this.velocity.x,
          vy: this.velocity.y,
          size: this.size,
          rsize: this.realSize,
          status: 1,
          health: this.health.display(),
          shield: this.shield.display(),
          facing: this.facing,
          vfacing: this.vfacing,
          twiggle: this.facingType === "autospin" || this.facingType === "locksFacing" && this.control.alt,
          layer: this.bond != null ? this.bound.layer : this.type === "wall" ? 11 : this.type === "food" ? 10 : this.type === "tank" ? 5 : this.type === "crasher" ? 1 : 0,
          color: this.color,
          name: this.name,
          score: this.skill.score,
          guns: this.guns.map((gun) => gun.getLastShot()),
          turrets: this.turrets.map((turret) => turret.camera(true))
        };
      }
      skillUp(stat) {
        let suc = this.skill.upgrade(stat);
        if (suc) {
          this.refreshBodyAttributes();
          this.guns.forEach(function(gun) {
            gun.syncChildren();
          });
        }
        return suc;
      }
      upgrade(number) {
        if (number < this.upgrades.length && this.skill.level >= this.upgrades[number].level) {
          let saveMe = this.upgrades[number].class;
          this.upgrades = [];
          this.define(saveMe);
          this.sendMessage("You have upgraded to " + this.label + ".");
          let ID = this.id;
          entities.forEach((instance) => {
            if (instance.settings.clearOnMasterUpgrade && instance.master.id === ID) {
              instance.kill();
            }
          });
          this.skill.update();
          this.refreshBodyAttributes();
        }
      }
      damageMultiplier() {
        switch (this.type) {
          case "swarm":
            return 0.25 + 1.5 * util.clamp(this.range / (this.RANGE + 1), 0, 1);
          default:
            return 1;
        }
      }
      move() {
        let g = {
          x: this.control.goal.x - this.x,
          y: this.control.goal.y - this.y
        }, gactive = g.x !== 0 || g.y !== 0, engine = {
          x: 0,
          y: 0
        }, a = this.acceleration / roomSpeed;
        switch (this.motionType) {
          case "glide":
            this.maxSpeed = this.topSpeed;
            this.damp = 0.05;
            break;
          case "motor":
            this.maxSpeed = 0;
            if (this.topSpeed) {
              this.damp = a / this.topSpeed;
            }
            if (gactive) {
              let len = Math.sqrt(g.x * g.x + g.y * g.y);
              engine = {
                x: a * g.x / len,
                y: a * g.y / len
              };
            }
            break;
          case "swarm":
            this.maxSpeed = this.topSpeed;
            let l = util.getDistance({ x: 0, y: 0 }, g) + 1;
            if (gactive && l > this.size) {
              let desiredxspeed = this.topSpeed * g.x / l, desiredyspeed = this.topSpeed * g.y / l, turning = Math.sqrt((this.topSpeed * Math.max(1, this.range) + 1) / a);
              engine = {
                x: (desiredxspeed - this.velocity.x) / Math.max(5, turning),
                y: (desiredyspeed - this.velocity.y) / Math.max(5, turning)
              };
            } else {
              if (this.velocity.length < this.topSpeed) {
                engine = {
                  x: this.velocity.x * a / 20,
                  y: this.velocity.y * a / 20
                };
              }
            }
            break;
          case "chase":
            if (gactive) {
              let l2 = util.getDistance({ x: 0, y: 0 }, g);
              if (l2 > this.size * 2) {
                this.maxSpeed = this.topSpeed;
                let desiredxspeed = this.topSpeed * g.x / l2, desiredyspeed = this.topSpeed * g.y / l2;
                engine = {
                  x: (desiredxspeed - this.velocity.x) * a,
                  y: (desiredyspeed - this.velocity.y) * a
                };
              } else {
                this.maxSpeed = 0;
              }
            } else {
              this.maxSpeed = 0;
            }
            break;
          case "drift":
            this.maxSpeed = 0;
            engine = {
              x: g.x * a,
              y: g.y * a
            };
            break;
          case "bound":
            let bound = this.bound, ref = this.bond;
            this.x = ref.x + ref.size * bound.offset * Math.cos(bound.direction + bound.angle + ref.facing);
            this.y = ref.y + ref.size * bound.offset * Math.sin(bound.direction + bound.angle + ref.facing);
            this.bond.velocity.x += bound.size * this.accel.x;
            this.bond.velocity.y += bound.size * this.accel.y;
            this.firingArc = [ref.facing + bound.angle, bound.arc / 2];
            nullVector(this.accel);
            this.blend = ref.blend;
            break;
        }
        this.accel.x += engine.x * this.control.power;
        this.accel.y += engine.y * this.control.power;
      }
      face() {
        let t = this.control.target, tactive = t.x !== 0 || t.y !== 0, oldFacing = this.facing;
        switch (this.facingType) {
          case "autospin":
            this.facing += 0.02 / roomSpeed;
            break;
          case "turnWithSpeed":
            this.facing += this.velocity.length / 90 * Math.PI / roomSpeed;
            break;
          case "withMotion":
            this.facing = this.velocity.direction;
            break;
          case "smoothWithMotion":
          case "looseWithMotion":
            this.facing += util.loopSmooth(this.facing, this.velocity.direction, 4 / roomSpeed);
            break;
          case "withTarget":
          case "toTarget":
            this.facing = Math.atan2(t.y, t.x);
            break;
          case "locksFacing":
            if (!this.control.alt) this.facing = Math.atan2(t.y, t.x);
            break;
          case "looseWithTarget":
          case "looseToTarget":
          case "smoothToTarget":
            this.facing += util.loopSmooth(this.facing, Math.atan2(t.y, t.x), 4 / roomSpeed);
            break;
          case "bound":
            let givenangle;
            if (this.control.main) {
              givenangle = Math.atan2(t.y, t.x);
              let diff = util.angleDifference(givenangle, this.firingArc[0]);
              if (Math.abs(diff) >= this.firingArc[1]) {
                givenangle = this.firingArc[0];
              }
            } else {
              givenangle = this.firingArc[0];
            }
            this.facing += util.loopSmooth(this.facing, givenangle, 4 / roomSpeed);
            break;
        }
        while (this.facing < 0) {
          this.facing += 2 * Math.PI;
        }
        while (this.facing > 2 * Math.PI) {
          this.facing -= 2 * Math.PI;
        }
        this.vfacing = util.angleDifference(oldFacing, this.facing) * roomSpeed;
      }
      takeSelfie() {
        this.flattenedPhoto = null;
        this.photo = this.settings.drawShape ? this.camera() : this.photo = void 0;
      }
      physics() {
        if (this.accel.x == null || this.velocity.x == null) {
          util.error("Void Error!");
          util.error(this.collisionArray);
          util.error(this.label);
          util.error(this);
          nullVector(this.accel);
          nullVector(this.velocity);
        }
        this.velocity.x += this.accel.x;
        this.velocity.y += this.accel.y;
        nullVector(this.accel);
        this.stepRemaining = 1;
        this.x += this.stepRemaining * this.velocity.x / roomSpeed;
        this.y += this.stepRemaining * this.velocity.y / roomSpeed;
      }
      friction() {
        var motion = this.velocity.length, excess = motion - this.maxSpeed;
        if (excess > 0 && this.damp) {
          var k = this.damp / roomSpeed, drag = excess / (k + 1), finalvelocity = this.maxSpeed + drag;
          this.velocity.x = finalvelocity * this.velocity.x / motion;
          this.velocity.y = finalvelocity * this.velocity.y / motion;
        }
      }
      confinementToTheseEarthlyShackles() {
        if (this.x == null || this.x == null) {
          util.error("Void Error!");
          util.error(this.collisionArray);
          util.error(this.label);
          util.error(this);
          nullVector(this.accel);
          nullVector(this.velocity);
          return 0;
        }
        if (!this.settings.canGoOutsideRoom) {
          this.accel.x -= Math.min(this.x - this.realSize + 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
          this.accel.x -= Math.max(this.x + this.realSize - room.width - 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
          this.accel.y -= Math.min(this.y - this.realSize + 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
          this.accel.y -= Math.max(this.y + this.realSize - room.height - 50, 0) * c.ROOM_BOUND_FORCE / roomSpeed;
        }
        if (room.gameMode === "tdm" && this.type !== "food") {
          let loc = { x: this.x, y: this.y };
          if (this.team !== -1 && room.isIn("bas1", loc) || this.team !== -2 && room.isIn("bas2", loc) || this.team !== -3 && room.isIn("bas3", loc) || this.team !== -4 && room.isIn("bas4", loc)) {
            this.kill();
          }
        }
      }
      contemplationOfMortality() {
        if (this.invuln) {
          this.damageRecieved = 0;
          return 0;
        }
        if (this.settings.diesAtRange) {
          this.range -= 1 / roomSpeed;
          if (this.range < 0) {
            this.kill();
          }
        }
        if (this.settings.diesAtLowSpeed) {
          if (!this.collisionArray.length && this.velocity.length < this.topSpeed / 2) {
            this.health.amount -= this.health.getDamage(1 / roomSpeed);
          }
        }
        if (this.shield.max) {
          if (this.damageRecieved !== 0) {
            let shieldDamage = this.shield.getDamage(this.damageRecieved);
            this.damageRecieved -= shieldDamage;
            this.shield.amount -= shieldDamage;
          }
        }
        if (this.damageRecieved !== 0) {
          let healthDamage = this.health.getDamage(this.damageRecieved);
          this.blend.amount = 1;
          this.health.amount -= healthDamage;
        }
        this.damageRecieved = 0;
        if (this.isDead()) {
          let killers = [], killTools = [], notJustFood = false;
          let name = this.master.name == "" ? this.master.type === "tank" ? "a nameless player's " + this.label : this.master.type === "miniboss" ? "a visiting " + this.label : util.addArticle(this.label) : this.master.name + "'s " + this.label;
          let jackpot = Math.ceil(util.getJackpot(this.skill.score) / this.collisionArray.length);
          this.collisionArray.forEach((instance) => {
            if (instance.type === "wall") return 0;
            if (instance.master.settings.acceptsScore) {
              if (instance.master.type === "tank" || instance.master.type === "miniboss") notJustFood = true;
              instance.master.skill.score += jackpot;
              killers.push(instance.master);
            } else if (instance.settings.acceptsScore) {
              instance.skill.score += jackpot;
            }
            killTools.push(instance);
          });
          killers = killers.filter((elem, index, self2) => {
            return index == self2.indexOf(elem);
          });
          let killText = notJustFood ? "" : "You have been killed by ", dothISendAText = this.settings.givesKillMessage;
          killers.forEach((instance) => {
            this.killCount.killers.push(instance.index);
            if (this.type === "tank") {
              if (killers.length > 1) instance.killCount.assists++;
              else instance.killCount.solo++;
            } else if (this.type === "miniboss") instance.killCount.bosses++;
          });
          if (notJustFood) {
            killers.forEach((instance) => {
              if (instance.master.type !== "food" && instance.master.type !== "crasher") {
                killText += instance.name == "" ? killText == "" ? "An unnamed player" : "an unnamed player" : instance.name;
                killText += " and ";
              }
              if (dothISendAText) {
                instance.sendMessage("You killed " + name + (killers.length > 1 ? " (with some help)." : "."));
              }
            });
            killText = killText.slice(0, -4);
            killText += "killed you with ";
          }
          if (this.settings.broadcastMessage) sockets.broadcast(this.settings.broadcastMessage);
          killTools.forEach((instance) => {
            killText += util.addArticle(instance.label) + " and ";
          });
          killText = killText.slice(0, -5);
          if (killText === "You have been kille") killText = "You have died a stupid death";
          this.sendMessage(killText + ".");
          if (this.id === room.topPlayerID) {
            let usurptText = this.name === "" ? "The leader" : this.name;
            if (notJustFood) {
              usurptText += " has been usurped by";
              killers.forEach((instance) => {
                usurptText += " ";
                usurptText += instance.name === "" ? "an unnamed player" : instance.name;
                usurptText += " and";
              });
              usurptText = usurptText.slice(0, -4);
              usurptText += "!";
            } else {
              usurptText += " fought a polygon... and the polygon won.";
            }
            sockets.broadcast(usurptText);
          }
          return 1;
        }
        return 0;
      }
      protect() {
        entitiesToAvoid.push(this);
        this.isProtected = true;
      }
      sendMessage(message) {
      }
      // Dummy
      kill() {
        this.health.amount = -1;
      }
      destroy() {
        if (this.isProtected) util.remove(entitiesToAvoid, entitiesToAvoid.indexOf(this));
        let i = minimap.findIndex((entry) => {
          return entry[0] === this.id;
        });
        if (i != -1) util.remove(minimap, i);
        views.forEach((v) => v.remove(this));
        if (this.parent != null) util.remove(this.parent.children, this.parent.children.indexOf(this));
        let ID = this.id;
        entities.forEach((instance) => {
          if (instance.source.id === this.id) {
            if (instance.settings.persistsAfterDeath) {
              instance.source = instance;
            } else {
              instance.kill();
            }
          }
          if (instance.parent && instance.parent.id === this.id) {
            instance.parent = null;
          }
          if (instance.master.id === this.id) {
            instance.kill();
            instance.master = instance;
          }
        });
        this.turrets.forEach((t) => t.destroy());
        this.removeFromGrid();
        this.isGhost = true;
      }
      isDead() {
        return this.health.amount <= 0;
      }
    };
    var logs = (() => {
      let logger = /* @__PURE__ */ (() => {
        function set2(obj) {
          obj.time = util.time();
        }
        function mark(obj) {
          obj.data.push(util.time() - obj.time);
        }
        function record(obj) {
          let o = util.averageArray(obj.data);
          obj.data = [];
          return o;
        }
        function sum(obj) {
          let o = util.sumArray(obj.data);
          obj.data = [];
          return o;
        }
        function tally(obj) {
          obj.count++;
        }
        function count(obj) {
          let o = obj.count;
          obj.count = 0;
          return o;
        }
        return () => {
          let internal = {
            data: [],
            time: util.time(),
            count: 0
          };
          return {
            set: () => set2(internal),
            mark: () => mark(internal),
            record: () => record(internal),
            sum: () => sum(internal),
            count: () => count(internal),
            tally: () => tally(internal)
          };
        };
      })();
      return {
        entities: logger(),
        collide: logger(),
        network: logger(),
        minimap: logger(),
        misc2: logger(),
        misc3: logger(),
        physics: logger(),
        life: logger(),
        selfie: logger(),
        master: logger(),
        activation: logger(),
        loops: logger()
      };
    })();
    var express = __require("express");
    var http = __require("http");
    var url = __require("url");
    var WebSocket = __require("ws");
    var app = express();
    var fs = __require("fs");
    var exportDefintionsToClient = (() => {
      function rounder(val) {
        if (Math.abs(val) < 1e-5) val = 0;
        return +val.toPrecision(6);
      }
      function getMockup(e, positionInfo) {
        return {
          index: e.index,
          name: e.label,
          x: rounder(e.x),
          y: rounder(e.y),
          color: e.color,
          shape: e.shape,
          size: rounder(e.size),
          realSize: rounder(e.realSize),
          facing: rounder(e.facing),
          layer: e.layer,
          statnames: e.settings.skillNames,
          position: positionInfo,
          guns: e.guns.map(function(gun) {
            return {
              offset: rounder(gun.offset),
              direction: rounder(gun.direction),
              length: rounder(gun.length),
              width: rounder(gun.width),
              aspect: rounder(gun.aspect),
              angle: rounder(gun.angle)
            };
          }),
          turrets: e.turrets.map(function(t) {
            let out = getMockup(t, {});
            out.sizeFactor = rounder(t.bound.size);
            out.offset = rounder(t.bound.offset);
            out.direction = rounder(t.bound.direction);
            out.layer = rounder(t.bound.layer);
            out.angle = rounder(t.bound.angle);
            return out;
          })
        };
      }
      function getDimensions(entities2) {
        let endpoints = [];
        let pointDisplay = [];
        let pushEndpoints = function(model, scale, focus = { x: 0, y: 0 }, rot = 0) {
          let s = Math.abs(model.shape);
          let z = Math.abs(s) > lazyRealSizes.length ? 1 : lazyRealSizes[Math.abs(s)];
          if (z === 1) {
            for (let i = 0; i < 2; i += 0.5) {
              endpoints.push({ x: focus.x + scale * Math.cos(i * Math.PI), y: focus.y + scale * Math.sin(i * Math.PI) });
            }
          } else {
            for (let i = s % 2 ? 0 : Math.PI / s; i < s; i++) {
              let theta = i / s * 2 * Math.PI;
              endpoints.push({ x: focus.x + scale * z * Math.cos(theta), y: focus.y + scale * z * Math.sin(theta) });
            }
          }
          model.guns.forEach(function(gun) {
            let h = gun.aspect > 0 ? scale * gun.width / 2 * gun.aspect : scale * gun.width / 2;
            let r = Math.atan2(h, scale * gun.length) + rot;
            let l = Math.sqrt(scale * scale * gun.length * gun.length + h * h);
            let x = focus.x + scale * gun.offset * Math.cos(gun.direction + gun.angle + rot);
            let y = focus.y + scale * gun.offset * Math.sin(gun.direction + gun.angle + rot);
            endpoints.push({
              x: x + l * Math.cos(gun.angle + r),
              y: y + l * Math.sin(gun.angle + r)
            });
            endpoints.push({
              x: x + l * Math.cos(gun.angle - r),
              y: y + l * Math.sin(gun.angle - r)
            });
            pointDisplay.push({
              x: x + l * Math.cos(gun.angle + r),
              y: y + l * Math.sin(gun.angle + r)
            });
            pointDisplay.push({
              x: x + l * Math.cos(gun.angle - r),
              y: y + l * Math.sin(gun.angle - r)
            });
          });
          model.turrets.forEach(function(turret) {
            pushEndpoints(
              turret,
              turret.bound.size,
              { x: turret.bound.offset * Math.cos(turret.bound.angle), y: turret.bound.offset * Math.sin(turret.bound.angle) },
              turret.bound.angle
            );
          });
        };
        pushEndpoints(entities2, 1);
        let massCenter = { x: 0, y: 0 };
        let chooseFurthestAndRemove = function(furthestFrom) {
          let index = 0;
          if (furthestFrom != -1) {
            let list = [];
            let d;
            for (let i = 0; i < endpoints.length; i++) {
              let thisPoint = endpoints[i];
              d = Math.pow(thisPoint.x - furthestFrom.x, 2) + Math.pow(thisPoint.y - furthestFrom.y, 2) + 1;
              list.push({ p: 1 / d, v: i });
            }
            list.sort((a, b) => a.p - b.p);
            index = list[0].v;
          }
          let output = endpoints[index];
          endpoints.splice(index, 1);
          return output;
        };
        let point1 = chooseFurthestAndRemove(massCenter);
        let point2 = chooseFurthestAndRemove(point1);
        let chooseBiggestTriangleAndRemove = function(point12, point22) {
          let list = [];
          let index = 0;
          let a;
          for (let i = 0; i < endpoints.length; i++) {
            let thisPoint = endpoints[i];
            a = Math.pow(thisPoint.x - point12.x, 2) + Math.pow(thisPoint.y - point12.y, 2) + Math.pow(thisPoint.x - point22.x, 2) + Math.pow(thisPoint.y - point22.y, 2);
            list.push({ p: 1 / a, v: i });
          }
          list.sort((a2, b) => a2.p - b.p);
          index = list[0].v;
          let output = endpoints[index];
          endpoints.splice(index, 1);
          return output;
        };
        let point3 = chooseBiggestTriangleAndRemove(point1, point2);
        function circleOfThreePoints(p1, p2, p3) {
          let x1 = p1.x;
          let y1 = p1.y;
          let x2 = p2.x;
          let y2 = p2.y;
          let x3 = p3.x;
          let y3 = p3.y;
          let denom = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2;
          let xy1 = x1 * x1 + y1 * y1;
          let xy2 = x2 * x2 + y2 * y2;
          let xy3 = x3 * x3 + y3 * y3;
          let x = (
            // Numerator
            (xy1 * (y2 - y3) + xy2 * (y3 - y1) + xy3 * (y1 - y2)) / (2 * denom)
          );
          let y = (
            // Numerator
            (xy1 * (x3 - x2) + xy2 * (x1 - x3) + xy3 * (x2 - x1)) / (2 * denom)
          );
          let r = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
          let r2 = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
          let r3 = Math.sqrt(Math.pow(x - x3, 2) + Math.pow(y - y3, 2));
          if (r != r2 || r != r3) {
          }
          return { x, y, radius: r };
        }
        let c2 = circleOfThreePoints(point1, point2, point3);
        pointDisplay = [
          { x: rounder(point1.x), y: rounder(point1.y) },
          { x: rounder(point2.x), y: rounder(point2.y) },
          { x: rounder(point3.x), y: rounder(point3.y) }
        ];
        let centerOfCircle = { x: c2.x, y: c2.y };
        let radiusOfCircle = c2.radius;
        function checkingFunction() {
          for (var i = endpoints.length; i > 0; i--) {
            point1 = chooseFurthestAndRemove(centerOfCircle);
            let vectorFromPointToCircleCenter = new Vector(centerOfCircle.x - point1.x, centerOfCircle.y - point1.y);
            if (vectorFromPointToCircleCenter.length > radiusOfCircle) {
              pointDisplay.push({ x: rounder(point1.x), y: rounder(point1.y) });
              let dir = vectorFromPointToCircleCenter.direction;
              point2 = {
                x: centerOfCircle.x + radiusOfCircle * Math.cos(dir),
                y: centerOfCircle.y + radiusOfCircle * Math.sin(dir)
              };
              break;
            }
          }
          return !!endpoints.length;
        }
        while (checkingFunction()) {
          centerOfCircle = {
            x: (point1.x + point2.x) / 2,
            y: (point1.y + point2.y) / 2
          };
          radiusOfCircle = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)) / 2;
        }
        return {
          middle: { x: rounder(centerOfCircle.x), y: 0 },
          axis: rounder(radiusOfCircle * 2),
          points: pointDisplay
        };
      }
      let mockupData = [];
      for (let k in Class) {
        try {
          if (!Class.hasOwnProperty(k)) continue;
          let type = Class[k];
          let temptank = new Entity({ x: 0, y: 0 });
          temptank.define(type);
          temptank.name = type.LABEL;
          type.mockup = {
            body: temptank.camera(true),
            position: getDimensions(temptank)
          };
          type.mockup.body.position = type.mockup.position;
          mockupData.push(getMockup(temptank, type.mockup.position));
          temptank.destroy();
        } catch (error) {
          util.error(error);
          util.error(k);
          util.error(Class[k]);
        }
      }
      purgeEntities();
      let writeData = JSON.stringify(mockupData);
      return (loc) => {
        util.log("Preparing definition export.");
        fs.writeFileSync(loc, writeData, "utf8", (err) => {
          if (err) return util.error(err);
        });
        util.log("Mockups written to " + loc + "!");
      };
    })();
    var generateVersionControlHash = (() => {
      let crypto = __require("crypto");
      let write = /* @__PURE__ */ (() => {
        let hash = [null, null];
        return (loc, data, numb) => {
          hash[numb] = crypto.createHash("sha1").update(data).digest("hex");
          if (hash[0] && hash[1]) {
            let finalHash = hash[0] + hash[1];
            util.log('Client hash generated. Hash is "' + finalHash + '".');
            fs.writeFileSync(loc, finalHash, "utf8", (err) => {
              if (err) return util.error(err);
            });
            util.log("Hash written to " + loc + "!");
          }
        };
      })();
      return (loc) => {
        let path1 = __dirname + "/../client/js/app.js";
        let path2 = __dirname + "/lib/definitions.js";
        util.log("Building client version hash, reading from " + path1 + " and " + path2 + "...");
        fs.readFile(path1, "utf8", (err, data) => {
          if (err) return util.error(err);
          util.log("app.js complete.");
          write(loc, data, 0);
        });
        fs.readFile(path2, "utf8", (err, data) => {
          if (err) return util.error(err);
          util.log("definitions.js complete.");
          write(loc, data, 1);
        });
      };
    })();
    exportDefintionsToClient(__dirname + "/../client/json/mockups.json");
    generateVersionControlHash(__dirname + "/../client/api/vhash");
    if (c.servesStatic) app.use(express.static(__dirname + "/../client"));
    var sockets = (() => {
      const protocol = require_fasttalk();
      let clients = [], players = [], bannedIPs = [], suspiciousIPs = [], connectedIPs = [], bannedNames = [
        "FREE_FOOD_LUCARIO",
        "FREE FOOD"
      ];
      return {
        broadcast: (message) => {
          clients.forEach((socket) => {
            socket.talk("m", message);
          });
        },
        connect: (() => {
          function close(socket) {
            let n = connectedIPs.findIndex((w) => {
              return w.ip === socket.ip;
            });
            if (n !== -1) {
              util.log(socket.ip + " disconnected.");
              util.remove(connectedIPs, n);
            }
            if (socket.key != "" && c.TOKEN_REQUIRED) {
              keys.push(socket.key);
              util.log("Token freed.");
            }
            let player = socket.player, index = players.indexOf(player);
            if (index != -1) {
              if (player.body != null) {
                player.body.invuln = false;
                setTimeout(() => {
                  player.body.kill();
                }, 1e4);
              }
              util.log("[INFO] User " + player.name + " disconnected!");
              util.remove(players, index);
            } else {
              util.log("[INFO] A player disconnected before entering the game.");
            }
            util.remove(views, views.indexOf(socket.view));
            util.remove(clients, clients.indexOf(socket));
            util.log("[INFO] Socket closed. Views: " + views.length + ". Clients: " + clients.length + ".");
          }
          function ban(socket) {
            if (bannedIPs.findIndex((ip) => {
              return ip === socket.ip;
            }) === -1) {
              bannedIPs.push(socket.ip);
            }
            socket.terminate();
            util.warn(socket.ip + " banned!");
          }
          function kick(socket, reason = "No reason given.") {
            let n = suspiciousIPs.findIndex((n2) => {
              return n2.ip === socket.ip;
            });
            if (n === -1) {
              suspiciousIPs.push({ ip: socket.ip, warns: 1 });
              util.warn(reason + " Kicking. 1 warning.");
            } else {
              suspiciousIPs[n].warns++;
              util.warn(reason + " Kicking. " + suspiciousIPs[n].warns + " warnings.");
              if (suspiciousIPs[n].warns >= c.socketWarningLimit) {
                ban(socket);
              }
            }
            socket.lastWords("K");
          }
          function incoming(message, socket) {
            if (!(message instanceof ArrayBuffer)) {
              socket.kick("Non-binary packet.");
              return 1;
            }
            let m = protocol.decode(message);
            if (m === -1) {
              socket.kick("Malformed packet.");
              return 1;
            }
            socket.status.requests++;
            let player = socket.player;
            switch (m.shift()) {
              case "k":
                {
                  if (m.length !== 1) {
                    socket.kick("Ill-sized key request.");
                    return 1;
                  }
                  let key = m[0];
                  if (typeof key !== "string") {
                    socket.kick("Weird key offered.");
                    return 1;
                  }
                  if (key.length > 64) {
                    socket.kick("Overly-long key offered.");
                    return 1;
                  }
                  if (socket.status.verified) {
                    socket.kick("Duplicate player spawn attempt.");
                    return 1;
                  }
                  if (keys.indexOf(key) != -1 || !c.TOKEN_REQUIRED) {
                    socket.key = key.substr(0, 64);
                    util.remove(keys, keys.indexOf(key));
                    socket.verified = true;
                    socket.talk("w", true);
                    util.log("[INFO] A socket was verified with the token: ");
                    util.log(key);
                    util.log("Clients: " + clients.length);
                  } else {
                    util.log("[INFO] Invalid player verification attempt.");
                    socket.lastWords("w", false);
                  }
                }
                break;
              case "s":
                {
                  if (!socket.status.deceased) {
                    socket.kick("Trying to spawn while already alive.");
                    return 1;
                  }
                  if (m.length !== 2) {
                    socket.kick("Ill-sized spawn request.");
                    return 1;
                  }
                  let name = m[0].replace(c.BANNED_CHARACTERS_REGEX, "");
                  let needsRoom = m[1];
                  if (typeof name != "string") {
                    socket.kick("Bad spawn request.");
                    return 1;
                  }
                  if (encodeURI(name).split(/%..|./).length > 48) {
                    socket.kick("Overly-long name.");
                    return 1;
                  }
                  if (needsRoom !== 0 && needsRoom !== 1) {
                    socket.kick("Bad spawn request.");
                    return 1;
                  }
                  socket.status.deceased = false;
                  if (players.indexOf(socket.player) != -1) {
                    util.remove(players, players.indexOf(socket.player));
                  }
                  if (views.indexOf(socket.view) != -1) {
                    util.remove(views, views.indexOf(socket.view));
                    socket.makeView();
                  }
                  socket.player = socket.spawn(name);
                  if (needsRoom) {
                    socket.talk(
                      "R",
                      room.width,
                      room.height,
                      JSON.stringify(c.ROOM_SETUP),
                      JSON.stringify(util.serverStartTime),
                      roomSpeed
                    );
                  }
                  socket.update(0);
                  util.log("[INFO] " + m[0] + (needsRoom ? " joined" : " rejoined") + " the game! Players: " + players.length);
                }
                break;
              case "S":
                {
                  if (m.length !== 1) {
                    socket.kick("Ill-sized sync packet.");
                    return 1;
                  }
                  let synctick = m[0];
                  if (typeof synctick !== "number") {
                    socket.kick("Weird sync packet.");
                    return 1;
                  }
                  socket.talk("S", synctick, util.time());
                }
                break;
              case "p":
                {
                  if (m.length !== 1) {
                    socket.kick("Ill-sized ping.");
                    return 1;
                  }
                  let ping = m[0];
                  if (typeof ping !== "number") {
                    socket.kick("Weird ping.");
                    return 1;
                  }
                  socket.talk("p", m[0]);
                  socket.status.lastHeartbeat = util.time();
                }
                break;
              case "d":
                {
                  if (m.length !== 1) {
                    socket.kick("Ill-sized downlink.");
                    return 1;
                  }
                  let time = m[0];
                  if (typeof time !== "number") {
                    socket.kick("Bad downlink.");
                    return 1;
                  }
                  socket.status.receiving = 0;
                  socket.camera.ping = util.time() - time;
                  socket.camera.lastDowndate = util.time();
                  socket.update(Math.max(0, 1e3 / c.networkUpdateFactor - (util.time() - socket.camera.lastUpdate)));
                }
                break;
              case "C":
                {
                  if (m.length !== 3) {
                    socket.kick("Ill-sized command packet.");
                    return 1;
                  }
                  let target = {
                    x: m[0],
                    y: m[1]
                  }, commands = m[2];
                  if (typeof target.x !== "number" || typeof target.y !== "number" || typeof commands !== "number") {
                    socket.kick("Weird downlink.");
                    return 1;
                  }
                  if (commands > 255 || target.x !== Math.round(target.x) || target.y !== Math.round(target.y)) {
                    socket.kick("Malformed command packet.");
                    return 1;
                  }
                  player.target = target;
                  let val = [false, false, false, false, false, false, false, false];
                  for (let i = 7; i >= 0; i--) {
                    if (commands >= Math.pow(2, i)) {
                      commands -= Math.pow(2, i);
                      val[i] = true;
                    }
                  }
                  player.command.up = val[0];
                  player.command.down = val[1];
                  player.command.left = val[2];
                  player.command.right = val[3];
                  player.command.lmb = val[4];
                  player.command.mmb = val[5];
                  player.command.rmb = val[6];
                  socket.timeout.set(commands);
                }
                break;
              case "t":
                {
                  if (m.length !== 1) {
                    socket.kick("Ill-sized toggle.");
                    return 1;
                  }
                  let given = "", tog = m[0];
                  if (typeof tog !== "number") {
                    socket.kick("Weird toggle.");
                    return 1;
                  }
                  switch (tog) {
                    case 0:
                      given = "autospin";
                      break;
                    case 1:
                      given = "autofire";
                      break;
                    case 2:
                      given = "override";
                      break;
                    // Kick if it sent us shit.
                    default:
                      socket.kick("Bad toggle.");
                      return 1;
                  }
                  if (player.command != null && player.body != null) {
                    player.command[given] = !player.command[given];
                    player.body.sendMessage(given.charAt(0).toUpperCase() + given.slice(1) + (player.command[given] ? " enabled." : " disabled."));
                  }
                }
                break;
              case "U":
                {
                  if (m.length !== 1) {
                    socket.kick("Ill-sized upgrade request.");
                    return 1;
                  }
                  let number = m[0];
                  if (typeof number != "number" || number < 0) {
                    socket.kick("Bad upgrade request.");
                    return 1;
                  }
                  if (player.body != null) {
                    player.body.upgrade(number);
                  }
                }
                break;
              case "x":
                {
                  if (m.length !== 1) {
                    socket.kick("Ill-sized skill request.");
                    return 1;
                  }
                  let number = m[0], stat = "";
                  if (typeof number != "number") {
                    socket.kick("Weird stat upgrade request.");
                    return 1;
                  }
                  switch (number) {
                    case 0:
                      stat = "atk";
                      break;
                    case 1:
                      stat = "hlt";
                      break;
                    case 2:
                      stat = "spd";
                      break;
                    case 3:
                      stat = "str";
                      break;
                    case 4:
                      stat = "pen";
                      break;
                    case 5:
                      stat = "dam";
                      break;
                    case 6:
                      stat = "rld";
                      break;
                    case 7:
                      stat = "mob";
                      break;
                    case 8:
                      stat = "rgn";
                      break;
                    case 9:
                      stat = "shi";
                      break;
                    default:
                      socket.kick("Unknown stat upgrade request.");
                      return 1;
                  }
                  if (player.body != null) {
                    player.body.skillUp(stat);
                  }
                }
                break;
              case "L":
                {
                  if (m.length !== 0) {
                    socket.kick("Ill-sized level-up request.");
                    return 1;
                  }
                  if (player.body != null) {
                    if (player.body.skill.level < c.SKILL_CHEAT_CAP || (socket.key === "testk" || socket.key === "testl") && player.body.skill.level < 45) {
                      player.body.skill.score += player.body.skill.levelScore;
                      player.body.skill.maintain();
                      player.body.refreshBodyAttributes();
                    }
                  }
                }
                break;
              case "0":
                {
                  if (m.length !== 0) {
                    socket.kick("Ill-sized testbed request.");
                    return 1;
                  }
                  if (player.body != null) {
                    if (socket.key === "testk" || socket.key === "testl") {
                      player.body.define(Class.testbed);
                    }
                  }
                }
                break;
              case "z":
                {
                  if (m.length !== 0) {
                    socket.kick("Ill-sized level-up request.");
                    return 1;
                  }
                  socket.status.needsFullLeaderboard = true;
                }
                break;
              default:
                socket.kick("Bad packet index.");
            }
          }
          function traffic(socket) {
            let strikes = 0;
            return () => {
              if (util.time() - socket.status.lastHeartbeat > c.maxHeartbeatInterval) {
                socket.kick("Heartbeat lost.");
                return 0;
              }
              if (socket.status.requests > 50) {
                strikes++;
              } else {
                strikes = 0;
              }
              if (strikes > 3) {
                socket.kick("Socket traffic volume violation!");
                return 0;
              }
              socket.status.requests = 0;
            };
          }
          const spawn = /* @__PURE__ */ (() => {
            let newgui = /* @__PURE__ */ (() => {
              function floppy(value = null) {
                let flagged = true;
                return {
                  // The update method
                  update: (newValue) => {
                    let eh = false;
                    if (value == null) {
                      eh = true;
                    } else {
                      if (typeof newValue != typeof value) {
                        eh = true;
                      }
                      switch (typeof newValue) {
                        case "number":
                        case "string":
                          {
                            if (newValue !== value) {
                              eh = true;
                            }
                          }
                          break;
                        case "object": {
                          if (Array.isArray(newValue)) {
                            if (newValue.length !== value.length) {
                              eh = true;
                            } else {
                              for (let i = 0, len = newValue.length; i < len; i++) {
                                if (newValue[i] !== value[i]) eh = true;
                              }
                            }
                            break;
                          }
                        }
                        // jshint ignore:line
                        default:
                          util.error(newValue);
                          throw new Error("Unsupported type for a floppyvar!");
                      }
                    }
                    if (eh) {
                      flagged = true;
                      value = newValue;
                    }
                  },
                  // The return method
                  publish: () => {
                    if (flagged && value != null) {
                      flagged = false;
                      return value;
                    }
                  }
                };
              }
              function container(player) {
                let vars = [], skills = player.body.skill, out = [], statnames = ["atk", "hlt", "spd", "str", "pen", "dam", "rld", "mob", "rgn", "shi"];
                statnames.forEach((a) => {
                  vars.push(floppy());
                  vars.push(floppy());
                  vars.push(floppy());
                });
                return {
                  update: () => {
                    let needsupdate = false, i = 0;
                    statnames.forEach((a) => {
                      vars[i++].update(skills.title(a));
                      vars[i++].update(skills.cap(a));
                      vars[i++].update(skills.cap(a, true));
                    });
                    vars.forEach((e) => {
                      if (e.publish() != null) needsupdate = true;
                    });
                    if (needsupdate) {
                      statnames.forEach((a) => {
                        out.push(skills.title(a));
                        out.push(skills.cap(a));
                        out.push(skills.cap(a, true));
                      });
                    }
                  },
                  /* The reason these are seperate is because if we can
                  * can only update when the body exists, we might have
                  * a situation where we update and it's non-trivial
                  * so we need to publish but then the body dies and so
                  * we're forever sending repeated data when we don't
                  * need to. This way we can flag it as already sent
                  * regardless of if we had an update cycle.
                  */
                  publish: () => {
                    if (out.length) {
                      let o = out.splice(0, out.length);
                      out = [];
                      return o;
                    }
                  }
                };
              }
              function getstuff(s) {
                let val = 0;
                val += 1 * s.amount("atk");
                val += 16 * s.amount("hlt");
                val += 256 * s.amount("spd");
                val += 4096 * s.amount("str");
                val += 65536 * s.amount("pen");
                val += 1048576 * s.amount("dam");
                val += 16777216 * s.amount("rld");
                val += 268435456 * s.amount("mob");
                val += 4294967296 * s.amount("rgn");
                val += 68719476736 * s.amount("shi");
                return val.toString(36);
              }
              function update(gui) {
                let b = gui.master.body;
                if (!b) return 0;
                gui.bodyid = b.id;
                gui.fps.update(Math.min(1, global.fps / roomSpeed / 1e3 * 30));
                gui.color.update(gui.master.teamColor);
                gui.label.update(b.index);
                gui.score.update(b.skill.score);
                gui.points.update(b.skill.points);
                let upgrades = [];
                b.upgrades.forEach(function(e) {
                  if (b.skill.level >= e.level) {
                    upgrades.push(e.index);
                  }
                });
                gui.upgrades.update(upgrades);
                gui.stats.update();
                gui.skills.update(getstuff(b.skill));
                gui.accel.update(b.acceleration);
                gui.topspeed.update(b.topSpeed);
              }
              function publish(gui) {
                let o = {
                  fps: gui.fps.publish(),
                  label: gui.label.publish(),
                  score: gui.score.publish(),
                  points: gui.points.publish(),
                  upgrades: gui.upgrades.publish(),
                  color: gui.color.publish(),
                  statsdata: gui.stats.publish(),
                  skills: gui.skills.publish(),
                  accel: gui.accel.publish(),
                  top: gui.topspeed.publish()
                };
                let oo = [0];
                if (o.fps != null) {
                  oo[0] += 1;
                  oo.push(o.fps || 1);
                }
                if (o.label != null) {
                  oo[0] += 2;
                  oo.push(o.label);
                  oo.push(o.color || gui.master.teamColor);
                  oo.push(gui.bodyid);
                }
                if (o.score != null) {
                  oo[0] += 4;
                  oo.push(o.score);
                }
                if (o.points != null) {
                  oo[0] += 8;
                  oo.push(o.points);
                }
                if (o.upgrades != null) {
                  oo[0] += 16;
                  oo.push(o.upgrades.length, ...o.upgrades);
                }
                if (o.statsdata != null) {
                  oo[0] += 32;
                  oo.push(...o.statsdata);
                }
                if (o.skills != null) {
                  oo[0] += 64;
                  oo.push(o.skills);
                }
                if (o.accel != null) {
                  oo[0] += 128;
                  oo.push(o.accel);
                }
                if (o.top != null) {
                  oo[0] += 256;
                  oo.push(o.top);
                }
                return oo;
              }
              return (player) => {
                let gui = {
                  master: player,
                  fps: floppy(),
                  label: floppy(),
                  score: floppy(),
                  points: floppy(),
                  upgrades: floppy(),
                  color: floppy(),
                  skills: floppy(),
                  topspeed: floppy(),
                  accel: floppy(),
                  stats: container(player),
                  bodyid: -1
                };
                return {
                  update: () => update(gui),
                  publish: () => publish(gui)
                };
              };
            })();
            function messenger(socket, content) {
              socket.talk("m", content);
            }
            return (socket, name) => {
              let player = {}, loc = {};
              player.team = socket.rememberedTeam;
              switch (room.gameMode) {
                case "tdm":
                  {
                    let census = [1, 1, 1, 1], scoreCensus = [1, 1, 1, 1];
                    players.forEach((p) => {
                      census[p.team - 1]++;
                      if (p.body != null) {
                        scoreCensus[p.team - 1] += p.body.skill.score;
                      }
                    });
                    let possiblities = [];
                    for (let i = 0, m = 0; i < 4; i++) {
                      let v = Math.round(1e6 * (room["bas" + (i + 1)].length + 1) / (census[i] + 1) / scoreCensus[i]);
                      if (v > m) {
                        m = v;
                        possiblities = [i];
                      }
                      if (v == m) {
                        possiblities.push(i);
                      }
                    }
                    if (player.team == null) {
                      player.team = ran.choose(possiblities) + 1;
                    }
                    if (room["bas" + player.team].length) do {
                      loc = room.randomType("bas" + player.team);
                    } while (dirtyCheck(loc, 50));
                    else do {
                      loc = room.gaussInverse(5);
                    } while (dirtyCheck(loc, 50));
                  }
                  break;
                default:
                  do {
                    loc = room.gaussInverse(5);
                  } while (dirtyCheck(loc, 50));
              }
              socket.rememberedTeam = player.team;
              let body2 = new Entity(loc);
              body2.protect();
              body2.define(Class.basic);
              body2.name = name;
              if (socket.key === "testl" || socket.key === "testk") {
                body2.name = "\0";
                body2.define({ CAN_BE_ON_LEADERBOARD: false });
              }
              body2.addController(new io_listenToPlayer(body2, player));
              body2.sendMessage = (content) => messenger(socket, content);
              body2.invuln = true;
              player.body = body2;
              switch (room.gameMode) {
                case "tdm":
                  {
                    body2.team = -player.team;
                    body2.color = [10, 11, 12, 15][player.team - 1];
                  }
                  break;
                default: {
                  body2.color = c.RANDOM_COLORS ? ran.choose([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) : 12;
                }
              }
              player.teamColor = !c.RANDOM_COLORS && room.gameMode === "ffa" ? 10 : body2.color;
              player.target = {
                x: 0,
                y: 0
              };
              player.command = {
                up: false,
                down: false,
                left: false,
                right: false,
                lmb: false,
                mmb: false,
                rmb: false,
                autofire: false,
                autospin: false,
                override: false,
                autoguide: false
              };
              player.records = (() => {
                let begin = util.time();
                return () => {
                  return [
                    player.body.skill.score,
                    Math.floor((util.time() - begin) / 1e3),
                    player.body.killCount.solo,
                    player.body.killCount.assists,
                    player.body.killCount.bosses,
                    player.body.killCount.killers.length,
                    ...player.body.killCount.killers
                  ];
                };
              })();
              player.gui = newgui(player);
              player.socket = socket;
              players.push(player);
              socket.camera.x = body2.x;
              socket.camera.y = body2.y;
              socket.camera.fov = 2e3;
              socket.status.hasSpawned = true;
              body2.sendMessage("You have spawned! Welcome to the game.");
              body2.sendMessage("You will be invulnerable until you move or shoot.");
              socket.talk("c", socket.camera.x, socket.camera.y, socket.camera.fov);
              return player;
            };
          })();
          const eyes = /* @__PURE__ */ (() => {
            function flatten(data) {
              let output = [data.type];
              if (data.type & 1) {
                output.push(
                  // 1: facing
                  data.facing,
                  // 2: layer
                  data.layer
                );
              } else {
                output.push(
                  // 1: id
                  data.id,
                  // 2: index
                  data.index,
                  // 3: x
                  data.x,
                  // 4: y
                  data.y,
                  // 5: vx
                  data.vx,
                  // 6: vy
                  data.vy,
                  // 7: size
                  data.size,
                  // 8: facing
                  data.facing,
                  // 9: vfacing
                  data.vfacing,
                  // 10: twiggle
                  data.twiggle,
                  // 11: layer
                  data.layer,
                  // 12: color
                  data.color,
                  // 13: health
                  Math.ceil(255 * data.health),
                  // 14: shield
                  Math.round(255 * data.shield)
                );
                if (data.type & 4) {
                  output.push(
                    // 15: name
                    data.name,
                    // 16: score
                    data.score
                  );
                }
              }
              let gundata = [data.guns.length];
              data.guns.forEach((lastShot) => {
                gundata.push(lastShot.time, lastShot.power);
              });
              output.push(...gundata);
              let turdata = [data.turrets.length];
              data.turrets.forEach((turret) => {
                turdata.push(...flatten(turret));
              });
              output.push(...turdata);
              return output;
            }
            function perspective(e, player, data) {
              if (player.body != null) {
                if (player.body.id === e.master.id) {
                  data = data.slice();
                  data[12] = player.teamColor;
                  if (player.command.autospin) {
                    data[10] = 1;
                  }
                }
              }
              return data;
            }
            function check(camera, obj) {
              return Math.abs(obj.x - camera.x) < camera.fov * 0.6 + 1.5 * obj.size + 100 && Math.abs(obj.y - camera.y) < camera.fov * 0.6 * 0.5625 + 1.5 * obj.size + 100;
            }
            return (socket) => {
              let lastVisibleUpdate = 0;
              let nearby = [];
              let x = -1e3;
              let y = -1e3;
              let fov = 0;
              let o = {
                add: (e) => {
                  if (check(socket.camera, e)) nearby.push(e);
                },
                remove: (e) => {
                  let i = nearby.indexOf(e);
                  if (i !== -1) util.remove(nearby, i);
                },
                check: (e, f) => {
                  return check(socket.camera, e);
                },
                //Math.abs(e.x - x) < e.size + f*fov && Math.abs(e.y - y) < e.size + f*fov; },
                gazeUpon: () => {
                  logs.network.set();
                  let player = socket.player, camera = socket.camera;
                  let rightNow = room.lastCycle;
                  if (rightNow === camera.lastUpdate) {
                    socket.update(5 + room.cycleSpeed - util.time() + rightNow);
                    return 1;
                  }
                  camera.lastUpdate = rightNow;
                  socket.status.receiving++;
                  let setFov = camera.fov;
                  if (player.body != null) {
                    if (player.body.isDead()) {
                      socket.status.deceased = true;
                      socket.talk("F", ...player.records());
                      player.body = null;
                    } else if (player.body.photo) {
                      camera.x = player.body.photo.x;
                      camera.y = player.body.photo.y;
                      camera.vx = player.body.photo.vx;
                      camera.vy = player.body.photo.vy;
                      setFov = player.body.fov;
                      player.viewId = player.body.id;
                    }
                  }
                  if (player.body == null) {
                    setFov = 2e3;
                  }
                  camera.fov += Math.max((setFov - camera.fov) / 30, setFov - camera.fov);
                  x = camera.x;
                  y = camera.y;
                  fov = camera.fov;
                  if (camera.lastUpdate - lastVisibleUpdate > c.visibleListInterval) {
                    lastVisibleUpdate = camera.lastUpdate;
                    nearby = entities.map((e) => {
                      if (check(socket.camera, e)) return e;
                    }).filter((e) => {
                      return e;
                    });
                  }
                  let visible = nearby.map(function mapthevisiblerealm(e) {
                    if (e.photo) {
                      if (Math.abs(e.x - x) < fov / 2 + 1.5 * e.size && Math.abs(e.y - y) < fov / 2 * (9 / 16) + 1.5 * e.size) {
                        if (!e.flattenedPhoto) e.flattenedPhoto = flatten(e.photo);
                        return perspective(e, player, e.flattenedPhoto);
                      }
                    }
                  }).filter((e) => {
                    return e;
                  });
                  let numberInView = visible.length, view = [];
                  visible.forEach((e) => {
                    view.push(...e);
                  });
                  player.gui.update();
                  socket.talk(
                    "u",
                    rightNow,
                    camera.x,
                    camera.y,
                    setFov,
                    camera.vx,
                    camera.vy,
                    ...player.gui.publish(),
                    numberInView,
                    ...view
                  );
                  if (socket.status.receiving < c.networkFrontlog) {
                    socket.update(Math.max(
                      0,
                      1e3 / c.networkUpdateFactor - (camera.lastDowndate - camera.lastUpdate),
                      camera.ping / c.networkFrontlog
                    ));
                  } else {
                    socket.update(c.networkFallbackTime);
                  }
                  logs.network.mark();
                }
              };
              views.push(o);
              return o;
            };
          })();
          const broadcast = (() => {
            let readmap, readlb;
            const getminimap = (() => {
              let cleanmapreader = (() => {
                function flattener() {
                  let internalmap = [];
                  function flatten(data) {
                    if (data == null) data = [];
                    let out = [data.length];
                    data.forEach((d) => out.push(...d));
                    return out;
                  }
                  function challenge(value, challenger) {
                    return value[1] === challenger[0] && value[2] === challenger[1] && value[3] === challenger[2];
                  }
                  return {
                    update: (data) => {
                      internalmap.forEach((e) => e[0] = -1);
                      data = data.map((d) => {
                        return [
                          Math.round(255 * util.clamp(d[0] / room.width, 0, 1)),
                          Math.round(255 * util.clamp(d[1] / room.height, 0, 1)),
                          d[2]
                        ];
                      });
                      data.forEach((d) => {
                        let i = internalmap.findIndex((e) => {
                          return challenge(e, d);
                        });
                        if (i === -1) {
                          internalmap.push([1, ...d]);
                        } else {
                          internalmap[i][0] = 0;
                        }
                      });
                      let ex = internalmap.filter((e) => e[0] !== 0);
                      internalmap = internalmap.filter((e) => e[0] !== -1);
                      let f = flatten(ex);
                      return f;
                    },
                    exportall: () => {
                      return flatten(internalmap.map((e) => {
                        return [1, e[1], e[2], e[3]];
                      }));
                    }
                  };
                }
                return room.gameMode === "ffa" ? (
                  // ffa function builder
                  (() => {
                    let publicmap = flattener();
                    return () => {
                      let clean = publicmap.update(minimap.map(function(entry) {
                        return [entry[1], entry[2], entry[4] === "miniboss" ? entry[3] : 17];
                      }));
                      let full = publicmap.exportall();
                      return (team, everything = false) => {
                        return everything ? full : clean;
                      };
                    };
                  })()
                ) : (
                  // tdm function builder
                  (() => {
                    let team1map = flattener();
                    let team2map = flattener();
                    let team3map = flattener();
                    let team4map = flattener();
                    return () => {
                      let clean = [
                        team1map.update(minimap.map(function(entry) {
                          return [entry[1], entry[2], entry[4] === "miniboss" || entry[4] === "tank" && entry[5] === -1 ? entry[3] : 17];
                        })),
                        team2map.update(minimap.map(function(entry) {
                          return [entry[1], entry[2], entry[4] === "miniboss" || entry[4] === "tank" && entry[5] === -2 ? entry[3] : 17];
                        })),
                        team3map.update(minimap.map(function(entry) {
                          return [entry[1], entry[2], entry[4] === "miniboss" || entry[4] === "tank" && entry[5] === -3 ? entry[3] : 17];
                        })),
                        team4map.update(minimap.map(function(entry) {
                          return [entry[1], entry[2], entry[4] === "miniboss" || entry[4] === "tank" && entry[5] === -4 ? entry[3] : 17];
                        }))
                      ];
                      let full = [
                        team1map.exportall(),
                        team2map.exportall(),
                        team3map.exportall(),
                        team4map.exportall()
                      ];
                      return (team, everything = false) => {
                        return everything ? full[team - 1] : clean[team - 1];
                      };
                    };
                  })()
                );
              })();
              return () => {
                entities.forEach((my) => {
                  if (my.settings.drawShape && ran.dice(my.stealth * c.STEALTH)) {
                    let i = minimap.findIndex((entry) => {
                      return entry[0] === my.id;
                    });
                    if (i != -1) {
                      minimap[i] = [my.id, my.x, my.y, my.color, my.type, my.team];
                    } else {
                      minimap.push([my.id, my.x, my.y, my.color, my.type, my.team]);
                    }
                  }
                });
                return cleanmapreader();
              };
            })();
            const getleaderboard = /* @__PURE__ */ (() => {
              let lb = { full: [], updates: [] };
              let list = {
                data: [],
                enqueue: function(p, v) {
                  this.data.push({ p, v });
                },
                dequeue: function() {
                  this.data.sort((a, b) => a.p - b.p);
                  return this.data.shift().v;
                },
                clear: function() {
                  this.data = [];
                },
                getCount: function() {
                  return this.data.length;
                }
              };
              function listify(instance) {
                if (instance.settings.leaderboardable && instance.settings.drawShape && (instance.type === "tank" || instance.killCount.solo || instance.killCount.assists)) {
                  list.enqueue(1 / (instance.skill.score + 1), instance);
                }
              }
              let flatten = /* @__PURE__ */ (() => {
                let leaderboard = {};
                let indices = /* @__PURE__ */ (() => {
                  let data = [], removed = [];
                  return {
                    flag: () => {
                      data.forEach((index) => {
                        index.status = -1;
                      });
                      if (data == null) {
                        data = [];
                      }
                    },
                    cull: () => {
                      removed = [];
                      data = data.filter((index) => {
                        let doit = index.status === -1;
                        if (doit) removed.push(index.id);
                        return !doit;
                      });
                      return removed;
                    },
                    add: (id) => {
                      data.push({ id, status: 1 });
                    },
                    stabilize: (id) => {
                      data[data.findIndex((index) => {
                        return index.id === id;
                      })].status = 0;
                    }
                  };
                })();
                let process2 = /* @__PURE__ */ (() => {
                  function barcolor(entry) {
                    switch (entry.team) {
                      case -100:
                        return entry.color;
                      case -1:
                        return 10;
                      case -2:
                        return 11;
                      case -3:
                        return 12;
                      case -4:
                        return 15;
                      default: {
                        if (room.gameMode === "tdm") return entry.color;
                        return 11;
                      }
                    }
                  }
                  function getfull(entry) {
                    return [
                      -entry.id,
                      Math.round(entry.skill.score),
                      entry.index,
                      entry.name,
                      entry.color,
                      barcolor(entry)
                    ];
                  }
                  return {
                    normal: (entry) => {
                      let id = entry.id, score = Math.round(entry.skill.score);
                      let lb2 = leaderboard["_" + id];
                      if (lb2 != null) {
                        indices.stabilize(id);
                        if (lb2.score !== score || lb2.index !== entry.index) {
                          lb2.score = score;
                          lb2.index = entry.index;
                          return [
                            id,
                            score,
                            entry.index
                          ];
                        }
                      } else {
                        indices.add(id);
                        leaderboard["_" + id] = {
                          score,
                          name: entry.name,
                          index: entry.index,
                          color: entry.color,
                          bar: barcolor(entry)
                        };
                        return getfull(entry);
                      }
                    },
                    full: (entry) => {
                      return getfull(entry);
                    }
                  };
                })();
                return (data) => {
                  indices.flag();
                  let orders = data.map(process2.normal).filter((e) => {
                    return e;
                  }), refresh = data.map(process2.full).filter((e) => {
                    return e;
                  }), flatorders = [], flatrefresh = [];
                  orders.forEach((e) => flatorders.push(...e));
                  refresh.forEach((e) => flatrefresh.push(...e));
                  let removed = indices.cull();
                  removed.forEach((id) => {
                    delete leaderboard["_" + id];
                  });
                  return {
                    updates: [removed.length, ...removed, orders.length, ...flatorders],
                    full: [-1, refresh.length, ...flatrefresh]
                    // The -1 tells the client it'll be a full refresh
                  };
                };
              })();
              return () => {
                list.clear();
                entities.forEach(listify);
                let topTen = [];
                for (let i = 0; i < 10; i++) {
                  if (list.getCount()) {
                    topTen.push(list.dequeue());
                  } else {
                    break;
                  }
                }
                topTen = topTen.filter((e) => {
                  return e;
                });
                room.topPlayerID = topTen.length ? topTen[0].id : -1;
                lb = flatten(topTen);
                return (full = false) => {
                  return full ? lb.full : lb.updates;
                };
              };
            })();
            function slowloop() {
              logs.minimap.set();
              readmap = getminimap();
              readlb = getleaderboard();
              logs.minimap.mark();
              let time = util.time();
              clients.forEach((socket) => {
                if (socket.timeout.check(time)) socket.kick("Kicked for inactivity.");
                if (time - socket.statuslastHeartbeat > c.maxHeartbeatInterval) socket.kick("Lost heartbeat.");
              });
            }
            setInterval(slowloop, 1e3);
            return (socket) => {
              if (socket.status.hasSpawned) {
                let m = [0], lb = [0, 0];
                m = readmap(socket.player.team, socket.status.needsFullMap);
                socket.status.needsFullMap = false;
                lb = readlb(socket.status.needsFullLeaderboard);
                socket.status.needsFullLeaderboard = false;
                if (m !== [0] || lb !== [0, 0]) {
                  socket.talk("b", ...m, ...lb);
                }
              }
            };
          })();
          return (socket, req) => {
            if (c.servesStatic || req.connection.remoteAddress === "::ffff:127.0.0.1" || req.connection.remoteAddress === "::1") {
              socket.ip = req.headers["x-forwarded-for"];
              if (bannedIPs.findIndex((ip) => {
                return ip === socket.ip;
              }) !== -1) {
                socket.terminate();
                return 1;
              }
              if (!c.servesStatic) {
                let n = connectedIPs.findIndex((w) => {
                  return w.ip === socket.ip;
                });
                if (n !== -1) {
                  if (connectedIPs[n].number > 1) {
                    util.warn("Too many connections from the same IP. [" + socket.ip + "]");
                    socket.terminate();
                    return 1;
                  } else connectedIPs[n].number++;
                } else connectedIPs.push({ ip: socket.ip, number: 1 });
              }
            } else {
              util.warn(req.connection.remoteAddress);
              util.warn(req.headers["x-forwarded-for"]);
              socket.terminate();
              util.warn("Inappropiate connection request: header spoofing. Socket terminated.");
              return 1;
            }
            util.log(socket.ip + " is trying to connect...");
            socket.binaryType = "arraybuffer";
            socket.key = "";
            socket.player = { camera: {} };
            socket.timeout = /* @__PURE__ */ (() => {
              let mem = 0;
              let timer = 0;
              return {
                set: (val) => {
                  if (mem !== val) {
                    mem = val;
                    timer = util.time();
                  }
                },
                check: (time) => {
                  return timer && time - timer > c.maxHeartbeatInterval;
                }
              };
            })();
            socket.status = {
              verified: false,
              receiving: 0,
              deceased: true,
              requests: 0,
              hasSpawned: false,
              needsFullMap: true,
              needsFullLeaderboard: true,
              lastHeartbeat: util.time()
            };
            socket.loops = (() => {
              let nextUpdateCall = null;
              let trafficMonitoring = setInterval(() => traffic(socket), 1500);
              let broadcastingGuiStuff = setInterval(() => broadcast(socket), 1e3);
              return {
                setUpdate: (timeout) => {
                  nextUpdateCall = timeout;
                },
                cancelUpdate: () => {
                  clearTimeout(nextUpdateCall);
                },
                terminate: () => {
                  clearTimeout(nextUpdateCall);
                  clearTimeout(trafficMonitoring);
                  clearTimeout(broadcastingGuiStuff);
                }
              };
            })();
            socket.camera = {
              x: void 0,
              y: void 0,
              vx: 0,
              vy: 0,
              lastUpdate: util.time(),
              lastDowndate: void 0,
              fov: 2e3
            };
            socket.makeView = () => {
              socket.view = eyes(socket);
            };
            socket.makeView();
            socket.ban = () => ban(socket);
            socket.kick = (reason) => kick(socket, reason);
            socket.talk = (...message) => {
              if (socket.readyState === socket.OPEN) {
                socket.send(protocol.encode(message), { binary: true });
              }
            };
            socket.lastWords = (...message) => {
              if (socket.readyState === socket.OPEN) {
                socket.send(protocol.encode(message), { binary: true }, () => setTimeout(() => socket.terminate(), 1e3));
              }
            };
            socket.on("message", (message) => incoming(message, socket));
            socket.on("close", () => {
              socket.loops.terminate();
              close(socket);
            });
            socket.on("error", (e) => {
              util.log("[ERROR]:");
              util.error(e);
            });
            socket.spawn = (name) => {
              return spawn(socket, name);
            };
            socket.update = (time) => {
              socket.loops.cancelUpdate();
              socket.loops.setUpdate(setTimeout(() => {
                socket.view.gazeUpon();
              }, time));
            };
            clients.push(socket);
            util.log("[INFO] New socket opened with ", socket.ip);
          };
        })()
      };
    })();
    var gameloop = /* @__PURE__ */ (() => {
      let collide = /* @__PURE__ */ (() => {
        function simplecollide(my, n) {
          let diff = (1 + util.getDistance(my, n) / 2) * roomSpeed;
          let a = my.intangibility ? 1 : my.pushability, b = n.intangibility ? 1 : n.pushability, c2 = 0.05 * (my.x - n.x) / diff, d = 0.05 * (my.y - n.y) / diff;
          my.accel.x += a / (b + 0.3) * c2;
          my.accel.y += a / (b + 0.3) * d;
          n.accel.x -= b / (a + 0.3) * c2;
          n.accel.y -= b / (a + 0.3) * d;
        }
        function firmcollide(my, n, buffer = 0) {
          let item1 = { x: my.x + my.m_x, y: my.y + my.m_y };
          let item2 = { x: n.x + n.m_x, y: n.y + n.m_y };
          let dist = util.getDistance(item1, item2);
          let s1 = Math.max(my.velocity.length, my.topSpeed);
          let s2 = Math.max(n.velocity.length, n.topSpeed);
          let strike1, strike2;
          if (buffer > 0 && dist <= my.realSize + n.realSize + buffer) {
            let repel = (my.acceleration + n.acceleration) * (my.realSize + n.realSize + buffer - dist) / buffer / roomSpeed;
            my.accel.x += repel * (item1.x - item2.x) / dist;
            my.accel.y += repel * (item1.y - item2.y) / dist;
            n.accel.x -= repel * (item1.x - item2.x) / dist;
            n.accel.y -= repel * (item1.y - item2.y) / dist;
          }
          while (dist <= my.realSize + n.realSize && !(strike1 && strike2)) {
            strike1 = false;
            strike2 = false;
            if (my.velocity.length <= s1) {
              my.velocity.x -= 0.05 * (item2.x - item1.x) / dist / roomSpeed;
              my.velocity.y -= 0.05 * (item2.y - item1.y) / dist / roomSpeed;
            } else {
              strike1 = true;
            }
            if (n.velocity.length <= s2) {
              n.velocity.x += 0.05 * (item2.x - item1.x) / dist / roomSpeed;
              n.velocity.y += 0.05 * (item2.y - item1.y) / dist / roomSpeed;
            } else {
              strike2 = true;
            }
            item1 = { x: my.x + my.m_x, y: my.y + my.m_y };
            item2 = { x: n.x + n.m_x, y: n.y + n.m_y };
            dist = util.getDistance(item1, item2);
          }
        }
        function reflectcollide(wall, bounce) {
          let delt = new Vector(wall.x - bounce.x, wall.y - bounce.y);
          let dist = delt.length;
          let diff = wall.size + bounce.size - dist;
          if (diff > 0) {
            bounce.accel.x -= diff * delt.x / dist;
            bounce.accel.y -= diff * delt.y / dist;
            return 1;
          }
          return 0;
        }
        function advancedcollide(my, n, doDamage, doInelastic, nIsFirmCollide = false) {
          let tock = Math.min(my.stepRemaining, n.stepRemaining), combinedRadius = n.size + my.size, motion = {
            _me: new Vector(my.m_x, my.m_y),
            _n: new Vector(n.m_x, n.m_y)
          }, delt = new Vector(
            tock * (motion._me.x - motion._n.x),
            tock * (motion._me.y - motion._n.y)
          ), diff = new Vector(my.x - n.x, my.y - n.y), dir = new Vector((n.x - my.x) / diff.length, (n.y - my.y) / diff.length), component = Math.max(0, dir.x * delt.x + dir.y * delt.y);
          if (component >= diff.length - combinedRadius) {
            let goahead = false, tmin = 1 - tock, tmax = 1, A = Math.pow(delt.x, 2) + Math.pow(delt.y, 2), B = 2 * delt.x * diff.x + 2 * delt.y * diff.y, C = Math.pow(diff.x, 2) + Math.pow(diff.y, 2) - Math.pow(combinedRadius, 2), det = B * B - 4 * A * C, t;
            if (!A || det < 0 || C < 0) {
              t = 0;
              if (C < 0) {
                goahead = true;
              }
            } else {
              let t1 = (-B - Math.sqrt(det)) / (2 * A), t2 = (-B + Math.sqrt(det)) / (2 * A);
              if (t1 < tmin || t1 > tmax) {
                if (t2 < tmin || t2 > tmax) {
                  t = false;
                } else {
                  t = t2;
                  goahead = true;
                }
              } else {
                if (t2 >= tmin && t2 <= tmax) {
                  t = Math.min(t1, t2);
                  goahead = true;
                } else {
                  t = t1;
                  goahead = true;
                }
              }
            }
            if (goahead) {
              my.collisionArray.push(n);
              n.collisionArray.push(my);
              if (t) {
                my.x += motion._me.x * t;
                my.y += motion._me.y * t;
                n.x += motion._n.x * t;
                n.y += motion._n.y * t;
                my.stepRemaining -= t;
                n.stepRemaining -= t;
                diff = new Vector(my.x - n.x, my.y - n.y);
                dir = new Vector((n.x - my.x) / diff.length, (n.y - my.y) / diff.length);
                component = Math.max(0, dir.x * delt.x + dir.y * delt.y);
              }
              let componentNorm = component / delt.length;
              let reductionFactor = 1, deathFactor = {
                _me: 1,
                _n: 1
              }, accelerationFactor = delt.length ? combinedRadius / 4 / (Math.floor(combinedRadius / delt.length) + 1) : 1e-3, depth = {
                _me: util.clamp((combinedRadius - diff.length) / (2 * my.size), 0, 1),
                //1: I am totally within it
                _n: util.clamp((combinedRadius - diff.length) / (2 * n.size), 0, 1)
                //1: It is totally within me
              }, combinedDepth = {
                up: depth._me * depth._n,
                down: (1 - depth._me) * (1 - depth._n)
              }, pen = {
                _me: {
                  sqr: Math.pow(my.penetration, 2),
                  sqrt: Math.sqrt(my.penetration)
                },
                _n: {
                  sqr: Math.pow(n.penetration, 2),
                  sqrt: Math.sqrt(n.penetration)
                }
              }, savedHealthRatio = {
                _me: my.health.ratio,
                _n: n.health.ratio
              };
              if (doDamage) {
                let speedFactor = {
                  // Avoid NaNs and infinities
                  _me: my.maxSpeed ? Math.pow(motion._me.length / my.maxSpeed, 0.25) : 1,
                  _n: n.maxSpeed ? Math.pow(motion._n.length / n.maxSpeed, 0.25) : 1
                };
                let bail = false;
                if (my.shape === n.shape && my.settings.isNecromancer && n.type === "food") {
                  bail = my.necro(n);
                } else if (my.shape === n.shape && n.settings.isNecromancer && my.type === "food") {
                  bail = n.necro(my);
                }
                if (!bail) {
                  let resistDiff = my.health.resist - n.health.resist, damage = {
                    _me: c.DAMAGE_CONSTANT * my.damage * (1 + resistDiff) * (1 + n.heteroMultiplier * (my.settings.damageClass === n.settings.damageClass)) * (my.settings.buffVsFood && n.settings.damageType === 1 ? 3 : 1) * my.damageMultiplier() * Math.min(2, Math.max(speedFactor._me, 1) * speedFactor._me),
                    _n: c.DAMAGE_CONSTANT * n.damage * (1 - resistDiff) * (1 + my.heteroMultiplier * (my.settings.damageClass === n.settings.damageClass)) * (n.settings.buffVsFood && my.settings.damageType === 1 ? 3 : 1) * n.damageMultiplier() * Math.min(2, Math.max(speedFactor._n, 1) * speedFactor._n)
                  };
                  if (my.settings.ratioEffects) {
                    damage._me *= Math.min(1, Math.pow(Math.max(my.health.ratio, my.shield.ratio), 1 / my.penetration));
                  }
                  if (n.settings.ratioEffects) {
                    damage._n *= Math.min(1, Math.pow(Math.max(n.health.ratio, n.shield.ratio), 1 / n.penetration));
                  }
                  if (my.settings.damageEffects) {
                    damage._me *= accelerationFactor * (1 + (componentNorm - 1) * (1 - depth._n) / my.penetration) * (1 + pen._n.sqrt * depth._n - depth._n) / pen._n.sqrt;
                  }
                  if (n.settings.damageEffects) {
                    damage._n *= accelerationFactor * (1 + (componentNorm - 1) * (1 - depth._me) / n.penetration) * (1 + pen._me.sqrt * depth._me - depth._me) / pen._me.sqrt;
                  }
                  let damageToApply = {
                    _me: damage._me,
                    _n: damage._n
                  };
                  if (n.shield.max) {
                    damageToApply._me -= n.shield.getDamage(damageToApply._me);
                  }
                  if (my.shield.max) {
                    damageToApply._n -= my.shield.getDamage(damageToApply._n);
                  }
                  let stuff = my.health.getDamage(damageToApply._n, false);
                  deathFactor._me = stuff > my.health.amount ? my.health.amount / stuff : 1;
                  stuff = n.health.getDamage(damageToApply._me, false);
                  deathFactor._n = stuff > n.health.amount ? n.health.amount / stuff : 1;
                  reductionFactor = Math.min(deathFactor._me, deathFactor._n);
                  my.damageRecieved += damage._n * deathFactor._n;
                  n.damageRecieved += damage._me * deathFactor._me;
                }
              }
              if (nIsFirmCollide < 0) {
                nIsFirmCollide *= -0.5;
                my.accel.x -= nIsFirmCollide * component * dir.x;
                my.accel.y -= nIsFirmCollide * component * dir.y;
                n.accel.x += nIsFirmCollide * component * dir.x;
                n.accel.y += nIsFirmCollide * component * dir.y;
              } else if (nIsFirmCollide > 0) {
                n.accel.x += nIsFirmCollide * (component * dir.x + combinedDepth.up);
                n.accel.y += nIsFirmCollide * (component * dir.y + combinedDepth.up);
              } else {
                let elasticity = 2 - 4 * Math.atan(my.penetration * n.penetration) / Math.PI;
                if (doInelastic && my.settings.motionEffects && n.settings.motionEffects) {
                  elasticity *= savedHealthRatio._me / pen._me.sqrt + savedHealthRatio._n / pen._n.sqrt;
                } else {
                  elasticity *= 2;
                }
                let spring = 2 * Math.sqrt(savedHealthRatio._me * savedHealthRatio._n) / roomSpeed, elasticImpulse = Math.pow(combinedDepth.down, 2) * elasticity * component * my.mass * n.mass / (my.mass + n.mass), springImpulse = c.KNOCKBACK_CONSTANT * spring * combinedDepth.up, impulse = -(elasticImpulse + springImpulse) * (1 - my.intangibility) * (1 - n.intangibility), force = {
                  x: impulse * dir.x,
                  y: impulse * dir.y
                }, modifiers = {
                  _me: c.KNOCKBACK_CONSTANT * my.pushability / my.mass * deathFactor._n,
                  _n: c.KNOCKBACK_CONSTANT * n.pushability / n.mass * deathFactor._me
                };
                my.accel.x += modifiers._me * force.x;
                my.accel.y += modifiers._me * force.y;
                n.accel.x -= modifiers._n * force.x;
                n.accel.y -= modifiers._n * force.y;
              }
            }
          }
        }
        return (collision) => {
          let instance = collision[0], other = collision[1];
          if (other.isGhost) {
            util.error("GHOST FOUND");
            util.error(other.label);
            util.error("x: " + other.x + " y: " + other.y);
            util.error(other.collisionArray);
            util.error("health: " + other.health.amount);
            util.warn("Ghost removed.");
            if (grid.checkIfInHSHG(other)) {
              util.warn("Ghost removed.");
              grid.removeObject(other);
            }
            return 0;
          }
          if (instance.isGhost) {
            util.error("GHOST FOUND");
            util.error(instance.label);
            util.error("x: " + instance.x + " y: " + instance.y);
            util.error(instance.collisionArray);
            util.error("health: " + instance.health.amount);
            if (grid.checkIfInHSHG(instance)) {
              util.warn("Ghost removed.");
              grid.removeObject(instance);
            }
            return 0;
          }
          if (!instance.activation.check() && !other.activation.check()) {
            util.warn("Tried to collide with an inactive instance.");
            return 0;
          }
          if (instance.type === "wall" || other.type === "wall") {
            let a = instance.type === "bullet" || other.type === "bullet" ? 1 + 10 / (Math.max(instance.velocity.length, other.velocity.length) + 10) : 1;
            if (instance.type === "wall") advancedcollide(instance, other, false, false, a);
            else advancedcollide(other, instance, false, false, a);
          } else if (instance.type === "crasher" && other.type === "food" || other.type === "crasher" && instance.type === "food") {
            firmcollide(instance, other);
          } else if (instance.team !== other.team) {
            advancedcollide(instance, other, true, true);
          } else if (instance.settings.hitsOwnType == "never" || other.settings.hitsOwnType == "never") {
          } else if (instance.settings.hitsOwnType === other.settings.hitsOwnType) {
            switch (instance.settings.hitsOwnType) {
              case "push":
                advancedcollide(instance, other, false, false);
                break;
              case "hard":
                firmcollide(instance, other);
                break;
              case "hardWithBuffer":
                firmcollide(instance, other, 30);
                break;
              case "repel":
                simplecollide(instance, other);
                break;
            }
          }
        };
      })();
      function entitiesactivationloop(my) {
        my.collisionArray = [];
        my.activation.update();
        my.updateAABB(my.activation.check());
      }
      function entitiesliveloop(my) {
        if (my.contemplationOfMortality()) my.destroy();
        else {
          if (my.bond == null) {
            logs.physics.set();
            my.physics();
            logs.physics.mark();
          }
          if (my.activation.check()) {
            logs.entities.tally();
            logs.life.set();
            my.life();
            logs.life.mark();
            my.friction();
            my.confinementToTheseEarthlyShackles();
            logs.selfie.set();
            my.takeSelfie();
            logs.selfie.mark();
          }
        }
        my.collisionArray = [];
      }
      let time;
      return () => {
        logs.loops.tally();
        logs.master.set();
        logs.activation.set();
        entities.forEach((e) => entitiesactivationloop(e));
        logs.activation.mark();
        logs.collide.set();
        if (entities.length > 1) {
          grid.update();
          grid.queryForCollisionPairs().forEach((collision) => collide(collision));
        }
        logs.collide.mark();
        logs.entities.set();
        entities.forEach((e) => entitiesliveloop(e));
        logs.entities.mark();
        logs.master.mark();
        purgeEntities();
        room.lastCycle = util.time();
      };
    })();
    var maintainloop = (() => {
      function placeRoids() {
        function placeRoid(type, entityClass) {
          let x = 0;
          let position2;
          do {
            position2 = room.randomType(type);
            x++;
            if (x > 200) {
              util.warn("Could not place some roids.");
              return 0;
            }
          } while (dirtyCheck(position2, 10 + entityClass.SIZE));
          let o = new Entity(position2);
          o.define(entityClass);
          o.team = -101;
          o.facing = ran.randomAngle();
          o.protect();
          o.life();
        }
        let roidcount = room.roid.length * room.width * room.height / room.xgrid / room.ygrid / 5e4 / 1.5;
        let rockcount = room.rock.length * room.width * room.height / room.xgrid / room.ygrid / 25e4 / 1.5;
        let count = 0;
        for (let i = Math.ceil(roidcount); i; i--) {
          count++;
          placeRoid("roid", Class.obstacle);
        }
        for (let i = Math.ceil(roidcount * 0.3); i; i--) {
          count++;
          placeRoid("roid", Class.babyObstacle);
        }
        for (let i = Math.ceil(rockcount * 0.8); i; i--) {
          count++;
          placeRoid("rock", Class.obstacle);
        }
        for (let i = Math.ceil(rockcount * 0.5); i; i--) {
          count++;
          placeRoid("rock", Class.babyObstacle);
        }
        util.log("Placing " + count + " obstacles!");
      }
      placeRoids();
      let spawnBosses = (() => {
        let timer = 0;
        let boss = (() => {
          let i = 0, names = [], bois = [Class.egg], n = 0, begin = "yo some shit is about to move to a lower position", arrival = "Something happened lol u should probably let Neph know this broke", loc = "norm";
          let spawn = () => {
            let spot, m = 0;
            do {
              spot = room.randomType(loc);
              m++;
            } while (dirtyCheck(spot, 500) && m < 30);
            let o = new Entity(spot);
            o.define(ran.choose(bois));
            o.team = -100;
            o.name = names[i++];
          };
          return {
            prepareToSpawn: (classArray, number, nameClass, typeOfLocation = "norm") => {
              n = number;
              bois = classArray;
              loc = typeOfLocation;
              names = ran.chooseBossName(nameClass, number);
              i = 0;
              if (n === 1) {
                begin = "A visitor is coming.";
                arrival = names[0] + " has arrived.";
              } else {
                begin = "Visitors are coming.";
                arrival = "";
                for (let i2 = 0; i2 < n - 2; i2++) arrival += names[i2] + ", ";
                arrival += names[n - 2] + " and " + names[n - 1] + " have arrived.";
              }
            },
            spawn: () => {
              sockets.broadcast(begin);
              for (let i2 = 0; i2 < n; i2++) {
                setTimeout(spawn, ran.randomRange(3500, 5e3));
              }
              setTimeout(() => sockets.broadcast(arrival), 5e3);
              util.log("[SPAWN] " + arrival);
            }
          };
        })();
        return (census) => {
          if (timer > 6e3 && ran.dice(16e3 - timer)) {
            util.log("[SPAWN] Preparing to spawn...");
            timer = 0;
            let choice = [];
            switch (ran.chooseChance(40, 1)) {
              case 0:
                choice = [[Class.elite_destroyer], 2, "a", "nest"];
                break;
              case 1:
                choice = [[Class.palisade], 1, "castle", "norm"];
                sockets.broadcast("A strange trembling...");
                break;
            }
            boss.prepareToSpawn(...choice);
            setTimeout(boss.spawn, 3e3);
          } else if (!census.miniboss) timer++;
        };
      })();
      let spawnCrasher = (census) => {
        if (ran.chance(1 - 0.5 * census.crasher / room.maxFood / room.nestFoodAmount)) {
          let spot, i = 30;
          do {
            spot = room.randomType("nest");
            i--;
            if (!i) return 0;
          } while (dirtyCheck(spot, 100));
          let type = ran.dice(80) ? ran.choose([Class.sentryGun, Class.sentrySwarm, Class.sentryTrap]) : Class.crasher;
          let o = new Entity(spot);
          o.define(type);
          o.team = -100;
        }
      };
      let makenpcs = /* @__PURE__ */ (() => {
        let bots = [];
        return () => {
          let census = {
            crasher: 0,
            miniboss: 0,
            tank: 0
          };
          let npcs = entities.map(function npcCensus(instance) {
            if (census[instance.type] != null) {
              census[instance.type]++;
              return instance;
            }
          }).filter((e) => {
            return e;
          });
          spawnCrasher(census);
          spawnBosses(census);
        };
      })();
      let makefood = (() => {
        let food = [], foodSpawners = [];
        function getFoodClass(level) {
          let a = {};
          switch (level) {
            case 0:
              a = Class.egg;
              break;
            case 1:
              a = Class.square;
              break;
            case 2:
              a = Class.triangle;
              break;
            case 3:
              a = Class.pentagon;
              break;
            case 4:
              a = Class.bigPentagon;
              break;
            case 5:
              a = Class.hugePentagon;
              break;
            default:
              throw "bad food level";
          }
          if (a !== {}) {
            a.BODY.ACCELERATION = 0.015 / (a.FOOD.LEVEL + 1);
          }
          return a;
        }
        let placeNewFood = (position2, scatter, level, allowInNest = false) => {
          let o = nearest(food, position2);
          let mitosis = false;
          let seed = false;
          if (o != null) {
            for (let i = 50; i > 0; i--) {
              if (scatter == -1 || util.getDistance(position2, o) < scatter) {
                if (ran.dice((o.foodLevel + 1) * (o.foodLevel + 1))) {
                  mitosis = true;
                  break;
                } else {
                  seed = true;
                  break;
                }
              }
            }
          }
          if (scatter != -1 || mitosis || seed) {
            if (o != null && (mitosis || seed) && room.isIn("nest", o) === allowInNest) {
              let levelToMake = mitosis ? o.foodLevel : level, place = {
                x: o.x + o.size * Math.cos(o.facing),
                y: o.y + o.size * Math.sin(o.facing)
              };
              let new_o = new Entity(place);
              new_o.define(getFoodClass(levelToMake));
              new_o.team = -100;
              new_o.facing = o.facing + ran.randomRange(Math.PI / 2, Math.PI);
              food.push(new_o);
              return new_o;
            } else if (room.isIn("nest", position2) === allowInNest) {
              if (!dirtyCheck(position2, 20)) {
                o = new Entity(position2);
                o.define(getFoodClass(level));
                o.team = -100;
                o.facing = ran.randomAngle();
                food.push(o);
                return o;
              }
            }
          }
        };
        class FoodSpawner {
          constructor() {
            this.foodToMake = Math.ceil(Math.abs(ran.gauss(0, room.scale.linear * 80)));
            this.size = Math.sqrt(this.foodToMake) * 25;
            let position2 = {};
            let o;
            do {
              position2 = room.gaussRing(1 / 3, 20);
              o = placeNewFood(position2, this.size, 0);
            } while (o == null);
            for (let i = Math.ceil(Math.abs(ran.gauss(0, 4))); i <= 0; i--) {
              placeNewFood(o, this.size, 0);
            }
            this.x = o.x;
            this.y = o.y;
          }
          rot() {
            if (--this.foodToMake < 0) {
              util.remove(foodSpawners, foodSpawners.indexOf(this));
              foodSpawners.push(new FoodSpawner());
            }
          }
        }
        foodSpawners.push(new FoodSpawner());
        foodSpawners.push(new FoodSpawner());
        foodSpawners.push(new FoodSpawner());
        foodSpawners.push(new FoodSpawner());
        let makeGroupedFood = () => {
          let spawner = foodSpawners[ran.irandom(foodSpawners.length - 1)], bubble = ran.gaussRing(spawner.size, 1 / 4);
          placeNewFood({ x: spawner.x + bubble.x, y: spawner.y + bubble.y }, -1, 0);
          spawner.rot();
        };
        let makeDistributedFood = () => {
          let spot = {};
          do {
            spot = room.gaussRing(1 / 2, 2);
          } while (room.isInNorm(spot));
          placeNewFood(spot, 0.01 * room.width, 0);
        };
        let makeCornerFood = () => {
          let spot = {};
          do {
            spot = room.gaussInverse(5);
          } while (room.isInNorm(spot));
          placeNewFood(spot, 0.05 * room.width, 0);
        };
        let makeNestFood = () => {
          let spot = room.randomType("nest");
          placeNewFood(spot, 0.01 * room.width, 3, true);
        };
        return () => {
          let census = {
            [0]: 0,
            // Egg
            [1]: 0,
            // Square
            [2]: 0,
            // Triangle
            [3]: 0,
            // Penta
            [4]: 0,
            // Beta
            [5]: 0,
            // Alpha
            [6]: 0,
            tank: 0,
            sum: 0
          };
          let censusNest = {
            [0]: 0,
            // Egg
            [1]: 0,
            // Square
            [2]: 0,
            // Triangle
            [3]: 0,
            // Penta
            [4]: 0,
            // Beta
            [5]: 0,
            // Alpha
            [6]: 0,
            sum: 0
          };
          food = entities.map((instance) => {
            try {
              if (instance.type === "tank") {
                census.tank++;
              } else if (instance.foodLevel > -1) {
                if (room.isIn("nest", { x: instance.x, y: instance.y })) {
                  censusNest.sum++;
                  censusNest[instance.foodLevel]++;
                } else {
                  census.sum++;
                  census[instance.foodLevel]++;
                }
                return instance;
              }
            } catch (err) {
              util.error(instance.label);
              util.error(err);
              instance.kill();
            }
          }).filter((e) => {
            return e;
          });
          let maxFood = 1 + room.maxFood + 15 * census.tank;
          let maxNestFood = 1 + room.maxFood * room.nestFoodAmount;
          let foodAmount = census.sum;
          let nestFoodAmount = censusNest.sum;
          foodSpawners.forEach((spawner) => {
            if (ran.chance(1 - foodAmount / maxFood)) spawner.rot();
          });
          while (ran.chance(0.8 * (1 - foodAmount * foodAmount / maxFood / maxFood))) {
            switch (ran.chooseChance(10, 2, 1)) {
              case 0:
                makeGroupedFood();
                break;
              case 1:
                makeDistributedFood();
                break;
              case 2:
                makeCornerFood();
                break;
            }
          }
          while (ran.chance(0.5 * (1 - nestFoodAmount * nestFoodAmount / maxNestFood / maxNestFood))) makeNestFood();
          if (!food.length) return 0;
          for (let i = Math.ceil(food.length / 100); i > 0; i--) {
            let o = food[ran.irandom(food.length - 1)], oldId = -1e3, overflow, location;
            for (let j = 0; j < 6; j++) {
              overflow = 10;
              do {
                o = nearest(food, { x: ran.gauss(o.x, 30), y: ran.gauss(o.y, 30) });
              } while (o.id === oldId && --overflow);
              if (!overflow) continue;
              let proportions = c.FOOD, cens = census, amount = foodAmount;
              if (room.isIn("nest", o)) {
                proportions = c.FOOD_NEST;
                cens = censusNest;
                amount = nestFoodAmount;
              }
              o.foodCountup += Math.ceil(Math.abs(ran.gauss(0, 10)));
              while (o.foodCountup >= (o.foodLevel + 1) * 100) {
                o.foodCountup -= (o.foodLevel + 1) * 100;
                if (ran.chance(1 - cens[o.foodLevel + 1] / amount / proportions[o.foodLevel + 1])) {
                  o.define(getFoodClass(o.foodLevel + 1));
                }
              }
            }
          }
        };
      })();
      return () => {
        makenpcs();
        makefood();
        entities.forEach((instance) => {
          if (instance.shield.max) {
            instance.shield.regenerate();
          }
          if (instance.health.amount) {
            instance.health.regenerate(instance.shield.max && instance.shield.max === instance.shield.amount);
          }
        });
      };
    })();
    var speedcheckloop = /* @__PURE__ */ (() => {
      let fails = 0;
      return () => {
        let activationtime = logs.activation.sum(), collidetime = logs.collide.sum(), movetime = logs.entities.sum(), playertime = logs.network.sum(), maptime = logs.minimap.sum(), physicstime = logs.physics.sum(), lifetime = logs.life.sum(), selfietime = logs.selfie.sum();
        let sum = logs.master.record();
        let loops = logs.loops.count(), active = logs.entities.count();
        global.fps = (1e3 / sum).toFixed(2);
        if (sum > 1e3 / roomSpeed / 30) {
          util.warn("~~ LOOPS: " + loops + ". ENTITY #: " + entities.length + "//" + Math.round(active / loops) + ". VIEW #: " + views.length + ". BACKLOGGED :: " + (sum * roomSpeed * 3).toFixed(3) + "%! ~~");
          util.warn("Total activation time: " + activationtime);
          util.warn("Total collision time: " + collidetime);
          util.warn("Total cycle time: " + movetime);
          util.warn("Total player update time: " + playertime);
          util.warn("Total lb+minimap processing time: " + maptime);
          util.warn("Total entity physics calculation time: " + physicstime);
          util.warn("Total entity life+thought cycle time: " + lifetime);
          util.warn("Total entity selfie-taking time: " + selfietime);
          util.warn("Total time: " + (activationtime + collidetime + movetime + playertime + maptime + physicstime + lifetime + selfietime));
          if (fails > 60) {
            util.error("FAILURE!");
          }
        } else {
          fails = 0;
        }
      };
    })();
    var server = http.createServer(app);
    var websockets = (() => {
      let config = { server };
      if (c.servesStatic) {
        server.listen(c.port, function httpListening() {
          util.log(/* @__PURE__ */ new Date() + ". Joint HTTP+Websocket server turned on, listening on port " + server.address().port + ".");
        });
      } else {
        config.port = c.port;
        util.log(/* @__PURE__ */ new Date() + "Websocket server turned on, listening on port " + c.port + ".");
      }
      return new WebSocket.Server(config);
    })().on("connection", sockets.connect);
    setInterval(gameloop, room.cycleSpeed);
    setInterval(maintainloop, 200);
    setInterval(speedcheckloop, 1e3);
    var shutdownWarning = false;
    if (process.platform === "win32") {
      rl = __require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.on("SIGINT", () => {
        process.emit("SIGINT");
      });
    }
    var rl;
    process.on("SIGINT", () => {
      if (!shutdownWarning) {
        shutdownWarning = true;
        sockets.broadcast("The server is shutting down.");
        util.log("Server going down! Warning broadcasted.");
        setTimeout(() => {
          sockets.broadcast("Arena closed.");
          util.log("Final warning broadcasted.");
          setTimeout(() => {
            util.warn("Process ended.");
            process.exit();
          }, 3e3);
        }, 17e3);
      } else {
        util.log("Forcefully shutting down...");
        process.exit();
      }
    });
  }
});
export default require_index();
//# sourceMappingURL=bundle.js.map
