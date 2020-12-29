# most basic sort of dockerfile:
# 1. choose a base image with the dependencies for the thing you're going to copy in.
FROM mcr.microsoft.com/dotnet/runtime:5.0

# 2. copy that thing in
COPY publish/ /app

# 3. configure it with the command it will use to start containers.
CMD dotnet /app/DockerConsoleApp.dll

# how do i use this Dockerfile?
# 1. dotnet publish -o publish
# 2. docker build -t docker-console .
# 3. docker run docker-console