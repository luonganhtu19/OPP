let c = document.getElementById("myGame");
let ctx = c.getContext("2d");
let GAME_WIDTH = 600;
let GAME_HEIGHT = 600;
let speedPlayer = 20;
const GAME_STATE = {
    MENU: 0,
    START: 1,
    OVER: 2
}
let gameState = GAME_STATE.MENU;
let timeLoop = 0;
let difficult = 10;
var Keys = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    INSERT: 45,
    DELETE: 46,
    KEY_0: 48,
    KEY_1: 49,
    KEY_2: 50,
    KEY_3: 51,
    KEY_4: 52,
    KEY_5: 53,
    KEY_6: 54,
    KEY_7: 55,
    KEY_8: 56,
    KEY_9: 57,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_E: 69,
    KEY_F: 70,
    KEY_G: 71,
    KEY_H: 72,
    KEY_I: 73,
    KEY_J: 74,
    KEY_K: 75,
    KEY_L: 76,
    KEY_M: 77,
    KEY_N: 78,
    KEY_O: 79,
    KEY_P: 80,
    KEY_Q: 81,
    KEY_R: 82,
    KEY_S: 83,
    KEY_T: 84,
    KEY_U: 85,
    KEY_V: 86,
    KEY_W: 87,
    KEY_X: 88,
    KEY_Y: 89,
    KEY_Z: 90,
    LEFT_META: 91,
    RIGHT_META: 92,
    SELECT: 93,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SUBTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145,
    SEMICOLON: 186,
    EQUALS: 187,
    COMMA: 188,
    DASH: 189,
    PERIOD: 190,
    FORWARD_SLASH: 191,
    GRAVE_ACCENT: 192,
    OPEN_BRACKET: 219,
    BACK_SLASH: 220,
    CLOSE_BRACKET: 221,
    SINGLE_QUOTE: 222
};
let soccer = 0;
// let check=2;
// let check2=1;
class Player {
    constructor(ctx) {
        this.ammo = 4;
        this.hp = 4;
        this.speed = 5;
        this.position = {
            x: GAME_HEIGHT / 2 - 16,
            y: 580
        }
        this.size = {
            w: 20,
            h: 20
        }
        this.ctx = ctx;
    }

    moveHorizontal(speed) {
        this.position.x += speed;
    }

    moveVertical(speed) {
        this.position.y += speed;
    }

    imgDraw() {
        this.ctx.beginPath();
        ctx.strokeRect(this.position.x, this.position.y, 20, 20)
        this.ctx.closePath();
    }
}

class Bullet {
    constructor(x, y, speed, ctx) {
        this.postion = {
            x: x + 10,
            y: y
        }
        this.radius = 5;
        this.speed = speed;
        this.ctx = ctx;
        // console.log(bulletArr)
    }

    bulletUp() {
        this.postion.y -= this.speed;
        this.drawBullet();
    }

    drawBullet() {
        this.ctx.beginPath();
        this.ctx.arc(this.postion.x, this.postion.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#ff0000"
        this.ctx.stroke();
        // if(check2==1) {
        //     console.log(this.postion.x + " x:y " + this.postion.y+"bull")
        //     check2=0;
        // }
    }

    calculator(x, y) {
        return Math.sqrt(x ** 2 + y ** 2)
    }
}

class Enemy {
    constructor(ctx, size, speed) {
        this.ctx = ctx;
        this.speed = speed;
        this.size = {
            w: size,
            h: size
        };
        this.position = {
            x: Math.floor(Math.random() * 405 + 80),
            y: 0
        }
    }

    move() {
        this.position.y += this.speed;
        this.drawEnemy();
    }

    drawEnemy() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#800000"
        this.ctx.fillRect(this.position.x, this.position.y, 15, 15)
        this.ctx.stroke();

        // if(check==1||check==2) {
        //     console.log(this.position.x+" : "+this.position.y+"check"+check)
        //     check--;
        // }
    }
}

// 2obj is Rect
function detecCollisionRect(obj1, obj2) {
    let xObj1 = obj1.position.x;
    let xObj2 = obj2.position.x;
    if (obj2.position.y >= 580 - obj2.size.w+15) {
        console.log(1)
        if (xObj1 >= xObj2 && xObj1 <= xObj2 + obj2.size.w) {
console.log("1")
            return true;
        } else if ((xObj1 + obj1.size.w) >= xObj2 && (xObj1 + obj1.size.w) <= (xObj2 + obj2.size.w)) {
            console.log("2")
                return true;
        } else {
            return false;
        }
    }
}

// 2obj is Rect Arc
    function detecCollisionArcRect(arc, rect) {
        //tam diem
        let xPointC = rect.position.x - arc.radius;
        let yPointC = rect.position.y + rect.size.h;
        let xPointD = rect.position.x + rect.size.w + arc.radius;
        let yPointD = rect.position.y + rect.size.h;

        if (arc.postion.x > xPointC && arc.postion.x < xPointD) {
            // console.log("D: "+xPointD+" C:"+xPointC+" :arc" +arc.postion.x)
            if (yPointC >= (arc.postion.y + arc.radius)) {
                return true;
            }
        }
    }

    let player = new Player(ctx);
    const bulletArr = [];
    const enemyArr = [];

// const countBullet=0;

    function input() {
        document.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case Keys.LEFT_ARROW:
                    if (player.position.x < 100) {
                        player.position.x = 100;
                    }
                    player.moveHorizontal(-speedPlayer);
                    break;
                case Keys.RIGHT_ARROW:
                    if (player.position.x > 460) {
                        player.position.x = 458
                    }
                    player.moveHorizontal(speedPlayer)
                    break;
                case Keys.SPACE:
                    if (gameState == GAME_STATE.MENU) {
                        gameState = GAME_STATE.START
                        break;
                    }
                    let bullet = new Bullet(player.position.x, player.position.y, 10, ctx)
                    bulletArr.push(bullet);
            }
        })
    }

    input()

    function boderDraw() {
        ctx.beginPath();
        ctx.moveTo(78, 0);
        ctx.lineTo(78, 600)
        ctx.stroke();
        ctx.moveTo(500, 0);
        ctx.lineTo(500, 600)
        ctx.stroke();
        ctx.moveTo(78, 600);
        ctx.lineTo(500, 600);
        ctx.stroke();
        ctx.closePath();

    }

    function spawnEnemy() {
        if (enemyArr.length <= 20 && timeLoop >= difficult) {
            let enemy = new Enemy(ctx, 15, 3)
            enemyArr.push(enemy);
            timeLoop = 0;
        }
        enemyArr.forEach((enemy, index) => {
                enemy.move();
                if (enemy.position.y > 600) {
                    enemyArr.splice(index, 1)
                }
                if (detecCollisionRect(player, enemy)) {
                    return gameState = GAME_STATE.OVER;
                }
                bulletArr.forEach((bullet, bulletCount) => {
                    if (detecCollisionArcRect(bullet, enemy)) {
                        enemyArr.splice(index, 1)
                        bulletArr.splice(bulletCount, 1);
                        soccer++;
                    }
                })
            }
        )
    }

// function gameDifficult() {
//     if (difficult<=25){
//         difficult=15;
//     }else {
//         difficult=-5
//     }
// }
    function gameStart() {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        boderDraw()
        bulletArr.forEach(item => {
            item.bulletUp();
        });
        player.imgDraw()
        spawnEnemy()
        clearBulletArr()
        timeLoop++;
    }

    function clearBulletArr() {
        for (let i = 0; i < bulletArr.length; i++) {
            if (bulletArr[i].postion.y < 0) {
                bulletArr.splice(i, 1);
            }
        }
    }

    function gameInit() {
        switch (gameState) {
            case GAME_STATE.MENU:
                ctx.rect(0, 0, GAME_WIDTH * 2, GAME_HEIGHT * 2);
                ctx.fillStyle = "#000";
                ctx.fill();

                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Press SPACE To Start", GAME_WIDTH / 2, GAME_HEIGHT / 2)
                break;
            case GAME_STATE.START:
                gameStart();
                break;
            case GAME_STATE.OVER:
                ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                ctx.fillStyle = "#000";
                ctx.fill();

                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2)
                ctx.fillText(`Sore: ${soccer}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);
                break;
        }

    }

    setInterval(gameInit, 1000 / 60);