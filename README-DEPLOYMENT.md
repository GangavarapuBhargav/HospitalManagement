# Deployment Guide

This guide covers Docker, Kubernetes, and GitHub Actions CI/CD setup.

## 🐳 Docker Deployment

### Local Development with Docker Compose

1. **Build and start all services:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop services:**
   ```bash
   docker-compose down
   ```

4. **Rebuild after changes:**
   ```bash
   docker-compose up -d --build
   ```

### Individual Docker Builds

**Backend:**
```bash
docker build -f Dockerfile.backend -t springboot-backend .
docker run -p 8081:8081 springboot-backend
```

**Frontend:**
```bash
cd frontend
docker build -t react-frontend .
docker run -p 80:80 react-frontend
```

## ☸️ Kubernetes Deployment

### Prerequisites
- kubectl installed and configured
- Access to a Kubernetes cluster
- Container registry credentials

### Quick Deploy

1. **Update image registry in deployment files:**
   - Edit `k8s/backend-deployment.yaml` line with image
   - Edit `k8s/frontend-deployment.yaml` line with image
   - Replace `your-registry` with your registry (e.g., `ghcr.io/username/repo`)

2. **Deploy:**
   ```bash
   kubectl apply -f k8s/
   ```

3. **Check status:**
   ```bash
   kubectl get all -n hospital-app
   ```

### Manual Steps

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy MySQL
kubectl apply -f k8s/mysql-secret.yaml
kubectl apply -f k8s/mysql-deployment.yaml

# Deploy Backend
kubectl apply -f k8s/backend-secret.yaml
kubectl apply -f k8s/backend-configmap.yaml
kubectl apply -f k8s/backend-deployment.yaml

# Deploy Frontend
kubectl apply -f k8s/frontend-deployment.yaml
```

## 🔄 GitHub Actions CI/CD

### Setup

1. **Push code to GitHub repository**

2. **Configure Secrets (in GitHub repo Settings > Secrets):**
   - `KUBE_CONFIG`: Base64 encoded kubeconfig file
     ```bash
     cat ~/.kube/config | base64
     ```

3. **Update image registry in workflow:**
   - Edit `.github/workflows/ci-cd.yml`
   - The workflow uses GitHub Container Registry by default
   - Change `REGISTRY` env var if using different registry

4. **Push to main/master branch:**
   - Workflow automatically:
     - Builds backend and frontend
     - Creates Docker images
     - Pushes to registry
     - Deploys to Kubernetes

### Workflow Features

- **Build:** Compiles backend (Maven) and frontend (npm)
- **Test:** Runs tests (currently skipped for backend, add as needed)
- **Docker:** Builds and tags images
- **Registry:** Pushes to GitHub Container Registry
- **Deploy:** Updates Kubernetes deployments

## 🔐 Security Notes

1. **Update secrets before production:**
   - `k8s/mysql-secret.yaml`
   - `k8s/backend-secret.yaml`

2. **Use proper secret management:**
   - Consider using Kubernetes Secrets Manager
   - Or external secret management (AWS Secrets Manager, HashiCorp Vault)

3. **Database credentials:**
   - Never commit real passwords
   - Use environment variables or secret management

## 📝 Environment Variables

### Backend
- `SPRING_DATASOURCE_URL`: MySQL connection string
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `SERVER_PORT`: Application port (default: 8081)

### Frontend
- Configured via nginx.conf for API proxying

## 🚀 Production Checklist

- [ ] Update all secrets with production values
- [ ] Configure proper database backups
- [ ] Set up monitoring and logging
- [ ] Configure ingress/load balancer
- [ ] Enable HTTPS/TLS
- [ ] Set resource limits appropriately
- [ ] Configure auto-scaling
- [ ] Set up health checks
- [ ] Configure persistent storage for database
- [ ] Review security policies

## 🐛 Troubleshooting

**Docker issues:**
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

**Kubernetes issues:**
```bash
kubectl describe pod <pod-name> -n hospital-app
kubectl logs <pod-name> -n hospital-app
kubectl get events -n hospital-app
```

**Database connection issues:**
- Check MySQL service is running
- Verify connection string in ConfigMap
- Check secrets are applied correctly

