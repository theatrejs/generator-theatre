function Astar(heuristic, diagonal) {

    let nodes;
    let openHeap;
    let world;

    function getNode(position) {

        // define nodes list's whished index
        const nodeIndex = position[0] + world.width * position[1];

        // return whished node if exists otherwise return a new node
        return nodes[nodeIndex] || setNode(null, position);
    }

    function getPath(grid, start, goal) {

        world = {

            'grid': grid,
            'height': grid.length,
            'width': grid[0].length
        };

        let path = [];

        // if start or end positions are not walkable then return empty path
        if (walkable(start) === false
        || walkable(goal) === false) {

            return path;
        }

        nodes = new Array(world.width * world.height);

        const startNode = setNode(null, start);

        // add start node to nodes list
        nodes[start[0] + world.width * start[1]] = startNode;

        // define goal node or retrieve it if it is start node
        const goalNode = getNode(goal);

        // if start node is goal node then return empty path
        if (startNode === goalNode) {

            return path;
        }

        // add goal node to nodes list
        nodes[goal[0] + world.width * goal[1]] = goalNode;

        startNode.heuristic = heuristic(startNode.position, goalNode.position);

        // define open nodes heap descending ordered by sum of node cost and node heuristic
        openHeap = [startNode];

        startNode.opened = true;

        // while open nodes heap contains any node then check the last node
        while (openHeap.length > 0) {

            let currentNode = openHeap.pop();

            // close current node
            currentNode.closed = true;
            currentNode.opened = false;

            // if current node is the goal node then return constructed path
            if (currentNode === goalNode) {

                // while current node has a parent then construct path to the goal
                while (currentNode.parent !== null) {

                    // add current node to the path
                    path.unshift([currentNode.position[0], currentNode.position[1]]);

                    // define current node for next iteration
                    currentNode = currentNode.parent;
                }

                // add start node to the path
                path.unshift([startNode.position[0], startNode.position[1]]);

                // return constructed path from start to the goal
                return path;
            }

            let currentNeighbors = neighbors(currentNode.position, diagonal);

            // treat each current node's neighbor
            while (currentNeighbors.length > 0) {

                // define current neighbor randomly
                const currentNeighborIndex = Math.floor(Math.random() * currentNeighbors.length);
                const currentNeighbor = currentNeighbors[currentNeighborIndex];

                // remove current neighbor from current node's neighbors
                currentNeighbors.splice(currentNeighborIndex, 1);

                const currentNeighborWeight = world.grid[currentNeighbor.position[1]][currentNeighbor.position[0]];
                const currentNeighborEstimatedCost = currentNode.cost + heuristic(currentNode.position, currentNeighbor.position) * currentNeighborWeight;

                // if current neighbor is not opened yet then open it
                if (currentNeighbor.opened === false) {

                    // add current neighbors to nodes list
                    nodes[currentNeighbor.position[0] + world.width * currentNeighbor.position[1]] = currentNeighbor;

                    currentNeighbor.cost = currentNeighborEstimatedCost;
                    currentNeighbor.heuristic = heuristic(currentNeighbor.position, goalNode.position);
                    currentNeighbor.parent = currentNode;

                    // add current neighbor to open nodes heap
                    updateHeap(currentNeighbor);

                    currentNeighbor.opened = true;
                }

                // if current neighbor is already opened then check if current node is a shorter parent to reach from start
                else if (currentNeighborEstimatedCost < currentNeighbor.cost) {

                    // define current neighbor's index in open nodes heap
                    const currentHeapIndex = openHeap.indexOf(currentNeighbor);

                    // remove current neighbor from open nodes heap to update its index
                    openHeap.splice(currentHeapIndex, 1);

                    currentNeighbor.cost = currentNeighborEstimatedCost;
                    currentNeighbor.parent = currentNode;

                    // add current neighbor to open nodes heap to update its index
                    updateHeap(currentNeighbor);
                }
            }
        }

        // return empty path when no path fount
        return path;
    }

    function neighbors(position, diagonal) {

        const x = position[0];
        const y = position[1];

        let neighbors = [];

        // define top, left, right, bottom neighbors' positions
        const orthogonals = [

            [x, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x, y + 1]
        ];

        // find all unclosed walkable orthogonal neighbors
        for (let iterator = 0, length = orthogonals.length; iterator < length; iterator += 1) {

            // if neighbor is walkable and is not closed then store it
            if (walkable(orthogonals[iterator]) === true) {

                const neighbor = getNode(orthogonals[iterator]);

                // if neighbor is not closed then store it
                if (neighbor.closed === false) {

                    neighbors.push(neighbor);
                }
            }
        }

        // if diagonals are allowed
        if (diagonal === true) {

            // define top-left, top-right, bottom-left, bottom-right neighbors' positions
            const diagonals = [

                [x - 1, y - 1],
                [x + 1, y - 1],
                [x - 1, y + 1],
                [x + 1, y + 1]
            ];

            // find all unclosed walkable diagonal neighbors
            for (let iterator = 0, length = diagonals.length; iterator < length; iterator += 1) {

                // if neighbor is walkable and is not closed then store it
                if (walkable(diagonals[iterator]) === true
                && walkable([diagonals[iterator][0], y]) === true
                && walkable([x, diagonals[iterator][1]]) === true) {

                    const neighbor = getNode(diagonals[iterator]);

                    // if neighbor is not closed then store it
                    if (neighbor.closed === false) {

                        neighbors.push(neighbor);
                    }
                }
            }
        }

        // return all valid neighbors
        return neighbors;
    }

    function setNode(parent, position) {

        // return a new node
        return {

            'closed': false,
            'cost': 0,
            'heuristic': 0,
            'opened': false,
            'parent': parent,

            'position': [

                position[0],
                position[1]
            ]
        };
    }

    function updateHeap(newNode) {

        // define default position of the new node into open nodes heap
        let targetIndex = 0;

        // indexing of the new node into open nodes heap
        for (let iterator = openHeap.length - 1; iterator >= 0; iterator -= 1) {

            const currentNode = openHeap[iterator];

            // if new node's cost is lesser than current node's cost then new node's index is after current node's index
            if (currentNode.cost + currentNode.heuristic > newNode.cost + newNode.heuristic
            || currentNode.cost + currentNode.heuristic === newNode.cost + newNode.heuristic
            && currentNode.heuristic >= newNode.heuristic) {

                targetIndex = iterator + 1;

                break;
            }
        }

        // insert new node into open node heap
        openHeap.splice(targetIndex, 0, newNode);
    }

    function walkable(position) {

        const x = position[0];
        const y = position[1];

        // define if position exists in grid and if position is walkable
        return (typeof world.grid[y] !== 'undefined'
        && typeof world.grid[y][x] !== 'undefined'
        && world.grid[y][x] !== 0);
    }

    this.getPath = getPath;
}

// exports current module as an object
export {Astar};
