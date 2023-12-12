from flask import Flask, request, jsonify
from resumeparse import resumeparse
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
CORS(app, resources={r"/resumeparse": {"origins": "http://localhost:3000"}})
app_logger = logging.getLogger(__name__)
log_handler = RotatingFileHandler('example.log', maxBytes=2048, backupCount=1)
log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
log_handler.setFormatter(log_formatter)
app_logger.addHandler(log_handler)
app_logger.setLevel(logging.DEBUG)

class ResumeParser:
    logging.info(f'inside Class:ResumeParser')
    @staticmethod
    def parse_resume(resume_file_path, docx_parser="tika"):
        parser_obj = resumeparse()
        parsed_resume_data = parser_obj.read_file(resume_file_path, docx_parser)
        return parsed_resume_data

@app.route('/resumeparse', methods=['POST'])
def parse_resume():
    app_logger.info(f"Request received")
    print("Received a request to parse resume")
    try:
        # Get the resume file from the request
        resume_file = request.files['resume']
        docx_parser = request.form.get('docx_parser', 'tika')
        app_logger.info(f"Received resume")

        # Save the file to a temporary location
        resume_file_path = 'Ashok_resume.pdf'
        resume_file.save(resume_file_path)
        app_logger.info(f"file saved")

        # Parse the resume
        parsed_resume_data = ResumeParser.parse_resume(resume_file_path, docx_parser)
        app_logger.info(f"resume parsed")

        return jsonify(parsed_resume_data)

    except Exception as e:
        print(f"Error: {str(e)}")
        app_logger.error(f'error:{str(e)}')
        return jsonify({'error': str(e)})
@app.route('/greet', methods=['POST'])
def greet_user():
    try:
        data = request.get_json()
        first_name = data.get('first_name', 'User')

        greeting = f"Hello {first_name}, please fill in the details."
        return jsonify({'greeting': greeting})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)