FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["Netcore-Angular/Netcore-Angular.csproj", "Netcore-Angular/"]
COPY ["Netcore-Angular.Infrastructure/Netcore-Angular.Infrastructure.csproj", "Netcore-Angular.Infrastructure/"]
COPY ["NetCore-Angular.Database/NetCore-Angular.Database.csproj", "NetCore-Angular.Database/"]
COPY ["Netcore-Angular.Domain/Netcore-Angular.Domain.csproj", "Netcore-Angular.Domain/"]
RUN dotnet restore "Netcore-Angular/Netcore-Angular.csproj"
COPY . .
WORKDIR "/src/Netcore-Angular"
RUN dotnet build "Netcore-Angular.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Netcore-Angular.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Netcore-Angular.dll"]