#!/usr/bin/env bash
# =============================================================================
# run-newman.sh — Generic Automated API Test Runner (Newman / Postman CLI)
# Project  : API & Contract Testing — Nhóm 3 (SEBros)
# Author   : Mạch Quốc Tấn (23127115)
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if git -C "$SCRIPT_DIR" rev-parse --show-toplevel &>/dev/null; then
  REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel)"
else
  REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
fi

CLI_ENGINE="newman"
TARGET_COLLECTION="$REPO_ROOT/src/postman/collections"
ENV_FILE="$REPO_ROOT/src/postman/environments/local.postman_environment.json"
DATA_FILE=""
FOLDER_FILTER=""
BASE_URL="http://localhost:8080"
OUTPUT_BASE="$SCRIPT_DIR/output/reports"
ENABLE_HTML=true
ENABLE_JSON=true
ENABLE_CLI=true
SKIP_PROVIDER_CHECK=false

log_info()    { echo -e "[INFO]  $*"; }
log_ok()      { echo -e "[OK]    $*"; }
log_warn()    { echo -e "[WARN]  $*"; }
log_error()   { echo -e "[ERROR] $*"; }
log_section() { echo -e "\n========================================\n  $*\n========================================"; }

show_help() {
  echo "Usage: bash src/newman/run-newman.sh [OPTIONS]"
  exit 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cli) CLI_ENGINE="$2"; shift 2 ;;
    -c|--collection) TARGET_COLLECTION="$2"; shift 2 ;;
    -e|--environment) ENV_FILE="$2"; shift 2 ;;
    -d|--data) DATA_FILE="$2"; shift 2 ;;
    -f|--folder) FOLDER_FILTER="$2"; shift 2 ;;
    -u|--url) BASE_URL="$2"; shift 2 ;;
    -o|--output) OUTPUT_BASE="$2"; shift 2 ;;
    --no-html) ENABLE_HTML=false; shift ;;
    --no-json) ENABLE_JSON=false; shift ;;
    --no-cli) ENABLE_CLI=false; shift ;;
    --skip-provider-check) SKIP_PROVIDER_CHECK=true; shift ;;
    -h|--help) show_help ;;
    *) log_error "Option khong hop le: $1. Dung -h de xem tro giup."; exit 1 ;;
  esac
done

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
REPORT_DIR="$OUTPUT_BASE/$TIMESTAMP"

check_requirements() {
  log_section "Kiem tra yeu cau he thong"
  if ! command -v "$CLI_ENGINE" &>/dev/null; then
    log_error "$CLI_ENGINE chua duoc cai dat."
    exit 1
  fi
  log_ok "$CLI_ENGINE CLI : OK"
}

check_provider() {
  log_section "Kiem tra Provider API"
  log_info "Dang ket noi: $BASE_URL/products ..."
  local token="$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 -H "Authorization: Bearer $token" "$BASE_URL/products" 2>/dev/null || echo "000")"
  if [[ "$code" == "200" ]]; then
    log_ok "Provider API dang hoat dong tai $BASE_URL (HTTP 200)"
  else
    log_error "Khong the ket noi den Provider API tai $BASE_URL (HTTP $code)"
    exit 1
  fi
}

run_single() {
  local col_path="$1"
  local col_name="$(basename "$col_path" .postman_collection.json)"
  col_name="$(basename "$col_name" .json)"

  local label="$col_name"
  [[ -n "$FOLDER_FILTER" ]] && label="${col_name}_$(echo "$FOLDER_FILTER" | sed 's/[^a-zA-Z0-9._-]/_/g')"

  local html_report="$REPORT_DIR/${label}-report.html"
  local json_report="$REPORT_DIR/${label}-report.json"

  log_info "Dang thuc thi: $col_name"

  local reporters=""
  $ENABLE_CLI  && reporters="${reporters}cli,"
  $ENABLE_HTML && reporters="${reporters}htmlextra,"
  $ENABLE_JSON && reporters="${reporters}json,"
  reporters="${reporters%,}"
  [[ -z "$reporters" ]] && reporters="cli"

  local -a args=(run "$col_path" -e "$ENV_FILE" --reporters "$reporters" --bail false)
  $ENABLE_HTML && args+=(--reporter-htmlextra-export "$html_report" --reporter-htmlextra-title "$label")
  $ENABLE_JSON && args+=(--reporter-json-export "$json_report")
  [[ -n "$DATA_FILE" ]] && args+=(--iteration-data "$DATA_FILE")
  [[ -n "$FOLDER_FILTER" ]] && args+=(--folder "$FOLDER_FILTER")

  local exit_code=0
  "$CLI_ENGINE" "${args[@]}" || exit_code=$?

  if [[ $exit_code -eq 0 ]]; then
    log_ok "PASSED -- $col_name"
  else
    log_warn "FAILED (exit $exit_code) -- $col_name"
  fi
  return $exit_code
}

main() {
  log_section "Newman Automated Test Runner"
  log_info "Timestamp : $TIMESTAMP"
  log_info "Engine    : $CLI_ENGINE"
  log_info "Output    : $REPORT_DIR"

  check_requirements
  [[ "$SKIP_PROVIDER_CHECK" == false ]] && check_provider

  mkdir -p "$REPORT_DIR"

  local collections=()
  if [[ -f "$TARGET_COLLECTION" ]]; then
    collections+=("$TARGET_COLLECTION")
  elif [[ -d "$TARGET_COLLECTION" ]]; then
    while IFS= read -r -d '' file; do
      collections+=("$file")
    done < <(find "$TARGET_COLLECTION" -maxdepth 1 -name "*.json" -print0)
  else
    log_error "Duong dan collection khong hop le: $TARGET_COLLECTION"
    exit 1
  fi

  if [[ ${#collections[@]} -eq 0 ]]; then
    log_error "Khong tim thay file collection nao trong $TARGET_COLLECTION"
    exit 1
  fi

  log_section "Bat dau chay kiem thu (${#collections[@]} collection)"

  local total=0
  local failed=0

  for col in "${collections[@]}"; do
    total=$((total + 1))
    run_single "$col" || failed=$((failed + 1))
  done

  log_section "Tong ket"
  log_info "Tong so Collections : $total"
  log_info "Thanh cong (PASSED)  : $((total - failed))/$total"

  if [[ $failed -gt 0 ]]; then
    log_warn "That bai (FAILED)    : $failed/$total"
  else
    log_ok   "Tat ca bo kiem thu deu PASSED!"
  fi

  log_info "Bao cao xuat tai: $REPORT_DIR"
}

main "$@"
