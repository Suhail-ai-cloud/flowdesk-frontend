import React, { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import "./styles/GlobalLoader.css";

export default function GlobalLoader() {

  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
}