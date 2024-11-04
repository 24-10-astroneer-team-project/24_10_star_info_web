export function drawdiagram(diagramOn, setDiagramOn) {
    const diagram = document.getElementById('diagram');
    const months = document.getElementById('months');

    if (diagramOn) {
        months.classList.remove("drawMonths");
        months.classList.add("eraseMonths");

        setTimeout(() => {
            diagram.classList.remove("drawDiagram");
            diagram.classList.add("eraseDiagram");
        }, 2000);

    } else {
        diagram.classList.remove("eraseDiagram");
        diagram.classList.add("drawDiagram");

        setTimeout(() => {
            months.classList.remove("eraseMonths");
            months.classList.add("drawMonths");
        }, 2000);
    }

    // Toggle the diagram state
    setDiagramOn(!diagramOn);
}
