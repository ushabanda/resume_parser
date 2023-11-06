import os, logging, time
from flask import Flask, jsonify, request, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
from io import BytesIO
from datetime import datetime as DT
from resume_parser.usha_resumeparse import true_talent_resumeparse
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('TrueTalent')



UPLOAD_FOLDER = '/file_uploads'
ALLOWED_EXTENSIONS = set(['txt', 'doc', 'docx', 'pdf'])

app = Flask(__name__)
CORS(app, expose_headers='Authorization')
CORS(app, resources={r"/usha_resumeparse": {"origins": "http://localhost:3000"}})
# cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/get_time', methods=['GET'])
def get_time():
    return str(DT.now())

@app.route('/upload', methods=['POST'])
def fileUpload():
    try:
        target=os.path.join(os.environ['USERPROFILE'],'test_docs')
        if not os.path.isdir(target):
            os.mkdir(target)
        logger.info("welcome to upload`")
        file = request.files['file'] 
        filename = secure_filename(file.filename)

        destination="/".join([target, filename])
        file.save(destination)
        session['uploadFilePath']=destination

        time.sleep(3)
        parser_obj = true_talent_resumeparse()
        parsed_resume_data = parser_obj.read_file(destination)

        delete_file(destination)
        print("\n\n ========== parsed_data ========= \n\n", parsed_resume_data)

        return jsonify({"parsed_resume_data": parsed_resume_data })
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})

def delete_file(file_path):
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            print(f"\n\n{file_path} has been successfully deleted.")
        except OSError as e:
            print(f"Error deleting {file_path}: {e}")
    else:
        print(f"{file_path} does not exist.")

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="127.0.0.1",use_reloader=True, port=8000)
