 Define variables
REPO_URL="https://github.com/yatheesh-k/docker-file.git"
BRANCH="main"
IMAGE_NAME="node"
CONTAINER_NAME=""
BUILD_DIR="/path/to/your/build/directory"

# Step 1: Checkout the latest code from SCM
echo "Cloning the repository..."
if [ -d "$BUILD_DIR" ]; then
  echo "Directory $BUILD_DIR already exists. Pulling the latest changes..."
  cd "$BUILD_DIR"
  git pull origin "$BRANCH"
else
  echo "Directory $BUILD_DIR does not exist. Cloning the repository..."
  git clone "$REPO_URL" "$BUILD_DIR"
  cd "$BUILD_DIR"
fi

# Step 2: Build the Docker image
echo "Building the Docker image..."
docker build -t "$IMAGE_NAME" .

# Step 3: Remove old container if it exists
echo "Removing old container if it exists..."
if [ "$(docker ps -q -f name="$CONTAINER_NAME")" ]; then
  docker stop "$CONTAINER_NAME"
  docker rm "$CONTAINER_NAME"
fi

# Step 4: Create and run the new container
echo "Creating and running the new container..."
docker run -d --name "$CONTAINER_NAME" -p 80:80 "$IMAGE_NAME"

echo "Process completed successfully."
