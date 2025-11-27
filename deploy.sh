#!/bin/bash

# Deployment script for Kubernetes

set -e

echo "🚀 Starting deployment..."

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Update image registry (replace with your registry)
REGISTRY=${REGISTRY:-"ghcr.io/your-username"}
BACKEND_IMAGE="${REGISTRY}/springboot-backend"
FRONTEND_IMAGE="${REGISTRY}/react-frontend"
IMAGE_TAG=${IMAGE_TAG:-"latest"}

echo "📦 Using registry: $REGISTRY"
echo "🏷️  Using tag: $IMAGE_TAG"

# Update deployment files with actual image names
sed -i.bak "s|your-registry/springboot-backend:latest|${BACKEND_IMAGE}:${IMAGE_TAG}|g" k8s/backend-deployment.yaml
sed -i.bak "s|your-registry/react-frontend:latest|${FRONTEND_IMAGE}:${IMAGE_TAG}|g" k8s/frontend-deployment.yaml

# Apply Kubernetes manifests
echo "📋 Applying Kubernetes manifests..."

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mysql-secret.yaml
kubectl apply -f k8s/mysql-deployment.yaml

echo "⏳ Waiting for MySQL to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql -n hospital-app --timeout=300s

kubectl apply -f k8s/backend-secret.yaml
kubectl apply -f k8s/backend-configmap.yaml
kubectl apply -f k8s/backend-deployment.yaml

kubectl apply -f k8s/frontend-deployment.yaml

echo "⏳ Waiting for deployments to be ready..."
kubectl rollout status deployment/backend -n hospital-app --timeout=300s
kubectl rollout status deployment/frontend -n hospital-app --timeout=300s

# Restore backup files
mv k8s/backend-deployment.yaml.bak k8s/backend-deployment.yaml 2>/dev/null || true
mv k8s/frontend-deployment.yaml.bak k8s/frontend-deployment.yaml 2>/dev/null || true

echo "✅ Deployment complete!"
echo ""
echo "📊 Check status with:"
echo "   kubectl get all -n hospital-app"
echo ""
echo "🌐 Get frontend service:"
echo "   kubectl get svc frontend-service -n hospital-app"

