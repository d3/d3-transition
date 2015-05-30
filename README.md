# d3-transition

Animated transitions for [D3 selections](https://github.com/d3/d3-selection). This code is currently EXPERIMENTAL and represents the in-development D3 4.0 API. The 4.0 API is largely backwards-compatible, but differs from 3.x in several ways:

* The *elastic* and *bounce* easing functions have been inverted for consistency with Penner’s original design: “elastic-in” is now “elastic-out”, “elastic-out” is now “elastic-in”, “elastic-out-in” is now “elastic-in-out”, “bounce-in” is now “bounce-out”, “bounce-out” is now “bounce-in”, and “bounce-out-in” is now “bounce-in-out”.

* The interpretation of optional parameters to the “elastic-in”, “elastic-out”, “elastic-in-out” and “back-in-out” easing functions has been fixed.

* The “out-in” easing functions have been removed. Out-in easing didn’t make sense (except previously in the case of *elastic* and *bounce*, which was a bug).
