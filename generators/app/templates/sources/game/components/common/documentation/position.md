# Position

This Component stores the position of the Entity.

> *This is a Component to use by an Entity in an Entity-Component-System design pattern.*

## Usage

Create an instance of the Component :

```javascript
// creates an instance of the Component
const positionComponent = new Position(0, 0, 0);
```

###### Properties :

| property  | name | type     | mandatory | default | description                  |
| --------- | ---- | -------- | --------- | ------- | ---------------------------- |
| parameter | `x`  | `number` | yes       |         | the x position of the hitbox |
| parameter | `y`  | `number` | yes       |         | the y position of the hitbox |
| parameter | `z`  | `number` | no        | 0       | the z position of the hitbox |

## API

The instance of the Component will expose the following API :

| property        | description                                      |
| --------------- | ------------------------------------------------ |
| [`name`](#name) | gives you access to the name of the Component    |
| [`x`](#x)       | gives you access to the x position of the Entity |
| [`y`](#y)       | gives you access to the y position of the Entity |
| [`z`](#z)       | gives you access to the z position of the Entity |

---

#### `name`

Gives you access to the name of the Component.

###### Usage :

```javascript
// gets 'position'
const name = positionComponent.name;
```

---

#### `x`

Gives you access to the x position of the Entity.

###### Usage :

```javascript
// gets the x position of the Entity
const x = positionComponent.x;
```

---

#### `y`

Gives you access to the y position of the Entity.

###### Usage :

```javascript
// gets the y position of the Entity
const y = positionComponent.y;
```

---

#### `z`

Gives you access to the z position of the Entity.

###### Usage :

```javascript
// gets the z position of the Entity
const z = positionComponent.z;
```
