GENERATED_FILES = \
	dist/d3-transition.js \
	dist/d3-transition.min.js

all: $(GENERATED_FILES)

.PHONY: clean all test

test: all
	node_modules/.bin/faucet `find test -name '*-test.js'`

dist/d3-transition.js: $(wildcard src/*.js) index.js
	rm -f $@
	node_modules/.bin/d3-bundler -- index.js > $@
	chmod a-w $@

dist/d3-transition.min.js: dist/d3-transition.js
	rm -f $@
	node_modules/.bin/uglifyjs $^ -c -m -o $@
	chmod a-w $@

clean:
	rm -f -- $(GENERATED_FILES)
