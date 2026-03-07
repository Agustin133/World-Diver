# 🚂 Railway Deployment Guide - World Divers Backend

## Quick Start

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. You'll get $5 free credit per month

### Step 2: Deploy Backend

1. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `World-Diver` repository
   - Railway will auto-detect Node.js

2. **Configure Root Directory**
   - Go to Settings → Service Settings
   - Set **Root Directory** to: `backend`
   - This tells Railway where your backend code is located

3. **Add Environment Variables**
   - Go to Variables tab
   - Click "New Variable" and add each of these:

   ```
   MONGODB_URI=mongodb+srv://Waso:Wasko42788357%21@worlddivers.pawmaj0.mongodb.net/world-divers?retryWrites=true&w=majority&appName=worldDivers
   JWT_SECRET=world_divers_super_secret_key_2024_change_in_production
   NODE_ENV=production
   PORT=5000
   ```

4. **Deploy**
   - Railway will automatically deploy
   - Wait for deployment to complete (1-2 minutes)
   - You'll get a URL like: `https://world-diver-production.up.railway.app`

5. **Generate Domain**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy your backend URL

### Step 3: Configure Vercel Frontend

1. **Go to Vercel Dashboard**
   - Open your World Divers project
   - Go to Settings → Environment Variables

2. **Add Environment Variable**
   - Variable name: `REACT_APP_API_URL`
   - Value: `https://your-railway-url.up.railway.app/api`
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
curl https://your-railway-url.up.railway.app/

# Should return membership plans
curl https://your-railway-url.up.railway.app/api/memberships/plans

# Should return species data
curl https://your-railway-url.up.railway.app/api/species?status=published
```

**Test Frontend:**
1. Visit your Vercel URL
2. Open browser console (F12)
3. Check for API calls - should NOT see "undefined" in URLs
4. Try to register/login
5. Navigate to /explorar - should load species
6. Navigate to /servicios - should load destinations

## Troubleshooting

### Backend not responding
- Check Railway logs: Dashboard → Deployments → View Logs
- Verify MongoDB connection string is correct
- Ensure PORT is set to 5000

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

## Auto-Deploy

Both Railway and Vercel have auto-deploy enabled:
- Push to GitHub `main` branch
- Railway redeploys backend automatically
- Vercel redeploys frontend automatically

## Monitoring

**Railway:**
- Dashboard → Metrics (CPU, Memory, Network)
- Dashboard → Logs (Real-time logs)

**Vercel:**
- Dashboard → Analytics
- Dashboard → Logs

## Costs

- **Railway:** $5 free credit/month (enough for small projects)
- **Vercel:** Free unlimited for hobby projects
- **MongoDB Atlas:** Free tier (512 MB)

## Next Steps

After successful deployment:
1. ✅ Test all features (login, register, explore, services)
2. ✅ Seed database with species and destinations (if needed)
3. ✅ Monitor logs for errors
4. ✅ Set up custom domain (optional)
