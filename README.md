# d3-transition

A transition is a [selection](https://github.com/d3/d3-selection)-like interface to animate changes to DOM elements smoothly over time, instead of applying those changes instantaneously. To start a transition, select some elements, call [*selection*.transition](#selection_transition), and then apply the desired transition methods. For example:

```js
d3.select("body")
  .transition()
    .style("background-color", "red");
```

While transitions and selections share many similar methods, they operate somewhat differently; see below for details.

D3 has many [built-in interpolators](https://github.com/d3/d3-interpolate) to tween arbitrary values. For example, you can transition from the font `500 12px sans-serif` to `300 42px sans-serif`, and D3 will find the numbers embedded within the string, interpolating both font size and weight automatically. To specify a custom interpolator, use [*transition*.attrTween](#transition_attrTween), [*transition*.styleTween](#transition_styleTween) or [*transition*.tween](#transition_tween).

Only one transition of a given name may be *active* on a given element at a given time. However, multiple transitions with different names may be simultaneously active on the element, and multiple transitions with the same name may be *scheduled* on the element, provided they do not overlap in time. See [*transition*.transition](#transition_transition), for example.

If a newer transition starts on a given element, it automatically interrupts any active transition and cancels any pending transitions. This allows new transitions to supersede old transitions, such as in response to a user event, even if the old transitions were delayed. To manually interrupt transitions, use [*selection*.interrupt](#selection_interrupt). To run multiple transitions simultaneously on a given element or elements, give each transition a [unique name](#selection_transition).

For more on transitions, see [Working with Transitions](http://bost.ocks.org/mike/transition/).

## Installing

If you use NPM, `npm install d3-transition`. Otherwise, download the [latest release](https://github.com/d3/d3-transition/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3js.org](https://d3js.org):

```html
<script src="https://d3js.org/d3-color.v0.4.min.js"></script>
<script src="https://d3js.org/d3-dispatch.v0.4.min.js"></script>
<script src="https://d3js.org/d3-ease.v0.7.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v0.5.min.js"></script>
<script src="https://d3js.org/d3-selection.v0.6.min.js"></script>
<script src="https://d3js.org/d3-timer.v0.3.min.js"></script>
<script src="https://d3js.org/d3-transition.v0.0.min.js"></script>
```

In a vanilla environment, a `d3_transition` global is exported. [Try d3-transition in your browser.](https://tonicdev.com/npm/d3-transition)

## API Reference

* [Selecting Elements](#selecting-elements)
* [Modifying Elements](#modifying-elements)
* [Timing](#timing)
* [Control Flow](#control-flow)

### Selecting Elements

<a name="selection_transition" href="#selection_transition">#</a> <i>selection</i>.<b>transition</b>([<i>name</i>])

…

<a name="selection_interrupt" href="#selection_interrupt">#</a> <i>selection</i>.<b>interrupt</b>([<i>name</i>])

…

<a name="transition" href="#transition">#</a> d3.<b>transition</b>([<i>name</i>])

Equivalent to:

```js
d3.selection().transition(name)
d3.select(document.documentElement).transition(name)
```

Also, d3.transition can be used to check whether something is an `instanceof` a transition, and to extend or modify the transition prototype.

<a name="transition_select" href="#transition_select">#</a> <i>transition</i>.<b>select</b>(<i>selector</i>)

…

<a name="transition_selectAll" href="#transition_selectAll">#</a> <i>transition</i>.<b>selectAll</b>(<i>selector</i>)

…

<a name="transition_filter" href="#transition_filter">#</a> <i>transition</i>.<b>filter</b>(<i>filter</i>)

…

<a name="transition_transition" href="#transition_transition">#</a> <i>transition</i>.<b>transition</b>()

…

<a name="active" href="#active">#</a> d3.<b>active</b>(<i>node</i>[, <i>name</i>])

Returns the active transition on the specified *node* with the specified *name*, if any. If no *name* is specified, the default empty name is used. Returns null if there is no such active transition on the specified node.

### Modifying Elements

…

<a name="transition_attr" href="#transition_attr">#</a> <i>transition</i>.<b>attr</b>(<i>name</i>, <i>value</i>)

… Note that unlike [*selection*.attr](https://github.com/d3/d3-selection#selection_attr), *value* is required.

<a name="transition_attrTween" href="#transition_attrTween">#</a> <i>transition</i>.<b>attrTween</b>(<i>name</i>[, <i>value</i>])

…

<a name="transition_style" href="#transition_style">#</a> <i>transition</i>.<b>style</b>(<i>name</i>, <i>value</i>[, <i>priority</i>])

… Note that unlike [*selection*.style](https://github.com/d3/d3-selection#selection_style), *value* is required.

<a name="transition_styleTween" href="#transition_styleTween">#</a> <i>transition</i>.<b>styleTween</b>(<i>name</i>[, <i>value</i>[, <i>priority</i>]]))

…

<a name="transition_text" href="#transition_text">#</a> <i>transition</i>.<b>text</b>(<i>value</i>)

… Note that unlike [*selection*.text](https://github.com/d3/d3-selection#selection_text), *value* is required.

<a name="transition_remove" href="#transition_remove">#</a> <i>transition</i>.<b>remove</b>()

…

<a name="transition_tween" href="#transition_tween">#</a> <i>transition</i>.<b>tween</b>(<i>name</i>[, <i>value</i>])

…

### Timing

Transitions may have per-element delays and durations, computed using functions of data (or index) as with other selection methods. For example, you can sort and reorder elements with a staggered delay to make the change in order easier to perceive. For more on this topic, see [Animated Transitions in Statistical Data Graphics](http://vis.berkeley.edu/papers/animated_transitions/) by Heer & Robertson.

<a name="transition_delay" href="#transition_delay">#</a> <i>transition</i>.<b>delay</b>([<i>value</i>])

…

<a name="transition_duration" href="#transition_duration">#</a> <i>transition</i>.<b>duration</b>([<i>value</i>])

…

<a name="transition_ease" href="#transition_ease">#</a> <i>transition</i>.<b>ease</b>([<i>value</i>])

…

### Control Flow

…

<a name="transition_on" href="#transition_on">#</a> <i>transition</i>.<b>on</b>(<i>typenames</i>[, <i>listener</i>])

…

<a name="transition_each" href="#transition_each">#</a> <i>transition</i>.<b>each</b>(<i>function</i>)

…

<a name="transition_call" href="#transition_call">#</a> <i>transition</i>.<b>call</b>(<i>function</i>[, <i>arguments…</i>])

…

<a name="transition_empty" href="#transition_empty">#</a> <i>transition</i>.<b>empty</b>()

…

<a name="transition_nodes" href="#transition_nodes">#</a> <i>transition</i>.<b>nodes</b>()

…

<a name="transition_node" href="#transition_node">#</a> <i>transition</i>.<b>node</b>()

…

<a name="transition_size" href="#transition_size">#</a> <i>transition</i>.<b>size</b>()

…
