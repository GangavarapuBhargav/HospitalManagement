# Kubernetes Deployment Guide

## Prerequisites
- kubectl configured with your cluster
- Kubernetes cluster access
- Container registry access (GitHub Container Registry or Docker Hub)

## Deployment Steps

1. **Update image registry in deployment files:**
   - Edit `backend-deployment.yaml` and `frontend-deployment.yaml`
   - Replace `your-registry` with your actual registry (e.g., `ghcr.io/username`)

2. **Apply configurations in order:**
   ```bash
   kubectl apply -f namespace.yaml
   kubectl apply -f mysql-secret.yaml
   kubectl apply -f mysql-deployment.yaml
   kubectl apply -f backend-secret.yaml
   kubectl apply -f backend-configmap.yaml
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f frontend-deployment.yaml
   ```

3. **Check deployment status:**
   ```bash
   kubectl get pods -n hospital-app
   kubectl get services -n hospital-app
   ```

4. **Get frontend LoadBalancer IP:**
   ```bash
   kubectl get svc frontend-service -n hospital-app
   ```

## Secrets Management

Update `mysql-secret.yaml` and `backend-secret.yaml` with your actual passwords before deploying.

## Scaling

To scale deployments:
```bash
kubectl scale deployment backend -n hospital-app --replicas=3
kubectl scale deployment frontend -n hospital-app --replicas=3
```

