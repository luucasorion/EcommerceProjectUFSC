FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-env
WORKDIR /app

COPY BE ./BE


WORKDIR /app/BE/src/Backend/EcommerceProjectUFSC.API
RUN dotnet restore

RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "EcommerceProjectUFSC.API.dll"] 