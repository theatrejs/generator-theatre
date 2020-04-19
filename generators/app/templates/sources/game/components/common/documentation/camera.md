# Camera

This Component stores a reference of a camera to render the Entity.

> *This is a Component to use by an Entity in an Entity-Component-System design pattern.*

## Usage

Create an instance of the Component :

```javascript
// creates an instance of the Component
const cameraComponent = new Camera(camera, 0.8);
```

###### Properties :

| property  | name      | type              | mandatory | default | description                                |
| --------- | --------- | ----------------- | --------- | ------- | ------------------------------------------ |
| parameter | `camera`  | `object`          | yes       |         | the reference of the camera to use         |
| parameter | `opacity` | `positive number` | no        | 1       | the opacity to use within a `[0, 1]` range |

## API

The instance of the Component will expose the following API :

| property              | description                                          |
| --------------------- | ---------------------------------------------------- |
| [`name`](#name)       | gives you access to the name of the Component        |
| [`camera`](#camera)   | gives you access to the reference of the camera used |
| [`opacity`](#opacity) | gives you access to the opacity used                 |

---

#### `name`

Gives you access to the name of the Component.

###### Usage :

```javascript
// gets 'camera'
const name = cameraComponent.name;
```

---

#### `camera`

Gives you access to the reference of the camera used.

###### Usage :

```javascript
// gets the reference of the camera
const camera = cameraComponent.camera;
```

---

#### `opacity`

Gives you access to the opacity used.

###### Usage :

```javascript
// gets the opacity
const opacity = cameraComponent.opacity;
```
