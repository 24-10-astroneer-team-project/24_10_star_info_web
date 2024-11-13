// src/main/main5/ConstellationSection.js
import React, { useEffect, useRef } from 'react';
import './ConstellationSection.css';

function ConstellationSection() {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        const svgNS = "http://www.w3.org/2000/svg";
        const ViewportX = window.innerWidth;
        const ViewportY = window.innerHeight;

        const listItems = Array.from(svg.querySelectorAll(".list-item"));

        // List of constellation paths and descriptions
        const pathArr = [
            {
                id: 0,
                path: createPathStr([74, 34.4, "L", 65.1, 26.8, "L", 68.1, 18.69, "L", 74.8, 24.9, "Z", "M", 74, 34.4, "L", 76.49, 43.2, "L", 78.4, 51.9, "L", 83.35, 55.2]),
                description: "The Big Dipper is an asterism within Ursa Major, symbolizing the north.",
            },
            {
                id: 1,
                path: createPathStr([71.61, 83.66, "L", 74.47, 75.95, "L", 77.34, 78.68, "L", 73.95, 87.43, "Z", "M", 71.61, 83.6, "L", 66.66, 89.07, "L", 61.45, 89.07, "L", 56.77, 86.88]),
                description: "Ursa Minor has been important for navigation as it contains Polaris, the North Star.",
            },
            {
                id: 2,
                path: createPathStr([62.5, 12.56, "L", 46.875, 21.3, "L", 36.45, 27.86, "L", 28.125, 39.89, "M", 46.875, 21.3, "L", 47.65, 30, "L", 49.2, 36]),
                description: "Andromeda is named in honor of Cassiopeia's daughter in Greek mythology.",
            },
            {
                id: 3,
                path: createPathStr([19.27, 56.3, "L", 21.875, 50.8, "L", 20.3125, 46.45, "L", 16.66, 45.9, "L", 14, 45.4, "L", 13.28, 51.91, "L", 12.76, 61.75, "L", 9.65, 74.68, "L", 8.59, 77.6, "L", 6.8, 78.69]),
                description: "Scorpio is one of the brightest constellations in the sky.",
            },
            {
                id: 4,
                path: createPathStr([73.96, 45.36, "L", 77.6, 36.6, "L", 72.9, 33.3, "L", 72.1, 39.3, "Z", "M", 73.96, 45.36, "L", 73.96, 67.2, "L", 73.4, 78.1, "L", 68.75, 77, "L", 67.2, 68.3, "L", 66.4, 54.1, "L", 64.3, 44.8]),
                description: "Draco is home to Kepler-10, one of the smallest and closest exoplanets to Earth.",
            },
            {
                id: 5,
                path: createPathStr([58.3, 7.1, "L", 60.2, 16.4, "L", 60.7, 20.21, "L", 60.2, 25.1, "L", 59.6, 26.8, "L", 57.3, 30, "L", 55.5, 31.7, "L", 42.7, 26.8, "L", 38.5, 29, "M", 57.3, 30, "L", 58.9, 35]),
                description: "Sagittarius is one of the constellations of the zodiac. The center of the Milky Way lies in Sagittarius.",
            }
        ];

        function createPathStr(pArr) {
            let path = 'M';
            let index = 1;
            pArr.forEach((p) => {
                if (typeof p === "number") {
                    if (index % 2 === 0) {
                        path += " " + (ViewportY - ((p / 100) * ViewportY)).toFixed(0);
                    } else {
                        path += " " + (ViewportX - ((p / 100) * ViewportX)).toFixed(0);
                    }
                    index++;
                } else {
                    path += " " + p;
                }
            });
            return path;
        }

        function drawStars() {
            for (let i = 0; i < 300; i++) {
                const circle = document.createElementNS(svgNS, "circle");
                const randomX = Math.random() * ViewportX;
                const randomY = Math.random() * ViewportY;
                const randomR = Math.random() * 2.5;

                circle.setAttribute("cx", randomX);
                circle.setAttribute("cy", randomY);
                circle.setAttribute("r", randomR);
                circle.setAttribute("fill", "#fff");
                circle.classList.add("animate");

                svg.appendChild(circle);
            }
        }

        function drawPath(pathStr) {
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", pathStr);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "#fff");
            path.setAttribute("stroke-width", 2);
            path.classList.add("constellation");

            svg.appendChild(path);
        }

        listItems.forEach((el, index) => {
            el.addEventListener("mouseover", () => {
                const pathObj = pathArr.find((obj) => obj.id === index);
                if (pathObj) {
                    drawPath(pathObj.path);
                }
            });
            el.addEventListener("mouseout", () => {
                const path = svg.querySelector(".constellation");
                if (path) svg.removeChild(path);
            });
        });

        drawStars();

        return () => {
            listItems.forEach((el) => {
                el.removeEventListener("mouseover", drawPath);
                el.removeEventListener("mouseout", () => {});
            });
        };
    }, []);

    return (
        <svg ref={svgRef} id="svg" width="100%" height="100vh">
            <defs>
                <linearGradient id="grad" x1="50%" y1="100%" x2="50%" y2="10%">
                    <stop offset="0%" style={{ stopColor: "#1B3347", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#172C3C", stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g transform="translate(20, 80)" id="list">
                <text className="list-item" id="0">Big Dipper</text>
                <text className="list-item" id="1" y="50">Ursa Minor</text>
                <text className="list-item" id="2" y="100">Andromeda</text>
                <text className="list-item" id="3" y="150">Scorpio</text>
                <text className="list-item" id="4" y="200">Draco</text>
                <text className="list-item" id="5" y="250">Sagittarius</text>
            </g>
        </svg>
    );
}

export default ConstellationSection;
