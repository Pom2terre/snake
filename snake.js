class Snake {
    constructor() {
        this.pos = createVector(0, 0);           // pos = vector defining our position on the graphic
        this.xSpeed = SCL;                       // initialize x velocity to SCL i.e. move right on X axis
        this.ySpeed = 0;                         // don't move down
        this.size = SCL;                         // initialize the size of the snake
        this.total = 0;                          // total number of fodd items eaten
        this.tail = [];                          // tail is empty as no food has been eaten yet.
    }

    update() {
        if(this.total === this.tail.length) {    // we just pick a new food item !!
            for (var i=0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i+1];   // shift position within tail and make tail index (length - 1) empty
            }
        }

        if(this.total > 0) {                     // we already eated something
            this.tail[this.total - 1] = this.pos.copy();    // save current position in snake.tail[]
        }

        const tempX = this.xSpeed + this.pos.x;
        const tempY = this.ySpeed + this.pos.y;
        this.pos.x = constrain(tempX, 0, width - this.size);
        this.pos.y = constrain(tempY, 0, height - this.size);
        this.show();
        this.looseTail();
    }

    setMoveDir(xDir, yDir) {
        this.xSpeed = xDir * SCL;
        this.ySpeed = yDir * SCL;
    }

    show() {
        stroke(51);                              // draw a border line around each rectangle
        fill(255);                               // set color to white
        for (var i=0; i < this.tail.length; i++) {  
            rect(this.tail[i].x, this.tail[i].y, this.size, this.size); // draw the tail
        }
        rect(this.pos.x, this.pos.y, this.size, this.size);   // draw snake's head @(x, y), width = SCL; length = SCL
    }

    eatsFood(foodVector) {
        const d = this.pos.dist(foodVector);     // calculate distance between current pos and food position.
        if (d <= 1) {                            // distance <= 1px?
            this.total++;                        // 1 additional food item eated  
            return true;
        }
        return false;
    }

    looseTail() {
        for (var i = 0; i < this.tail.length; i++) {
            const pos = this.tail[i];
            const d = this.pos.dist(pos);
            if (d <= 1) {                        // he's biting his tail!
                this.tail = [];
                this.total = 0;
                return true;
            }
        }
        return false;
    }

}