import { useState } from "react";
import { Row, AppState } from "../types/table";
import { getApiUrl } from "../utils/api";

const API_URL = getApiUrl();

export function useTable() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [rows, setRows] = useState<Row[]>([]);
  const [tableName, setTableName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchRows = async () => {
    try {
      setAppState("loading");
      setErrorMsg("");

      const response = await fetch(`${API_URL}/table`);
      const data = await response.json();

      if (data.configured === false) {
        setErrorMsg(
          data.reason === "db_error" ? data.message : "Database not configured",
        );
        setAppState("setup");
        return;
      }

      if (data.rows) {
        setRows(data.rows);
        setTableName(data.tableName ?? "records");
        setAppState("loaded");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch data";
      setErrorMsg(errorMessage);
      setAppState("setup");
    }
  };

  const handleViewRows = () => {
    fetchRows();
  };

  const handleRetry = () => {
    fetchRows();
  };

  const handleSetupComplete = () => {
    fetchRows();
  };

  return {
    appState,
    rows,
    tableName,
    errorMsg,
    handleViewRows,
    handleRetry,
    handleSetupComplete,
  };
}
