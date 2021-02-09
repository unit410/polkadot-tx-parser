.PHONY: clean
clean:
	@echo "Cleaning build location..."
	@rm -rf packages/web/build/*

.PHONY: install
install:
	@yarn install

.PHONY: lint
lint:
	@yarn workspace @polkadot-tx-parser/web lint

.PHONY: dev
dev:
	@yarn workspace @polkadot-tx-parser/web run start

.PHONY: build-common
build-common:
	@echo "Building @polkadot-tx-parser/common..."
	@yarn workspace @polkadot-tx-parser/common run build

.PHONY: build-web
build-web:
	@echo "Building @polkadot-tx-parser/web..."
	@yarn workspace @polkadot-tx-parser/web run build

.PHONY: build
build: build-common build-web