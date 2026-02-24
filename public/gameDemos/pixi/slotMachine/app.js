"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SlotsContext_1 = __importDefault(require("./slotsMachine/base/SlotsContext"));
const myTable_1 = __importDefault(require("./engine/utils/myTable"));
//base
const gameConfigs_1 = __importDefault(require("./slotsMachine/base/configs/gameConfigs"));
const serviceConfig_1 = __importDefault(require("./slotsMachine/base/configs/serviceConfig"));
const modelConfig_1 = __importDefault(require("./slotsMachine/base/configs/modelConfig"));
const viewConfig_1 = __importDefault(require("./slotsMachine/base/configs/viewConfig"));
const PIXI = __importStar(require("pixi.js"));
const GameTimer_1 = __importDefault(require("./builder/GameTimer"));
const featuresConfig_myMachine_1 = __importDefault(require("./slotsMachine/myMachine/configs/featuresConfig-myMachine"));
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0xAAAAAA,
});
var serverModel = {
    startIndices: [10, 0, 0, 0, 0],
    strips: [
        [1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 8, 8, 8, 3, 2, 1],
        [3, 2, 1, 4, 3, 2, 1, 5, 4, 3, 2, 1, 6, 5, 4, 3, 2, 1, 7, 6, 5, 4, 3, 3]
    ],
    schemaToReelMap: [[0, 2, 3, 4], [1]] //this means reels 0-4 use strip 0
};
var params = {
    params: {
        modelFile: myTable_1.default.override(modelConfig_1.default, featuresConfig_myMachine_1.default.machine.model),
        viewFile: viewConfig_1.default,
        controlFile: gameConfigs_1.default,
        serviceFile: serviceConfig_1.default,
        basePath: "",
        serverModel: serverModel,
        assetVer: 0,
        stage: app.stage
    },
    featuresConfig: featuresConfig_myMachine_1.default
};
var context = new SlotsContext_1.default(params);
// Append the app's view to the DOM
document.body.appendChild(app.view);
GameTimer_1.default.init(24);
app.ticker.add(() => {
    const ticker = PIXI.Ticker.shared;
    var deltaMS = ticker.deltaMS / 1000;
    context.update(deltaMS);
    GameTimer_1.default.update();
});
/*
let lastTimestamp:number = 0;

function updateFunction(timestamp:number) {
  // Calculate the time delta since the last frame in seconds
  const dt = (timestamp - lastTimestamp) / 1000; // Convert to seconds
  lastTimestamp = timestamp;
  context.update(dt);
  requestAnimationFrame(updateFunction);
}

// Start the loop
requestAnimationFrame(updateFunction);
*/
