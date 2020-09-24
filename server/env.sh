cat <<EOF > src/config/runtime.json
{
    "apiUrl":"${API_HOST}:${API_PORT}",
    "apiHost":"${API_HOST}",
    "apiPort":"${API_PORT}",
    "apiVer":"v1"    
}
EOF