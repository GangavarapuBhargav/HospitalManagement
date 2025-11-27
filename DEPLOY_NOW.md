# Quick Deployment Guide

## Step 1: Initialize Git Repository (if not already done)

```bash
cd /Users/bhargav/Downloads/FinalProject_Backend-master
git init
```

## Step 2: Add GitHub Remote

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub username and repository name
git remote add origin https://github.com/GangavarapuBhargav/HospitalManagement
```

## Step 3: Add All Files

```bash
git add .
```

## Step 4: Commit Changes

```bash
git commit -m "Add GitHub Actions CI/CD for Docker and Kubernetes deployment"
```

## Step 5: Push to GitHub

```bash
git branch -M main  # Rename branch to main if needed
git push -u origin main
```

## Step 6: Set Up GitHub Secret

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `KUBECONFIG`
5. Value: Paste your base64-encoded kubeconfig (you already generated this)
6. Click **"Add secret"**

## Step 7: Trigger Deployment

The workflow will automatically run when you push to the `main` branch. You can also manually trigger it:

1. Go to **Actions** tab in your GitHub repository
2. Select **"Build and Deploy to Kubernetes"** workflow
3. Click **"Run workflow"** → **"Run workflow"**

## What Happens Next

1. ✅ GitHub Actions will build Docker images for backend and frontend
2. ✅ Images will be pushed to GitHub Container Registry (ghcr.io)
3. ✅ Images will be deployed to your Kubernetes cluster
4. ✅ You can monitor progress in the Actions tab

## Check Deployment Status

```bash
kubectl get all -n hospital-app
```

