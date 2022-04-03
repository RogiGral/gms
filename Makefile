.PHONY: help up-dev up-dev-show-logs pause-dev start-dev stop-dev clean-dev build-dev restart-service-dev reload-service-dev up-stg pause-stg start-stg stop-stg clean-stg build-stg restart-service-stg

# docker-compose stacks
DEV_COMPOSE=--file docker-compose.yml --file docker-compose_dev.yml
STG_COMPOSE=--file docker-compose.yml

# Get SHA and and branch name of git HEAD. Might be useful when running some commands.
SHA1 := $(shell git rev-parse HEAD)
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)


# ==========================================================================================================
# commands for local environment, docker-compose development version
# ==========================================================================================================

# Auto-generate help for each make command with a comment that starts with `##`
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

up-dev: ## create and start services for development (API running on http://localhost:8081, frontend running on: http://localhost:3000)
	docker-compose $(DEV_COMPOSE) up -d --build --remove-orphans $(containers)

up-dev-show-logs: ## create and start services for development and show container logs in terminal(API running on http://localhost:8081, frontend running on: http://localhost:3000)
	docker-compose $(DEV_COMPOSE) up --build --remove-orphans $(containers)

pause-dev: ## pause development services (useful to save CPU)
	docker-compose $(DEV_COMPOSE) pause $(containers)

start-dev: ## start development services
	docker-compose $(DEV_COMPOSE) start $(containers)

stop-dev: ## stop development services
	docker-compose $(DEV_COMPOSE) stop $(containers)

clean-dev: ## stop and remove containers and volumes for development environment
	docker-compose $(DEV_COMPOSE) down --remove-orphans --volumes

build-dev: ## build development services
	docker-compose $(DEV_COMPOSE) build --no-cache $(containers)

restart-service-dev: ## restart development service, usage: `make service=api restart-service-dev`
	docker-compose $(DEV_COMPOSE) restart $(service)

reload-service-dev: ## reload development service, usage: `make service=api reload-service-dev`
	docker-compose $(DEV_COMPOSE) up -d --build --force-recreate $(service)


# ==========================================================================================================
# commands for staging, docker-compose production version
# ==========================================================================================================

up-stg: ## create and start services for staging/QA environment (with web server running on: http://localhost:1337)
	docker-compose $(STG_COMPOSE) up -d --build --remove-orphans

pause-stg: ## pause staging/QA services (useful to save CPU)
	docker-compose $(STG_COMPOSE) pause $(containers)

start-stg: ## start staging/QA services
	docker-compose $(STG_COMPOSE) start $(containers)

stop-stg: ## stop staging/QA services
	docker-compose $(STG_COMPOSE) stop $(containers)

clean-stg: ## stop and remove containers and volumes for staging/QA environment
	docker-compose $(STG_COMPOSE) down --remove-orphans --volumes

build-stg: ## build staging/QA services
	docker-compose $(STG_COMPOSE) build --no-cache $(containers)

restart-service-stg: ## restart staging/QA service, usage: `make service=api restart-service-stg`
	docker-compose $(STG_COMPOSE) restart $(service)
