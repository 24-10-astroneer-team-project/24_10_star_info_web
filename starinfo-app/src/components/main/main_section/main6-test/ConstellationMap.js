import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import './test.css';
import Main_Button from '../../../../components/layout/Main_Button'; // Main_Button 컴포넌트 임포트

const ConstellationMap = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const c = canvas.getContext("2d");

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Retina display setup
        const ratio = window.devicePixelRatio || 1;
        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * ratio;
            canvas.height = height * ratio;
            c.scale(ratio, ratio);

            // Redraw after resizing
            draw(geoConstellations, [30, -70]);
        };

        window.addEventListener("resize", setCanvasSize);

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        c.scale(ratio, ratio);

        const projection = d3.geoStereographic().scale(600);
        const fixedProjection = d3.geoStereographic().scale(600).rotate([0, 0]);
        const path = d3.geoPath().projection(projection).context(c);
        const graticule = d3.geoGraticule().step([15, 15]);
        const bgRGB = d3.rgb("#113");

        let geoConstellations = [];

        d3.json(
            "https://gist.githubusercontent.com/djdmsr/e7179cd81961200ee5c39c2c8c3e1ac6/raw/231765dc684864b1552065f320282c62a8fa7921/stars"
        ).then((data) => {
            let starsMag = [];

            data = data.map((constellation) => {
                constellation.stars = constellation.stars.filter((star) => {
                    if (star.mag < 6) starsMag.push(star.mag);
                    return star.mag < 6;
                });
                return constellation;
            });

            const minMaxMag = d3.extent(starsMag);
            const opacityScale = d3.scaleLinear()
                .domain(minMaxMag)
                .range([1, 0.4]);

            const magScale = d3.scaleLinear()
                .domain(minMaxMag)
                .range([2.7, 1.7]);

            data.forEach((constellation) => {
                let geometries = [];

                constellation.stars.forEach((star) => {
                    const rgb = d3.rgb(star.color);
                    const rgba = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacityScale(
                        star.mag
                    )})`;

                    geometries.push({
                        type: "Point",
                        coordinates: [-star.ra, star.dec],
                        properties: {
                            color: rgba,
                            mag: magScale(star.mag),
                        },
                    });
                });

                const lines = constellation.lines.map((line) => {
                    const p1 = [-line.ra1, line.dec1];
                    const p2 = [-line.ra2, line.dec2];
                    return [p1, p2];
                });

                geometries.push({
                    type: "MultiLineString",
                    coordinates: lines,
                });

                if (constellation.name === "Serpens") {
                    const bound1 = constellation.boundary[0].map((coords) => [
                        -coords[0],
                        coords[1],
                    ]);
                    const bound2 = constellation.boundary[1].map((coords) => [
                        -coords[0],
                        coords[1],
                    ]);
                    geometries.push({
                        type: "LineString",
                        coordinates: bound1,
                    });
                    geometries.push({
                        type: "LineString",
                        coordinates: bound2,
                    });
                } else {
                    const boundLines = constellation.boundary.map((coords) => [
                        -coords[0],
                        coords[1],
                    ]);
                    geometries.push({
                        type: "LineString",
                        coordinates: boundLines,
                    });
                }

                geometries = {
                    type: "GeometryCollection",
                    geometries: geometries,
                };

                const geoConstellation = {
                    type: "Feature",
                    geometry: geometries,
                    properties: {
                        name: constellation.name,
                        zodiac: constellation.zodiac,
                        center: d3.geoCentroid(geometries),
                    },
                };

                geoConstellations.push(geoConstellation);
            });

            draw(geoConstellations, [30, -70]);

            let raStart, decStart;

            function getStart(event) {
                const [x, y] = d3.pointer(event);
                raStart = projection.invert([x, y])[0];
                decStart = fixedProjection.invert([x, y])[1];
            }

            function move(event) {
                const [x, y] = d3.pointer(event);
                const raFinish = projection.invert([x, y])[0];
                const decFinish = fixedProjection.invert([x, y])[1];

                const raRotate = raFinish - raStart;
                const decRotate = decFinish - decStart;

                const rotate = projection.rotate();
                const newCenter = [rotate[0] + raRotate, rotate[1] + decRotate];

                draw(geoConstellations, newCenter);

                raStart = raFinish;
                decStart = decFinish;
            }

            d3.select(canvas)
                .call(
                    d3.drag().on("start", getStart).on("drag", move)
                );
        });

        function makeRadialGradient(x, y, r, color) {
            const radialgradient = c.createRadialGradient(x, y, 0, x, y, r);
            radialgradient.addColorStop(0.2, color);
            radialgradient.addColorStop(
                0.5,
                `rgba(${bgRGB.r},${bgRGB.g},${bgRGB.b},0)`
            );
            radialgradient.addColorStop(
                0.5,
                `rgba(${bgRGB.r},${bgRGB.g},${bgRGB.b},1)`
            );
            radialgradient.addColorStop(
                1,
                `rgba(${bgRGB.r},${bgRGB.g},${bgRGB.b},0)`
            );
            c.fillStyle = radialgradient;
        }

        function draw(constellations, center) {
            let min = 0,
                minDistance = distance(projection(constellations[0].properties.center));

            if (center) projection.rotate(center);

            c.clearRect(0, 0, width, height);
            c.strokeStyle = "#fff";
            c.lineWidth = 0.1;
            c.beginPath();
            path(graticule());
            c.stroke();

            c.lineWidth = 0.4;
            c.beginPath();
            path({
                type: "LineString",
                coordinates: [
                    [-180, 0],
                    [-90, 0],
                    [0, 0],
                    [90, 0],
                    [180, 0],
                ],
            });
            c.stroke();

            c.strokeStyle = "#f2f237";
            c.beginPath();
            path({
                type: "LineString",
                coordinates: [
                    [-180, 0],
                    [-90, 23.26],
                    [0, 0],
                    [90, -23.26],
                    [180, 0],
                ],
            });
            c.stroke();

            constellations.forEach((constellation, i) => {
                const currentDistance = distance(
                    projection(constellations[i].properties.center)
                );
                if (currentDistance < minDistance) {
                    min = i;
                    minDistance = currentDistance;
                }
                constellation.geometry.geometries.forEach((geo) => {
                    if (geo.type === "Point") {
                        const [x, y] = projection(geo.coordinates);
                        makeRadialGradient(x, y, geo.properties.mag, geo.properties.color);
                        path.pointRadius([geo.properties.mag]);
                        c.beginPath();
                        path(geo);
                        c.fill();
                    } else if (geo.type === "LineString") {
                        c.strokeStyle = "#000";
                        c.beginPath();
                        path(geo);
                        c.stroke();
                    } else if (geo.type === "MultiLineString") {
                        c.strokeStyle = constellation.properties.zodiac
                            ? "#f2f237"
                            : "#999";
                        c.beginPath();
                        path(geo);
                        c.stroke();
                    }
                });
            });

            c.strokeStyle = "#f00";
            c.lineWidth = 1.2;
            constellations[min].geometry.geometries.forEach((geo) => {
                if (geo.type === "LineString") {
                    c.beginPath();
                    path(geo);
                    c.stroke();
                }
            });

            c.fillStyle = "#fff";
            c.textAlign = "center";
            c.font = "18px sans-serif";
            c.fillText(constellations[min].properties.name, width / 2, 280);
        }

        function distance(p) {
            const center = [width / 2, height / 2];
            const xRotate = center[0] - p[0];
            const yRotate = center[1] - p[1];

            return Math.sqrt(Math.pow(xRotate, 2) + Math.pow(yRotate, 2));
        }

        return () => {
            window.removeEventListener("resize", setCanvasSize);

        };

    }, []);

    return (
        <div
            className="constellation-container"
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
            }}
        >
            {/* 캔버스 */}
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
            {/* 메인 버튼 */}
            <Main_Button
                onClick={() => (window.location.href = "/react/starmap")}
                label="별자리 정보 보러가기"
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2, // 캔버스 위에 위치
                }}
            />
        </div>
    );
};

export default ConstellationMap;
