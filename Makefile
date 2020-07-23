docker:
	docker run --rm -it --volume="$(pwd):/srv/jekyll" --volume="$(pwd)/vendor/bundle:/usr/local/bundle" --env JEKYLL_ENV=production jekyll/jekyll:latest jekyll build
