#!/bin/bash

# Exit script on any error
set -e

# Navigate to the project directory
cd risk-engine-mfe/
echo "Building the project..."

# Build the project
pnpm build

# Remove the existing dist folder in the host app
echo "Removing old dist folder in host app..."
rm -rf ../my-host-app/public/dist

# Move the new dist folder to the host app's public directory
echo "Moving new dist folder to host app..."
mv dist ../my-host-app/public

echo "Build and move completed successfully."

# Stop the React app running on port 5173
echo "Attempting to stop the React app on port 5173..."
PID=$(lsof -ti:5173)

if [ -n "$PID" ]; then
    echo "Found process on port 5173 with PID: $PID. Stopping it..."
    kill $PID || kill -9 $PID
    echo "Process on port 5173 stopped."
else
    echo "No process found on port 5173."
fi

# Navigate to the host app directory (if different) and start the app
echo "Starting the React app on port 5173..."
cd ../my-host-app
pnpm dev &

echo "React app restarted successfully on port 5173."