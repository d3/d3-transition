# d3-transition

A transition is a [selection](https://github.com/d3/d3-selection)-like interface for animating changes to the DOM. Instead of applying changes instantaneously, transitions smoothly interpolate the DOM from its current state to the desired target state over a given duration.

To apply a transition, select elements, call [*selection*.transition](#selection_transition), and then make the desired changes. For example:

```js
d3.select("body")
  .transition()
    .style("background-color", "red");
```

Transitions support most selection methods (such as [*transition*.attr](#transition_attr) and [*transition*.style](#transition_style) in place of [*selection*.attr](https://github.com/d3/d3-selection#selection_attr) and [*selection*.style](https://github.com/d3/d3-selection#selection_style)), but not all methods are supported; for example, you must [append](https://github.com/d3/d3-selection#selection_append) elements or [bind data](https://github.com/d3/d3-selection#joining-data) before a transition starts. A [*transition*.remove](#transition_remove) operator is provided for convenient removal of elements when the transition ends.

To compute intermediate state, transitions leverage a variety of [built-in interpolators](https://github.com/d3/d3-interpolate). [Colors](https://github.com/d3/d3-interpolate#interpolateRgb), [numbers](https://github.com/d3/d3-interpolate#interpolateNumber), and [transforms](https://github.com/d3/d3-interpolate#interpolateTransform) are automatically detected. [Strings](https://github.com/d3/d3-interpolate#interpolateString) with embedded numbers are also detected, as is common with many styles (such as padding or font sizes) and paths. To specify a custom interpolator, use [*transition*.attrTween](#transition_attrTween), [*transition*.styleTween](#transition_styleTween) or [*transition*.tween](#transition_tween).

## Installing

If you use NPM, `npm install d3-transition`. Otherwise, download the [latest release](https://github.com/d3/d3-transition/releases/latest). You can also load directly from [d3js.org](https://d3js.org), either as a [standalone library](https://d3js.org/d3-transition.v0.2.min.js) or as part of [D3 4.0 alpha](https://github.com/mbostock/d3/tree/4). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3_transition` global is exported:

```html
<script src="https://d3js.org/d3-color.v0.4.min.js"></script>
<script src="https://d3js.org/d3-dispatch.v0.4.min.js"></script>
<script src="https://d3js.org/d3-ease.v0.7.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v0.7.min.js"></script>
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
* [The Life of a Transition](#the-life-of-a-transition)

### Selecting Elements

Transitions are derived from [selections](https://github.com/d3/d3-selection) via [*selection*.transition](#selection_transition). You can also create a transition on the document root element using [d3.transition](#transition).

<a name="selection_transition" href="#selection_transition">#</a> <i>selection</i>.<b>transition</b>([<i>name</i>])

Returns a new transition on the given *selection* with the specified *name*. If a *name* is not specified, the default empty name (“”) is used. The new transition is only exclusive with other transitions of the same name.

If the *name* is a [transition](#transition) instance, the new transition has the same id, name and timing as the specified transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element. This can be used to synchronize a transition across multiple selections, or to re-select a transition for specific elements and modify its configuration. For example:

```js
var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

d3.selectAll(".apple").transition(t)
    .style("fill", "red");

d3.selectAll(".orange").transition(t)
    .style("fill", "orange");
```

<a name="selection_interrupt" href="#selection_interrupt">#</a> <i>selection</i>.<b>interrupt</b>([<i>name</i>])

Interrupts the active transition of the specified *name* on the selected elements, and cancels any pending transitions with the specified *name*, if any. If a name is not specified, the empty name (“”) is used.

<a name="transition" href="#transition">#</a> d3.<b>transition</b>([<i>name</i>])

Returns a new transition on the root element, `document.documentElement`, with the specified *name*. If a *name* is not specified, the default empty name (“”) is used. The new transition is only exclusive with other transitions of the same name. The *name* may also be a [transition](#transition) instance; see [*selection*.transition](#selection_transition). This method is equivalent to:

```js
d3.selection().transition(name)
```

This function can also be used to test for transitions (`instanceof d3.transition`) or to extend the transition prototype.

<a name="transition_select" href="#transition_select">#</a> <i>transition</i>.<b>select</b>(<i>selector</i>)

For each selected element, selects the first descendant element that matches the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.select](https://github.com/d3/d3-selection#selection_select), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .select(selector)
  .transition(transition)
```

<a name="transition_selectAll" href="#transition_selectAll">#</a> <i>transition</i>.<b>selectAll</b>(<i>selector</i>)

For each selected element, selects all descendant elements that match the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.selectAll](https://github.com/d3/d3-selection#selection_selectAll), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .selectAll(selector)
  .transition(transition)
```

<a name="transition_filter" href="#transition_filter">#</a> <i>transition</i>.<b>filter</b>(<i>filter</i>)

For each selected element, selects only the elements that match the specified *filter*, and returns a transition on the resulting selection. The *filter* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.filter](https://github.com/d3/d3-selection#selection_filter), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .filter(filter)
  .transition(transition)
```

<a name="transition_merge" href="#transition_merge">#</a> <i>transition</i>.<b>merge</b>(<i>selection</i>)

Returns a new transition merging this transition with the specified *selection* (or *transition*). The returned transition has the same number of groups, the same parents, the same name and the same id as this transition. Any missing (null) elements in this transition are filled with the corresponding element, if present (not null), from the specified *selection*.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), merging with the specified selection via [*selection*.merge](https://github.com/d3/d3-selection#selection_merge), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .merge(selection)
  .transition(transition)
```

<a name="transition_transition" href="#transition_transition">#</a> <i>transition</i>.<b>transition</b>()

Returns a new transition on the same selected elements as this transition, scheduled to start when this transition ends. The new transition inherits a reference time equal to this transition’s time plus its [delay](#transition_delay) and [duration](#transition_duration). The new transition also inherits this transition’s name, duration, and [easing](#transition_ease). This method can be used to schedule a sequence of chained transitions. For example:

```js
d3.selectAll(".apple")
  .transition() // First fade to green.
    .style("fill", "green")
  .transition() // Then red.
    .style("fill", "red")
  .transition() // Wait one second. Then brown, and remove.
    .delay(1000)
    .style("fill", "brown")
    .remove();
```

The delay for each transition is relative to its previous transition. Thus, in the above example, apples will stay red for one second before the last transition to brown starts.

<a name="transition_selection" href="#transition_selection">#</a> <i>transition</i>.<b>selection</b>()

Returns the [selection](https://github.com/d3/d3-selection#selection) corresponding to this transition.

<a name="active" href="#active">#</a> d3.<b>active</b>(<i>node</i>[, <i>name</i>])

Returns the active transition on the specified *node* with the specified *name*, if any. If no *name* is specified, the default empty name is used. Returns null if there is no such active transition on the specified node. This method is useful for creating chained transitions. For example, to initiate disco mode:

```js
d3.selectAll("circle").transition()
    .delay(function(d, i) { return i * 50; })
    .on("start", function repeat() {
        d3.active(this)
            .style("fill", "red")
          .transition()
            .style("fill", "green")
          .transition()
            .style("fill", "blue")
          .transition()
            .on("start", repeat);
      });
```

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

Transitions may have per-element [delays](#transition_delay) and [durations](#transition_duration) computed by functions of data or index; this lets you stagger a transition across a set elements. For example, sorting elements and staggering the reordering improves perception. See [Animated Transitions in Statistical Data Graphics](http://vis.berkeley.edu/papers/animated_transitions/) for recommendations.

Transitions start automatically after the given delay, which defaults to zero. Transitions have a default [duration](#transition_duration) of 250ms.

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

* `start`
* `end`
* `interrupt`

<a name="transition_each" href="#transition_each">#</a> <i>transition</i>.<b>each</b>(<i>function</i>)

Invokes the specified *function* for each selected element, passing in the current datum `d` and index `i`, with the `this` context of the current DOM element. This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously. Equivalent to [*selection*.each](https://github.com/d3/d3-selection#selection_each).

<a name="transition_call" href="#transition_call">#</a> <i>transition</i>.<b>call</b>(<i>function</i>[, <i>arguments…</i>])

Invokes the specified *function* exactly once, passing in this transition along with any optional *arguments*. Returns this transition. This is equivalent to invoking the function by hand but facilitates method chaining. For example, to set several attributes in a reusable function:

```js
function color(transition, fill, stroke) {
  transition
      .style("fill", fill)
      .style("stroke", stroke);
}
```

Now say:

```js
d3.selectAll("div").transition().call(color, "red", "blue");
```

This is equivalent to:

```js
color(d3.selectAll("div").transition(), "red", "blue");
```

Equivalent to [*selection*.call](https://github.com/d3/d3-selection#selection_call).

<a name="transition_empty" href="#transition_empty">#</a> <i>transition</i>.<b>empty</b>()

Returns true if this transition contains no (non-null) elements. Equivalent to [*selection*.empty](https://github.com/d3/d3-selection#selection_empty).

<a name="transition_nodes" href="#transition_nodes">#</a> <i>transition</i>.<b>nodes</b>()

Returns an array of all (non-null) elements in this transition. Equivalent to [*selection*.nodes](https://github.com/d3/d3-selection#selection_nodes).

<a name="transition_node" href="#transition_node">#</a> <i>transition</i>.<b>node</b>()

Returns the first (non-null) element in this transition. If the transition is empty, returns null. Equivalent to [*selection*.node](https://github.com/d3/d3-selection#selection_node).

<a name="transition_size" href="#transition_size">#</a> <i>transition</i>.<b>size</b>()

Returns the total number of elements in this transition. Equivalent to [*selection*.size](https://github.com/d3/d3-selection#selection_size).

### The Life of a Transition

Immediately after creating a transition, such as by [*selection*.transition](#selection_transition) or [*transition*.transition](#transition_transition), you may configure the transition using methods such as [*transition*.delay](#transition_delay), [*transition*.duration](#transition_duration), [*transition*.attr](#transition_attr) and [*transition*.style](#transition_style). Methods that specify target values (such as *transition*.attr) are evaluated synchronously; however, methods that require the starting value for interpolation, such as [*transition*.attrTween](#transition_attrTween) and [*transition*.styleTween](#transition_styleTween), must be deferred until the transition starts.

Shortly after creation, either at the end of the current frame or during the next frame, the transition is scheduled. At this point, the delay and `start` event listeners may no longer be changed.

When the transition subsequently starts, it interrupts the active transition of the same name on the same element, if any, dispatching an `interrupt` event to registered listeners. The starting transition also cancels any pending transitions of the same name on the same element that were created before the starting transition. (Note that interrupts and cancellations happen on start, not creation, and thus even a zero-delay transition will not immediately interrupt the active transition: the old transition is given a final frame. Use [*selection*.interrupt](#selection_interrupt) to interrupt immediately.) The transition then dispatches a `start` event to registered listeners. This is the last moment at which the transition may be modified: after starting, the transition’s timing, tweens, and listeners may no longer be changed. The transition initializes its tweens immediately after starting.

During the frame the transition starts, but *after* all transitions starting this frame have been started, the transition invokes its tweens for the first time. Batching tween initialization, which typically involves reading from the DOM, improves performance by avoiding interleaved DOM reads and writes.

For each frame that a transition is active, it invokes its tweens with an [eased](#transition_ease) *t*-value ranging from 0 to 1. Within each frame, the transition invokes its tweens in the order they were registered.

When a transition ends, it invokes its tweens a final time with a (non-eased) *t*-value of 1. It then dispatches an `end` event to registered listeners. This is the last moment at which the transition may be inspected: after ending, the transition is deleted from the element, and its configuration is destroyed. (A transition’s configuration is also destroyed on interrupt or cancel.)

For more on transitions, see [Working with Transitions](http://bost.ocks.org/mike/transition/).
