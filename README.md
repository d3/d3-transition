# d3-transition

Animated transitions for [D3 selections](https://github.com/d3/d3-selection). This code is currently EXPERIMENTAL and represents the in-development D3 4.0 API. The 4.0 API is largely backwards-compatible, but differs from 3.x in several ways:

* d3.ease is now a scope for named easing functions, rather than a function that takes a string name and returns an easing function. For example, you should now say d3.ease.cubicInOut instead of d3.ease("cubic-in-out"). (Note that transition.ease still accepts either a string or a function; transition.ease(d3.ease.cubicInOut) and transition.ease("cubic-in-out") are equivalent.)
