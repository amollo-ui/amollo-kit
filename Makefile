y-why:
	yarn config --why
y-ni:
	sh ./shell/bootstrap.sh -ni=true && sh ./shell/builder.sh
bootstrap:
	sh ./shell/bootstrap.sh && sh ./shell/builder.sh
build:
	sh ./shell/builder.sh
clean-install:
	sh ./shell/clean-install.sh
set-up:
	sh ./shell/set-up.sh
