#!/usr/bin/env node

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat,
        HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign,
        PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// Definiuj kolory zgodnie z wymaganiami
const COLORS = {
  CRITICAL: "C0392B",  // Czerwony
  HIGH: "E67E22",      // Pomarańczowy
  MEDIUM: "F39C12",    // Żółty
  LOW: "27AE60",       // Zielony
  INFO: "3498DB",      // Niebieski
  BLACK: "000000",
  GRAY_BG: "E8E8E8",
  HEADER_BG: "D5E8F0",
  WHITE: "FFFFFF"
};

// Definiuj emoji jako symbole tekstowe
const EMOJI = {
  CHECK: "✅",
  WARNING: "⚠️",
  CROSS: "❌",
  RED_CIRCLE: "🔴",
  ORANGE_CIRCLE: "🟠",
  YELLOW_CIRCLE: "🟡",
  GREEN_CIRCLE: "🟢",
  BLUE_CIRCLE: "🔵"
};

// Stałe dla tabeli borders
const TABLE_BORDER = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const CELL_BORDERS = {
  top: TABLE_BORDER,
  bottom: TABLE_BORDER,
  left: TABLE_BORDER,
  right: TABLE_BORDER
};

// Funkcja pomocnicza do tworzenia komórki tabeli
function createTableCell(text: string, options: any = {}) {
  const {
    bold = false,
    size = 22,
    alignment = AlignmentType.LEFT,
    bgColor = COLORS.WHITE,
    color = COLORS.BLACK,
    width = 3120,
    verticalAlign = VerticalAlign.CENTER
  } = options;

  return new TableCell({
    borders: CELL_BORDERS,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: bgColor, type: ShadingType.CLEAR },
    verticalAlign: verticalAlign,
    children: [
      new Paragraph({
        alignment: alignment,
        children: [new TextRun({ text, bold, size, color, font: "Arial" })]
      })
    ]
  });
}

// Funkcja pomocnicza do tworzenia komórki nagłówka
function createHeaderCell(text: string, width: number = 3120) {
  return createTableCell(text, {
    bold: true,
    alignment: AlignmentType.CENTER,
    bgColor: COLORS.HEADER_BG,
    width
  });
}

// Konfiguracja dokumentu
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 } // 11pt default
      }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 56, bold: true, color: COLORS.BLACK, font: "Arial" }, // 28pt
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, color: COLORS.BLACK, font: "Arial" }, // 14pt
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, color: COLORS.BLACK, font: "Arial" }, // 12pt
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 22, bold: true, color: COLORS.BLACK, font: "Arial" }, // 11pt
        paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 2 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      },
      {
        reference: "numbered-list-1",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch margins
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: "POUFNE - Wyłącznie dla Zarządu", bold: true, color: COLORS.CRITICAL, size: 20, font: "Arial" })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Raport Wykonawczy Kilocode | ", size: 18, font: "Arial" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial" })
              ]
            })
          ]
        })
      },
      children: [
        // === STRONA TYTUŁOWA ===
        new Paragraph({ children: [new TextRun("")], spacing: { before: 1440 } }),
        new Paragraph({ children: [new TextRun("")], spacing: { before: 1440 } }),

        new Paragraph({
          heading: HeadingLevel.TITLE,
          children: [new TextRun({ text: "RAPORT WYKONAWCZY", size: 56, bold: true, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: "Analiza Bezpieczeństwa i Prawna", size: 32, bold: true, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 360 },
          children: [new TextRun({ text: "Kilocode AI Code Assistant", size: 28, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 720, after: 120 },
          children: [new TextRun({ text: "Dla Zarządu", size: 24, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Operatora Telekomunikacyjnego", size: 24, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 720, after: 120 },
          children: [new TextRun({ text: "Data: 4 listopada 2025", size: 22, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          children: [new TextRun({ text: "Klasyfikacja: POUFNE - Wyłącznie dla Zarządu", bold: true, color: COLORS.CRITICAL, size: 22, font: "Arial" })]
        }),

        // PAGE BREAK - nowa strona
        new Paragraph({ children: [new PageBreak()] }),

        // === 1. EXECUTIVE SUMMARY ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("1. EXECUTIVE SUMMARY")]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Cel Analizy")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Przeprowadzono kompleksową analizę bezpieczeństwa, zgodności prawnej oraz ryzyka biznesowego platformy Kilocode AI Code Assistant w kontekście wdrożenia dla organizacji telekomunikacyjnej. Analiza obejmowała:",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Bezpieczeństwo techniczne (architektura, LLM, MCP, zarządzanie kluczami API)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Zgodność prawną (RODO, NIS2, Dyrektywa o Ochronie Danych)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Compliance telekomunikacyjny (ETSI, 3GPP, PCI DSS, ISO 27001)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Ryzyka biznesowe (vendor risk, TCO, reputacja)")]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 360 },
          children: [new TextRun("Kluczowe Wnioski")]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({
            text: "ARCHITEKTURA: Kilocode to open-source VS Code extension (Apache 2.0) z ~11,330 linii kodu TypeScript, wykorzystująca Model Context Protocol (MCP) do integracji z zewnętrznymi narzędziami",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({
            text: "DANE UŻYTKOWNIKA: Kod źródłowy i prompty są transmitowane do zewnętrznych LLM providers (Anthropic, OpenAI, OpenRouter, LiteLLM) bez lokalnej kontroli",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({
            text: "KLUCZE API: Przechowywane lokalnie w plaintext w plikach konfiguracyjnych VSCode (~/.kilocode/settings.json) bez szyfrowania",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({
            text: "MCP SERVERS: Umożliwiają wykonywanie dowolnych poleceń systemowych i dostęp do systemu plików przez zewnętrzne procesy",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({
            text: "TELEMETRIA: PostHog analytics zbiera dane o użytkowaniu z możliwością opt-out",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({
            text: "VENDOR RISK: Projekt prowadzony przez małe startup (Kilo-Org) bez SLA, certyfikacji bezpieczeństwa, ani formalnego wsparcia enterprise",
            font: "Arial"
          })]
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 360 },
          children: [new TextRun("Finalna Rekomendacja")]
        }),

        new Paragraph({
          spacing: { before: 180, after: 180 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            text: `${EMOJI.WARNING} CONDITIONAL GO z istotnymi zastrzeżeniami`,
            bold: true,
            size: 26,
            color: COLORS.HIGH,
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Platforma może być wdrożona WYŁĄCZNIE w środowiskach deweloperskich/testowych z obowiązkową implementacją następujących zabezpieczeń:",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun({
            text: "Izolacja sieciowa: Dedykowany VLAN bez dostępu do sieci produkcyjnych i danych klientów",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun({
            text: "Self-hosted LiteLLM: Własny proxy LLM z audit logging, rate limiting i content filtering",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun({
            text: "Data Loss Prevention: DLP gateway do skanowania wychodzącego ruchu pod kątem danych wrażliwych",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun({
            text: "MCP Whitelist: Ograniczenie do zatwierdzonej listy MCP servers z code review",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun({
            text: "Secrets Management: Integracja z HashiCorp Vault lub AWS Secrets Manager",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 360 },
          children: [new TextRun({
            text: "WDROŻENIE PRODUKCYJNE NIE JEST REKOMENDOWANE do czasu uzyskania certyfikacji ISO 27001, audytu penetracyjnego i formalnej umowy wsparcia enterprise.",
            bold: true,
            font: "Arial"
          })]
        }),

        // === Top 5 Ryzyk Krytycznych ===
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Top 5 Ryzyk Krytycznych")]
        }),

        new Table({
          columnWidths: [800, 3800, 1400, 1800, 1560],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                createHeaderCell("#", 800),
                createHeaderCell("Ryzyko", 3800),
                createHeaderCell("Wpływ", 1400),
                createHeaderCell("Prawdopodobieństwo", 1800),
                createHeaderCell("Mitigacja", 1560)
              ]
            }),
            new TableRow({
              children: [
                createTableCell("1", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("Data Exfiltration do LLM Providers", { width: 3800, bold: true }),
                createTableCell("KRYTYCZNY", { width: 1400, color: COLORS.CRITICAL, bold: true, alignment: AlignmentType.CENTER }),
                createTableCell("Wysoki (70%)", { width: 1800, alignment: AlignmentType.CENTER }),
                createTableCell("Self-hosted LiteLLM + DLP", { width: 1560 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("2", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("MCP Server Code Execution", { width: 3800, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("WYSOKI", { width: 1400, color: COLORS.HIGH, bold: true, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Średni (40%)", { width: 1800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Whitelist + sandboxing", { width: 1560, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("3", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("Brak Certyfikacji RODO/NIS2", { width: 3800, bold: true }),
                createTableCell("WYSOKI", { width: 1400, color: COLORS.HIGH, bold: true, alignment: AlignmentType.CENTER }),
                createTableCell("Pewny (95%)", { width: 1800, alignment: AlignmentType.CENTER }),
                createTableCell("Limit do dev/test", { width: 1560 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("4", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Vendor Lock-in & Discontinuity Risk", { width: 3800, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("ŚREDNI", { width: 1400, color: COLORS.MEDIUM, bold: true, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Średni (50%)", { width: 1800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Fork projektu", { width: 1560, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("5", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("Brak SLA i Enterprise Support", { width: 3800, bold: true }),
                createTableCell("ŚREDNI", { width: 1400, color: COLORS.MEDIUM, bold: true, alignment: AlignmentType.CENTER }),
                createTableCell("Pewny (90%)", { width: 1800, alignment: AlignmentType.CENTER }),
                createTableCell("Internal L3 support", { width: 1560 })
              ]
            })
          ]
        }),

        // === Szacunek TCO i ROI ===
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("Szacunek Kosztów i Korzyści (3 lata)")]
        }),

        new Table({
          columnWidths: [4680, 2340, 2340],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                createHeaderCell("Kategoria", 4680),
                createHeaderCell("Koszty (EUR)", 2340),
                createHeaderCell("Korzyści (EUR)", 2340)
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Setup (infrastruktura + integracja)", { width: 4680 }),
                createTableCell("€45,000", { width: 2340, alignment: AlignmentType.RIGHT }),
                createTableCell("-", { width: 2340, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Licencje (3 lata)", { width: 4680, bgColor: COLORS.GRAY_BG }),
                createTableCell("€0 (open-source)", { width: 2340, alignment: AlignmentType.RIGHT, bgColor: COLORS.GRAY_BG }),
                createTableCell("-", { width: 2340, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("LLM API (3 lata: 50 dev × €100/mies × 36)", { width: 4680 }),
                createTableCell("€180,000", { width: 2340, alignment: AlignmentType.RIGHT }),
                createTableCell("-", { width: 2340, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Infrastruktura (LiteLLM, DLP, monitoring)", { width: 4680, bgColor: COLORS.GRAY_BG }),
                createTableCell("€72,000", { width: 2340, alignment: AlignmentType.RIGHT, bgColor: COLORS.GRAY_BG }),
                createTableCell("-", { width: 2340, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Wsparcie (1 FTE internal support)", { width: 4680 }),
                createTableCell("€90,000", { width: 2340, alignment: AlignmentType.RIGHT }),
                createTableCell("-", { width: 2340, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Produktywność deweloperów (20% wzrost)", { width: 4680, bgColor: COLORS.GRAY_BG }),
                createTableCell("-", { width: 2340, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("€450,000", { width: 2340, alignment: AlignmentType.RIGHT, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Redukcja błędów (code review + testing)", { width: 4680 }),
                createTableCell("-", { width: 2340, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("€120,000", { width: 2340, alignment: AlignmentType.RIGHT })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("SUMA", { width: 4680, bold: true, bgColor: COLORS.HEADER_BG }),
                createTableCell("€387,000", { width: 2340, alignment: AlignmentType.RIGHT, bold: true, bgColor: COLORS.HEADER_BG }),
                createTableCell("€570,000", { width: 2340, alignment: AlignmentType.RIGHT, bold: true, bgColor: COLORS.HEADER_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("NET BENEFIT (ROI 47%)", { width: 4680, bold: true, bgColor: COLORS.LOW, color: COLORS.WHITE }),
                createTableCell("", { width: 2340, bgColor: COLORS.LOW }),
                createTableCell("+€183,000", { width: 2340, alignment: AlignmentType.RIGHT, bold: true, bgColor: COLORS.LOW, color: COLORS.WHITE, size: 24 })
              ]
            })
          ]
        }),

        // PAGE BREAK
        new Paragraph({ children: [new PageBreak()] }),

        // === 2. MATRYCA DECYZYJNA ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("2. MATRYCA DECYZYJNA")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Ocena według kluczowych kryteriów (skala 0-10, gdzie 10 = doskonale):",
            font: "Arial"
          })]
        }),

        new Table({
          columnWidths: [2800, 800, 800, 1200, 3760],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                createHeaderCell("Kryterium", 2800),
                createHeaderCell("Ocena", 800),
                createHeaderCell("Waga", 800),
                createHeaderCell("Wynik ważony", 1200),
                createHeaderCell("Uzasadnienie", 3760)
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Bezpieczeństwo techniczne", { width: 2800, bold: true }),
                createTableCell("4/10", { width: 800, alignment: AlignmentType.CENTER, color: COLORS.HIGH, bold: true }),
                createTableCell("30%", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("1.2", { width: 1200, alignment: AlignmentType.CENTER }),
                createTableCell("Klucze API w plaintext, transmisja do 3rd party LLM", { width: 3760 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Zgodność RODO/NIS2", { width: 2800, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("3/10", { width: 800, alignment: AlignmentType.CENTER, color: COLORS.CRITICAL, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("25%", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("0.75", { width: 1200, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Brak DPA z LLM providers, transfer danych poza EU", { width: 3760, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Compliance telco (ETSI/ISO)", { width: 2800, bold: true }),
                createTableCell("2/10", { width: 800, alignment: AlignmentType.CENTER, color: COLORS.CRITICAL, bold: true }),
                createTableCell("20%", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("0.4", { width: 1200, alignment: AlignmentType.CENTER }),
                createTableCell("Brak certyfikacji ISO 27001, SOC 2, audytów", { width: 3760 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Ryzyko biznesowe", { width: 2800, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("5/10", { width: 800, alignment: AlignmentType.CENTER, color: COLORS.MEDIUM, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("15%", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("0.75", { width: 1200, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Startup vendor, ale open-source pozwala na fork", { width: 3760, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("TCO / ROI", { width: 2800, bold: true }),
                createTableCell("7/10", { width: 800, alignment: AlignmentType.CENTER, color: COLORS.LOW, bold: true }),
                createTableCell("10%", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("0.7", { width: 1200, alignment: AlignmentType.CENTER }),
                createTableCell("Niski TCO, ROI 47% w 3 lata", { width: 3760 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("OGÓLNA OCENA", { width: 2800, bold: true, bgColor: COLORS.HIGH }),
                createTableCell("3.8/10", { width: 800, alignment: AlignmentType.CENTER, bold: true, bgColor: COLORS.HIGH, color: COLORS.WHITE, size: 24 }),
                createTableCell("", { width: 800, bgColor: COLORS.HIGH }),
                createTableCell("3.8", { width: 1200, alignment: AlignmentType.CENTER, bold: true, bgColor: COLORS.HIGH, color: COLORS.WHITE }),
                createTableCell("WYMAGA ZNACZĄCYCH ULEPSZEŃ", { width: 3760, bold: true, bgColor: COLORS.HIGH, color: COLORS.WHITE })
              ]
            })
          ]
        }),

        new Paragraph({
          spacing: { before: 360, after: 180 },
          children: [new TextRun({
            text: "Interpretacja wyników:",
            bold: true,
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("8-10: Doskonały wybór, gotowy do wdrożenia produkcyjnego")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("6-7.9: Dobry wybór z niewielkimi zastrzeżeniami")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("4-5.9: Akceptowalny w ograniczonych scenariuszach (dev/test)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({
            text: "0-3.9: Nieakceptowalny bez znaczących ulepszeń",
            color: COLORS.CRITICAL
          })]
        }),

        new Paragraph({
          spacing: { before: 240 },
          children: [new TextRun({
            text: `${EMOJI.WARNING} Kilocode uzyskał wynik 3.8/10, co klasyfikuje go jako rozwiązanie wymagające znaczących ulepszeń bezpieczeństwa i compliance przed wdrożeniem produkcyjnym. Może być rozważony wyłącznie w ograniczonych scenariuszach (dev/test) z dodatkowymi zabezpieczeniami.`,
            font: "Arial"
          })]
        }),

        // PAGE BREAK
        new Paragraph({ children: [new PageBreak()] }),

        // === 3. ANALIZA RYZYK ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("3. ANALIZA RYZYK")]
        }),

        // Ryzyko 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.1 Data Exfiltration do LLM Providers")]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Severity: ", bold: true, font: "Arial" }),
            new TextRun({ text: "CRITICAL", bold: true, color: COLORS.CRITICAL, font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis zagrożenia: Cały kod źródłowy, prompty użytkownika i dane projektowe są transmitowane do zewnętrznych LLM providers (Anthropic, OpenAI, OpenRouter) bez lokalnej kontroli. Organizacja traci całkowitą kontrolę nad danymi wrażliwymi.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Impact finansowy: €500,000 - €5,000,000 (kary RODO, utrata reputacji, koszty prawne)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Prawdopodobieństwo: Wysokie (70%)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Mitigation Strategy:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Deploy self-hosted LiteLLM proxy z audit logging")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Implementacja DLP gateway (Forcepoint/Symantec) do skanowania ruchu")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Izolacja sieciowa (dedykowany VLAN bez dostępu do produkcji)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Używanie EU-based LLM providers z GDPR compliance")]
        }),

        new Paragraph({
          spacing: { before: 180, after: 360 },
          children: [new TextRun({ text: "Koszt mitigacji: €60,000 (setup) + €24,000/rok (operacyjne)", bold: true, font: "Arial" })]
        }),

        // Ryzyko 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.2 MCP Server Code Execution")]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Severity: ", bold: true, font: "Arial" }),
            new TextRun({ text: "HIGH", bold: true, color: COLORS.HIGH, font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis zagrożenia: MCP servers mogą wykonywać dowolne polecenia systemowe przez stdio transport bez sandboxingu. Malicious lub skompromitowane MCP servers mogą uzyskać pełny dostęp do systemu plików i wykonywać arbitrary code.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Impact finansowy: €200,000 - €2,000,000 (ransomware, data breach, system compromise)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Prawdopodobieństwo: Średnie (40%)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Mitigation Strategy:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Whitelist zatwierdonych MCP servers z obowiązkowym code review")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Sandboxing MCP servers w Docker containers z ograniczonymi uprawnieniami")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Monitoring i logging wszystkich MCP operations")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Używanie tylko SSE/HTTP transport (unikać stdio)")]
        }),

        new Paragraph({
          spacing: { before: 180, after: 360 },
          children: [new TextRun({ text: "Koszt mitigacji: €15,000 (setup) + €12,000/rok (code review + monitoring)", bold: true, font: "Arial" })]
        }),

        // Ryzyko 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.3 Brak Certyfikacji RODO/NIS2")]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Severity: ", bold: true, font: "Arial" }),
            new TextRun({ text: "HIGH", bold: true, color: COLORS.HIGH, font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis zagrożenia: Kilocode nie posiada certyfikacji ISO 27001, SOC 2 ani formalnych Data Processing Agreements z LLM providers. Transfer danych do US-based providers może naruszać RODO Art. 44-50. Organizacje telekomunikacyjne podlegają NIS2 i wymagają udokumentowanego compliance.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Impact finansowy: €100,000 - €1,000,000 (kary RODO do 4% obrotu rocznego, koszty audytów)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Prawdopodobieństwo: Pewne (95%)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Mitigation Strategy:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Ograniczenie wdrożenia do środowisk dev/test bez danych klienckich")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Uzyskanie legal opinion od external counsel na zgodność z RODO/NIS2")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Użycie EU-based LLM providers z Standard Contractual Clauses (SCC)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Dokumentacja Data Processing Impact Assessment (DPIA)")]
        }),

        new Paragraph({
          spacing: { before: 180, after: 360 },
          children: [new TextRun({ text: "Koszt mitigacji: €20,000 (legal opinion + DPIA)", bold: true, font: "Arial" })]
        }),

        // Ryzyko 4
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.4 Vendor Lock-in & Discontinuity Risk")]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Severity: ", bold: true, font: "Arial" }),
            new TextRun({ text: "MEDIUM", bold: true, color: COLORS.MEDIUM, font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis zagrożenia: Kilocode jest prowadzony przez małe startup (Kilo-Org) bez stabilnego finansowania. Istnieje ryzyko, że projekt zostanie porzucony, a organizacja straci wsparcie i aktualizacje bezpieczeństwa.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Impact finansowy: €50,000 - €300,000 (koszty migracji, utrata inwestycji w integrację)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Prawdopodobieństwo: Średnie (50%)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Mitigation Strategy:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Fork projektu (Apache 2.0 license) i własna maintenance")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Dedykowany internal team (1 FTE) do wsparcia i development")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Monitorowanie projektu upstream i community health")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Przygotowanie migration path do alternatywnych rozwiązań (GitHub Copilot)")]
        }),

        new Paragraph({
          spacing: { before: 180, after: 360 },
          children: [new TextRun({ text: "Koszt mitigacji: €10,000 (fork setup) + €30,000/rok (1 FTE support)", bold: true, font: "Arial" })]
        }),

        // Ryzyko 5
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3.5 Brak SLA i Enterprise Support")]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Severity: ", bold: true, font: "Arial" }),
            new TextRun({ text: "MEDIUM", bold: true, color: COLORS.MEDIUM, font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis zagrożenia: Kilocode nie oferuje formalnego SLA ani 24/7 enterprise support. W przypadku krytycznych problemów organizacja jest zdana na community support lub własne zasoby.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Impact finansowy: €20,000 - €200,000 (downtime, utrata produktywności deweloperów)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Prawdopodobieństwo: Pewne (90%)", font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Mitigation Strategy:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Dedykowany internal L3 support team (1 FTE)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Aktywne uczestnictwo w community (GitHub, Discord)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Własna dokumentacja i runbooks dla common issues")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Monitorowanie projektu i proactive patching")]
        }),

        new Paragraph({
          spacing: { before: 180 },
          children: [new TextRun({ text: "Koszt mitigacji: €0 (setup) + €30,000/rok (1 FTE L3 support)", bold: true, font: "Arial" })]
        }),

        // PAGE BREAK
        new Paragraph({ children: [new PageBreak()] }),

        // === 4. SCENARIUSZE WDROŻENIOWE ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("4. SCENARIUSZE WDROŻENIOWE")]
        }),

        // Scenariusz A
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun(`4.1 Scenariusz A: Full Deployment ${EMOJI.CROSS}`)]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis: Wdrożenie Kilocode w obecnej formie dla 50 deweloperów z domyślnymi ustawieniami. Wykorzystanie publicznych LLM providers (Anthropic Claude, OpenAI GPT).",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Koszty (setup + 3 lata):", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Setup: €15,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("LLM API: €180,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Wsparcie: €0 (community only)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "SUMA: €195,000", bold: true })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: "Timeline: 6 tygodni", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Ryzyka:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "KRYTYCZNE: Data exfiltration do US-based LLM providers", color: COLORS.CRITICAL })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "WYSOKIE: Naruszenie RODO Art. 44-50 i NIS2", color: COLORS.HIGH })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "WYSOKIE: Klucze API w plaintext", color: COLORS.HIGH })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 360 },
          children: [new TextRun({
            text: `Rekomendacja: ${EMOJI.CROSS} NIE REKOMENDOWANE - Nieakceptowalne ryzyko prawne i bezpieczeństwa dla organizacji telekomunikacyjnej`,
            bold: true,
            color: COLORS.CRITICAL,
            font: "Arial"
          })]
        }),

        // Scenariusz B
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun(`4.2 Scenariusz B: Security-Hardened Fork ${EMOJI.CHECK} (REKOMENDOWANY)`)]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis: Stworzenie własnego security-hardened fork Kilocode z self-hosted LiteLLM proxy, HashiCorp Vault, DLP gateway, MCP whitelist i izolacją sieciową.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Koszty (setup + 3 lata):", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Setup: €45,000 (fork development, infrastruktura)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("LLM API: €180,000 (self-hosted lub EU provider)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Infrastruktura: €72,000 (LiteLLM, DLP, Vault)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Wsparcie: €90,000 (1 FTE)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "SUMA: €387,000", bold: true })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: "Timeline: 4-6 miesięcy", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Ryzyka (zmitigowane):", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "NISKIE: Dane w kontroli dzięki self-hosted LiteLLM + DLP", color: COLORS.LOW })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "NISKIE: Klucze API w Vault", color: COLORS.LOW })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "ŚREDNIE: MCP servers z whitelist (pozostaje pewne ryzyko)", color: COLORS.MEDIUM })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 360 },
          children: [new TextRun({
            text: `Rekomendacja: ${EMOJI.CHECK} REKOMENDOWANE dla środowisk dev/test - Znacząca redukcja ryzyka, pozytywny ROI (+€183k)`,
            bold: true,
            color: COLORS.LOW,
            font: "Arial"
          })]
        }),

        // Scenariusz C
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun(`4.3 Scenariusz C: Limited Pilot ${EMOJI.WARNING}`)]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis: Pilotażowe wdrożenie dla 10 deweloperów w całkowicie izolowanym środowisku testowym. Cel: ocena wartości biznesowej przed decyzją o pełnym wdrożeniu.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Koszty (6 miesięcy pilotażu):", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Setup: €10,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("LLM API: €6,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "SUMA: €16,000", bold: true })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: "Timeline: 6 miesięcy", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 360 },
          children: [new TextRun({
            text: `Rekomendacja: ${EMOJI.WARNING} AKCEPTOWALNE jako proof-of-concept - Niski koszt i ryzyko, pozwala ocenić wartość biznesową`,
            bold: true,
            color: COLORS.MEDIUM,
            font: "Arial"
          })]
        }),

        // Scenariusz D
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun(`4.4 Scenariusz D: GitHub Copilot Enterprise ${EMOJI.CHECK}`)]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [new TextRun({
            text: "Opis: Rezygnacja z Kilocode na rzecz komercyjnej alternatywy z pełnym wsparciem enterprise, certyfikacjami i out-of-the-box compliance.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Koszty (3 lata):", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Setup: €5,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Licencje: €108,000 (50 dev × €60/mies × 36)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "SUMA: €113,000", bold: true })]
        }),

        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: "Timeline: 2 tygodnie", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Zalety:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Enterprise SLA (99.9% uptime)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("SOC 2 Type II, ISO 27001 certyfikacje")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("GDPR/NIS2 compliance out-of-the-box")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("24/7 enterprise support")]
        }),

        new Paragraph({
          spacing: { before: 240, after: 360 },
          children: [new TextRun({
            text: `Rekomendacja: ${EMOJI.CHECK} AKCEPTOWALNE dla organizacji priorytetyzujących compliance - Najbezpieczniejsza opcja, niższy TCO`,
            bold: true,
            color: COLORS.LOW,
            font: "Arial"
          })]
        }),

        // PAGE BREAK
        new Paragraph({ children: [new PageBreak()] }),

        // === 5. ROADMAP IMPLEMENTACJI ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("5. ROADMAP IMPLEMENTACJI")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Dla Scenariusza B: Security-Hardened Fork",
            bold: true,
            font: "Arial"
          })]
        }),

        // P0 Tasks
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("5.1 PRIORYTET P0 (Krytyczne - przed pilotażem)")]
        }),

        new Table({
          columnWidths: [2600, 800, 600, 1000, 3360],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                createHeaderCell("Zadanie", 2600),
                createHeaderCell("Timeline", 800),
                createHeaderCell("FTE", 600),
                createHeaderCell("Budżet", 1000),
                createHeaderCell("KPI Sukcesu", 3360)
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Fork Kilocode repo + security hardening (API key encryption, disable telemetry)", { width: 2600 }),
                createTableCell("2 tygodnie", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("1 Senior Dev", { width: 600 }),
                createTableCell("€5,000", { width: 1000, alignment: AlignmentType.RIGHT }),
                createTableCell("Wszystkie klucze API w Vault, zero telemetry leaks", { width: 3360 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Deploy self-hosted LiteLLM z audit logging", { width: 2600, bgColor: COLORS.GRAY_BG }),
                createTableCell("2 tygodnie", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("1 DevOps", { width: 600, bgColor: COLORS.GRAY_BG }),
                createTableCell("€8,000", { width: 1000, alignment: AlignmentType.RIGHT, bgColor: COLORS.GRAY_BG }),
                createTableCell("100% LLM requests logged, <100ms latency overhead", { width: 3360, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Integracja HashiCorp Vault dla secrets management", { width: 2600 }),
                createTableCell("1 tydzień", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("1 Security Eng", { width: 600 }),
                createTableCell("€4,000", { width: 1000, alignment: AlignmentType.RIGHT }),
                createTableCell("Zero plaintext credentials w filesystemie", { width: 3360 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Deploy DLP gateway dla wychodzącego ruchu", { width: 2600, bgColor: COLORS.GRAY_BG }),
                createTableCell("3 tygodnie", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("1 Network Eng", { width: 600, bgColor: COLORS.GRAY_BG }),
                createTableCell("€12,000", { width: 1000, alignment: AlignmentType.RIGHT, bgColor: COLORS.GRAY_BG }),
                createTableCell("100% skanowanie, <5% false positives", { width: 3360, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Izolacja sieciowa (dedykowany VLAN)", { width: 2600 }),
                createTableCell("1 tydzień", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("1 Network Eng", { width: 600 }),
                createTableCell("€3,000", { width: 1000, alignment: AlignmentType.RIGHT }),
                createTableCell("Zero network path do prod z dev VLAN", { width: 3360 })
              ]
            })
          ]
        }),

        // P1 Tasks
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("5.2 PRIORYTET P1 (Wysokie - przed rollout)")]
        }),

        new Table({
          columnWidths: [2600, 800, 600, 1000, 3360],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                createHeaderCell("Zadanie", 2600),
                createHeaderCell("Timeline", 800),
                createHeaderCell("FTE", 600),
                createHeaderCell("Budżet", 1000),
                createHeaderCell("KPI Sukcesu", 3360)
              ]
            }),
            new TableRow({
              children: [
                createTableCell("MCP server whitelist + sandboxing (Docker containers)", { width: 2600 }),
                createTableCell("2 tygodnie", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("1 Senior Dev", { width: 600 }),
                createTableCell("€6,000", { width: 1000, alignment: AlignmentType.RIGHT }),
                createTableCell("Tylko zatwierdzone MCP servers, sandboxed execution", { width: 3360 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Penetration testing przez zewnętrzną firmę", { width: 2600, bgColor: COLORS.GRAY_BG }),
                createTableCell("2 tygodnie", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("External vendor", { width: 600, bgColor: COLORS.GRAY_BG }),
                createTableCell("€15,000", { width: 1000, alignment: AlignmentType.RIGHT, bgColor: COLORS.GRAY_BG }),
                createTableCell("Zero critical/high vulnerabilities", { width: 3360, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Legal opinion na zgodność z RODO/NIS2", { width: 2600 }),
                createTableCell("1 tydzień", { width: 800, alignment: AlignmentType.CENTER }),
                createTableCell("External lawyer", { width: 600 }),
                createTableCell("€8,000", { width: 1000, alignment: AlignmentType.RIGHT }),
                createTableCell("Positive legal opinion dla dev/test use", { width: 3360 })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Monitoring & alerting (Prometheus/Grafana + SIEM)", { width: 2600, bgColor: COLORS.GRAY_BG }),
                createTableCell("1 tydzień", { width: 800, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("1 DevOps", { width: 600, bgColor: COLORS.GRAY_BG }),
                createTableCell("€4,000", { width: 1000, alignment: AlignmentType.RIGHT, bgColor: COLORS.GRAY_BG }),
                createTableCell("Real-time alerts na anomalie, <5min MTTD", { width: 3360, bgColor: COLORS.GRAY_BG })
              ]
            })
          ]
        }),

        // P2 Tasks
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("5.3 PRIORYTET P2 (Nice-to-have - post-rollout)")]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Integracja z corporate SSO (SAML/OAuth2) - 1 tydzień, €3,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Custom AI models fine-tuned na internal codebase - 4 tygodnie, €20,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("IDE plugins dla JetBrains/Eclipse - 3 tygodnie, €12,000")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Automated compliance reporting - 2 tygodnie, €8,000")]
        }),

        // PAGE BREAK
        new Paragraph({ children: [new PageBreak()] }),

        // === 6. PORÓWNANIE ALTERNATYW ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("6. PORÓWNANIE ALTERNATYW")]
        }),

        new Table({
          columnWidths: [2000, 1840, 1840, 1840, 1840],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                createHeaderCell("Kryterium", 2000),
                createHeaderCell("Kilocode Fork", 1840),
                createHeaderCell("GitHub Copilot", 1840),
                createHeaderCell("AWS CodeWhisperer", 1840),
                createHeaderCell("Build In-House", 1840)
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Koszt (3 lata)", { width: 2000, bold: true }),
                createTableCell("€387k", { width: 1840, alignment: AlignmentType.RIGHT }),
                createTableCell(`${EMOJI.CHECK} €113k`, { width: 1840, alignment: AlignmentType.RIGHT, color: COLORS.LOW }),
                createTableCell(`${EMOJI.CHECK} €90k`, { width: 1840, alignment: AlignmentType.RIGHT, color: COLORS.LOW }),
                createTableCell(`${EMOJI.CROSS} €800k+`, { width: 1840, alignment: AlignmentType.RIGHT, color: COLORS.CRITICAL })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Bezpieczeństwo", { width: 2000, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("7/10 (hardened)", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell(`${EMOJI.CHECK} 9/10 (SOC2, ISO)`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW }),
                createTableCell(`${EMOJI.CHECK} 9/10 (AWS IAM)`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW }),
                createTableCell(`${EMOJI.CHECK} 10/10 (full control)`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("RODO/NIS2 Compliance", { width: 2000, bold: true }),
                createTableCell("6/10 (requires opinion)", { width: 1840, alignment: AlignmentType.CENTER }),
                createTableCell(`${EMOJI.CHECK} 9/10 (DPA + cert)`, { width: 1840, alignment: AlignmentType.CENTER, color: COLORS.LOW }),
                createTableCell("8/10 (AWS GDPR)", { width: 1840, alignment: AlignmentType.CENTER }),
                createTableCell("10/10 (by design)", { width: 1840, alignment: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Wsparcie", { width: 2000, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("Internal (no SLA)", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell(`${EMOJI.CHECK} 24/7 MS + SLA 99.9%`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW }),
                createTableCell("AWS Premium Support", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("Internal (full control)", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Funkcjonalność AI", { width: 2000, bold: true }),
                createTableCell(`${EMOJI.CHECK} 9/10 (Claude 4, GPT-5)`, { width: 1840, alignment: AlignmentType.CENTER, color: COLORS.LOW }),
                createTableCell("8/10 (GPT-4 based)", { width: 1840, alignment: AlignmentType.CENTER }),
                createTableCell("7/10 (CodeWhisperer)", { width: 1840, alignment: AlignmentType.CENTER }),
                createTableCell("Depends (custom)", { width: 1840, alignment: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Customizacja", { width: 2000, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell(`${EMOJI.CHECK} 10/10 (full source)`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW }),
                createTableCell("4/10 (limited)", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell("5/10 (AWS ecosystem)", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell(`${EMOJI.CHECK} 10/10 (unlimited)`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Vendor Lock-in Risk", { width: 2000, bold: true }),
                createTableCell(`${EMOJI.CHECK} LOW (open-source)`, { width: 1840, alignment: AlignmentType.CENTER, color: COLORS.LOW }),
                createTableCell(`${EMOJI.CROSS} HIGH (Microsoft)`, { width: 1840, alignment: AlignmentType.CENTER, color: COLORS.CRITICAL }),
                createTableCell("MEDIUM (AWS only)", { width: 1840, alignment: AlignmentType.CENTER }),
                createTableCell(`${EMOJI.CHECK} NONE`, { width: 1840, alignment: AlignmentType.CENTER, color: COLORS.LOW })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("Time to Deploy", { width: 2000, bold: true, bgColor: COLORS.GRAY_BG }),
                createTableCell("4-6 miesięcy", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG }),
                createTableCell(`${EMOJI.CHECK} 2 tygodnie`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW }),
                createTableCell(`${EMOJI.CHECK} 1 tydzień`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG, color: COLORS.LOW }),
                createTableCell("12+ miesięcy", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.GRAY_BG })
              ]
            }),
            new TableRow({
              children: [
                createTableCell("REKOMENDACJA", { width: 2000, bold: true, bgColor: COLORS.HEADER_BG }),
                createTableCell(`${EMOJI.WARNING} Dev/Test only`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.HEADER_BG, bold: true }),
                createTableCell(`${EMOJI.CHECK} BEST for Prod`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.HEADER_BG, bold: true, color: COLORS.LOW }),
                createTableCell("Good for AWS shops", { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.HEADER_BG }),
                createTableCell(`${EMOJI.CROSS} Too expensive`, { width: 1840, alignment: AlignmentType.CENTER, bgColor: COLORS.HEADER_BG, color: COLORS.CRITICAL })
              ]
            })
          ]
        }),

        // PAGE BREAK
        new Paragraph({ children: [new PageBreak()] }),

        // === 7. KLUCZOWE REKOMENDACJE ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("7. KLUCZOWE REKOMENDACJE DLA ZARZĄDU")]
        }),

        // Rekomendacja 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("7.1 Start with Limited Pilot (Scenariusz C)")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Rozpocząć od 6-miesięcznego pilotażu z 10 deweloperami w izolowanym środowisku testowym (koszt: €16,000). Cel: walidacja rzeczywistej wartości biznesowej przed większymi inwestycjami.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Uzasadnienie:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Niskie ryzyko finansowe i prawne")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Pozwala ocenić realny wzrost produktywności (target: 15-25%)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Unikamy przedwczesnej inwestycji w infrastrukturę")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Decyzja go/no-go po 6 miesiącach z danymi empirycznymi")]
        }),

        // Rekomendacja 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("7.2 If Pilot Succeeds → Deploy Scenariusz B")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Jeśli pilotaż wykaże >15% wzrost produktywności, przejść do Security-Hardened Fork (Scenariusz B) dla 50 deweloperów w środowiskach dev/test. NIE wdrażać w produkcji do czasu uzyskania:",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun("Positive legal opinion na zgodność z RODO/NIS2")]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun("Clean penetration test report (zero critical/high findings)")]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          children: [new TextRun("ISO 27001 internal certification lub równoważne")]
        }),

        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: "Uzasadnienie:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Pozytywny ROI (€183k net benefit w 3 lata)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Znacząca redukcja ryzyka dzięki self-hosted LiteLLM + DLP")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Zachowanie elastyczności (open-source fork)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Akceptowalne dla środowisk non-production")]
        }),

        // Rekomendacja 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("7.3 Consider GitHub Copilot Enterprise for Production")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Dla środowisk produkcyjnych rozważyć GitHub Copilot Enterprise (€113k/3 lata) jako alternatywę z pełnym compliance i wsparciem enterprise. Niższy TCO i zero ryzyka prawnego.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Uzasadnienie:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Out-of-the-box GDPR/NIS2 compliance (DPA + certyfikacje)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("SLA 99.9% + 24/7 Microsoft support")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Szybkie wdrożenie (2 tygodnie vs 4-6 miesięcy)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Niższy całkowity koszt (€113k vs €387k)")]
        }),

        // Rekomendacja 4
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("7.4 Establish AI Coding Governance Committee")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Powołać komitet złożony z przedstawicieli: Security, Legal/Compliance, Engineering, Architecture.",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: "Zadania:", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Zatwierdzanie wszystkich MCP servers przed deployment")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Monitorowanie compliance z RODO/NIS2 (quarterly audits)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Review AI-generated code quality metrics")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Update polityk bezpieczeństwa w odpowiedzi na nowe zagrożenia")]
        }),

        // Rekomendacja 5
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("7.5 Plan for Continuous Monitoring & Improvement")]
        }),

        new Paragraph({
          spacing: { after: 240 },
          children: [new TextRun({
            text: "Niezależnie od wybranego scenariusza, ustanowić ciągły monitoring:",
            font: "Arial"
          })]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("KPI produktywności: Pull request velocity, code review time, bug density")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("KPI bezpieczeństwa: Data exfiltration attempts, MCP violations, failed auth")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("KPI compliance: RODO/NIS2 violations, DPA breaches, audit findings")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Quarterly review z możliwością pivot do alternatywnych rozwiązań")]
        }),

        // PAGE BREAK
        new Paragraph({ children: [new PageBreak()] }),

        // === 8. KONKLUZJA FINALNA ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("8. KONKLUZJA FINALNA")]
        }),

        new Paragraph({
          spacing: { after: 360 },
          children: [new TextRun({
            text: "Kilocode oferuje zaawansowaną funkcjonalność AI (Claude 4, GPT-5) i atrakcyjny ROI, ale wymaga znaczących inwestycji w zabezpieczenia bezpieczeństwa i compliance. Rekomendujemy podejście stopniowe:",
            font: "Arial"
          })]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [
            new TextRun({ text: "Faza 1 (6 miesięcy): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Limited Pilot → Walidacja wartości", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 180 },
          children: [
            new TextRun({ text: "Faza 2 (12 miesięcy): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Security-Hardened Fork → Dev/Test deployment", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 360 },
          children: [
            new TextRun({ text: "Faza 3 (w przyszłości): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Decyzja prod deployment LUB pivot do GitHub Copilot", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 480 },
          children: [new TextRun({
            text: "To podejście minimalizuje ryzyko przy zachowaniu potencjału na znaczące korzyści biznesowe.",
            bold: true,
            font: "Arial"
          })]
        }),

        // === 9. ZAŁĄCZNIKI ===
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun("9. ZAŁĄCZNIKI")]
        }),

        // Słowniczek
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("9.1 Słowniczek Terminów Technicznych")]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "MCP (Model Context Protocol): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Protokół pozwalający LLM na interakcję z zewnętrznymi narzędziami i systemami", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "LiteLLM: ", bold: true, font: "Arial" }),
            new TextRun({ text: "Proxy server do standaryzacji dostępu do różnych LLM providers", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "DLP (Data Loss Prevention): ", bold: true, font: "Arial" }),
            new TextRun({ text: "System zapobiegający wyciekom danych wrażliwych", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "RODO: ", bold: true, font: "Arial" }),
            new TextRun({ text: "Rozporządzenie o Ochronie Danych Osobowych (GDPR)", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "NIS2: ", bold: true, font: "Arial" }),
            new TextRun({ text: "Dyrektywa UE o cyberbezpieczeństwie dla operatorów usług kluczowych", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "DPA (Data Processing Agreement): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Umowa o przetwarzaniu danych wymagana przez RODO", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "SCC (Standard Contractual Clauses): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Standardowe klauzule umowne dla transferu danych poza EU", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "TCO (Total Cost of Ownership): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Całkowity koszt posiadania (setup + operacyjne)", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 360 },
          children: [
            new TextRun({ text: "ROI (Return on Investment): ", bold: true, font: "Arial" }),
            new TextRun({ text: "Zwrot z inwestycji (korzyści minus koszty)", font: "Arial" })
          ]
        }),

        // Lista źródeł
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("9.2 Lista Źródeł i Regulacji")]
        }),

        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("RODO (Rozporządzenie UE 2016/679)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Dyrektywa NIS2 (Dyrektywa UE 2022/2555)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("ISO 27001:2022 - Information Security Management")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("ETSI TS 103 645 - Cyber Security for Consumer IoT")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("3GPP Security Specifications (TS 33.xxx series)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("PCI DSS v4.0 - Payment Card Industry Data Security Standard")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Kilocode GitHub Repository (https://github.com/Kilo-Org/kilocode)")]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun("Model Context Protocol Specification (Anthropic)")]
        }),

        // Kontakty
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [new TextRun("9.3 Kontakty do Dalszych Działań")]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Security Team: ", bold: true, font: "Arial" }),
            new TextRun({ text: "security@telco-operator.eu", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Legal/Compliance: ", bold: true, font: "Arial" }),
            new TextRun({ text: "legal@telco-operator.eu", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Engineering Lead: ", bold: true, font: "Arial" }),
            new TextRun({ text: "engineering@telco-operator.eu", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "External Auditor: ", bold: true, font: "Arial" }),
            new TextRun({ text: "SEC Consult (www.sec-consult.com)", font: "Arial" })
          ]
        }),

        new Paragraph({
          spacing: { before: 720, after: 240 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "--- KONIEC RAPORTU ---", bold: true, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Data wygenerowania: 4 listopada 2025", size: 18, font: "Arial" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Przygotowane przez: Zespół Analityczny", size: 18, font: "Arial" })]
        })
      ]
    }
  ]
});

// Zapisz dokument
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/root/repo/KILOCODE_EXECUTIVE_REPORT.docx", buffer);
  console.log("✅ Raport wykonawczy został wygenerowany: KILOCODE_EXECUTIVE_REPORT.docx");
  console.log("📄 Rozmiar pliku:", (buffer.length / 1024).toFixed(2), "KB");
}).catch(error => {
  console.error("❌ Błąd podczas generowania dokumentu:", error);
  process.exit(1);
});
