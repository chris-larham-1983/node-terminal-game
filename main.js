const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }

    get field() {
        return this._field;
    }

    print() {
        let fieldGrid = "";
        for(let outerIndex = 0; outerIndex < this._field.length; outerIndex++) {
            for(let innerIndex = 0; innerIndex < this._field[outerIndex].length; innerIndex++) {
                fieldGrid += this._field[outerIndex][innerIndex];
            }
            fieldGrid += '\n';
        }
        console.log(fieldGrid);
    }

    get fieldHeight() {
        return this._field.length;
    }

    get fieldWidth() {
        return this._field[0].length;
    }

    static generateField(height, width, percentage) {
        let gameField = [];
        let hatPositionY = 0;
        let hatPositionX = 0;
        let fieldArea = width * height;
        let numHoles = Math.round((fieldArea / 100) * percentage);
        let holesPerLine = Math.round(numHoles / height);
        while(hatPositionY === 0) {
            hatPositionY = Math.floor(Math.random() * height);
        }
        while(hatPositionX === 0) {
            hatPositionX = Math.floor(Math.random() * width);
        }
        for(let outerIndex = 0; outerIndex < height; outerIndex++) {
            gameField[outerIndex] = [];
            let accumulatedHoles = 0;
            for(let innerIndex = 0; innerIndex < width; innerIndex++) {
                if(outerIndex === 0 & innerIndex === 0) {
                    gameField[outerIndex][innerIndex] = pathCharacter;
                }
                else if((outerIndex === 0 && innerIndex < 2) || (outerIndex === 1 && innerIndex < 3) || (outerIndex === 2 && gameField[1][innerIndex - 1] === hole) || (outerIndex === 2 && gameField[1][innerIndex] === hole) || (outerIndex === 2 && gameField[1][innerIndex + 1] === hole)) {
                    gameField[outerIndex][innerIndex] = fieldCharacter;
                }
                else if(accumulatedHoles < holesPerLine) {
                    let randomNum = Math.round(Math.random() * 2);
                    if(randomNum === 0) {
                        gameField[outerIndex][innerIndex] = hole;
                        accumulatedHoles++;
                    }
                    else {
                        gameField[outerIndex][innerIndex] = fieldCharacter;
                    }
                }
                else {
                    gameField[outerIndex][innerIndex] = fieldCharacter;
                }
            }
        }
        gameField[hatPositionY][hatPositionX] = hat;
        if(gameField[hatPositionY - 1][hatPositionX] === hole && gameField[hatPositionY][hatPositionX + 1] === hole && gameField[hatPositionY + 1][hatPositionX] === hole && gameField[hatPositionY][hatPositionX - 1] === hole) {
            let randomNum = Math.floor(Math.random() * 4);
            if(randomNum === 0) {
                gameField[hatPositionY - 1][hatPositionX] === fieldCharacter;
            } else if(randomNum === 1) {
                gameField[hatPositionY][hatPositionX + 1] === fieldCharacter;
            } else if(randomNum === 2) {
                gameField[hatPositionY + 1][hatPositionX] === fieldCharacter;
            } else {
                gameField[hatPositionY][hatPositionX - 1] === fieldCharacter;
            }
        }
        return gameField;
    }
}

let generatedField;
let gameField;
let yCoordinate = 0;
let xCoordinate = 0;
let foundHat = false;
let height;
let width;

function setup() {
    let mode = prompt("Select a difficulty level: 'e' (easy), 'm' (medium), 'h' (hard)");
    if(mode === 'e') {
        height = 10;
        width = 10;
    }
    else if(mode === 'm') {
        height = 15;
        width = 15;
    }
    else if(mode === 'h') {
        height = 25;
        width = 25;
    }
    else if(mode !== 'e' && mode !== 'm' && mode !== 'h') {
        console.log("Please enter 'e', 'm', or 'h'.");
        setup();
    }
    process.stdout.write('\x1Bc');
    generatedField = Field.generateField(height, width, 20);
    gameField = new Field(generatedField);
    gameLoop();
}

function gameLoop() {
    gameField.print();
    while(!foundHat) {
        let direction = prompt("Move: up ('u'), down ('d'), left ('l'), or right ('r'):");
        if(direction === 'u') {
            if(yCoordinate === 0) {
                console.log("OUT OF BOUNDS! GAME OVER.");
                break;
            }
            else {
                yCoordinate -= 1;
                if(gameField.field[yCoordinate][xCoordinate] === hat) {
                    console.log("Congratulations, you found your hat!");
                    break;
                }
                else if(gameField.field[yCoordinate][xCoordinate] === hole) {
                    console.log("Sorry, you fell down a hole!");
                    break;
                }
                else {
                    gameField.field[yCoordinate][xCoordinate] = pathCharacter;
                }
            }
        }
        else if(direction === 'd') {
            if(yCoordinate === gameField.fieldHeight - 1) {
                console.log("OUT OF BOUNDS! GAME OVER.");
                break;
            }
            else {
                yCoordinate += 1;
                if(gameField.field[yCoordinate][xCoordinate] === hat) {
                    console.log("Congratulations, you found your hat!");
                    break;
                }
                else if(gameField.field[yCoordinate][xCoordinate] === hole) {
                    console.log("Sorry, you fell down a hole!");
                    break;
                }
                else {
                    gameField.field[yCoordinate][xCoordinate] = pathCharacter;
                }
            }
        }
        else if(direction === 'l') {
            if(xCoordinate === 0) {
                console.log("OUT OF BOUNDS! GAME OVER.");
                break;
            }
            else {
                xCoordinate -= 1;
                if(gameField.field[yCoordinate][xCoordinate] === hat) {
                    console.log("Congratulations, you found your hat!");
                    break;
                }
                else if(gameField.field[yCoordinate][xCoordinate] === hole) {
                    console.log("Sorry, you fell down a hole!");
                    break;
                }
                else {
                    gameField.field[yCoordinate][xCoordinate] = pathCharacter;
                }
            }
        }
        else if(direction === 'r') {
            if(xCoordinate === gameField.fieldWidth - 1) {
                console.log("OUT OF BOUNDS! GAME OVER.");
                break;
            }
            else {
                xCoordinate += 1;
                if(gameField.field[yCoordinate][xCoordinate] === hat) {
                    console.log("Congratulations, you found your hat!");
                    break;
                }
                else if(gameField.field[yCoordinate][xCoordinate] === hole) {
                    console.log("Sorry, you fell down a hole!");
                    break;
                }
                else {
                    gameField.field[yCoordinate][xCoordinate] = pathCharacter;
                }
            }
        }
        else if(direction !== 'u' && direction !== 'd' && direction !== 'l' && direction !== 'r') {
        }
        process.stdout.write('\x1Bc');
        gameField.print();
    }
}

setup();






