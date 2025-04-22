import os
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

# Asegurar que la carpeta "pdfs" existe
BASE_PATH = "pdfs"
if not os.path.exists(BASE_PATH):
    os.makedirs(BASE_PATH)

def generar_pdf(respuestas):
    fecha_hoy = datetime.datetime.now().strftime("%d-%m-%Y")
    hora_actual = datetime.datetime.now().strftime("%H-%M-%S")  # Formato de hora para evitar errores en el nombre
    nombre = respuestas.get("Nombre", "Usuario_Desconocido").replace(" ", "_")
    identificacion = respuestas.get("Identificación", "N/A").replace(" ", "_")
    cargo = respuestas.get("Cargo", "N/A")

    # 📂 Crear una carpeta con el nombre y fecha
    carpeta_usuario = os.path.join(BASE_PATH, f"{nombre}_{fecha_hoy}")
    if not os.path.exists(carpeta_usuario):
        os.makedirs(carpeta_usuario)

    # 📄 Nombre del archivo PDF con fecha y hora
    nombre_archivo = os.path.join(carpeta_usuario, f"{nombre}_{fecha_hoy}_{hora_actual}.pdf")

    try:
        # Crear PDF
        c = canvas.Canvas(nombre_archivo, pagesize=letter)

        # 📌 **Carga de plantillas**
        plantilla1_path = "static/plantilla1.png"
        plantilla2_path = "static/plantilla2.png"

        if os.path.exists(plantilla1_path):
            c.drawImage(ImageReader(plantilla1_path), 0, 0, width=612, height=792)
        else:
            print(f"⚠️ No se encontró {plantilla1_path}")

        c.setFont("Helvetica", 9)
        c.drawString(150, 695, nombre.replace("_", " "))  # Restaurar espacios
        c.drawString(440, 695, cargo)
        c.drawString(150, 677, identificacion)
        c.drawString(115, 709, fecha_hoy)

        # 📌 Posiciones de respuestas
        coordenadas_preguntas = {
            "Pregunta1": (40, 560),
            "Pregunta2": (40, 512),
            "Pregunta3": (40, 410),
            "Pregunta4": (40, 300),
            "Pregunta5": (60, 220),
            "Pregunta6": (40, 134),
        }
        for pregunta, coord in coordenadas_preguntas.items():
            respuesta = respuestas.get(pregunta, "No respondida")
            c.drawString(coord[0], coord[1], f"{respuesta}")

        # 📌 Página 2
        c.showPage()

        if os.path.exists(plantilla2_path):
            c.drawImage(ImageReader(plantilla2_path), 0, 0, width=612, height=792)
        else:
            print(f"⚠️ No se encontró {plantilla2_path}")

        coordenadas_pagina_2 = {
            "Pregunta7": (43, 737),
            "Pregunta8": (43, 678),
            "Pregunta9": (43, 580),
            "Pregunta10": (40, 413),
        }
        for pregunta, coord in coordenadas_pagina_2.items():
            respuesta = respuestas.get(pregunta, "No respondida")
            c.drawString(coord[0], coord[1], f"{respuesta}")

        # 📌 Datos finales
        c.setFont("Helvetica", 8)
        c.drawString(60, 344, nombre.replace("_", " "))  
        c.drawString(290, 344, identificacion)  
        c.drawString(70, 238, nombre.replace("_", " "))  
        c.drawString(60, 227, identificacion)  

        c.save()
        print(f"✅ PDF generado correctamente: {nombre_archivo}")
        return nombre_archivo

    except Exception as e:
        print(f"❌ Error al generar el PDF: {e}")
        return None