import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableCell,
  TableRow,
  WidthType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip,
  PageBreak,
  NumberFormat,
} from "docx";
import * as fs from "fs";

const document = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
          },
        },
      },
      children: [
        // COVER PAGE
        new Paragraph({
          text: "RAPORT WYKONAWCZY",
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          text: "Analiza Wdrożenia Platformy Kilocode",
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Analiza Wdrożenia Platformy Kilocode",
              size: 32,
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          text: "dla Organizacji Telekomunikacyjnej",
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({
              text: "dla Organizacji Telekomunikacyjnej",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          text: "Ocena Bezpieczeństwa, Compliance i Ryzyka Biznesowego",
          alignment: AlignmentType.CENTER,
          spacing: { after: 800 },
          children: [
            new TextRun({
              text: "Ocena Bezpieczeństwa, Compliance i Ryzyka Biznesowego",
              size: 24,
              italics: true,
            }),
          ],
        }),
        new Paragraph({
          text: new Date().toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
        }),
        new Paragraph({
          text: "POUFNE - WYŁĄCZNIE DO UŻYTKU ZARZĄDU",
          alignment: AlignmentType.CENTER,
          spacing: { before: 800 },
          children: [
            new TextRun({
              text: "POUFNE - WYŁĄCZNIE DO UŻYTKU ZARZĄDU",
              bold: true,
              allCaps: true,
              color: "FF0000",
            }),
          ],
        }),

        // PAGE BREAK
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ========================================
        // 1. EXECUTIVE SUMMARY
        // ========================================
        new Paragraph({
          text: "1. EXECUTIVE SUMMARY",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          text: "Kluczowe Wnioski",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "• ARCHITEKTURA: Kilocode to open-source VS Code extension (Apache 2.0) z ~11,330 linii kodu TypeScript, wykorzystująca Model Context Protocol (MCP) do integracji z zewnętrznymi narzędziami",
          spacing: { after: 100 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• DANE UŻYTKOWNIKA: Kod źródłowy i prompty są transmitowane do zewnętrznych LLM providers (Anthropic, OpenAI, OpenRouter, LiteLLM) bez lokalnej kontroli",
          spacing: { after: 100 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• KLUCZE API: Przechowywane lokalnie w plaintext w plikach konfiguracyjnych VSCode (~/.kilocode/settings.json) bez szyfrowania",
          spacing: { after: 100 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• MCP SERVERS: Umożliwiają wykonywanie dowolnych poleceń systemowych i dostęp do systemu plików przez zewnętrzne procesy (stdio, SSE, HTTP)",
          spacing: { after: 100 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• TELEMETRIA: PostHog analytics zbiera dane o użytkowaniu (machine ID, zdarzenia, błędy) z możliwością opt-out",
          spacing: { after: 100 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• VENDOR RISK: Projekt prowadzony przez małe startup (Kilo-Org) bez SLA, certyfikacji bezpieczeństwa, ani formalnego wsparcia enterprise",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Finalna Rekomendacja",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "CONDITIONAL GO z istotnymi zastrzeżeniami",
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "CONDITIONAL GO",
              bold: true,
              color: "FF8C00",
              size: 28,
            }),
            new TextRun({
              text: " z istotnymi zastrzeżeniami",
              size: 24,
            }),
          ],
        }),

        new Paragraph({
          text: "Platforma może być wdrożona WYŁĄCZNIE w środowiskach deweloperskich/testowych z obowiązkową implementacją następujących zabezpieczeń:",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "1. Izolacja sieciowa: Dedykowany VLAN bez dostępu do sieci produkcyjnych i danych klientów",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "2. Self-hosted LiteLLM: Własny proxy LLM z audit logging, rate limiting i content filtering",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "3. Data Loss Prevention: DLP gateway do skanowania wychodzącego ruchu pod kątem danych wrażliwych",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "4. MCP Whitelist: Ograniczenie do zatwierdzonej listy MCP servers z code review",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "5. Secrets Management: Integracja z HashiCorp Vault lub AWS Secrets Manager",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "WDROŻENIE PRODUKCYJNE NIE JEST REKOMENDOWANE do czasu uzyskania certyfikacji ISO 27001, audytu penetracyjnego i formalnej umowy wsparcia enterprise.",
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "WDROŻENIE PRODUKCYJNE NIE JEST REKOMENDOWANE",
              bold: true,
              allCaps: true,
            }),
            new TextRun({
              text: " do czasu uzyskania certyfikacji ISO 27001, audytu penetracyjnego i formalnej umowy wsparcia enterprise.",
            }),
          ],
        }),

        new Paragraph({
          text: "Top 5 Ryzyk Krytycznych",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        // RISK TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "#",
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "#", bold: true })],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 8, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Ryzyko",
                      children: [new TextRun({ text: "Ryzyko", bold: true })],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 30, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Wpływ",
                      children: [new TextRun({ text: "Wpływ", bold: true })],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 15, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Prawdopodobieństwo",
                      children: [
                        new TextRun({
                          text: "Prawdopodobieństwo",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 15, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Mitigacja",
                      children: [new TextRun({ text: "Mitigacja", bold: true })],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 32, type: WidthType.PERCENTAGE },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "1", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Data Exfiltration do LLM Providers",
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "KRYTYCZNY",
                      children: [
                        new TextRun({
                          text: "KRYTYCZNY",
                          bold: true,
                          color: "FF0000",
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Wysoki (70%)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Self-hosted LiteLLM + DLP gateway",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "2", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "MCP Server Code Execution",
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "WYSOKI",
                      children: [
                        new TextRun({
                          text: "WYSOKI",
                          bold: true,
                          color: "FF6600",
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Średni (40%)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Whitelist MCP + sandboxing + code review",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "3", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Brak Certyfikacji RODO/NIS2",
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "WYSOKI",
                      children: [
                        new TextRun({
                          text: "WYSOKI",
                          bold: true,
                          color: "FF6600",
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Pewny (95%)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Limit do dev/test + legal opinion",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "4", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Vendor Lock-in & Discontinuity Risk",
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "ŚREDNI",
                      children: [
                        new TextRun({
                          text: "ŚREDNI",
                          bold: true,
                          color: "FFA500",
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Średni (50%)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Fork projektu + internal maintenance team",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "5", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Brak SLA i Enterprise Support",
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "ŚREDNI",
                      children: [
                        new TextRun({
                          text: "ŚREDNI",
                          bold: true,
                          color: "FFA500",
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Pewny (90%)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Internal L3 support + community monitoring",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: "Szacunek Kosztów i Korzyści (3 lata)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 150 },
        }),

        // COST-BENEFIT TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Kategoria",
                      children: [new TextRun({ text: "Kategoria", bold: true })],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                  width: { size: 30, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Koszty (EUR)",
                      children: [
                        new TextRun({ text: "Koszty (EUR)", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                  width: { size: 35, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Korzyści (EUR)",
                      children: [
                        new TextRun({ text: "Korzyści (EUR)", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                  width: { size: 35, type: WidthType.PERCENTAGE },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Setup" })] }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€45,000 (infrastruktura + integracja)",
                    }),
                  ],
                }),
                new TableCell({ children: [new Paragraph({ text: "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "Licencje (3 lata)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "€0 (open-source Apache 2.0)" }),
                  ],
                }),
                new TableCell({ children: [new Paragraph({ text: "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "LLM API (3 lata)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€180,000 (50 dev × €100/mies × 36)",
                    }),
                  ],
                }),
                new TableCell({ children: [new Paragraph({ text: "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "Infrastruktura (3 lata)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€72,000 (LiteLLM, DLP, monitoring)",
                    }),
                  ],
                }),
                new TableCell({ children: [new Paragraph({ text: "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "Wsparcie (3 lata)" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "€90,000 (1 FTE internal support)" }),
                  ],
                }),
                new TableCell({ children: [new Paragraph({ text: "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "Produktywność deweloperów" })],
                }),
                new TableCell({ children: [new Paragraph({ text: "-" })] }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€450,000 (20% wzrost × 50 dev × €60k avg)",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "Redukcja błędów" })],
                }),
                new TableCell({ children: [new Paragraph({ text: "-" })] }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "€120,000 (code review + testing)" }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "SUMA",
                      children: [new TextRun({ text: "SUMA", bold: true })],
                    }),
                  ],
                  shading: { fill: "E7E6E6", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€387,000",
                      children: [
                        new TextRun({ text: "€387,000", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "E7E6E6", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€570,000",
                      children: [
                        new TextRun({ text: "€570,000", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "E7E6E6", type: ShadingType.SOLID },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "NET BENEFIT (ROI 47%)",
                      children: [
                        new TextRun({
                          text: "NET BENEFIT (ROI 47%)",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "C6E0B4", type: ShadingType.SOLID },
                  columnSpan: 2,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "+€183,000",
                      children: [
                        new TextRun({
                          text: "+€183,000",
                          bold: true,
                          color: "008000",
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "C6E0B4", type: ShadingType.SOLID },
                }),
              ],
            }),
          ],
        }),

        // PAGE BREAK
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ========================================
        // 2. MATRYCA DECYZYJNA
        // ========================================
        new Paragraph({
          text: "2. MATRYCA DECYZYJNA",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          text: "Ocena według kluczowych kryteriów (skala 0-10, gdzie 10 = doskonale):",
          spacing: { after: 150 },
        }),

        // DECISION MATRIX TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Kryterium",
                      children: [
                        new TextRun({ text: "Kryterium", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 30, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Ocena",
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "Ocena", bold: true })],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 10, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Waga",
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "Waga", bold: true })],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 10, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Wynik ważony",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "Wynik ważony", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 15, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Uzasadnienie",
                      children: [
                        new TextRun({ text: "Uzasadnienie", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "2E75B6", type: ShadingType.SOLID },
                  width: { size: 35, type: WidthType.PERCENTAGE },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Bezpieczeństwo techniczne" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "4/10",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "4/10", bold: true, color: "FF6600" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "30%", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "1.2", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Klucze API w plaintext, brak szyfrowania, transmisja do 3rd party LLM",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Zgodność RODO/NIS2" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "3/10",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "3/10", bold: true, color: "FF0000" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "25%", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "0.75", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Brak DPA z LLM providers, brak certyfikacji, transfer danych poza EU",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Compliance telco (ETSI/3GPP/ISO)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "2/10",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "2/10", bold: true, color: "FF0000" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "20%", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "0.4", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Brak certyfikacji ISO 27001, SOC 2, audytów bezpieczeństwa",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Ryzyko biznesowe" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "5/10",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "5/10", bold: true, color: "FFA500" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "15%", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "0.75", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Startup vendor, brak SLA, ale open-source pozwala na fork",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "TCO / ROI" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "7/10",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "7/10", bold: true, color: "008000" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "10%", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "0.7", alignment: AlignmentType.CENTER }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Brak licencji, niski TCO, ROI 47% w 3 lata dzięki produktywności",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "OGÓLNA OCENA",
                      children: [
                        new TextRun({ text: "OGÓLNA OCENA", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                  columnSpan: 3,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "3.8/10",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: "3.8/10",
                          bold: true,
                          size: 28,
                          color: "FF6600",
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "FFF2CC", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "WYMAGA ZNACZĄCYCH ULEPSZEŃ",
                      children: [
                        new TextRun({
                          text: "WYMAGA ZNACZĄCYCH ULEPSZEŃ",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "FFF2CC", type: ShadingType.SOLID },
                }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: "Interpretacja wyników:",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "• 8-10: Doskonały wybór, gotowy do wdrożenia produkcyjnego",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• 6-7.9: Dobry wybór z niewielkimi zastrzeżeniami",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• 4-5.9: Akceptowalny w ograniczonych scenariuszach (dev/test)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• 0-3.9: Nieakceptowalny bez znaczących ulepszeń",
          spacing: { after: 80 },
          bullet: { level: 0 },
          children: [
            new TextRun({
              text: "• 0-3.9: Nieakceptowalny bez znaczących ulepszeń",
              bold: true,
            }),
          ],
        }),

        new Paragraph({
          text: "Kilocode uzyskał wynik 3.8/10, co klasyfikuje go jako rozwiązanie wymagające znaczących ulepszeń bezpieczeństwa i compliance przed wdrożeniem produkcyjnym. Może być rozważony wyłącznie w ograniczonych scenariuszach (dev/test) z dodatkowymi zabezpieczeniami.",
          spacing: { after: 200 },
        }),

        // PAGE BREAK
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ========================================
        // 3. SCENARIUSZE WDROŻENIOWE
        // ========================================
        new Paragraph({
          text: "3. SCENARIUSZE WDROŻENIOWE",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        // SCENARIO A
        new Paragraph({
          text: "Scenariusz A: Full Deployment (Current State)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Opis:",
          children: [new TextRun({ text: "Opis:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "Wdrożenie Kilocode w obecnej formie dla 50 deweloperów z domyślnymi ustawieniami. Wykorzystanie publicznych LLM providers (Anthropic Claude, OpenAI GPT) przez oficjalny Kilocode proxy.",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "Koszty (setup + 3 lata):",
          children: [
            new TextRun({ text: "Koszty (setup + 3 lata):", bold: true }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Setup: €15,000 (VSCode deployment, szkolenia)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• LLM API: €180,000 (€100/mies/dev × 50 × 36)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Wsparcie: €0 (community only)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• SUMA: €195,000",
          spacing: { after: 150 },
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "• SUMA: €195,000", bold: true }),
          ],
        }),

        new Paragraph({
          text: "Ryzyka:",
          children: [new TextRun({ text: "Ryzyka:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• KRYTYCZNE: Całość kodu źródłowego i prompty trafiają do US-based LLM providers (Anthropic, OpenAI) bez kontroli",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• WYSOKIE: Potencjalne naruszenie RODO (Art. 44-50 transfer danych do krajów trzecich) i NIS2",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• WYSOKIE: Klucze API przechowywane w plaintext, ryzyko credential theft",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• ŚREDNIE: Brak audytu bezpieczeństwa, możliwe luki w kodzie",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• ŚREDNIE: Vendor discontinuity (startup może zakończyć projekt)",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Timeline:",
          children: [new TextRun({ text: "Timeline:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "Tydzień 1-2: Instalacja i konfiguracja VSCode extension dla pilotażu (5 dev)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Tydzień 3-4: Szkolenia i pilotaż",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Tydzień 5-6: Rollout do 50 deweloperów",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja:",
          children: [new TextRun({ text: "Rekomendacja:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "NIE REKOMENDOWANE",
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "NIE REKOMENDOWANE",
              bold: true,
              allCaps: true,
              color: "FF0000",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          text: "Scenariusz ten stwarza nieakceptowalne ryzyko prawne i bezpieczeństwa dla organizacji telekomunikacyjnej podlegającej NIS2. Transmisja kodu do zewnętrznych LLM bez DPA i certyfikacji narusza wymagania compliance.",
          spacing: { after: 300 },
        }),

        // SCENARIO B
        new Paragraph({
          text: "Scenariusz B: Security-Hardened Fork (REKOMENDOWANY)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Opis:",
          children: [new TextRun({ text: "Opis:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "Stworzenie własnego security-hardened fork Kilocode z następującymi modyfikacjami:",
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "1. Self-hosted LiteLLM proxy z audit logging i content filtering",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "2. Integracja z HashiCorp Vault dla zarządzania kluczami API",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "3. DLP gateway (Forcepoint/Symantec) do skanowania wychodzącego ruchu",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "4. MCP server whitelist z code review i sandboxing",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "5. Izolacja sieciowa (dedykowany VLAN bez dostępu do produkcji)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "6. Telemetry opt-out enforcement",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Koszty (setup + 3 lata):",
          children: [
            new TextRun({ text: "Koszty (setup + 3 lata):", bold: true }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Setup: €45,000 (fork development, LiteLLM, Vault, DLP, network)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• LLM API: €180,000 (self-hosted lub EU provider)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Infrastruktura: €72,000 (LiteLLM, DLP, Vault hosting)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Wsparcie: €90,000 (1 FTE internal L3 support)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• SUMA: €387,000",
          spacing: { after: 150 },
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "• SUMA: €387,000", bold: true }),
          ],
        }),

        new Paragraph({
          text: "Ryzyka (zmitigowane):",
          children: [
            new TextRun({ text: "Ryzyka (zmitigowane):", bold: true }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• NISKIE: Dane pozostają w kontroli (self-hosted LiteLLM + DLP)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• NISKIE: Klucze API w Vault, szyfrowane at-rest i in-transit",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• ŚREDNIE: MCP servers z whitelist i sandboxing (pozostaje pewne ryzyko)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• NISKIE: Vendor independence dzięki fork + internal team",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Timeline:",
          children: [new TextRun({ text: "Timeline:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "Miesiąc 1-2: Fork development + security hardening (P0 fixes)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Miesiąc 2-3: LiteLLM + Vault + DLP deployment",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Miesiąc 3: Penetration testing + security audit",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Miesiąc 4: Pilotaż (10 dev) w izolowanym środowisku",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Miesiąc 5-6: Rollout do 50 dev (dev/test only)",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja:",
          children: [new TextRun({ text: "Rekomendacja:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "REKOMENDOWANE dla środowisk dev/test",
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "REKOMENDOWANE",
              bold: true,
              allCaps: true,
              color: "008000",
              size: 28,
            }),
            new TextRun({
              text: " dla środowisk dev/test",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          text: "Ten scenariusz znacząco redukuje ryzyka bezpieczeństwa i compliance, umożliwiając bezpieczne wykorzystanie Kilocode w ograniczonym zakresie. ROI pozostaje pozytywny (+€183k w 3 lata).",
          spacing: { after: 300 },
        }),

        // SCENARIO C
        new Paragraph({
          text: "Scenariusz C: Limited Pilot (Dev/Test Only)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Opis:",
          children: [new TextRun({ text: "Opis:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "Pilotażowe wdrożenie dla 10 deweloperów w całkowicie izolowanym środowisku testowym bez dostępu do danych produkcyjnych lub klienckich. Cel: ocena wartości biznesowej przed podjęciem decyzji o pełnym wdrożeniu.",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "Koszty (6 miesięcy pilotażu):",
          children: [
            new TextRun({ text: "Koszty (6 miesięcy pilotażu):", bold: true }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Setup: €10,000 (izolacja sieciowa, monitoring)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• LLM API: €6,000 (10 dev × €100/mies × 6)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Wsparcie: €0 (internal IT support)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• SUMA: €16,000",
          spacing: { after: 150 },
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "• SUMA: €16,000", bold: true }),
          ],
        }),

        new Paragraph({
          text: "Ryzyka:",
          children: [new TextRun({ text: "Ryzyka:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• NISKIE: Ograniczone do testowego środowiska bez danych wrażliwych",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• ŚREDNIE: Ograniczona wartość biznesowa (tylko 10 dev)",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Timeline:",
          children: [new TextRun({ text: "Timeline:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "Miesiąc 1: Setup izolowanego środowiska",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Miesiąc 2-5: Pilotaż z 10 deweloperami",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "Miesiąc 6: Ewaluacja i decyzja go/no-go",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja:",
          children: [new TextRun({ text: "Rekomendacja:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "AKCEPTOWALNE jako proof-of-concept",
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "AKCEPTOWALNE",
              bold: true,
              color: "FFA500",
              size: 24,
            }),
            new TextRun({
              text: " jako proof-of-concept",
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          text: "Niski koszt i ryzyko. Pozwala ocenić rzeczywistą wartość biznesową przed większymi inwestycjami. Zalecany jako pierwszy krok przed Scenariuszem B.",
          spacing: { after: 300 },
        }),

        // SCENARIO D
        new Paragraph({
          text: "Scenariusz D: Reject & Choose Alternative",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Opis:",
          children: [new TextRun({ text: "Opis:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "Rezygnacja z Kilocode na rzecz komercyjnych alternatyw z pełnym wsparciem enterprise i certyfikacjami (GitHub Copilot Enterprise, AWS CodeWhisperer Enterprise, Tabnine Enterprise).",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "Koszty (3 lata, GitHub Copilot Enterprise):",
          children: [
            new TextRun({
              text: "Koszty (3 lata, GitHub Copilot Enterprise):",
              bold: true,
            }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Setup: €5,000 (integracja z GitHub Enterprise)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Licencje: €108,000 (50 dev × €60/mies × 36)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Wsparcie: €0 (wliczone w licencję)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• SUMA: €113,000",
          spacing: { after: 150 },
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "• SUMA: €113,000", bold: true }),
          ],
        }),

        new Paragraph({
          text: "Zalety:",
          children: [new TextRun({ text: "Zalety:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Enterprise SLA (99.9% uptime)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• SOC 2 Type II, ISO 27001 certyfikacje",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• GDPR/NIS2 compliance out-of-the-box",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• 24/7 enterprise support",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Regular security updates",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Wady:",
          children: [new TextRun({ text: "Wady:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Vendor lock-in (brak możliwości fork)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Ograniczona customizacja",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Potencjalnie niższa jakość sugestii niż Claude 4/GPT-5",
          spacing: { after: 150 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja:",
          children: [new TextRun({ text: "Rekomendacja:", bold: true })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "AKCEPTOWALNE dla organizacji priorytetyzujących compliance nad funkcjonalnością",
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "AKCEPTOWALNE",
              bold: true,
              color: "008000",
              size: 24,
            }),
            new TextRun({
              text: " dla organizacji priorytetyzujących compliance nad funkcjonalnością",
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          text: "Najbezpieczniejsza opcja z perspektywy compliance i wsparcia. Niższy TCO niż Scenariusz B. Jednak mniejsza elastyczność i potencjalnie niższa jakość AI.",
          spacing: { after: 200 },
        }),

        // PAGE BREAK
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ========================================
        // 4. AKCJE WYMAGANE (jeśli GO - Scenariusz B)
        // ========================================
        new Paragraph({
          text: "4. AKCJE WYMAGANE (Scenariusz B: Security-Hardened Fork)",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          text: "Roadmap z priorytetami dla wdrożenia Scenariusza B:",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "PRIORYTET P0 (Krytyczne - przed pilotażem)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        // P0 TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Zadanie",
                      children: [new TextRun({ text: "Zadanie", bold: true })],
                    }),
                  ],
                  shading: { fill: "C00000", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Timeline",
                      children: [new TextRun({ text: "Timeline", bold: true })],
                    }),
                  ],
                  shading: { fill: "C00000", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "FTE",
                      children: [new TextRun({ text: "FTE", bold: true })],
                    }),
                  ],
                  shading: { fill: "C00000", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Budżet",
                      children: [new TextRun({ text: "Budżet", bold: true })],
                    }),
                  ],
                  shading: { fill: "C00000", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "KPI Sukcesu",
                      children: [
                        new TextRun({ text: "KPI Sukcesu", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "C00000", type: ShadingType.SOLID },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Fork Kilocode repo + security hardening (API key encryption, disable telemetry)",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "2 tygodnie" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 Senior Dev" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€5,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Wszystkie klucze API w Vault, zero telemetry leaks",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Deploy self-hosted LiteLLM z audit logging",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "2 tygodnie" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 DevOps" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€8,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "100% LLM requests logged, <100ms latency overhead",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Integracja HashiCorp Vault dla secrets management",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 tydzień" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 Security Eng" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€4,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "Zero plaintext credentials w filesystemie" }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Deploy DLP gateway (Forcepoint/Symantec) dla wychodzącego ruchu",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "3 tygodnie" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 Network Eng" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€12,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "100% skanowanie, <5% false positives",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Izolacja sieciowa (dedykowany VLAN bez dostępu do prod)",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 tydzień" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 Network Eng" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€3,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Zero network path do prod z dev VLAN",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: "PRIORYTET P1 (Wysokie - przed rollout)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        // P1 TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Zadanie",
                      children: [new TextRun({ text: "Zadanie", bold: true })],
                    }),
                  ],
                  shading: { fill: "FF6600", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Timeline",
                      children: [new TextRun({ text: "Timeline", bold: true })],
                    }),
                  ],
                  shading: { fill: "FF6600", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "FTE",
                      children: [new TextRun({ text: "FTE", bold: true })],
                    }),
                  ],
                  shading: { fill: "FF6600", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Budżet",
                      children: [new TextRun({ text: "Budżet", bold: true })],
                    }),
                  ],
                  shading: { fill: "FF6600", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "KPI Sukcesu",
                      children: [
                        new TextRun({ text: "KPI Sukcesu", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "FF6600", type: ShadingType.SOLID },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "MCP server whitelist + sandboxing (Docker containers)",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "2 tygodnie" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 Senior Dev" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€6,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Tylko zatwierdzone MCP servers, sandboxed execution",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Penetration testing przez zewnętrzną firmę (np. SEC Consult)",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "2 tygodnie" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "External vendor" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€15,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Zero critical/high vulnerabilities",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Legal opinion na zgodność z RODO/NIS2",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 tydzień" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "External lawyer" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€8,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Positive legal opinion dla dev/test use",
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Monitoring & alerting (Prometheus/Grafana + SIEM integration)",
                    }),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 tydzień" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "1 DevOps" })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: "€4,000" })],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Real-time alerts na anomalie, <5min MTTD",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: "PRIORYTET P2 (Nice-to-have - post-rollout)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "• Integracja z corporate SSO (SAML/OAuth2) - 1 tydzień, €3,000",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Custom AI models fine-tuned na internal codebase - 4 tygodnie, €20,000",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• IDE plugins dla JetBrains/Eclipse - 3 tygodnie, €12,000",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Automated compliance reporting - 2 tygodnie, €8,000",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        // PAGE BREAK
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ========================================
        // 5. PORÓWNANIE ALTERNATYW
        // ========================================
        new Paragraph({
          text: "5. PORÓWNANIE ALTERNATYW",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        // ALTERNATIVES COMPARISON TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Kryterium",
                      children: [
                        new TextRun({ text: "Kryterium", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Kilocode (Fork)",
                      children: [
                        new TextRun({ text: "Kilocode (Fork)", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "GitHub Copilot Ent",
                      children: [
                        new TextRun({ text: "GitHub Copilot Ent", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "AWS CodeWhisperer",
                      children: [
                        new TextRun({ text: "AWS CodeWhisperer", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Build In-House",
                      children: [
                        new TextRun({ text: "Build In-House", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "44546A", type: ShadingType.SOLID },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Koszt (3 lata)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€387k",
                      children: [
                        new TextRun({ text: "€387k", bold: true, color: "FFA500" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€113k",
                      children: [
                        new TextRun({ text: "€113k", bold: true, color: "008000" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€90k",
                      children: [
                        new TextRun({ text: "€90k", bold: true, color: "008000" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "€800k+",
                      children: [
                        new TextRun({ text: "€800k+", bold: true, color: "FF0000" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Bezpieczeństwo" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "7/10 (hardened)",
                      children: [
                        new TextRun({ text: "7/10", bold: true }),
                        new TextRun({ text: " (hardened)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "9/10 (SOC2, ISO)",
                      children: [
                        new TextRun({ text: "9/10", bold: true }),
                        new TextRun({ text: " (SOC2, ISO)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "9/10 (AWS IAM)",
                      children: [
                        new TextRun({ text: "9/10", bold: true }),
                        new TextRun({ text: " (AWS IAM)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "10/10 (full control)",
                      children: [
                        new TextRun({ text: "10/10", bold: true }),
                        new TextRun({ text: " (full control)" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "RODO/NIS2 Compliance" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "6/10 (requires legal opinion)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "9/10 (DPA + certifications)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "8/10 (AWS GDPR ready)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "10/10 (by design)" }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Wsparcie" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "Internal team (no SLA)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "24/7 Microsoft support + SLA 99.9%" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "AWS Premium Support + SLA" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "Internal team (full control)" }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Funkcjonalność AI" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "9/10 (Claude 4, GPT-5)",
                      children: [
                        new TextRun({ text: "9/10", bold: true, color: "008000" }),
                        new TextRun({ text: " (Claude 4, GPT-5)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "8/10 (GPT-4 based)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "7/10 (CodeWhisperer model)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "Depends (custom models)" }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Customizacja" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "10/10 (full source code)",
                      children: [
                        new TextRun({ text: "10/10", bold: true, color: "008000" }),
                        new TextRun({ text: " (full source code)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "4/10 (limited)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "5/10 (AWS ecosystem)" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "10/10 (unlimited)",
                      children: [
                        new TextRun({ text: "10/10", bold: true, color: "008000" }),
                        new TextRun({ text: " (unlimited)" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Vendor Lock-in Risk" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "LOW (open-source fork)",
                      children: [
                        new TextRun({ text: "LOW", bold: true, color: "008000" }),
                        new TextRun({ text: " (open-source fork)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "HIGH (Microsoft ecosystem)",
                      children: [
                        new TextRun({ text: "HIGH", bold: true, color: "FF6600" }),
                        new TextRun({ text: " (Microsoft ecosystem)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "MEDIUM (AWS only)",
                      children: [
                        new TextRun({ text: "MEDIUM", bold: true, color: "FFA500" }),
                        new TextRun({ text: " (AWS only)" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "NONE",
                      children: [
                        new TextRun({ text: "NONE", bold: true, color: "008000" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({ text: "Time to Deploy" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "4-6 miesięcy" }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "2 tygodnie",
                      children: [
                        new TextRun({ text: "2 tygodnie", bold: true, color: "008000" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "1 tydzień",
                      children: [
                        new TextRun({ text: "1 tydzień", bold: true, color: "008000" }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({ text: "12+ miesięcy" }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "REKOMENDACJA",
                      children: [
                        new TextRun({ text: "REKOMENDACJA", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "E7E6E6", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Dev/Test only",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: "Dev/Test only",
                          bold: true,
                          color: "FFA500",
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "FFF2CC", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "BEST for Prod",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: "BEST for Prod",
                          bold: true,
                          color: "008000",
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "C6E0B4", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Good for AWS shops",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "Good for AWS shops", bold: true }),
                      ],
                    }),
                  ],
                  shading: { fill: "E7E6E6", type: ShadingType.SOLID },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: "Too expensive",
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: "Too expensive",
                          bold: true,
                          color: "FF0000",
                        }),
                      ],
                    }),
                  ],
                  shading: { fill: "F4B084", type: ShadingType.SOLID },
                }),
              ],
            }),
          ],
        }),

        // PAGE BREAK
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ========================================
        // 6. KLUCZOWE REKOMENDACJE DLA ZARZĄDU
        // ========================================
        new Paragraph({
          text: "6. KLUCZOWE REKOMENDACJE DLA ZARZĄDU",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }),

        new Paragraph({
          text: "Rekomendacja 1: Start with Limited Pilot (Scenariusz C)",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Rozpocząć od 6-miesięcznego pilotażu z 10 deweloperami w izolowanym środowisku testowym (koszt: €16,000). Cel: walidacja rzeczywistej wartości biznesowej przed większymi inwestycjami.",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "Uzasadnienie:",
          children: [
            new TextRun({ text: "Uzasadnienie:", bold: true }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Niskie ryzyko finansowe i prawne",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Pozwala ocenić realny wzrost produktywności (target: 15-25%)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Unikamy przedwczesnej inwestycji w infrastrukturę",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Decyzja go/no-go po 6 miesiącach z danymi empirycznymi",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja 2: If Pilot Succeeds → Deploy Scenariusz B",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Jeśli pilotaż wykaże >15% wzrost produktywności, przejść do Security-Hardened Fork (Scenariusz B) dla 50 deweloperów w środowiskach dev/test. NIE wdrażać w produkcji do czasu uzyskania:",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "1. Positive legal opinion na zgodność z RODO/NIS2",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "2. Clean penetration test report (zero critical/high findings)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "3. ISO 27001 internal certification lub równoważne",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Uzasadnienie:",
          children: [
            new TextRun({ text: "Uzasadnienie:", bold: true }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Pozytywny ROI (€183k net benefit w 3 lata)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Znacząca redukcja ryzyka dzięki self-hosted LiteLLM + DLP",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Zachowanie elastyczności (open-source fork)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Akceptowalne dla środowisk non-production",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja 3: Consider GitHub Copilot Enterprise for Production",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Dla środowisk produkcyjnych rozważyć GitHub Copilot Enterprise (€113k/3 lata) jako alternatywę z pełnym compliance i wsparciem enterprise. Niższy TCO i zero ryzyka prawnego.",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "Uzasadnienie:",
          children: [
            new TextRun({ text: "Uzasadnienie:", bold: true }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          text: "• Out-of-the-box GDPR/NIS2 compliance (DPA + certyfikacje)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• SLA 99.9% + 24/7 Microsoft support",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Szybkie wdrożenie (2 tygodnie vs 4-6 miesięcy dla Kilocode)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Niższy całkowity koszt (€113k vs €387k)",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja 4: Establish AI Coding Governance Committee",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Powołać komitet złożony z przedstawicieli: Security, Legal/Compliance, Engineering, Architecture. Zadania:",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "• Zatwierdzanie wszystkich MCP servers przed deployment (code review + security scan)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Monitorowanie compliance z RODO/NIS2 (quarterly audits)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Review AI-generated code quality metrics (bug rates, security vulnerabilities)",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Update polityk bezpieczeństwa w odpowiedzi na nowe zagrożenia",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "Rekomendacja 5: Plan for Continuous Monitoring & Improvement",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),

        new Paragraph({
          text: "Niezależnie od wybranego scenariusza, ustanowić ciągły monitoring:",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "• KPI produktywności: Pull request velocity, code review time, bug density",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• KPI bezpieczeństwa: Data exfiltration attempts, MCP violations, failed auth",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• KPI compliance: RODO/NIS2 violations, DPA breaches, audit findings",
          spacing: { after: 80 },
          bullet: { level: 0 },
        }),
        new Paragraph({
          text: "• Quarterly review z możliwością pivot do alternatywnych rozwiązań",
          spacing: { after: 200 },
          bullet: { level: 0 },
        }),

        new Paragraph({
          text: "KONKLUZJA FINALNA",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 150 },
        }),

        new Paragraph({
          text: "Kilocode oferuje zaawansowaną funkcjonalność AI (Claude 4, GPT-5) i atrakcyjny ROI, ale wymaga znaczących inwestycji w zabezpieczenia bezpieczeństwa i compliance. Rekomendujemy podejście stopniowe:",
          spacing: { after: 150 },
        }),

        new Paragraph({
          text: "Faza 1 (6 miesięcy): Limited Pilot → Walidacja wartości",
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "Faza 1 (6 miesięcy): Limited Pilot → Walidacja wartości",
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          text: "Faza 2 (12 miesięcy): Security-Hardened Fork → Dev/Test deployment",
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "Faza 2 (12 miesięcy): Security-Hardened Fork → Dev/Test deployment",
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          text: "Faza 3 (w przyszłości): Decyzja prod deployment LUB pivot do GitHub Copilot",
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Faza 3 (w przyszłości): Decyzja prod deployment LUB pivot do GitHub Copilot",
              bold: true,
            }),
          ],
        }),

        new Paragraph({
          text: "To podejście minimalizuje ryzyko przy zachowaniu potencjału na znaczące korzyści biznesowe.",
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: "--- KONIEC RAPORTU ---",
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            new TextRun({
              text: "--- KONIEC RAPORTU ---",
              bold: true,
              size: 24,
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(document).then((buffer) => {
  fs.writeFileSync("/root/repo/KILOCODE_EXECUTIVE_REPORT.docx", buffer);
  console.log("Raport wykonawczy wygenerowany: KILOCODE_EXECUTIVE_REPORT.docx");
});
