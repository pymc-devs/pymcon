# Repo for Pymcon webpage

## To run locally

1. Get the jekyll docker image with `docker pull jekyll/jekyll`
2. Get into container bash with `make serve`
3. Run `bundle exec jekyll serve --incremental` in docker shell

At this point you should be able to connect to server using a browser at
`127.0.0.1:4000` or open the local `index.html` file in the build
