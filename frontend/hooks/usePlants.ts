import { useState } from "react";
import { Row, AppState } from "../types/plants";
import { getApiUrl } from "../utils/api";

const API_URL = getApiUrl();

export function usePlants() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [plants, setPlants] = useState<Row[]>([]);
  const [tableName, setTableName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPlants = async () => {
    try {
      setAppState("loading");
      setErrorMsg("");

      const response = await fetch(`${API_URL}/plants`);
      const data = await response.json();

      if (data.configured === false) {
        setErrorMsg(
          data.reason === "db_error" ? data.message : "Database not configured",
        );
        setAppState("setup");
        return;
      }

      if (data.plants) {
        setPlants(data.plants);
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

  const handleViewPlants = () => {
    fetchPlants();
  };

  const handleRetry = () => {
    fetchPlants();
  };

  const handleSetupComplete = () => {
    fetchPlants();
  };

  return {
    appState,
    plants,
    tableName,
    errorMsg,
    handleViewPlants,
    handleRetry,
    handleSetupComplete,
  };
}
