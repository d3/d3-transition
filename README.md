# d3-transition

A transition is a [selection](https://github.com/d3/d3-selection)-like interface for animating changes to the DOM. Instead of applying changes instantaneously, transitions smoothly interpolate the DOM from its current state to the desired target state over the given duration. To start a transition, select elements, call [*selection*.transition](#selection_transition), and then apply the desired transition methods. For example:

```js
d3.select("body")
  .transition()
    .style("background-color", "red");
```

While transitions support most selection methods (such as [*transition*.attr](#transition_attr) and [*transition*.style](#transition_style)), not all methods are supported; for example, you must [append](https://github.com/d3/d3-selection#selection_append) elements before a transition starts. A [*transition*.remove](#transition_remove) operator is provided for convenient removal of elements when the transition ends.

Transitions may have per-element [delays](#transition_delay) and [durations](#transition_duration) computed by functions of data or index; this lets you stagger a transition across a set elements. For example, sorting elements and staggering the reordering improves perception. See [Animated Transitions in Statistical Data Graphics](http://vis.berkeley.edu/papers/animated_transitions/) for more.

Transitions leverage a variety of [built-in interpolators](https://github.com/d3/d3-interpolate). For example, you can transition from the font specification `500 12px sans-serif` to `300 42px sans-serif`, and [d3.interpolateString](https://github.com/d3/d3-interpolate#interpolateString) will find the numbers embedded within the string, interpolating both font size and weight automatically. To specify a custom interpolator, use [*transition*.attrTween](#transition_attrTween), [*transition*.styleTween](#transition_styleTween) or [*transition*.tween](#transition_tween).

Transitions are partially exclusive: only one transition of a given name may be *active* on a given element at a given time. Multiple transitions with different names may be simultaneously active on the element, and multiple transitions with the same name may be *scheduled* on the element, provided they do not overlap in time. See [*transition*.transition](#transition_transition), for example. If a newer transition starts on a given element, it automatically interrupts any active transition and cancels any pending transitions that were scheduled prior to the starting transition. This allows new transitions to supersede old transitions, such as in response to a user event, even if the old transitions were delayed. To manually interrupt transitions, use [*selection*.interrupt](#selection_interrupt). To run multiple transitions simultaneously on a given element or elements, give each transition a [unique name](#selection_transition).

For more on transitions, see [Working with Transitions](http://bost.ocks.org/mike/transition/).

## Installing

If you use NPM, `npm install d3-transition`. Otherwise, download the [latest release](https://github.com/d3/d3-transition/releases/latest). You can also load directly from [d3js.org](https://d3js.org), either as a [standalone library](https://d3js.org/d3-transition.v0.2.min.js) or as part of [D3 4.0 alpha](https://github.com/mbostock/d3/tree/4). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3_transition` global is exported:

```html
<script src="https://d3js.org/d3-color.v0.4.min.js"></script>
<script src="https://d3js.org/d3-dispatch.v0.4.min.js"></script>
<script src="https://d3js.org/d3-ease.v0.7.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v0.5.min.js"></script>
<script src="https://d3js.org/d3-selection.v0.7.min.js"></script>
<script src="https://d3js.org/d3-timer.v0.4.min.js"></script>
<script src="https://d3js.org/d3-transition.v0.2.min.js"></script>
<script>

var transition = d3_transition.transition();

</script>
```

[Try d3-transition in your browser.](https://tonicdev.com/npm/d3-transition)

## API Reference

* [Selecting Elements](#selecting-elements)
* [Modifying Elements](#modifying-elements)
* [Timing](#timing)
* [Control Flow](#control-flow)

### Selecting Elements

Transitions are created using [d3.transition](#transition) or [*selection*.transition](#selection_transition). Transitions start automatically after a delay; see [Timing](#timing).

<a name="selection_transition" href="#selection_transition">#</a> <i>selection</i>.<b>transition</b>([<i>name</i>])

…

<a name="selection_interrupt" href="#selection_interrupt">#</a> <i>selection</i>.<b>interrupt</b>([<i>name</i>])

…

<a name="transition" href="#transition">#</a> d3.<b>transition</b>([<i>name</i>])

Returns a transition on the root element, `document.documentElement`, with the specified *name*. If a *name* is specified, the transition has the specified *name*; if *name* is not specified, the default empty name (“”) is used. The new transition is only exclusive with other transitions of the same name. This method is equivalent to:

```js
d3.selection().transition(name)
```

If the *name* is a transition instead of a string, returns the transition with the same name and id as the given transition on the root element. If no such transition exists, a new transition is created on the root element, inheriting the given transition’s timing. This can be used to apply a transition to multiple distinct selections, or to re-select a transition and modify its configuration for specific elements.

This function can also be used to check if an object is a selection (`instanceof selection`) or to extend the selection prototype. For example, to add a method to check checkboxes:

```js
d3.selection.prototype.checked = function(value) {
  return arguments.length < 1
      ? this.property("checked")
      : this.property("checked", !!value);
};
```

And then to use:

```js
d3.selectAll("input[type=checkbox]").checked(true);
```


Also, d3.transition can be used to check whether something is an `instanceof` a transition, and to extend or modify the transition prototype.

<a name="transition_select" href="#transition_select">#</a> <i>transition</i>.<b>select</b>(<i>selector</i>)

…

<a name="transition_selectAll" href="#transition_selectAll">#</a> <i>transition</i>.<b>selectAll</b>(<i>selector</i>)

…

<a name="transition_filter" href="#transition_filter">#</a> <i>transition</i>.<b>filter</b>(<i>filter</i>)

…

<a name="transition_merge" href="#transition_merge">#</a> <i>transition</i>.<b>merge</b>(<i>selection</i>)

Returns a new transition merging this transition with the specified *selection* (or *transition*). The returned transition has the same number of groups, the same parents, the same name and the same id as this transition. Any missing (null) elements in this transition are filled with the corresponding element, if present (not null), from the specified *selection*. See [*selection*.merge](https://github.com/d3/d3-selection#selection_merge) for more information.

<a name="transition_transition" href="#transition_transition">#</a> <i>transition</i>.<b>transition</b>()

…

<a name="transition_selection" href="#transition_selection">#</a> <i>transition</i>.<b>selection</b>()

Returns the [selection](https://github.com/d3/d3-selection#selection) corresponding to this transition.

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

Transitions start automatically after a [delay](#transition_delay), which defaults to zero. Note, however, that even a zero-delay transition starts asynchronously after one tick (~17ms); this delay gives you time to configure the transition before it starts. Transitions have a default [duration](#transition_duration) of 250ms.

If another transition is active on a given element, a new zero-delay transition will **not** immediately (synchronously) interrupt the active transition: the old transition does not get pre-empted until the new transition starts, so the old transition is given a final tick. (Within a tick, active transitions are invoked in the order they were scheduled.) Thus, the old transition may overwrite attribute or style values that were set synchronously when the new transition was created. Use [*selection*.interrupt](#selection_interrupt) to interrupt any active transition and prevent it from receiving its final tick.

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
