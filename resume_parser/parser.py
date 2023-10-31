from resume_parser import resumeparse

data = resumeparse.read_file('Naukri_Deepika.docx')
# data = resumeparse.read_file('resume_parser/Ashok_resume.pdf')

print("\n\n ============ \n\n",data)