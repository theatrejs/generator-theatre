function Circle(x, y, radius) {

    this.radius = radius;
    this.x = x;
    this.y = y;
}

function Point(x, y) {

    this.x = x;
    this.y = y;
}

function Rectangle(x, y, width, height) {

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
}

function Segment(xa, ya, xb, yb) {

    this.xa = xa;
    this.xb = xb;
    this.ya = ya;
    this.yb = yb;
}

// exports current module as objects
export {Circle, Point, Rectangle, Segment};
