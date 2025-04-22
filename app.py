from flask import Flask, render_template, request, send_file, send_from_directory, redirect, url_for
from pdf_generator import generar_pdf
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generar_pdf', methods=['POST'])  # ✅ Nueva ruta que usaremos desde el formulario
def generar_pdf_route():
    respuestas = request.form.to_dict()
    archivo_pdf = generar_pdf(respuestas)
    print(f"✅ PDF generado en: {archivo_pdf}")

    # ✅ Guardamos el nombre del PDF para mostrarlo en la página de confirmación
    filename = os.path.basename(archivo_pdf)
    return redirect(url_for('confirmacion', filename=filename))

@app.route('/confirmacion')
def confirmacion():
    filename = request.args.get('filename')
    return render_template('confirmacion.html', pdf_file=filename)

@app.route('/pdfs/<filename>')
def ver_pdf(filename):
    return send_from_directory('pdfs', filename)

@app.route('/descargar/<filename>')
def descargar_pdf(filename):
    return send_file(f'pdfs/{filename}', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)