# 🎨 Render Deployment Guide - World Divers Backend (Alternative)

## Overview

Render is a completely free alternative to Railway. The main difference is that the free tier has "cold starts" - if your app is inactive for 15 minutes, it will spin down and take 30-60 seconds to wake up on the next request.

## Quick Start

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Free tier - no credit card required

### Step 2: Deploy Backend

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select `World-Diver` repository

2. **Configure Service**
   - **Name:** `world-divers-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

3. **Add Environment Variables**
   Click "Advanced" and add these variables:

   ```
   MONGODB_URI=mongodb+srv://Waso:Wasko42788357%21@worlddivers.pawmaj0.mongodb.net/world-divers?retryWrites=true&w=majority&appName=worldDivers
   JWT_SECRET=world_divers_super_secret_key_2024_change_in_production
   NODE_ENV=production
   PORT=5000
   ```

4. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes first time)
   - You'll get a URL like: `https://world-divers-backend.onrender.com`

### Step 3: Configure Vercel Frontend

1. **Go to Vercel Dashboard**
   - Open your World Divers project
   - Go to Settings → Environment Variables

2. **Add Environment Variable**
   - Variable name: `REACT_APP_API_URL`
   - Value: `https://world-divers-backend.onrender.com/api`
   - ⚠️ **IMPORTANT:** Include `/api` at the end!
   - Add for: Production, Preview, Development

3. **Redeploy**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Select "Redeploy"
   - Wait for build to complete

### Step 4: Verify Deployment

**Test Backend:**
```bash
# Should return: {"message": "World Divers API is running 🌊"}
curl https://world-divers-backend.onrender.com/

# Should return membership plans
curl https://world-divers-backend.onrender.com/api/memberships/plans

# Should return species data
curl https://world-divers-backend.onrender.com/api/species?status=published
```

**Test Frontend:**
1. Visit your Vercel URL
2. Open browser console (F12)
3. Check for API calls - should NOT see "undefined" in URLs
4. Try to register/login
5. Navigate to /explorar - should load species
6. Navigate to /servicios - should load destinations

## Important: Cold Starts

⚠️ **Free tier limitation:** After 15 minutes of inactivity, your backend will spin down. The first request after that will take 30-60 seconds to wake it up.

**Solutions:**
1. **Upgrade to paid tier** ($7/month) - keeps service always running
2. **Use a ping service** - Keep service alive with periodic requests
3. **Accept the delay** - First load might be slow, but subsequent requests are fast

## Troubleshooting

### Backend not responding
- Check Render logs: Dashboard → Logs
- Verify MongoDB connection string is correct
- First request after inactivity takes 30-60s (cold start)

### Frontend shows "undefined" in API calls
- Verify `REACT_APP_API_URL` is set in Vercel
- Redeploy Vercel after adding environment variable
- Check that URL ends with `/api`

### CORS errors
- Verify your Vercel URL is in the CORS allowedOrigins
- Backend already allows all `.vercel.app` domains

### MongoDB connection fails
- Go to MongoDB Atlas → Network Access
- Ensure `0.0.0.0/0` is in IP Access List
- Verify password encoding (`!` = `%21`)

### Service keeps spinning down
- This is normal on free tier
- Consider upgrading to paid tier for always-on service
- Or use Railway instead (has $5 free credit/month)

## Auto-Deploy

Both Render and Vercel have auto-deploy enabled:
- Push to GitHub `main` branch
- Render redeploys backend automatically
- Vercel redeploys frontend automatically

## Monitoring

**Render:**
- Dashboard → Metrics (CPU, Memory, Bandwidth)
- Dashboard → Logs (Real-time logs)
- Dashboard → Events (Deployment history)

**Vercel:**
- Dashboard → Analytics
- Dashboard → Logs

## Costs

- **Render Free:** 750 hours/month, cold starts after 15min inactivity
- **Render Starter:** $7/month, always-on, no cold starts
- **Vercel:** Free unlimited for hobby projects
- **MongoDB Atlas:** Free tier (512 MB)

## Railway vs Render Comparison

| Feature | Railway (Free) | Render (Free) |
|---------|---------------|---------------|
| Cost | $5 credit/month | Completely free |
| Uptime | Always on (while credit lasts) | Cold starts after 15min |
| Performance | Faster | Slower (cold starts) |
| Deployment | Very fast | Slower first build |
| Best for | Production apps | Testing/demos |

**Recommendation:** 
- Use **Railway** if you want better performance and reliability
- Use **Render** if you want completely free hosting and don't mind cold starts

## Next Steps

After successful deployment:
1. ✅ Test all features (login, register, explore, services)
2. ✅ Seed database with species and destinations (if needed)
3. ✅ Monitor logs for errors
4. ✅ Consider upgrading if cold starts are problematic
