# ============================================
#  Script: Encode / Decode Base64 en PowerShell
# ============================================

param (
    [Parameter(Mandatory=$false)]
    [ValidateSet("encode", "decode", IgnoreCase=$true)]
    [string]$Mode,

    [Parameter(Mandatory=$false)]
    [string]$InputText
)

# Mostrar ayuda si faltan parámetros
if (-not $Mode -or -not $InputText) {
    Write-Host "Uso del script:" -ForegroundColor Yellow
    Write-Host "  .\base64.ps1 -Mode <encode|decode> -InputText <texto>"
    Write-Host ""
    Write-Host "Modos disponibles:"
    Write-Host "  encode   - Convierte texto normal a Base64"
    Write-Host "  decode   - Convierte Base64 a texto legible"
    Write-Host ""
    Write-Host "Ejemplos:"
    Write-Host "  .\base64.ps1 -Mode encode -InputText ""Hola mundo"""
    Write-Host "  .\base64.ps1 -Mode decode -InputText ""SG9sYSBtdW5kbw=="""
    exit
}

function Encode-Base64 {
    param([string]$Text)
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
    return [System.Convert]::ToBase64String($bytes)
}

function Decode-Base64 {
    param([string]$Text)
    $bytes = [System.Convert]::FromBase64String($Text)
    return [System.Text.Encoding]::UTF8.GetString($bytes)
}

switch ($Mode.ToLower()) {
    "encode" { Encode-Base64 -Text $InputText }
    "decode" { Decode-Base64 -Text $InputText }
}
