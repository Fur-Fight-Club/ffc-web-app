"use client";

import * as React from "react";
// @ts-ignore
import styles from "./ClickHeatmap.module.scss";
import { useEffect, useRef } from "react";
import { useGetHeatmapDataMutation } from "src/store/application/slice";
import { HeatmapData } from "src/store/application/application.model";
import L from "leaflet";
// @ts-ignore
import { Map, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import HeatmapLayer from "react-leaflet-heatmap-layer";

interface ClickHeatmapProps {
  route: string;
  refresh: number;
  count?: number;
  heatmapImage: string;
}

export const ClickHeatmap: React.FunctionComponent<ClickHeatmapProps> = ({
  route,
  refresh,
  count,
  heatmapImage,
}) => {
  var bounds = [
    [100, 0],
    [0, 100],
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(containerRef.current?.offsetWidth);
  const [height, setHeight] = React.useState(
    containerRef.current?.offsetHeight
  );

  const [fetchHeatmapData, { data, isSuccess }] = useGetHeatmapDataMutation();

  useEffect(() => {
    fetchHeatmapData({ route, count });
  }, [route, count, refresh]);

  const [heatmapData, setHeatmapData] = React.useState<number[][]>([]);

  const calculateHeatmapPoint = (
    data: HeatmapData,
    containerWidth: number,
    containerHeight: number
  ) => {
    const { click, window } = data;
    const ratioX = containerWidth / window.width;
    const ratioY = containerHeight / window.height;
    const x = Math.round(click.x * ratioX);
    const y = Math.round(click.y * ratioY);

    return [x, y, 100];
  };

  useEffect(() => {
    // For each entry, create a heatmap data point and calculate ratio
    if (isSuccess) {
      const points =
        data?.map((entry) => {
          return calculateHeatmapPoint(entry, width ?? 0, height ?? 0);
        }) ?? [];
      setHeatmapData(points);
    }
  }, [isSuccess]);

  useEffect(() => {
    setWidth(containerRef.current?.offsetWidth);
    setHeight(containerRef.current?.offsetHeight);
  }, [containerRef.current?.offsetWidth, containerRef.current?.offsetHeight]);

  const getMapCenter = (): number[][] => {
    const x = width ?? 1 / 2;
    const y = height ?? 1 / 2;
    return [
      [x, 0],
      [0, y],
    ];
  };

  return (
    <div
      ref={containerRef}
      className={`heatmap-${route}`}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
      }}
    >
      <Map
        crs={L.CRS.Simple}
        bounds={getMapCenter()}
        zoom={0}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ImageOverlay
          url={heatmapImage}
          bounds={[
            [height, 0],
            [0, width],
          ]}
        />
        <HeatmapLayer
          points={heatmapData}
          longitudeExtractor={(m: number[]) => m[0]}
          latitudeExtractor={(m: number[]) => m[1]}
          intensityExtractor={(m: number[]) => m[2]}
        />
      </Map>
    </div>
  );
};
