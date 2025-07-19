IMAGE_TAG = 0.0.2
REGISTRY = registry.autorena.ru/autorena/autorena-front
IMAGE_NAME = autorena-front
DEPLOYMENT_NAME = autorena-front
NAMESPACE = autorena

.PHONY: help
help: ## Показать это сообщение
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | sed 's/:.*## /\t/'

.PHONY: build_image
build_image: ## Собрать docker-образ фронта и отправить в реестр
	docker build \
		--tag $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG) \
		--platform=linux/amd64 \
		.
	echo "Image built: $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)"
	docker push $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)
	echo "Image pushed: $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)"

.PHONY: redeploy
redeploy: build_image ## Пересобрать образ и перезапустить деплоймент в k8s
	kubectl rollout restart deployment/$(DEPLOYMENT_NAME) -n $(NAMESPACE) 
