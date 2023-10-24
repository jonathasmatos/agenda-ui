import jsPDF from "jspdf";
import Moment from "moment";
import autoTable from "jspdf-autotable";

export default class JsPDFCustom {
  constructor() {
    this.doc = new jsPDF("A4");
    this.config = this.getConfiguration();
    this.title = "";
  }

  getConfiguration() {
    const pageWidth =
      this.doc.internal.pageSize.width || this.doc.internal.pageSize.getWidth();

    const pageHeight =
      this.doc.internal.pageSize.height ||
      this.doc.internal.pageSize.getHeight();

    const fontSize = 10;

    const fontFamily = "helvetica";

    this.doc.addImage(
      "../images/sespa/brasaoEstadoRelatorio.png",
      "JPEG",
      30,
      60,
      150,
      180
    );

    return { pageWidth, pageHeight, fontSize, fontFamily };
  }

  getHeader() {
    this.doc.addImage(
      "../images/sespa/brasaoSespa.png",
      "JPEG",
      80,
      13,
      50,
      18
    );

    this.doc
      .setFont(this.config.fontFamily, "bold")
      .setFontSize(7)
      .text(
        `EMITIDO EM:  ${Moment(new Date()).format("DD/MM/YYYY HH:mm:ss")}`,
        25,
        10,
        null,
        null,
        "center"
      );

    this.doc
      .setFont(this.config.fontFamily, "bold")
      .setFontSize(10)
      .text(
        `GOVERNO DO ESTADO DO PARÁ `,
        this.config.pageWidth / 2,
        35,
        null,
        null,
        "center"
      );

    this.doc
      .setFont(this.config.fontFamily, "bold")
      .setFontSize(10)
      .text(
        `SECRETARIA DE ESTADO DE SAÚDE PÚBLICA`,
        this.config.pageWidth / 2,
        40,
        null,
        null,
        "center"
      );

    this.doc
      .setFont(this.config.fontFamily, "bold")
      .setFontSize(10)
      .text(
        `COORDENAÇÃO DE TECNOLOGIA E INFORMÁTICA EM SAÚDE - CTIS`,
        this.config.pageWidth / 2,
        45,
        null,
        null,
        "center"
      );

    this.doc
      .setFont(this.config.fontFamily, "bold")
      .setFontSize(12)
      .text(this.title, this.config.pageWidth / 2, 58, null, null, "center");

    this.doc.setLineWidth(0.2);
    this.doc.line(20, 60, this.config.pageWidth - 20, 60);
  }

  getFooter() {
    this.doc.setLineWidth(0.1);
    this.doc.line(
      20,
      268,
      this.config.pageWidth - 20,
      this.config.pageHeight - 30
    );
    //INICIO DO RODAPÉ
    this.doc
      .setFont("helvetica", "normal")
      .setFontSize(8)
      .text(
        "Coordenação de Tecnologia e Informática em Saúde - CTIS \n" +
          "End: Tva. Lomas Valentinas, 2190, Bairro Marco, CEP: 66093-677, Belém, Pará \n" +
          "Contato: +55, 91 4006-4399 | 4006-4328 www.saude.pa.gov.br",
        105,
        this.config.pageHeight - 25,
        null,
        null,
        "center"
      );
  }

  addLabel(text, posY, posX = 20) {
    this.doc
      .setFont(this.config.fontFamily, "normal")
      .setFontSize(this.config.fontSize)
      .text(text.toUpperCase(), posX, posY, null, null, null);
  }

  addValue(text, posY, posX = 55) {
    this.doc
      .setFont(this.config.fontFamily, "bold")
      .setFontSize(this.config.fontSize)
      .text(text.toUpperCase(), posX, posY, null, null, null);
  }

  setBond(bond) {
    this.addLabel(`Nome do Agente:`, 75);
    this.addValue(bond.name, 75);

    this.addLabel(`Matricula:`, 82);
    this.addValue(bond.credential, 82);

    this.addLabel(`CPF:`, 89);
    this.addValue(bond.cpf, 89);

    this.addLabel(`CARGO:`, 96);
    this.addValue(bond.office, 96);

    this.addLabel(`FUNÇÃO:`, 103);
    this.addValue(bond.occupation, 103);

    this.addLabel(`ATUAÇÃO:`, 110);
    this.addValue(bond.acting, 110);

    this.addLabel(`Situação:`, 117);
    this.addValue(bond.situation, 117);

    this.addLabel(`Horário:`, 124);
    let hr = "";
    if (bond.hrEntrance && bond.hrExit) {
      hr = `${bond.hrEntrance} - ${bond.hrExit}`;
    } else {
      hr = "NÃO SE APLICA";
    }
    this.addValue(hr, 124);

    this.doc.setLineWidth(0.2);
    this.doc.line(0, 131, 300, 131);
  }

  generateFrequency(bond, list) {
    this.title = `FREQUÊNCIA DO SERVIDOR ${bond.name}`;

    this.getHeader();

    this.setBond(bond);

    var tableData = [["Equipamento", "Direção", "Data", "Importação"], ...list];

    // Configuração da tabela
    autoTable(this.doc, {
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 140,
      margin: { top: 50 },
      styles: {},
      columnStyles: {
        cellWidth: 60,
      },
      headStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
      footStyles: { fillColor: [41, 128, 185] },
      theme: "grid",
    });

    this.getFooter();

    this.doc.save(`frequencia.pdf`);
  }
}
