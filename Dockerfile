# Use the official ASP.NET Core image as a base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Set environment variable for ASP.NET Core URLs
ENV ASPNETCORE_URLS=http://*:8080;https://*:8081

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the csproj file and restore dependencies
COPY ["umDainn/umDainn.csproj", "umDainn/"]
RUN dotnet restore "umDainn/umDainn.csproj"

# Copy the entire project
COPY ./umDainn ./umDainn
WORKDIR /src/umDainn
RUN dotnet build "umDainn.csproj" -c Release -o /app/build

# Publish the project
FROM build AS publish
RUN dotnet publish "umDainn.csproj" -c Release -o /app/publish

# Final stage: run the application
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "umDainn.dll"]
