serve:
	docker run -it -p 4000:4000 --rm --mount type=bind,source="$(PWD)",target=/srv/jekyll jekyll/jekyll:latest /bin/bash
	# docker run --mount type=bind,source="$(pwd)",target=/srv/jekyll/ --rm -it -p 4000:4000 -env JEKYLL_ENV=production jekyll/jekyll:latest /bin/bash

serve-locally:
	docker run \
	  -it --rm \
	  -p 4000:4000 \
	  --mount type=bind,source="$(PWD)",target=/srv/jekyll jekyll/jekyll:latest \
	  bash -c "bundle install && bundle exec jekyll serve --incremental -H 0.0.0.0"


