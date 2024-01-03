# Use the official ASP.NET Core runtime as a base image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Set the working directory to /app
WORKDIR /app

# Copy the published files from the host to the container
COPY . .

# Expose the port your app will run on
EXPOSE 80

# Define the entry point for your app
ENTRYPOINT ["dotnet", "TenantManagementSystem.dll"]

