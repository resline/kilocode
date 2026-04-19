const pptxgen = require('pptxgenjs');
const html2pptx = require('/root/repo/.claude/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Security & Legal Team';
    pptx.title = 'Kilocode Executive Presentation';
    pptx.subject = 'Security and Legal Analysis for Telecom Operator';

    const slidesDir = '/root/repo/workspace/kilocode_presentation/slides';

    // Slide 1: Title
    console.log('Creating slide 1: Title...');
    await html2pptx(path.join(slidesDir, 'slide01_title.html'), pptx);

    // Slide 2: Agenda
    console.log('Creating slide 2: Agenda...');
    await html2pptx(path.join(slidesDir, 'slide02_agenda.html'), pptx);

    // Slide 3: Executive Summary
    console.log('Creating slide 3: Executive Summary...');
    await html2pptx(path.join(slidesDir, 'slide03_exec_summary.html'), pptx);

    // Slide 4: Recommendation
    console.log('Creating slide 4: Final Recommendation...');
    await html2pptx(path.join(slidesDir, 'slide04_recommendation.html'), pptx);

    // Slide 5: Top 5 Risks - Table
    console.log('Creating slide 5: Top 5 Risks...');
    const { slide: slide5, placeholders: ph5 } = await html2pptx(path.join(slidesDir, 'slide05_top5_risks.html'), pptx);

    if (ph5.length > 0) {
        const risksData = [
            [
                { text: "#", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 14 } },
                { text: "Ryzyko", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 14 } },
                { text: "Severity", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 14 } },
                { text: "Impact Finansowy", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 14 } },
                { text: "Mitigation Cost (3y)", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 14 } }
            ],
            [
                { text: "1", options: { bold: true, fontSize: 13 } },
                "Data Exfiltration do LLM Providers",
                { text: "🔴 CRITICAL", options: { fontSize: 13 } },
                "€20M (kary RODO)",
                "€180k"
            ],
            [
                { text: "2", options: { bold: true, fontSize: 13 } },
                "MCP Server Code Execution",
                { text: "🔴 HIGH", options: { fontSize: 13 } },
                "€5M-10M (incident)",
                "€72k"
            ],
            [
                { text: "3", options: { bold: true, fontSize: 13 } },
                "Brak Certyfikacji RODO/NIS2",
                { text: "🔴 HIGH", options: { fontSize: 13 } },
                "€30M (RODO+NIS2)",
                "€15k"
            ],
            [
                { text: "4", options: { bold: true, fontSize: 13 } },
                "Vendor Discontinuity Risk",
                { text: "🟠 MEDIUM", options: { fontSize: 13 } },
                "€140k (stracone inv.)",
                "€90k"
            ],
            [
                { text: "5", options: { bold: true, fontSize: 13 } },
                "Brak SLA i Enterprise Support",
                { text: "🟠 MEDIUM", options: { fontSize: 13 } },
                "€90k (przestoje)",
                "€90k"
            ]
        ];

        // Adjust height to match placeholder
        const tablePos = { ...ph5[0], h: ph5[0].h };
        slide5.addTable(risksData, {
            ...tablePos,
            colW: [0.5, 3.2, 1.3, 2.0, 1.9],
            border: { pt: 1, color: "CCCCCC" },
            align: "left",
            valign: "middle",
            fontSize: 12,
            autoPage: false
        });
    }

    // Slide 6: Decision Matrix with Table and Radar Chart
    console.log('Creating slide 6: Decision Matrix...');
    const { slide: slide6, placeholders: ph6 } = await html2pptx(path.join(slidesDir, 'slide06_decision_matrix.html'), pptx);

    if (ph6.length >= 2) {
        // Table
        const matrixTable = ph6.find(p => p.id === 'matrix-table');
        if (matrixTable) {
            const matrixData = [
                [
                    { text: "Kryterium", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } },
                    { text: "Waga", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } },
                    { text: "Ocena", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } },
                    { text: "Wynik", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } }
                ],
                ["Bezpieczeństwo techniczne", "30%", "4/10", "1.2"],
                ["Zgodność RODO/NIS2", "25%", "3/10", "0.75"],
                ["Compliance telco", "20%", "2/10", "0.4"],
                ["Ryzyko biznesowe", "15%", "5/10", "0.75"],
                ["TCO / ROI", "10%", "7/10", "0.7"],
                [
                    { text: "OGÓLNA OCENA", options: { bold: true, fill: { color: "E33737" }, color: "FFFFFF", fontSize: 13 } },
                    { text: "100%", options: { bold: true, fill: { color: "E33737" }, color: "FFFFFF", fontSize: 13 } },
                    { text: "-", options: { bold: true, fill: { color: "E33737" }, color: "FFFFFF", fontSize: 13 } },
                    { text: "3.8/10", options: { bold: true, fill: { color: "E33737" }, color: "FFFFFF", fontSize: 13 } }
                ]
            ];

            slide6.addTable(matrixData, {
                ...matrixTable,
                colW: [2.2, 0.8, 0.8, 0.8],
                border: { pt: 1, color: "CCCCCC" },
                align: "left",
                valign: "middle",
                fontSize: 12
            });
        }

        // Radar Chart
        const radarChart = ph6.find(p => p.id === 'radar-chart');
        if (radarChart) {
            slide6.addChart(pptx.charts.RADAR, [
                {
                    name: "Kilocode",
                    labels: ["Bezpieczeństwo", "RODO/NIS2", "Compliance telco", "Ryzyko biz.", "TCO/ROI"],
                    values: [4, 3, 2, 5, 7]
                }
            ], {
                ...radarChart,
                chartColors: ["E33737"],
                showLegend: false,
                radarStyle: "standard",
                valAxisMaxVal: 10,
                valAxisMinVal: 0,
                valAxisMajorUnit: 2,
                dataLabelPosition: 'outEnd',
                dataLabelFontSize: 11
            });
        }
    }

    // Slide 7-11: Individual Risks (already in HTML)
    console.log('Creating slides 7-11: Individual risks...');
    await html2pptx(path.join(slidesDir, 'slide07_risk1.html'), pptx);
    await html2pptx(path.join(slidesDir, 'slide08_risk2.html'), pptx);
    await html2pptx(path.join(slidesDir, 'slide09_risk3.html'), pptx);
    await html2pptx(path.join(slidesDir, 'slide10_risk4.html'), pptx);
    await html2pptx(path.join(slidesDir, 'slide11_risk5.html'), pptx);

    // Slide 12: Scenarios Table
    console.log('Creating slide 12: Scenarios...');
    const { slide: slide12, placeholders: ph12 } = await html2pptx(path.join(slidesDir, 'slide12_scenarios.html'), pptx);

    if (ph12.length > 0) {
        const scenariosData = [
            [
                { text: "Scenariusz", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } },
                { text: "Koszt (3y)", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } },
                { text: "Timeline", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } },
                { text: "Ryzyko", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } },
                { text: "Status", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 13 } }
            ],
            ["A: Full Deployment", "€195k", "6m", "🔴 HIGH", "❌ NIE"],
            [
                { text: "B: Hardened Fork", options: { bold: true } },
                { text: "€387k", options: { bold: true } },
                { text: "18m", options: { bold: true } },
                { text: "🟡 MEDIUM", options: { bold: true } },
                { text: "✅ TAK", options: { bold: true } }
            ],
            ["C: Limited Pilot", "€16k", "6m", "🟢 LOW", "⚠️ PoC"],
            [
                { text: "D: GitHub Copilot", options: { bold: true } },
                { text: "€113k", options: { bold: true } },
                { text: "1m", options: { bold: true } },
                { text: "🟢 LOW", options: { bold: true } },
                { text: "✅ TAK", options: { bold: true } }
            ]
        ];

        slide12.addTable(scenariosData, {
            ...ph12[0],
            colW: [2.8, 1.4, 1.2, 1.4, 1.4],
            border: { pt: 1, color: "CCCCCC" },
            align: "center",
            valign: "middle",
            fontSize: 13
        });
    }

    // Slide 13: TCO & ROI Chart
    console.log('Creating slide 13: TCO & ROI...');
    const { slide: slide13, placeholders: ph13 } = await html2pptx(path.join(slidesDir, 'slide13_tco_roi.html'), pptx);

    if (ph13.length > 0) {
        slide13.addChart(pptx.charts.BAR, [
            {
                name: "Koszty",
                labels: ["Setup", "LLM API (3y)", "Infrastruktura (3y)", "Wsparcie (3y)", "TOTAL"],
                values: [45, 180, 72, 90, 387]
            },
            {
                name: "Korzyści",
                labels: ["Setup", "LLM API (3y)", "Infrastruktura (3y)", "Wsparcie (3y)", "TOTAL"],
                values: [0, 0, 0, 0, 570]
            }
        ], {
            ...ph13[0],
            barDir: 'col',
            barGrouping: 'clustered',
            showTitle: false,
            showLegend: true,
            legendPos: 't',
            showCatAxisTitle: true,
            catAxisTitle: 'Kategoria',
            showValAxisTitle: true,
            valAxisTitle: 'Wartość (€k)',
            valAxisMaxVal: 600,
            valAxisMinVal: 0,
            valAxisMajorUnit: 100,
            chartColors: ["E33737", "292929"],
            dataLabelPosition: 'outEnd',
            dataLabelFontSize: 11
        });
    }

    // Slide 14: Roadmap
    console.log('Creating slide 14: Roadmap...');
    await html2pptx(path.join(slidesDir, 'slide14_roadmap.html'), pptx);

    // Slide 15: Alternatives Comparison
    console.log('Creating slide 15: Alternatives...');
    const { slide: slide15, placeholders: ph15 } = await html2pptx(path.join(slidesDir, 'slide15_alternatives.html'), pptx);

    if (ph15.length >= 2) {
        // Comparison Table
        const compTable = ph15.find(p => p.id === 'comparison-table');
        if (compTable) {
            const altData = [
                [
                    { text: "Kryterium", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 11 } },
                    { text: "Kilocode Fork", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 11 } },
                    { text: "GitHub Copilot", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 11 } },
                    { text: "CodeWhisperer", options: { fill: { color: "292929" }, color: "FFFFFF", bold: true, fontSize: 11 } }
                ],
                ["Koszt (3y)", "€387k", "€113k ✅", "€90k ✅"],
                ["Bezpieczeństwo", "7/10", "9/10 ✅", "9/10 ✅"],
                ["RODO/NIS2", "6/10", "9/10 ✅", "8/10"],
                ["Wsparcie", "Internal", "24/7 SLA ✅", "AWS Support"],
                ["Funkcjonalność AI", "9/10 ✅", "8/10", "7/10"],
                ["Customizacja", "10/10 ✅", "4/10", "5/10"],
                ["Vendor Lock-in", "LOW ✅", "HIGH", "MEDIUM"],
                ["Deploy Time", "4-6m", "2w ✅", "1w ✅"]
            ];

            slide15.addTable(altData, {
                ...compTable,
                colW: [1.5, 1.2, 1.2, 1.2],
                border: { pt: 1, color: "CCCCCC" },
                align: "left",
                valign: "middle",
                fontSize: 10
            });
        }

        // Radar Chart for Alternatives
        const radarAlt = ph15.find(p => p.id === 'radar-alternatives');
        if (radarAlt) {
            slide15.addChart(pptx.charts.RADAR, [
                {
                    name: "Kilocode",
                    labels: ["Bezpiecz.", "Compliance", "Funkcj. AI", "Custom.", "TCO"],
                    values: [7, 6, 9, 10, 5]
                },
                {
                    name: "Copilot",
                    labels: ["Bezpiecz.", "Compliance", "Funkcj. AI", "Custom.", "TCO"],
                    values: [9, 9, 8, 4, 8]
                },
                {
                    name: "CodeWhisperer",
                    labels: ["Bezpiecz.", "Compliance", "Funkcj. AI", "Custom.", "TCO"],
                    values: [9, 8, 7, 5, 9]
                }
            ], {
                ...radarAlt,
                chartColors: ["E33737", "292929", "CCCBCB"],
                showLegend: true,
                legendPos: 'b',
                radarStyle: "standard",
                valAxisMaxVal: 10,
                valAxisMinVal: 0,
                valAxisMajorUnit: 2,
                dataLabelFontSize: 9
            });
        }
    }

    // Slide 16: Recommendations
    console.log('Creating slide 16: Recommendations...');
    await html2pptx(path.join(slidesDir, 'slide16_recommendations.html'), pptx);

    // Slide 17: Next Steps
    console.log('Creating slide 17: Next Steps...');
    await html2pptx(path.join(slidesDir, 'slide17_next_steps.html'), pptx);

    // Save presentation
    const outputPath = '/root/repo/KILOCODE_EXECUTIVE_PRESENTATION.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\n✅ Presentation created successfully: ${outputPath}`);

    return outputPath;
}

createPresentation().catch(console.error);
