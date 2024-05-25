FROM mcr.microsoft.com/dotnet/aspnet:7.0-windowsservercore-ltsc2019

# Copy the application from folder "app" to "C:\app" on container machine
COPY app/ /app

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
RUN [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; \
    Invoke-WebRequest "https://aka.ms/vs/17/release/vc_redist.x64.exe" -OutFile "vc_redist.x64.exe"; \
    Start-Process "vc_redist.x64.exe" -ArgumentList "/passive" -wait -Passthru; \
    Remove-Item -Force vc_redist.x64.exe;

WORKDIR /app
EXPOSE 80

ENTRYPOINT ["dotnet", "webapi.dll"]