MAKEFLAGS := -j 4

SHELL := /bin/bash

.DELETE_ON_ERROR:

PROBLEM_DESCRIPTIONS_MD := $(wildcard problems/*/description.md)
PROBLEM_DESCRIPTIONS_HTML := $(PROBLEM_DESCRIPTIONS_MD:%.md=%.html)

SAMPLE_DESCRIPTIONS_MD := $(wildcard samples/*/description.md)
SAMPLE_DESCRIPTIONS_HTML := $(SAMPLE_DESCRIPTIONS_MD:%.md=%.html)

all: problems.pdf instructions.pdf

include $(wildcard problems/*/Makefile) $(wildcard samples/*/Makefile)

test-%:
	@for f in $(sort $(wildcard problems/$*/solutions/*.run samples/$*/solutions/*.run)); do \
		for g in $(sort $(wildcard problems/$*/tests/*.in samples/$*/tests/*.in)); do \
			if /usr/bin/time -o/tmp/lucid-programming-time -f%E colordiff -b "$${g/.in/.out}" <("$$f" < "$$g"); then \
				echo "Solution $$(basename $$f .run), Test $$(basename $$g .in): SUCCESS ($$(< /tmp/lucid-programming-time))"; \
			else \
				echo "Solution $$(basename $$f .run), Test $$(basename $$g .in): FAILURE ($$(< /tmp/lucid-programming-time))"; \
			fi \
		done \
	done

TESTS := $(shell echo problems/*/tests samples/*/tests)
.PHONY: zip-tests
zip-tests: $(TESTS:=.zip)

%/tests.zip: zip-tests.py
	(echo $@: $*/tests/*.in $*/tests/*.out; echo $*/tests/*.in $*/tests/*.out :) > $@.dep
	shopt -s nullglob; ./$< --input $*/tests/*.in --output $*/tests/*.out > $@

-include $(wildcard problems/*/tests.zip.dep samples/*/tests.zip.dep)

%.html: %.md convert.html.erb
	ruby -rerb -rnet/http -e 'puts ERB.new(File.read "convert.html.erb").result' < $< > $@

PDF_OPTIONS := -g -B 15mm -L 20mm -R 20mm -T 20mm -s Letter --print-media-type

problems.pdf: $(PROBLEM_DESCRIPTIONS_HTML) $(shell find problems -name '*.png' -o -name '*.svg')
	wkhtmltopdf $(PDF_OPTIONS) $(sort $(PROBLEM_DESCRIPTIONS_HTML)) $@

instructions.pdf: instructions.html rules.html schedule.html details.html $(SAMPLE_DESCRIPTIONS_HTML) $(shell find samples -name '*.png')
	wkhtmltopdf $(PDF_OPTIONS) instructions.html rules.html schedule.html details.html $(sort $(SAMPLE_DESCRIPTIONS_HTML)) $@

leaderboard/.npm-install:
	rm -rf $(@D)/node_modules
	cd $(@D) && yarn install
	> $@

leaderboard/.tsc-compile: leaderboard/.npm-install $(wildcard leaderboard/*.ts)
	$(@D)/node_modules/.bin/tsc --downlevelIteration -p $(@D)
	> $@

leaderboard.zip: $(shell find leaderboard) leaderboard/.npm-install leaderboard/.tsc-compile
	rm -f $@
	cd leaderboard && zip -qr ../leaderboard node_modules *.js

.PHONY: deploy
deploy: deploy-leaderboard deploy-queue

.PHONY: deploy-leaderboard
deploy-leaderboard: leaderboard.zip
	aws-staging --region us-west-1 lambda update-function-code --function-name competition-2017-leaderboard --zip-file fileb://$< --publish

.PHONY: deploy-queue
deploy-queue: leaderboard.zip
	aws-staging --region us-west-1 lambda update-function-code --function-name competition-2017-queue --zip-file fileb://$< --publish
