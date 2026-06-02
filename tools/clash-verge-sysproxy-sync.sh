#!/bin/zsh
set -u

CONFIG="$HOME/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/verge.yaml"
LOG="$HOME/Library/Logs/clash-verge-sysproxy-sync.log"
SERVICES=("公司" "Wi-Fi")
LAST_STATE=""

log() {
  printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >> "$LOG"
}

read_value() {
  local key="$1"
  awk -F': *' -v key="$key" '$1 == key { print $2; exit }' "$CONFIG" 2>/dev/null
}

apply_state() {
  local state="$1"
  local host
  local port

  host="$(read_value proxy_host)"
  port="$(read_value verge_mixed_port)"

  [[ -n "$host" && "$host" != "null" ]] || host="127.0.0.1"
  [[ -n "$port" && "$port" != "null" ]] || port="7897"

  for service in "${SERVICES[@]}"; do
    if [[ "$state" == "true" ]]; then
      /usr/sbin/networksetup -setwebproxy "$service" "$host" "$port" >/dev/null 2>&1
      /usr/sbin/networksetup -setsecurewebproxy "$service" "$host" "$port" >/dev/null 2>&1
      /usr/sbin/networksetup -setwebproxystate "$service" on >/dev/null 2>&1
      /usr/sbin/networksetup -setsecurewebproxystate "$service" on >/dev/null 2>&1
    else
      /usr/sbin/networksetup -setwebproxystate "$service" off >/dev/null 2>&1
      /usr/sbin/networksetup -setsecurewebproxystate "$service" off >/dev/null 2>&1
    fi
  done

  /usr/sbin/networksetup -detectnewhardware >/dev/null 2>&1
  log "synced enable_system_proxy=$state host=$host port=$port services=${SERVICES[*]}"
}

log "sync daemon started"

while true; do
  if [[ -r "$CONFIG" ]]; then
    state="$(read_value enable_system_proxy)"
    if [[ "$state" == "true" || "$state" == "false" ]]; then
      if [[ "$state" != "$LAST_STATE" ]]; then
        apply_state "$state"
        LAST_STATE="$state"
      fi
    fi
  fi

  sleep 1
done
