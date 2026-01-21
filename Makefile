
serve:
	@python -m SimpleHTTPServer
.PHONY: serve


open:
	@open http://localhost:8000
.PHONY: serve


ngrok:
	@ngrok http 8000
.PHONY: ngrok


deploy:
	@now
.PHONY: deploy
