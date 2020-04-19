# Hitbox

This Component stores the hitbox of the Entity.

> *This is a Component to use by an Entity in an Entity-Component-System design pattern.*

## Usage

Create an instance of the Component :

```javascript
// creates an instance of the Component
const hitboxComponent = new Hitbox(8, 16);
```

###### Properties :

| property  | name     | type               | mandatory | default | description              |
| --------- | -------- | ------------------ | --------- | ------- | ------------------------ |
| parameter | `width`  | `positive integer` | yes       |         | the width of the hitbox  |
| parameter | `height` | `positive integer` | yes       |         | the height of the hitbox |

## API

The instance of the Component will expose the following API :

| property            | description                                   |
| ------------------- | --------------------------------------------- |
| [`name`](#name)     | gives you access to the name of the Component |
| [`width`](#width)   | gives you access to the width of the Entity   |
| [`height`](#height) | gives you access to the height of the Entity  |

---

#### `name`

Gives you access to the name of the Component.

###### Usage :

```javascript
// gets 'hitbox'
const name = hitboxComponent.name;
```

---

#### `width`

Gives you access to the width of the Entity.

###### Usage :

```javascript
// gets the width of the Entity
const width = hitboxComponent.width;
```

---

#### `height`

Gives you access to the height of the Entity.

###### Usage :

```javascript
// gets the height of the Entity
const height = hitboxComponent.height;
```
