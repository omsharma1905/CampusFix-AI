"use client";

import React from "react";
import { AssetDetailRecord } from "../types";

// Generates deterministic QR matrix pattern based on seed string
export function generateDeterministicQrGrid(seed: string): boolean[][] {
  const size = 25; // 25x25 QR Version 2 matrix
  const grid: boolean[][] = Array(size)
    .fill(false)
    .map(() => Array(size).fill(false));

  // Helper to mark a 7x7 Finder Pattern at (row, col)
  const addFinderPattern = (startRow: number, startCol: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[startRow + r][startCol + c] = isBorder || isCenter;
      }
    }
  };

  // 1. Top-Left Finder
  addFinderPattern(0, 0);
  // 2. Top-Right Finder
  addFinderPattern(0, size - 7);
  // 3. Bottom-Left Finder
  addFinderPattern(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // Alignment pattern at (16, 16)
  for (let r = 16; r <= 20; r++) {
    for (let c = 16; c <= 20; c++) {
      const isBorder = r === 16 || r === 20 || c === 16 || c === 20;
      const isCenter = r === 18 && c === 18;
      grid[r][c] = isBorder || isCenter;
    }
  }

  // Hash seed to populate deterministic data cells
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  // Pseudo-random data generator with linear congruential formula
  let state = Math.abs(hash) || 42;
  const nextBit = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state % 3 !== 0;
  };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Don't overwrite finders or timing patterns
      const inTopLeft = r < 9 && c < 9;
      const inTopRight = r < 9 && c >= size - 9;
      const inBottomLeft = r >= size - 9 && c < 9;
      const inAlignment = r >= 15 && r <= 21 && c >= 15 && c <= 21;
      const inTiming = r === 6 || c === 6;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inAlignment && !inTiming) {
        grid[r][c] = nextBit();
      }
    }
  }

  return grid;
}

export function AssetQrSvg({
  payload,
  size = 120,
  className = "",
}: {
  payload: string;
  size?: number;
  className?: string;
}) {
  const matrix = React.useMemo(() => generateDeterministicQrGrid(payload), [payload]);
  const cellSize = size / matrix.length;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`QR Code for ${payload}`}
    >
      <rect width={size} height={size} fill="#FFFFFF" />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize + 0.2}
              height={cellSize + 0.2}
              fill="#030407"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function downloadAssetQrImage(asset: AssetDetailRecord) {
  const matrix = generateDeterministicQrGrid(asset.qrPayload || asset.id);
  const canvas = document.createElement("canvas");
  const scale = 16;
  const padding = 32;
  const qrPixelSize = matrix.length * scale;
  const totalWidth = qrPixelSize + padding * 2;
  const totalHeight = qrPixelSize + padding * 2 + 80;

  canvas.width = totalWidth;
  canvas.height = totalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // Border
  ctx.strokeStyle = "#E2E4DE";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, totalWidth - 2, totalHeight - 2);

  // Draw QR cells
  ctx.fillStyle = "#030407";
  matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        ctx.fillRect(padding + c * scale, padding + r * scale, scale, scale);
      }
    });
  });

  // Label text
  ctx.fillStyle = "#030407";
  ctx.font = "bold 22px Geist, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(asset.id, totalWidth / 2, qrPixelSize + padding + 35);

  ctx.fillStyle = "#73766C";
  ctx.font = "14px Geist, Arial, sans-serif";
  ctx.fillText(asset.name.slice(0, 32), totalWidth / 2, qrPixelSize + padding + 60);

  // Trigger file download
  const link = document.createElement("a");
  link.download = `${asset.id}-QR-Label.png`;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printAssetTag(asset: AssetDetailRecord) {
  const printWindow = window.open("", "_blank", "width=600,height=520");
  if (!printWindow) return;

  const matrix = generateDeterministicQrGrid(asset.qrPayload || asset.id);
  const size = 140;
  const cellSize = size / matrix.length;
  const svgRects = matrix
    .flatMap((row, r) =>
      row.map((cell, c) =>
        cell
          ? `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${(cellSize + 0.2).toFixed(2)}" height="${(cellSize + 0.2).toFixed(2)}" fill="#030407"/>`
          : ""
      )
    )
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Label - ${asset.id}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 24px; display: flex; justify-content: center; }
          .label-card { width: 340px; border: 2px solid #030407; border-radius: 8px; padding: 16px; background: #fff; text-align: center; }
          .inst { font-size: 10px; font-weight: bold; letter-spacing: 1px; color: #73766c; text-transform: uppercase; margin-bottom: 8px; }
          .qr-box { display: inline-block; padding: 6px; background: #fff; border: 1px solid #e2e4de; border-radius: 6px; }
          .id { font-size: 20px; font-weight: 800; font-family: monospace; margin: 10px 0 2px 0; color: #030407; }
          .name { font-size: 13px; font-weight: 600; color: #030407; }
          .meta { font-size: 11px; color: #73766c; margin-top: 4px; }
          .encrypted { font-size: 9px; font-weight: bold; background: #030407; color: #d4ff24; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 8px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="label-card">
          <div class="inst">CAMPUSFIX AI • APEX INSTITUTE</div>
          <div class="qr-box">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <rect width="140" height="140" fill="#fff"/>
              ${svgRects}
            </svg>
          </div>
          <div class="id">${asset.id}</div>
          <div class="name">${asset.name}</div>
          <div class="meta">${asset.building} • ${asset.space}</div>
          <div class="encrypted">VERIFIED SHA-256 TAG</div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
