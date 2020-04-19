# Fade

This Component stores the fading properties of the opacity of the Entity.

> *This is a Component to use by an Entity in an Entity-Component-System design pattern.*

## Usage

Create an instance of the Component :

```javascript
// creates an instance of the Component
const fadeComponent = new Fade(0.8, 800, easing, ending);
```

###### Properties :

| property  | name       | type                | mandatory | default        | description                                |
| --------- | ---------- | ------------------- | --------- | -------------- | ------------------------------------------ |
| parameter | `opacity`  | `positive number`   | yes       |                | the target opacity within a `[0, 1]` range |
| parameter | `duration` | `positive number`   | yes       |                | the duration of the fading                 |
| parameter | `easing`   | `function`          | no        | Ease.linear(1) | the easing function of the fading          |
| parameter | `ending`   | `function or false` | no        | false          | the ending function of the fading          |

## API

The instance of the Component will expose the following API :

TODO

| property                | description                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| [`name`](#name)         | gives you access to the name of the Component                                                         |
| [`duration`](#duration) | gives you access to the duration of the fading                                                        |
| [`easing`](#easing)     | gives you access to the easing function of the fading                                                 |
| [`elapsed`](#elapsed)   | gives you access to the elapsed time of the fading                                                    |
| [`ending`](#ending)     | gives you access to the ending function of the fading                                                 |
| [`fade`](#fade)         | gives you access to the difference between the beginning opacity and the ending opacity of the fading |
| [`faded`](#faded)       | gives you access to the faded value of the fading                                                     |
| [`opacity`](#opacity)   | gives you access to the target opacity of the fading                                                  |

---

#### `name`

Gives you access to the name of the Component.

###### Usage :

```javascript
// gets 'fade'
const name = fadeComponent.name;
```

---

#### `duration`

Gives you access to the duration of the fading.

###### Usage :

```javascript
// gets the duration of the fading
const duration = fadeComponent.duration;
```

---

#### `easing`

Gives you access to the easing function of the fading.

###### Usage :

```javascript
// gets the easing function of the fading
const easing = fadeComponent.easing;
```

---

#### `elapsed`

Gives you access to the elapsed time of the fading.

###### Usage :

```javascript
// gets the elapsed time of the fading
const elapsed = fadeComponent.elapsed;
```

---

#### `ending`

Gives you access to the ending function of the fading.

###### Usage :

```javascript
// gets the ending function of the fading
const ending = fadeComponent.ending;
```

---

#### `fade`

Gives you access to the difference between the beginning opacity and the ending opacity of the fading.

###### Usage :

```javascript
// gets difference between the beginning opacity and the ending opacity of the fading
const fade = fadeComponent.fade;
```

---

#### `faded`

Gives you access to the faded value of the fading.

###### Usage :

```javascript
// gets the faded value of the fading
const faded = fadeComponent.faded;
```

---

#### `opacity`

Gives you access to the target opacity of the fading.

###### Usage :

```javascript
// gets the target opacity of the fading
const opacity = fadeComponent.opacity;
```

---

TODO
