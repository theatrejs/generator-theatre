function Boundary(rectangle) {

    function contains(point) {

        return point.x >= this.x
        && point.x <= this.x + this.width
        && point.y >= this.y
        && point.y <= this.y + this.height;
    }

    function intersects(range) {

        return !(range.x + range.width < this.x
        || range.x > this.x + this.width
        || range.y + range.height < this.y
        || range.y > this.y + this.height);
    }

    this.height = rectangle.height;
    this.width = rectangle.width;
    this.x = rectangle.x;
    this.y = rectangle.y;

    this.contains = contains;
    this.intersects = intersects;
}

function Point(x, y) {

    this.x = x;
    this.y = y;
}

function Quadtree(rectangle, capacity, depth) {

    const boundary = new Boundary(rectangle);

    let children = null;
    let items = [];

    function add(point, data = null) {

        if (boundary.contains(point) === false) {

            return false;
        }

        if (items !== null
        && children === null) {

            if (items.length < capacity
            || depth <= 1) {

                items.push({

                    'point': point,
                    'data': data
                });

                return true;
            }

            if (items.length === capacity) {

                subdivide.call(this, boundary, capacity, depth);

                items.forEach((item) => {

                    for (let iterator = 0, length = children.length; iterator < length; iterator += 1) {

                        const insertion = children[iterator].add(item.point, item.data);

                        if (insertion === true) {

                            break;
                        }
                    }
                });

                items = null;
            }
        }

        children.forEach((child) => {

            if (child.add(point, data) === true) {

                return true;
            }
        });
    }

    function search(rectangle) {

        const range = new Boundary(rectangle);

        let found = [];

        if (boundary.intersects(range) === false) {

            return found;
        }

        if (items !== null
        && children === null) {

            items.forEach((item) => {

                if (range.contains(item.point) === true) {

                    found.push(item);
                }

            });

            return found;
        }

        if (items === null
        && children !== null) {

            children.forEach((child) => {

                found = found.concat(child.search(range));
            });

            return found;
        }
    }

    function subdivide(boundary, capacity, depth) {

        const x = boundary.x;
        const y = boundary.y;
        const width = boundary.width;
        const height = boundary.height;

        children = [

            new Quadtree(new Rectangle(x, y, width / 2, height / 2), capacity, depth - 1),
            new Quadtree(new Rectangle(x + width / 2, y, width / 2, height / 2), capacity, depth - 1),
            new Quadtree(new Rectangle(x, y + height / 2, width / 2, height / 2), capacity, depth - 1),
            new Quadtree(new Rectangle(x + width / 2, y + height / 2, width / 2, height / 2), capacity, depth - 1)
        ];
    }

    function trace() {

        const quadtree = {

            'boundary': boundary
        };

        if (items !== null
        && children === null) {

            quadtree.items = items;
        }

        else if (items === null
        && children !== null) {

            quadtree.children = children.map((child) => {

                return child.trace();
            });
        }

        return quadtree;
    }

    this.add = add;
    this.search = search;
    this.trace = trace;
}

function Rectangle(x, y, width, height) {

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
}

export {

    // exports current module as an object
    Quadtree,

    // exports helpers for current module
    Point, Rectangle
};
